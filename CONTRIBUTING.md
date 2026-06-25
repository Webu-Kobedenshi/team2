# Contributing

このリポジトリで開発するときのルールです。

具体的な作業手順は [docs/development-flow.md](docs/development-flow.md) を見てください。

## ブランチ

作業ごとにブランチを分けます。

```bash
git switch -c feature/<issue-number>-short-title
```

例:

```bash
git switch -c feature/1-start-button
```

`short-title` は英語の kebab-case を基本とします。

## コミットメッセージ

コミットメッセージは、変更の種類が分かる prefix を付けます。

よく使う prefix:

`feat`: 機能追加や画面追加。

`fix`: 不具合修正。

`docs`: README や説明文など、ドキュメントの変更。

`chore`: 設定、依存関係、開発環境などの変更。`chore`は雑用という意味。

例:

```text
feat: ホーム画面の土台を追加する
fix: 人数選択の表示崩れを修正する
docs: READMEにセットアップ手順を追加する
chore: TailwindとPrettierの設定を追加する
```

コミットは、できるだけ1つの目的ごとに分けます。
同じコミットに関係ない変更を混ぜないようにしてください。

## Pull Request

PR には、何を変更したか、なぜ変更したか、どう確認したかを書きます。

Issue を完了する PR では、PR の description に次のように書きます。

```text
Closes #1
```

関連だけ示したい場合は `refs #1` や `related #1` を使います。

PR を作る前に、変更したところを手元で確認してください。

## AI ツールを使う場合

Codex、Google Antigravity など、使う AI ツールはメンバーごとに違って構いません。
ただし、最終的な責任は PR を出す人が持ちます。

- AI に依頼する前に Issue の内容を確認する
- AI が変更した差分を自分で読む
- 動作確認と `mise run check` を行う
- AI 固有の設定や会話内容を、チーム共通ルールの代わりにしない

AI エージェント向けの補助ルールは [AGENTS.md](AGENTS.md) に置きます。
チーム全員に守ってほしい内容は、この `CONTRIBUTING.md` や `docs/` に書いてください。

## レビュー

マージ前にレビューを受けます。

レビュワーは、PR 本文、差分、動作を確認します。
詳しいレビュー手順は [docs/review.md](docs/review.md) を見てください。

レビューコメントでは、必要に応じて prefix を付けます。

`[must]` : 要修正という意味。

`[ask]` : ただの質問です、という意味。

`[nit]` : 細かい指摘で修正は不要、という意味。

`[imo]` : In My Opinionの略。私はこう思います、という意味。

`[fyi]` : For Your Informationの略。参考情報などを貼るときなどに使う。

`[good]` : 良かったところを伝える際などに使う。
