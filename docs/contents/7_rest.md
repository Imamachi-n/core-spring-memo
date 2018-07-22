# REST
## RESTとは?
* REpresentational State Transferの略。
* 簡単に言うと、ServletクラスがレンダリングしたHTMLを返す代わりに、URLに対応付けされたデータを返すための設計原則。

## RESTfulの意味
* アドレス指定可能なURLで公開されていること
* インターフェース（HTTPメソッドの利用）が統一されること
* クライアントがJSONやXMLなどの特定のリソースをリクエストできる（URLとリソースのヒモ付ができている）
* ステートレスであること（サーバがセッション情報を保持しない、GETがURLでキャッシュ）
* 処理結果がHTTPステータスコードで通知されること

## RESTfulであるメリット
* クライアントのリクエストはリソース操作に必要な情報だけをやり取りする
* クライアントとサーバの両者を疎結合化できる
* クライアントの多様化（ブラウザ、アプリ、データ連携用サーバなど）に対応
* スケーラブルなシステムにしやすい

## Spring REST
* Spring MVCがREST APIの実装をサポートしている。
* JAX-RSを実装したものではない。

特徴としては、
* HTTPメソッド（GET, POST, PUT, DELETEなど）に基づいてリクエストを特定のメソッドと紐付ける。
* レスポンスステータスを定義する。
* メッセージコンバータ（JavaオブジェクトをJSONやXML形式のデータに変換）を提供
* RequestとResponseボディデータにアクセスする。

### 参考
[REST入門 基礎知識](https://qiita.com/TakahiRoyte/items/949f4e88caecb02119aa)

## RESTはステートレス（stateless）
REST APIでのやり取りでは、状態を持たない（Stateless）。  
そのため、Sessionの管理を行うことができない。
代わりに、RedisなどのKVSを用いたDBを利用してログイン情報やカート情報などを保持しておく。

## RESTで使われるHTTPメソッド

| メソッド        | 説明           |
| ------------- |:-------------:|
| GET      | 検索 |
| PUT      | 更新      |
| POST | 追加      |
| DELETE | 削除      |

## REST APIにおけるAuthentication
* BASIC
* OAuth2 (認可)
* 独自のトークン

### サポートされているHTTP Status Code
| ステータス | コード |
| -- | -- |
| Success | 200 OK |
| Redirect | 30x for Redirects |
| Client Error (Invalid URL) | 404 Not Found |
| Server Error | 500 (such as unhandled Exceptions) |

REST API用に使われるステータスコード
| ステータス | コード |
| -- | -- |
| Created Successfully | 201 |
| Client Error | 400 |
| HTTP method not supported | 405 |
| Cannot generate requested response body format | 406 |
| Request body not supported | 415 |

## HTTP GETメソッド：リソースのフェッチ
* HTTPレスポンスとしてリクエストされたデータを返す
* レスポンス用のデータのフォーマットを定義する

Request
```{2}
GET /store/orders/123
Host: shop.spring.io
Accept: application/json, ...
```

Response
```{7,8,9}
HTTP/1.1 200 OK
Date: …
Content-Length: 756
Content-Type: application/json

{
"id": 123,
"total": 200.00,
"items": [ … ]
}
```

## HTTPメソッドに基づくRequest Mapping
* 同じURLに対して単一もしくは複数のJavaのメソッドをマッピングすることができる
* `@RequestMapping`を使った場合、RequestMethodをエミュレートする仕組みが用意されている

以下に例を示す。
 ```java
 // Get all orders (for current user typically)
@RequestMapping(path="/orders", method=RequestMethod.GET)

// Create a new order
@RequestMapping(path="/orders", method=RequestMethod.POST)
 ```

### メソッドごとのMappingアノテーション
`@RequestMapping`アノテーションを用いて以下のように設定していた内容を、
```java
@RequestMapping(path="/accounts”, method=RequestMethod.GET)
```

以下のように`@GetMapping`アノテーションを用いて簡略化して書くこともできる。
```java
@GetMapping("/accounts");
```

代表的なアノテーションを以下に示す。
```java
- @GetMapping
- @PostMapping
- @PutMapping
- @DeleteMapping
```

## メッセージコンバータ
Responseとして、JSONやXML形式のデータを返すことを想定した場合、Javaオブジェクトを特定のデータ形式に変換しないといけない。

そこで、Spring側でメッセージコンバータ（`HttpMessageConverter`）が用意されており、Modelクラスのインスタンスを特定のデータ形式に変換してくれる（Response Headerを付けて返す）。

特定のデータ形式への変換はサードパーティ製のライブラリに依存しており、JSONならJacksonライブラリを内部で利用している。

また、Spring Bootでは自動で設定されているので特に意識する必要はない。Spring Frameworkの場合、`@EnableWebMvc`アノテーションを設定する必要がある。

### @ResponseBody
以下のように、レスポンスを返すメソッドに`@ResponseBody`アノテーションをつける。
```java
@GetMapping("/orders/{id}")
@ResponseBody
public Order getOrder(@PathVariable("id") long id) {
    return orderService.findOrderById(id);
 }
```

HTTP GETメソッドを用いて、AcceptヘッダーにJSONを指定した場合、Spring側で何の形式のデータでレスポンスを返せばよいか認識してくれる。
```{3}
GET /store/orders/123
Host: shop.spring.io
Accept: application/json
```

結果として、レスポンスとして以下を返す。
```{6,7,8}
HTTP/1.1 200 OK
Date: …
Content-Length: 756
Content-Type: application/json
{
"id": 123,
"total": 200.00,
"items": [ … ]
}
```

## REST API用のControllerクラスの設定
今までのやり方だと、`@Controller`アノテーションをつけたControllerクラスにレスポンスボディを返すメソッド（`@ResponseBody`）を設定していた。

```java
@Controller
public class OrderController {

    @GetMapping("/orders/{id}")
    @ResponseBody
    public Order getOrder(@PathVariable long id) {
        return orderService.findOrderById(id);
    }
}
```

実は、Spring側でREST API用のControllerクラスを定義するためのアノテーションが用意されている。それが`@RestController`アノテーションである。

### @RestController
```java
@RestController
public class OrderController {
    
    @GetMapping("/orders/{id}")
    public Order getOrder(@PathVariable long id) {
        return orderService.findOrderById(id);
    }
}
```

`@RestController`アノテーションをつけると、すべてのメソッドに`@ResponseBody`アノテーションをつけたのと同義となる。そのため、それぞれのメソッドに`@ReponseBody`を付ける手間が省ける。

`@RestController`は`@Controller`のステレオタイプアノテーションといえる。

## レスポンスヘッダーを独自に記述する
Spring側でヘッダの情報をいろいろと加工できる（便利）。

以下に簡単な例を示す。
```java
// ResponseEntity supports a "fluent" API for creating a
// response. Used to initialize the HttpServletResponse
ResponseEntity<String> response =
    ResponseEntity.ok()     // HTTP Status 200 OK
                  .contentType(MediaType.TEXT_PLAIN)
                  .body("Hello Spring");
```

レスポンスを作るために`HttpEntity`を使うことができる  
`HttpServletResponse`は使わないこと。テストがしにくくなる。
```java
@GetMapping("/orders/{id}")
public HttpEntity<Order> getOrder(@PathVariable long id) {
    Order order = orderService.find(id);
    return ResponseEntity
            .ok()                                            // HTTP Status 200 OK
            .header("Last-Modified", order.lastUpdated())    // カスタムヘッダーを設定
            .body(order);                                    // レスポンスボディ
}
```

## HTTP PUTメソッド: リソースのアップデート
* HTTP Requestでデータにアクセスする
* 空のレスポンスを返す（HTTP Statusは204）。

Request
```
PUT /store/orders/123/items/abc
Host: www.mybank.com
Content-Type: application/json
{
    "id": abc,
    "cost": 35.00,
    "product": SKU1234, ...
}
```

Response（空のレスポンス）
```
HTTP/1.1 204 No Content
Date: …
Content-Length: 0
```

## 任意のステータスコードをレスポンスとして返す
任意のステータスコードを返すために、RestControllerクラス内で定義したメソッドに、`@ResponeseStatus`アノテーションを付けて、返したいステータスコードを指定する。

以下の例では、204のステータスコードを指定している。
HTTP PUTメソッドの場合、空のレスポンスを返すため、戻り値の型は
`void`にしておく。
```java
@PutMapping("/orders/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
public void updateOrder(...) {
    // Update order
}
```

## 受け取ったリクエストデータをメッセージコンバータを用いてJavaオブジェクトに格納する
HTTP PUTメソッドの場合、データの更新になるので、受け取ったリクエストデータを何らかの方法を用いて、Javaオブジェクトに格納する必要があります。

Springでは、`@RequestBody`アノテーションによって、`content-type`からデータ型を自動的に判断し、Javaオブジェクトに格納してくれます。
```java
@PutMapping("/orders/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
public void updateOrder(@RequestBody Order updatedOrder,
                        @PathVariable("id") long id) {
    // process updated order data and return empty response
    orderManager.updateOrder(id, updatedOrder);
}
```

## HTTP POSTメソッド：新しいリソースを作る
* HTTPリクエストでデータにアクセスする。
* 新しく作られたリソースに対して、Locationヘッダを生成する。
* created （ステータスコード201）を返す。

Request
```
POST /store/orders/123/items
Host: shop.spring.io
Content-Type: application/json
{
    "cost": 50.00,
    "product": SKU9988, ...
}
```
Response
```
HTTP/1.1 201 Created
Date: ...
Content-Length: 0
Location: http://shop.spring.io/store/orders/123/items/abc
```

## 新規に登録されるデータのURLを定義する
HTTP POSTメソッドへのレスポンスには、データに紐づくURLを生成する必要がある。`UriComponentsBuilder`のサブクラスである`ServletUriComponentBuilder`クラスを用いて、データに紐づくURLを生成する。

Locationヘッダの編集には、前述した`ResponseEntity`を用い、戻り値を`ResponseEntity`にしてステータスコード201で返す。

以下に例を示す。
```java
@PostMapping("/orders/{id}/items")
public ResponseEntity<Void> createItem(@PathVariable long id, @RequestBody Item newItem) {
    // Add the new item to the order
    orderService.findOrderById(id).addItem(newItem);

    // Build the location URI of the new item
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequestUri()
        .path("/{itemId}")
        .buildAndExpand(newItem.getId())
        .toUri();

    // Explicitly create a 201 Created response
    return ResponseEntity.created(location).build();
}
```

## HTTP DELETEメソッド：存在するリソースを削除する
* 空のレスポンスを返す（ステータスコード204）。

Request
```
DELETE /store/orders/123/items/abc
Host: shop.spring.io
Content-Length: 0
```
Response
```
HTTP/1.1 204 No Content
Date: …
Content-Length: 0
```

## 特定のURLに紐づくデータを削除する
以下に例を示す。
```java
@DeleteMapping("/orders/{orderId}/items/{itemId}")
@ResponseStatus(HttpStatus.NO_CONTENT) // 204
public void deleteItem(@PathVariable long orderId,
                       @PathVariable String itemId) {
    orderService.findOrderById(orderId).deleteItem(itemId);
}
```

## 入力チェックを行う場合
Bean ValidationをModelクラスにつける。
* @NotBlank
* @Length
* @Validated

などなど。

## サーバ連携時のクライアント側の作成（RestTemplate）
リクエスト側の処理をSpringで書く方法。


| HTTP Method | RestTemplate Method |
| -- | -- |
| DELETE | delete(String url, Object, urlVariables) |
| GET | getForObject(String url, Class\<T\> responseType, Object, urlVariables) |
| HEAD | headForHeaders(String url, Object, urlVariables) |
| OPTIONS | optionsForAllow(String url, Object, urlVariables) |
| POST | postForLocation(String url, Object request, Object, urlVariables) |
|  | postForObject(String url, Object request, Class\<T\> responseType, Object, uriVariables) |
| PUT | put(String url, Object request, Object, urlVariables) |


### [WIP] 積み残し課題
* What does CRUD mean?
* Is REST secure? What can you do to secure it?
* What are safe REST operations?
* What are idempotent operations? Why is idempotency important?
* What is a stereotype annotation? What does that mean?
*  Do you need Spring MVC in your classpath?
* What Spring Boot starter would you use for a Spring REST application?
