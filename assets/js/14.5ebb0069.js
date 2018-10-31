(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{167:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._m(3),t._v(" "),t._m(4),t._m(5),t._v(" "),s("p",[s("a",{attrs:{href:"https://js.coach/",target:"_blank",rel:"noopener noreferrer"}},[t._v("JS.coach"),s("OutboundLink")],1)]),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),s("p",[s("a",{attrs:{href:"https://stackoverflow.com/questions/38108357/how-to-enable-post-put-and-delete-methods-in-spring-security",target:"_blank",rel:"noopener noreferrer"}},[t._v("How to enable POST, PUT AND DELETE methods in spring security"),s("OutboundLink")],1),s("br"),t._v(" "),s("a",{attrs:{href:"https://www.codesandnotes.be/2015/02/05/spring-securitys-csrf-protection-for-rest-services-the-client-side-and-the-server-side/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Spring Security’s CSRF protection for REST services: the client side and the server side"),s("OutboundLink")],1)]),t._v(" "),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),s("p",[t._v("デザインガイドの作成や UI テストのために利用。")]),t._v(" "),t._m(12),s("p",[s("a",{attrs:{href:"https://storybook.js.org/basics/guide-react/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Storybook for React"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://qiita.com/morrr/items/558bf64cd619ebdacd3d",target:"_blank",rel:"noopener noreferrer"}},[t._v("yarn チートシート"),s("OutboundLink")],1)]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15)])},[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"react"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react","aria-hidden":"true"}},[this._v("#")]),this._v(" React")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"create-react-app-のインストール"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-react-app-のインストール","aria-hidden":"true"}},[this._v("#")]),this._v(" create-react-app のインストール")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[this._v("yarn global add create-react-app\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"react-アプリのプロジェクト作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-アプリのプロジェクト作成","aria-hidden":"true"}},[this._v("#")]),this._v(" React アプリのプロジェクト作成")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[this._v("yarn create react-app myapp\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"ライブラリ探し"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ライブラリ探し","aria-hidden":"true"}},[this._v("#")]),this._v(" ライブラリ探し")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"rest-api（spring）で-post-put-delete-ができない"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rest-api（spring）で-post-put-delete-ができない","aria-hidden":"true"}},[this._v("#")]),this._v(" REST API（Spring）で POST, PUT, DELETE ができない")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("CSRF 対策がされているため、GET 以外を受け付けないようになっている。"),a("br"),this._v("\nテストように動かす場合には、Spring 側で以下のような設定を行う。")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-java extra-class"},[s("div",{staticClass:"highlight-lines"},[s("br"),s("br"),s("br"),s("div",{staticClass:"highlighted"},[t._v(" ")]),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v(" "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("protected")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("configure")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("HttpSecurity http"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("throws")]),t._v(" Exception "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token comment"}},[t._v("// Add this row to allow access to all endpoints")]),t._v("\n        http"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("csrf")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("disable")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("cors")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("and")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("authorizeRequests")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("anyRequest")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("permitAll")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"ライブラリ"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ライブラリ","aria-hidden":"true"}},[this._v("#")]),this._v(" ライブラリ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[this._v("yarn add @material-ui/core\nyarn add @material-ui/icons\nyarn add typeface-roboto\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"storybook"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#storybook","aria-hidden":"true"}},[this._v("#")]),this._v(" StoryBook")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[this._v("yarn create react-app storybook-101\nyarn add --dev @storybook/react\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"create-react-app-を-eject-した後の操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-react-app-を-eject-した後の操作","aria-hidden":"true"}},[this._v("#")]),this._v(" Create-react-app を Eject した後の操作")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Eject 後には、依存モジュールのインストールを行う必要があります。\n依存モジュールが足りていないため、"),a("code",[this._v("Error: Cannot find module 'babel-loader'")]),this._v("というエラーが発生します。")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[this._v("yarn eject\nyarn install\n")])])])}],!1,null,null,null);n.options.__file="9_react.md";a.default=n.exports}}]);