# React + Electron アプリケーション

このプロジェクトは、ReactとElectronを組み合わせてデスクトップアプリケーションを開発するための雛形です。Reactをフロントエンドに使用し、Electronでデスクトップアプリケーションとしてパッケージ化します。Viteを使用して開発サーバーを構築し、Reactコンポーネントを高速にビルドして提供します。

## セットアップ

### 1. リポジトリをクローン

まず、リポジトリをローカルにクローンします。

```bash
git clone https://github.com/SeijiOkuda/React-Electron-Lottery.git
cd React-Electron-Lottery
```

### 2. 依存関係をインストール

プロジェクトの依存関係をインストールします。

```bash
npm install
```

### 3. 開発サーバーの起動

開発サーバーを起動し、アプリケーションを開発します。

```bash
npm run dev
```

ブラウザが自動的に開き、Reactで構築されたアプリケーションが表示されます。Electronのウィンドウでの表示は、開発中はViteのサーバーを使い、本番ビルドでは`electron-builder`を使ってパッケージ化します。

### 4. ビルド

本番ビルドを作成します。ビルド後、アプリケーションはデスクトップ用のインストーラーとしてパッケージ化されます。

```bash
npm run build
```

ビルドが完了すると、`dist/`ディレクトリに本番用のアプリケーションが作成されます。

### 5. デスクトップアプリケーションの実行

Electronアプリケーションをローカルで実行するには、以下のコマンドを実行します。

```bash
npm run start
```

このコマンドは、ビルドされたアプリケーションをElectronで実行し、デスクトップアプリとして起動します。

## 必要なツール

- [Node.js](https://nodejs.org/): JavaScriptランタイム
- [npm](https://www.npmjs.com/): Node.jsのパッケージ管理ツール
- [Electron](https://www.electronjs.org/): デスクトップアプリケーション用フレームワーク
- [Vite](https://vitejs.dev/): 高速な開発サーバーとバンドラー

## トラブルシューティング

- `SyntaxError: Unexpected token ':'` エラーが発生する場合は、`main.js`ファイル内の`import.meta.url`の使い方や`package.json`の`type`設定が正しいことを確認してください。
- ビルド後にアプリケーションが白い画面になる場合、`main.js`の`loadURL`や`loadFile`のパスが正しく設定されていることを確認してください。

## ライセンス

このプロジェクトは、MITライセンスの下で提供されています。
