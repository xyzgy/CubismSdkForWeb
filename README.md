## 调整后全局可获取变量
* LAppDefine 初始化对应变量
* LAppDelegate 模型的初始化及销毁等
* LAppLive2DManager 模型的信息及相关交互

## 生成bundle.js
* Samples/TypeScript/Demo
* npm install
* npm run build 编译
* npm run start 本地调试运行

## 代码修改位置及修改后代码
* main.ts 调整window.onload8(传图canvasid) 调整 导出方法，
```
import {
	LAppDelegate
} from './lappdelegate'; //加载定义相关的模型信息例如模型的大小等
import {
	LAppLive2DManager
} from './lapplive2dmanager'; //模型管理类
import * as LAppDefine from './lappdefine'; //基本参数定义
// if (LAppDelegate.getInstance().initialize(LAppDefine.CanvasId) == false) {
//		return;
//	}
export const win:any = window;
win.Live2d = {
	LAppDelegate,
	LAppDefine,
  LAppLive2DManager

	}
```

* lappdelegate.ts 修改 initialize方法，传入canvasid，用以指定id

```
 if (canvasId) {
      canvas = < HTMLCanvasElement > document.getElementById(canvasId);
      canvas.width = canvas.width;
      canvas.height = canvas.height;
    } else {
      canvas = document.createElement('canvas');
      if (LAppDefine.CanvasSize === 'auto') {
        this._resizeCanvas();
      } else {
        canvas.width = LAppDefine.CanvasSize.width;
        canvas.height = LAppDefine.CanvasSize.height;
      }
    }
```
* lappdelegate.ts  onMouseMoved 方法注释指定代码
```
// if (!LAppDelegate.getInstance()._captured) {  // 判断是否单击，原来是要按住鼠标左键图像才会跟着鼠标动
  //   return;
  // }
  ```
* lappdelegate.ts run方法 增加参数 isClear

```
// 清除彩色缓冲区和深度缓冲区  （加上这一句会导致有些浏览器背景变成黑色，而不是透明）
if(!isClear){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

}
```

* lappdelegate.ts  onClickBegan,onTouchBegan 方法调整 原有方法，修改canvas定位导致判断点击部位失效

```
// const posX: number = e.pageX;
// const posY: number = e.pageY;
const rect = (e.target as Element).getBoundingClientRect();
const posX: number = e.clientX - rect.left;
const posY: number = e.clientY - rect.top;

//onTouchBegan
// const posX = e.changedTouches[0].pageX;
// const posY = e.changedTouches[0].pageY;

const rect = (e.target as Element).getBoundingClientRect();
const posX = e.changedTouches[0].clientX - rect.left;
const posY = e.changedTouches[0].clientY - rect.top;
```

* lappview   onTouchesEnded方法末尾 增加对 GearImageName 参数判断
```
if (LAppDefine.GearImageName && this._gear.isHit(pointX, pointY)) {
        live2DManager.nextScene();
      }
```

* lapplive2dmanager  声明hitArea变量，记录点击区域

### 调整路径涉及代码，文件加载出现双斜线
* lapplive2dmanager.ts changeScene 
```
    const modelPath: string = LAppDefine.ResourcesPath + model;//去除路径最后/
```
* lappmodels  setupTextures
```
  texturePath = this._modelHomeDir +'/'+ texturePath;

```


# Cubism Web Samples

Live2D Cubism 4 Editor で出力したモデルを表示するアプリケーションのサンプル実装です。

Cubism Web Framework および Live2D Cubism Core と組み合わせて使用します。


## ライセンス

本 SDK を使用する前に、[ライセンス](LICENSE.md)をご確認ください。


## 注意事項

本 SDK を使用する前に、[注意事項](NOTICE.md)をご確認ください。


## ディレクトリ構成

```
.
├─ .vscode          # Visual Studio Code 用プロジェクト設定ディレクトリ
├─ Core             # Live2D Cubism Core が含まれるディレクトリ
├─ Framework        # レンダリングやアニメーション機能などのソースコードが含まれるディレクトリ
└─ Samples
   ├─ Resources     # モデルのファイルや画像などのリソースが含まれるディレクトリ
   └─ TypeScript    # TypeScript のサンプルプロジェクトが含まれるディレクトリ
```


## Live2D Cubism Core for Web

モデルをロードするためのライブラリです。

当リポジトリではCubism Coreを管理していません。
[こちら](https://www.live2d.com/download/cubism-sdk/download-web/)からCubism SDK for Webをダウンロードして、
Coreディレクトリのファイルをコピーしてください。


## 開発環境構築

1. [Node.js] と [Visual Studio Code] をインストールします
1. Visual Studio Code で **本 SDK のトップディレクトリ** を開き、推奨拡張機能をインストールします
    * ポップアップ通知の他、拡張機能タブから `@recommended` を入力することで確認できます

### サンプルデモの動作確認

コマンドパレット（*View > Command Palette...*）で `>Tasks: Run Task` を入力することで、タスク一覧が表示されます。

1. タスク一覧から　`npm: install - Samples/TypeScript/Demo` を選択して依存パッケージのダウンロードを行います
1. タスク一覧から `npm: build - Samples/TypeScript/Demo` を選択してサンプルデモのビルドを行います
1. タスク一覧から `npm: serve - Samples/TypeScript/Demo` を選択して動作確認用の簡易サーバを起動します
1. ブラウザの URL 欄に `http://localhost:5000/Samples/TypeScript/Demo/` と入力してアクセスします
1. コマンドパレットから `>Tasks: Terminate Task` を入力して `npm: serve` を選択すると簡易サーバが終了します

その他のタスクに関してはサンプルプロジェクトの [README.md](Samples/TypeScript/README.md) を参照ください。

NOTE: デバック用の設定は、`.vscode/tasks.json` に記述しています。

### プロジェクトのデバック

Visual Studio Code で **本 SDK のトップディレクトリ** を開き、 *F5* キーを入力すると Debugger for Chrome が起動します。

Visual Studio Code 上でブレイクポイントを貼って Chrome ブラウザと連動してデバックを行うことができます。

NOTE: デバック用の設定は、`.vscode/launch.json` に記述しています。


## SDKマニュアル

[Cubism SDK Manual](https://docs.live2d.com/cubism-sdk-manual/top/)


## 変更履歴

当リポジトリの変更履歴については [CHANGELOG.md](CHANGELOG.md) を参照ください。


## 開発環境

### Node.js

* 15.11.0
* 14.16.0
* 12.21.0
* 10.24.0


## 動作確認環境

| プラットフォーム | ブラウザ | バージョン |
| --- | --- | --- |
| Android | Google Chrome | 88.0.4324.181 |
| Android | Microsoft Edge | 46.01.4.5140 |
| Android | Mozilla Firefox | 86.1.1 |
| iOS / iPadOS | Google Chrome | 87.0.4280.77 |
| iOS / iPadOS | Microsoft Edge | 46.1.10 |
| iOS / iPadOS | Mozilla Firefox | 32.0 |
| iOS / iPadOS | Safari | 604.1 |
| Linux | Google Chrome | 89.0.4389.72 |
| Linux | Mozilla Firefox | 86.0 |
| macOS | Google Chrome | 88.0.4324.192 |
| macOS | Microsoft Edge | 88.0.705.81 |
| macOS | Mozilla Firefox | 86.0 |
| macOS | Safari | 14.0.2 |
| Windows | Google Chrome | 88.0.4324.190 |
| Windows | Internet Explorer 11 | 20H2(19042.685) |
| Windows | Microsoft Edge | 88.0.705.74 |
| Windows | Mozilla Firefox | 86.0 |

Note: 動作確認時のサーバの起動は `./Samples/TypeScript/Demo/package.json` の `serve` スクリプトを使用して行っています。
