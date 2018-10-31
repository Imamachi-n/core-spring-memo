# Spring Fest 2018

## The State of Spring, Java and Kotlin.

###GraalVM
JVM 言語だけでなく、Python, Ruby といったスクリプト言語や C や C++といった LLVM を実行できる共通ランタイム。
Spring Boot の実行デモでは、JVM 上と比較してかなり早い印象（0.005-0.006）。

### R2DBC

Reactive Relational Database Connectivity
Minimal dricer SPI
Spring Data R2DBC

Similar tothe new Spring data jdbc project but for reactive.
Databaseclient functinoal API
repository pattern support
来年提供される。

### RSocket

reactive streams back pressure over the network

### Spring Fu

Spring Fu is an incubator inteneded to mature experimental features before release (Spring boot etx...).
faster and lighter spring boot using Functional beans(Netty vs functional)

### jafu confuguration

Java

### Kofu configuration

Kotlin

## Hall: 決済システムの内製化への旅 - Spring と PCF で作るクラウドネイティブなシステム開発

### 内製化に至る道のり

Spring boot, Selenium/Selenide
Github, Jira, Confluence, Slack

サービス監視の質を高める
ElastichSearch
Kibana
など。

開発プロジェクトの支援を開始。古いアーキテクチャを刷新。
spring boot, cloud
Jenkins, Nexus, sonarqube

### 開発対象・オンライン決済サービス

新システムに求めるもの

- スピード感のある開発・リリース
- 継続的な改善のサイクル
- 監視が用意で障害に強いシステム

開発ベンダに頼り切っていてはスピード感のある開発ができない。
→ 内製化へ

導入したもの
Pivotal Cloud Foundry

### Pivotal Cloud Foundry を導入した理由

Kubernetes を支援する Pivotal Container Service。
OS image, Runtime Layer, Service Brokerage, Application Layer を作る

アプリを実行する環境をプラットフォームを使って、Pivotal Application Service
Application Layer のみを作る
→ 抽象化レイヤーの違い

各設定がプラットフォーム側で自動で行われる（テスト、ビルド、ロードバランサ、ファイアウォール、モニタリングツール、ロギングなどの設定）。
→ デプロイのスピードが早くなる。

プラットフォーム運用者：プラットフォームの構築・管理に専念。
アプリケーション開発者：業務の設計・実装に集中。

12 Factor App：ベンダーロックインされない。他のプラットフォームでも動くアプリを作れる。
→Pivotal が技術支援。

### PaaS vs Kubernetes

Pivotal Cloud Foundry を使うことで、開発にフォーカスしたい。
PaaS だと、やることが制限されている分、開発に集中できる。

Kubernetes だと、なんでもできる分、管理などがややこしくなる。

Concourse
Nexus
RabbitMQ
Grafana
などなど

## 手に入れたアプリケーション構成

API Gateway を使ってる（Spring Cloud Gateway で実装）。
すべてのアプリは Spring boot で実装。

ある REST API で障害が起こった場合、障害の伝播により API Gateway が障害を起こし、
他のサービスにも影響が出る。

Circuit Breaker を実装。

システム間通信は、Hystrix を使うことで、上記の問題をクリア。
スレッドの枯渇を防ぐ。

Spring Cloud Stream を使って、非同期でメッセージをキューイング。
Notification Gateway から、加盟店に対して、通知処理が届く。
Dead Error Queue を投げて、リソースの枯渇を防ぐ。

負荷がかかった場合、Cloud Foundy 側で、自動で App インスタンスを増やせる。
スケールのルール設定を GUI で作ることができる。
スケールイン・アウトも容易に可能。

### アプリ実装の観点で重要な 5 Factors

- Config: 環境に依存する設定項目を環境変数に格納
- Processes, port binding, concurrency：CF, Spring boot がやってくれる。
- logs：ログは標準出力しておけば、CF が拾ってくれる。

### Concourse CI

CI ツール。ビルド・デプロイパイプラインの構築。
実行環境は Docker イメージで用意。
ジョブの設定は、YAML ファイルで設定。
Maven, JUnit5, sonarqube を実行後, Nexus にアップロード、CF にアプリ展開。

### JMeter による負荷テスト、E2E テスト（HTML レポート）

開発中は JMeter によるテストを毎日継続的に自動で実行。
レポートのスクリーンショットを Slack でメンバーに共有。

### Java の複数バージョンでのユニットテスト

それぞれの Java の Docker イメージを用意して、並列でテスト。
次期バージョンでも動作するかどうか、早い段階でテストしておく。
⇒Java アップデートの弊害を早期に検知できるように。

### Java の更新についていく - 攻めこそ最大の守り

簡単にデプロイ可能な開発・本番環境（Dev/Staging/Prod）を用意すること。
塩漬けするのではなく、アップデートし続けられる環境を準備。

### Observability

Metrics（Micrometer, Grafana, Prometeus）, Tracing（Zipkin）, Logging（Kibana） の３つの観点から監視。
⇒ しきい値を超えると、Slack に通知される。
⇒ Spring 側は、１つの依存ライブラリを追加するだけで OK。
⇒ アプリケーションログなどを収集。

⇒ Zipkin でトレース ID から検索が容易に。
⇒ 実行された SQL の実行時間などを調べることもできる。

外注に頼り切ったサービス開発を積み重ねてもプラットフォームを維持できない。

## Annex: Spring ♥ GCP ー Spring と GCP の素敵な関係

GAE と GKE の使い方について

### GCP を使うメリット

Google の SRE（サービスが動くことを保証する部門）がサービスを守ってくれる（スケール・インフラ力）。
AWS や Azure と違うところは、「ネットワーク」。Google のサービスで使っているシステム向けに作った
内製化したサービスを GCP で使える。

### Java を GCP で使う上で使うサービス

GCE: Compute Engine（VM）
GKE: Kubernetes Engine
GAE: App Engine

### App Engine

コードを書いてデプロイするだけのアプリケーション実行基盤（PaaS）
コードファースト:開発者にアプリケーションに専念してもらい、システム構築、管理負荷を最小化する。
No-Ops: 可用性とスケーラビリティはプラットフォームに組み込まれている。
運用ツール: バージョンコントロールやトラフィックスプリットといった運用ツールが含まれている。

#### フレキシブル環境

サポート言語:
Java8, Python, Node.js, Ruby, PHP, .NET.core, Go
カスタム環境: Docker
カスタマイズが効くが、立ち上がりに時間がかかる。
スケーリングができない…。

#### スタンダード環境

使えるライブラリに制限がある。
サンドボックス。

#### スタンダード環境（第二世代）

オープンソース、Idiomatic experience（他の環境でも同じ体験をできるように）
GCP 固有の設定や制限がないように設計されている。
サポートランタイム：Java, Node.js, Python など

⇒ スタンダード環境の第二世代を選択するのが良い。

### Spring Boot アプリを App Engine にデプロイ（デモ）

Spring Boot のパッケージを WAR にする（ランタイムに Jetty を使っている関係）。
Spring Cloud で GCP サポートも受けられる（Pivotal と Google の協業）。
⇒ 現時点では、設定ファイルをプロジェクトに組み込む必要がある。

1. App Engine のプラグインを導入する。
2. App Engine の設定ファイルを作る（appengine-app.xml）。
3. App Engine へデプロイ

```
./mvnw appengine:deploy
```

#### バージョンスプリッティング

アップデート後に、システムを止めることなくバーションが切り替わる。

#### トラフィックスプリッティング

トラフィックを振り分けてくれる。
アプリ Ver1 と Ver2 で例えば５０％ごとに振り分けたり。

#### オートスケール

負荷がかかるとインスタンスが増える（VM と比較して、圧倒的に速いスピードでスケールする）。
デモでは、すぐに９つのインスタンスが立ち上がっていた。
課金の面でも、VM と比較して節約できる（App Engine だと VM と比較して、使われていないインスタンスがすぐにスケールダウンするため）。

### Kubernetes Engine

Kubernetes は、Google 社内のコンテナオーケストレータをもとに作られた OSS。
デファクトスタンダード。
Write Once, Run Anywhere。

#### Google Kubernetes Engine(GKE)

Zero-Ops クラスタを目指す。
簡単、信頼性が高い、効率性が高い。

Master ノードの下に、Nodepool を持つ構造。

ネットワークの構成や設定ファイルを作ることなく、立ち上げることができる（起動は App Engine よりもかなり遅い）。
K8s では、pods という単位で Docker コンテナが管理されている。

### 終わりに

App Engine は無料枠があるので、テストに使える。

## Hall: Knative: Serving your Serverless Java Service on Kubernetes the 12-Factor way

今日の資料
@kamesh_sampath bit.ly/knserving

### Serverless computing

24 時間監視する必要のないアプリケーションを作成する。
AWS Lambda が有名な例。

### なぜ Serverless 化なのか?

- Agility
- Event Driven
- Focus on business differentiation
- consistent and scalable operations
  リソースの最適化と cost saving。

### Architectural evolution

- Service
- Microservice
- Function

Microservice と Function の違いはなんなのか？

### 利点

- AUtomatic scalability
- automatic cost redution
- quicker and easier development
- better capacity utilization
- deploy speed

### 欠点

- Debugging
- deployment and architectural complexity
- vendor lock-in
- monitoring
- learning curve

### Serverless vs FaaS

Event fires and then your code runs, serve services.

### FaaS Kunernetes players

- kubeless
- openWhisk
- ruff

### Function as a Service

OS, Data, Application を必要としない。
Bussiness Logic のみで OK（イベント駆動のイメージ）。

### Knative

Kubernates based platform to build, deploy and manage modern serverless workloads.
Run anywhere on premises, in the cloud or even in a third-party data center.

#### serving

- building and running applications(k8s)
- no server management(k8s)
- fine grained deployment model(Knative)
- executed, scaled and billed in response to the exact demand.(k8s)

automatically scale down to zero...

#### build

Knative pull sources, refer build templates and then push images to container repo.
knative also pull images from repo and then rollout new revision.

#### CNCF, cloudevents and Serverless

#### Eventing

### ブログ

今日の内容を「Knative configuration routes and revisions.」でまとめている。
まだ安定していない？

### 無料の e-bbok

bit.ly/mono2microdb
bit.ly/istio-book
bit.ly/javamicroservicesbook
bit.ly/reactivemicroservicesbook
bit.ly/faas-tutorial

## Hall: Pivotal 認定講師が解説！基礎からの OAuth 2.0 と Spring Security 5.1 による実装

### 1. OAuth2.0 の基本用語

認可の流れを規定したプロトコル
認証プロトコル OpenID Connect のベースになっている。
OAuth1.0 とは完全に別物。

#### アクセストークン

サーバのデータにアクセスするための許可書。

#### スコープ

アクセストークンがやれることの範囲。

#### ID とパスワード

パスワードを持っている人が全県を持っている。やりたい放題。
盗まれると被害大きい。

#### OAuth2.0

1. リソースオーナー：情報の持ち主。
2. リソースサーバー：情報を保持するサーバ
3. クライアント：リソースサーバからもらった情報を扱うアプリケーション
4. 認可サーバ：アクセストークンの発行元。

リソースオーナーが認可をクライアントに対して与えると、認可サーバからアクセストークンが付与され、
アプリからサーバにアクセスできるようになる。

#### グラントタイプ（アクセストークンの取得方法）

- 認可コード

#### 認可コードとは

アクセストークンの引換券
⇒ アクセストークンが Web ブラウザに渡らないようにするため。

1. 初回アクセス
2. 認可エンドポイントにリダイレクト
3. 認可画面を返す
4. 認可
5. 認可コードの発行＋リダイレクト
6. 認可コード
7. アクセストークン（認可サーバからクライアントに）

認可コードがブラウザに渡っていないことがポイント。
リフレッシュトークン。

#### OAuth2.0 仕様で未定義の部分

どう認可するか決まっていない
⇒ 開発者が作り込む。

認可コードを送ってきたのがクライアントかどうか BASIC 認証して判断。

### 3. アクセストークンを利用したリソースアクセス

1. リソースオーナーがリクエスト。
2. リソースにアクセス（with アクセストークン）
3. アクセストークンの検証
4. ユーザ情報やスコープ
5. スコープをチェック
6. レスポンスを返す

### アクセストークンやスコープの検証方法

1. 認可サーバに問い合わせる（BASIC 認証）
2. 共有データベースなどを利用する
3. アクセストークン自身に情報を含めておく

### JWT(JSON Web Token)

アクセストークン自身にユーザ情報やスコープなどの情報を含めることができる。
ピリオドで３つの部分に分かれる（ヘッダー、ペイロード、電子署名）。

ペイロードをデコードすると、JSON が含まれている。

### 署名を利用した JWT の検証

リソースサーバは JWT の署名で検証する。
署名は認可サーバの秘密鍵で暗号化されている。
⇒ 認可サーバの公開鍵で復号化する。

### JWK (JSON Web Key)

認可サーバの公開鍵のもととなる情報が含まれた JSON
認可サーバから JWK Set 形式（JWK の配列を含んだ JSON）で取得する。

### JWT の弱点と対策

弱点：アクセストークンの剥奪が不可能
リソースサーバが認可サーバに問い合わせしないため、認可サーバ側での制御が不可能。

対策：アクセストークンの有効期限を短くする
だいたい数分間。
リフレッシュトークンで新しいトークンを再取得させる。
⇒POST でトークンエンドポイントにアクセスする。

### 4.認可サーバの実装

Spring Security5.1 まででクライアントとリソースサーバまでしか対応してない。
認可サーバは 5.2 に入るが、部分的な対応になる。

### 認可サーバを作る

- 認可サーバ機能を持ったサービスを利用する
- KeyCloak を使う。

### 5. クライアントの実装

pom.xml
application.yml

### ログアウト

クライアントと認可サーバの両方からログアウトしないといけない。

### 6.リソースサーバの実装

### OAuth2.0

- HTTPS 必須
- 認可コードリダイレクトなどなど

### 参考資料

- 基礎からの OAuth2.0
