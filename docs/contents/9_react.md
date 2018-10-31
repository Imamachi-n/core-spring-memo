# React

## create-react-app のインストール

```
yarn global add create-react-app
```

## React アプリのプロジェクト作成

```
yarn create react-app myapp
```

## ライブラリ探し

[JS.coach](https://js.coach/)

## REST API（Spring）で POST, PUT, DELETE ができない

CSRF 対策がされているため、GET 以外を受け付けないようになっている。  
テストように動かす場合には、Spring 側で以下のような設定を行う。

```java{4}
 @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Add this row to allow access to all endpoints
        http.csrf().disable().cors().and().authorizeRequests().anyRequest().permitAll();
    }
```

[How to enable POST, PUT AND DELETE methods in spring security](https://stackoverflow.com/questions/38108357/how-to-enable-post-put-and-delete-methods-in-spring-security)  
[Spring Security’s CSRF protection for REST services: the client side and the server side](https://www.codesandnotes.be/2015/02/05/spring-securitys-csrf-protection-for-rest-services-the-client-side-and-the-server-side/)

## ライブラリ

```bash
yarn add @material-ui/core
yarn add @material-ui/icons
yarn add typeface-roboto
```

## StoryBook

デザインガイドの作成や UI テストのために利用。

```
yarn create react-app storybook-101
yarn add --dev @storybook/react
```

[Storybook for React](https://storybook.js.org/basics/guide-react/)

[yarn チートシート](https://qiita.com/morrr/items/558bf64cd619ebdacd3d)

## Create-react-app を Eject した後の操作

Eject 後には、依存モジュールのインストールを行う必要があります。
依存モジュールが足りていないため、`Error: Cannot find module 'babel-loader'`というエラーが発生します。

```
yarn eject
yarn install
```
