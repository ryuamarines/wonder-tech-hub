# Wonder Tech Hub LP

Wonder Tech Hub の公式LP（静的サイト）。AI・金融・Web3を「触って作る入口」にするコミュニティの1ページサイトです。

## 構成

- `index.html` : ページ本体、SEO / OGP / Twitterカード設定
- `styles.css` : レイアウトとビジュアル
- `site.js` : Concept / Events / Members のデータと描画処理
- `assets/` : ロゴ（`wth-mark.svg`）、OGP画像（`wth-og.svg` / `wth-og.png`）
- `vercel.json` : Vercel公開時の設定（clean URLs / キャッシュ / セキュリティヘッダ）

## ローカル確認

```bash
python3 -m http.server 3000
```

ブラウザで `http://localhost:3000` を開きます。

## コンテンツの編集

すべて `site.js` 上部のデータ配列だけで完結します。HTMLは触りません。

### イベントを追加する（#03以降）

`events` 配列にオブジェクトを1つ足すだけです。表示順は `date` から自動整列（新しい回が上）、`Next Event` / `Past Event` の表示も `date` から自動判定されます。

```js
{
  id: "wth-03",              // 一意なキー
  number: "#03",             // 表示ラベル
  date: "2026-08-20",        // 開催日。ISO形式 "YYYY-MM-DD"（並び替え・状態判定に使用）
  subtitle: "回のテーマ",
  description: "説明文",
  url: "https://luma.com/...",
  // ここから下は任意（未指定なら非表示）
  venue: "会場名",
  tags: ["AI", "Web3"],
  capacity: "定員20名",
  // status: "Next Event",   // date判定を上書きしたい時だけ
  // title: "特別タイトル",   // 未指定なら "Wonder Tech Hub #03" を自動生成
}
```

- 「次回イベントを見る」「Lumaで参加する」ボタン（`data-next-event` 属性）は、最も近い**未来の**回のURLに自動でリンクします。未来回がなければ最新回にフォールバックします。

### Concept / Members の編集

`site.js` の `concepts` / `members` 配列を編集します。

## 公開前チェックリスト

1. `index.html` の `REPLACE-WITH-YOUR-DOMAIN` を本番ドメインに置換（`canonical` / `og:url` / `og:image` / `twitter:image` の4か所）。
2. OGP画像は `wth-og.png`（PNG）を主に指定済み。SNSのクローラーはSVGを表示できないためPNGが必要です。デザイン変更時は下記コマンドでPNGを再生成してください。
3. 運営XアカウントのURL・問い合わせフォームURLを Contact / Join セクションと `twitter:site` に反映（`index.html` 内の `TODO` コメント箇所）。

### OGP画像（PNG）の再生成

`wth-og.svg` を編集したら、PNGを作り直します（日本語フォント指定を差し替えてから変換）。

```bash
pip install cairosvg
cd assets
sed -e 's/Arial, sans-serif/Noto Sans CJK JP, sans-serif/g' \
    -e 's/Georgia, serif/Noto Serif CJK JP, serif/g' \
    wth-og.svg > /tmp/wth-og-render.svg
python3 -c "import cairosvg; cairosvg.svg2png(url='/tmp/wth-og-render.svg', write_to='wth-og.png', output_width=1200, output_height=630)"
```

## デプロイ

### Vercel

リポジトリを import するだけで公開できます（ビルド不要の静的サイト）。`vercel.json` が clean URLs とキャッシュ設定を適用します。CLIなら:

```bash
npm i -g vercel
vercel        # プレビュー
vercel --prod # 本番
```

公開後、上記チェックリストのドメイン置換を忘れずに。

### STUDIO へ移す場合

このサイトは移行時の「原稿」として使えます。各セクションのコピーは `index.html`、カード類の文言は `site.js` に集約されているので、STUDIO側の対応ブロックに転記してください。OGP・favicon・カラー（`styles.css` の `:root` 変数）も同じ値を設定すると見た目が揃います。

### Netlify / GitHub Pages

いずれもビルド不要でそのまま公開できます（`vercel.json` はVercel専用のため他では無視されます）。

## デザインメモ

- カラーは `styles.css` の `:root` にCSS変数として集約（黒 `--ink` / 赤 `--red` / 背景 `--bg`）。
- アクセントに ♠ ♥ ♣ ♦ を使用。
