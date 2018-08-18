# Aspect oriented programming

## AOPとは
横断的関心事（Cross-cutting concerns）のモジュール化。横断的関心事とは、いろいろなところで必要な機能のことで、いつも同じように書く内容のもの。

例えば、
* ログ出力
* セキュリティ
* キャッシュ
* トランザクション
* 例外処理

常にメソッドが呼び出される前にRoleに基づくセキュリティチェックが行われる、などのように`いつも`や`常に`がキーワードが使われる操作はAOPの対象となる。

## AOPがなかったら
ビジネスロジック内にログ出力やセキュリティチェックの処理が入り込み、コードが見にくくなる。
* コードのもつれ（Code tangling）: 複数の処理が絡み合っている状態
* コードの散らばり（Code scattering）: 同じ処理がいろいろな箇所に散らばっている状態



## [WIP] 積み残し課題
* What is the concept of AOP? Which problem does it solve? What is a cross cutting concern?
* Name three typical cross cutting concerns.
* What two problems arise if you don't solve a cross cutting concern via AOP?
* What is a pointcut, a join point, an advice, an aspect, weaving?
* How does Spring solve (implement) a cross cutting concern?
* Which are the limitations of the two proxy-types?
* What visibility must Spring bean methods have to be proxied using Spring AOP?
* How many advice types does Spring support. Can you name each one?
* What are they used for?
* Which two advices can you use if you would like to try and catch exceptions?
* What do you have to do to enable the detection of the @Aspect annotation?
* What does @EnableAspectJAutoProxy do?
* If shown pointcut expressions, would you understand them?
* For example, in the course we matched getter methods on Spring Beans, what would be the correct pointcut expression to match both getter and setter methods?
* What is the JoinPoint argument used for?
* What is a ProceedingJoinPoint? When is it used?
