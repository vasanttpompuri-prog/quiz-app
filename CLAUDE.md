# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**quiz-app** — 一般常識クイズアプリ。HTML/CSS/JavaScript のみで構成された、ビルドツール不要のフロントエンドアプリケーション。5問4択形式で、各問題に正誤フィードバックを表示し、最後に合計スコアを表示する。

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript（フレームワーク・ライブラリなし）

## 開発・実行方法

ビルドステップは不要。ブラウザで直接 `index.html` を開くか、ローカルサーバーを使用する。

```bash
# Python でローカルサーバーを起動する場合
python3 -m http.server 8080
# → http://localhost:8080 にアクセス
```

## アーキテクチャ

### ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | 画面構造の定義。クイズ画面と結果画面の2つの `<div>` を持ち、JavaScriptで表示を切り替える |
| `style.css` | 全スタイル定義。正解・不正解は `.correct` / `.incorrect` クラスの付け替えで表現 |
| `script.js` | ゲームロジック全体。問題データ・状態管理・DOM操作をすべて含む |

### ゲームの状態管理（script.js）

- `questions` 配列に問題・選択肢・正解インデックスをすべて定義
- `currentIndex`（現在の問題番号）と `score`（正解数）をモジュールスコープ変数で管理
- `answered` フラグで二重回答を防止

### 画面遷移フロー

```
showQuestion() → handleAnswer() → nextBtn クリック
    ↓（最終問題の場合）
showResult() ← resultScreen を表示
    ↓（retry-btn クリック）
resetQuiz() → showQuestion() に戻る
```

### 問題の追加・変更

`script.js` の `questions` 配列に以下の形式でオブジェクトを追加するだけでよい。問題数の上限はなく、プログレスバーと進捗テキストは自動的に計算される。

```js
{
  text: "問題文",
  choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  correct: 0, // 正解の選択肢インデックス（0始まり）
}
```

## GitHubリポジトリ

https://github.com/vasanttpompuri-prog/quiz-app
