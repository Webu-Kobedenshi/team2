# team2

概要はこちらのリンクから
[PRD for 共通点ファインダー](https://docs.google.com/document/d/10SE6zCxtZZPOGdpi6rQ895A31tyqRJyesEvKglmfsF0/edit?tab=t.0#heading=h.pbszkhi4d4m1)

## ディレクトリ構成

```text
.
├── backend/     # Go / Echo API
├── frontend/    # React / TypeScript / Vite
└── mise.toml    # 開発ツールのバージョンと共通コマンド
```

## セットアップ

miseはインストールできている前提とします。

### ランタイムと依存パッケージをインストールする

リポジトリのルートで実行。

```bash
mise install
mise run setup
```

- `mise install`: `mise.toml` に指定された Node.js と Go をインストールします。
- `mise run setup`: npm パッケージと Go モジュールをインストールします。

セットアップを確認するには、フォーマット確認、lint、ビルド、テストをまとめて実行します。

```bash
mise run check
```

## 開発サーバーの起動

フロントエンドとバックエンドを別々のターミナルで起動します。

ターミナル 1:

```bash
mise run dev:backend
```

ターミナル 2:

```bash
mise run dev:frontend
```

起動後は次の URL にアクセスできます。

- フロントエンド: <http://localhost:3000>
- バックエンドのヘルスチェック: <http://localhost:8080/api/health>

フロントエンドから `/api` で始まるリクエストは、Vite により
`http://localhost:8080` へ転送されます。

## 環境変数

ルート, frontend, backendで`.env.example`をコピーして中身を入力してください。

```bash
cp .env.example .env
```

## 開発の進め方

Issue の確認、ブランチ作成、Pull Request 作成、レビューの流れは
[CONTRIBUTING.md](CONTRIBUTING.md) を見てください。
