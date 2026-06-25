# AGENTS.md

このリポジトリで AI エージェントが作業するときの補助ルールです。
チーム共通の開発ルールは [CONTRIBUTING.md](CONTRIBUTING.md) を正とします。

## 基本方針

- 回答、説明、ドキュメントは日本語で書く。
- コード、識別子、コマンド、エラーメッセージは必要に応じて原文のまま扱う。
- 作業前に `README.md`、`CONTRIBUTING.md`、関連 Issue を確認する。
- 既存の差分を勝手に戻さない。
- Issue と関係ない変更を同じ PR に混ぜない。

## GitHub Issue

- ユーザーが Issue 番号だけを伝えた場合は、現在の Git remote のリポジトリの Issue として扱う。
- 作業前に Issue 本文、コメント、完了条件を確認する。
- Issue の内容が曖昧な場合は、実装を広げる前に確認する。

## ブランチ

- Issue に対応する作業ブランチは `feature/<issue-number>-short-title` を基本とする。
- `short-title` は英語の kebab-case を基本とする。

例:

```bash
git switch -c feature/1-start-button
```

## Pull Request

- PR 本文には変更内容、確認内容、関連 Issue を書く。
- Issue を完了する PR では `Closes #<issue-number>` を使う。
- 関連だけ示す場合は `Refs #<issue-number>` または `Related #<issue-number>` を使う。

## 確認コマンド

PR 作成前に、変更範囲に応じて確認する。

```bash
mise run check
```

フロントエンドだけを整える場合:

```bash
mise run format:frontend
mise run lint:frontend
mise run build:frontend
```
