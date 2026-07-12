// =============================================================
// Wonder Tech Hub - コンテンツデータと描画
//
// 追加・編集はこのファイルの上部データ配列だけで完結します。
// - concepts : Concept セクションの3枚のカード
// - events   : Events セクションの開催回（#03以降はここに足すだけ）
// - members  : Members セクションの運営メンバー
//
// events の status（Next / Past）は date から自動判定されます。
// 手動で上書きしたい場合のみ status を指定してください。
// =============================================================

const concepts = [
  {
    suit: "♠",
    title: "Talk",
    body: "わからないことを、そのまま言葉にする。知っているふりをせず、いまの現在地から問いを立てる。",
  },
  {
    suit: "♥",
    title: "Touch",
    body: "ChatGPT、Claude、Codex、Web3ツールを実際に触る。画面の変化と手応えで、機能を体感に変える。",
  },
  {
    suit: "♦",
    title: "Build",
    body: "小さく作って、自分の使い方を見つける。丸投げで終わらせず、頼み方と確かめ方を手元に残す。",
  },
];

// -------------------------------------------------------------
// events データ構造
//   id          : 一意なキー（wth-03 など）
//   number      : 表示用の回数ラベル（"#03"）
//   date        : 開催日。ISO形式 "YYYY-MM-DD" で書く（並び替え・自動判定に使用）
//   subtitle    : サブタイトル（回のテーマ）
//   description : 説明文
//   url         : Luma などの参加URL
//   [venue]     : 任意。会場名（未指定なら非表示）
//   [tags]      : 任意。タグ配列 ["AI", "Web3"]（未指定なら非表示）
//   [capacity]  : 任意。定員（例 "定員20名"）
//   [status]    : 任意。"Next Event" / "Past Event" を手動指定したい時だけ。
//                 未指定なら date から自動判定。
//   [title]     : 任意。未指定なら "Wonder Tech Hub {number}" を自動生成。
//   [cover]     : 任意。カード上部に出す表紙画像（サムネワイド等）。
//   [recap]     : 任意。開催レポート。過去回に付けると「開催レポート」枠が出る。
//                 { note: "当日のひとこと", url: "詳細レポートのURL" }
//                 未指定の過去回は「準備中」と表示（枠は残る）。
// -------------------------------------------------------------
const events = [
  {
    id: "wth-01",
    number: "#01",
    date: "2026-05-28",
    subtitle: "AIを「動かす」はじめ方",
    description:
      "ChatGPTやClaudeなどの会話AIを、調べものや雑談で終わらせない。作業委任・制作・プロトタイピングの入口として捉え直す回。活用ステージの整理、主催メンバーの実例、参加者トークを通じて、AIを自分の道具にする感覚を持ち帰った。",
    tags: ["AI", "はじめ方"],
    cover: "./assets/event-01.jpg",
    coverSquare: "./assets/event-01-sq.jpg",
    url: "https://luma.com/63d8s784",
  },
  {
    id: "wth-02",
    number: "#02",
    date: "2026-06-22",
    subtitle: "コンカフェ嬢と学ぶ、AIバイブコーディング入門",
    description:
      "会話AIのその先へ。作りたいものに形を与え、AIへの頼み方に補助線を引き、出来栄えを見ながら育てていく。「頼み方」と「確かめ方」を、非エンジニア向けにセミナー形式で整理した回。",
    venue: "ウィルレイズ 浜松町",
    tags: ["AI", "入門", "バイブコーディング"],
    capacity: "定員20名程度",
    cover: "./assets/event-02.jpg",
    coverSquare: "./assets/event-02-sq.jpg",
    url: "https://luma.com/8mrskin5",
  },
  {
    id: "wth-03",
    number: "#03",
    date: "2026-07-24",
    subtitle: "コンカフェ嬢とやってみる、AIバイブコーディング実践会",
    description:
      "自分の「作ってみたい」を、動くものに。見せるもの・使うもの・遊べるものの3方向から、その場で小さく形にする実践会。完璧なサービスでなくていい。作りたいものを言葉にし、AIに頼み、出てきたものを直していく感覚をつかむ。",
    venue: "ウィルレイズ 浜松町",
    tags: ["AI", "実践", "バイブコーディング"],
    capacity: "定員20名程度",
    cover: "./assets/event-03.jpg",
    url: "https://luma.com/i9bxfo6s",
  },
  // ▼ #04以降はこの下にオブジェクトを足すだけ。並び順は date から自動整列。
];

// メンバー情報（#01イベント資料の「メンバー紹介」より。表示はハンドルネームのみ）。
//   name    : 表示名（ハンドルネーム）
//   title   : 役割（英語ラベル）
//   note    : ひとこと
//   tags    : 専門・興味（任意）
//   links   : x / instagram（任意）
const members = [
  {
    suit: "♠",
    name: "りゅー",
    avatar: "./assets/avatar-ryu.jpg",
    title: "Planning Producer",
    note: "技術とカルチャーをつなぐ企画を担う。",
    tags: ["ディスプレイ開発", "Crypto", "ライブ・プロレス"],
    links: { x: "https://x.com/ryua_marines" },
  },
  {
    suit: "♥",
    name: "おとぎ",
    avatar: "./assets/avatar-otogi.jpg",
    title: "Creative Director",
    note: "デザインと現場感で、AIを“使う側”の言葉に落とし込む。",
    tags: ["現役コンカフェ嬢", "AI活用・発信", "クリエイティブ / デザイン"],
    links: { x: "https://x.com/0toG1_w" },
  },
  {
    suit: "♦",
    name: "まっすー",
    avatar: "./assets/avatar-massu.jpg",
    title: "Community Manager",
    note: "人が集まり、話しやすい場を支える。",
    tags: ["音響系", "Web3", "サッカー・ガジェット"],
    links: { x: "https://x.com/msdatu79", instagram: "https://instagram.com/msdatu79" },
  },
  {
    suit: "♣",
    name: "リッヒ",
    avatar: "./assets/avatar-richi.jpg",
    title: "Technical Director",
    note: "技術、自然、生活の境界から実装を考える。",
    tags: ["環境系エンジニア", "元宇宙関係", "兼業猟師"],
    links: { x: "https://x.com/Mt_usage" },
  },
];

// -------------------------------------------------------------
// こんな方におすすめ（Lumaの対象者リストより）
// -------------------------------------------------------------
const audience = [
  "ChatGPT・Claude・Geminiなどを触っている",
  "AIとの会話は好きだが、実践活用までは進めていない",
  "会社でAIを使える環境はあるが、使いどころを探している",
  "AIでアプリ制作・資料作成・業務効率化に挑戦したい",
  "Codex / Claude Code のバイブコーディングに興味がある",
  "普通の技術勉強会には、少し入りづらさを感じる",
  "他の人がAIをどう使っているのか聞いてみたい",
  "AIガチ勢ではないけれど、もう少し先に進みたい",
];

// -------------------------------------------------------------
// 実績・拠点。数字はLumaの実データに基づく。
//   ※ #01の参加人数は未確認のため、ここには含めていません。
// -------------------------------------------------------------
const stats = [
  { value: "3", unit: "回", label: "これまでの開催（#01〜#03）" },
  { value: "20", unit: "名", label: "#03 申込（定員20名程度）" },
  { value: "浜松町", unit: "", label: "拠点（ウィルレイズ 浜松町）" },
];

// -------------------------------------------------------------
// FAQ（Lumaの開催概要・補足より）
// -------------------------------------------------------------
const faqs = [
  {
    q: "コードが読めなくても参加できますか？",
    a: "はい。非エンジニア向けの回もあり、コードを読まなくてもAIと一緒に手を動かせる進め方を扱います。",
  },
  {
    q: "参加費はいくらですか？",
    a: "各回のLumaページに記載します。これまでは1回1,000円で開催しています。",
  },
  {
    q: "何を持っていけばいいですか？",
    a: "ノートPCの持参を推奨します（回によっては運営PCでグループ参加も可）。普段使うAIツールは、当日使える状態にしておいてください。",
  },
  {
    q: "撮影はありますか？",
    a: "写真・動画の撮影を行う場合があります。撮影NGの方は受付でお知らせください。素材はSNSや今後の告知に使う場合があります。",
  },
  {
    q: "場所はどこですか？",
    a: "港区・浜松町エリア（ウィルレイズ 浜松町）で開催しています。正確な住所はLuma登録後に確認できます。",
  },
];

// =============================================================
// ここから下は描画ロジック。通常は編集不要。
// =============================================================

// "2026-06-22" -> "2026.06.22"（表示用）
function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return d ? `${y}.${m}.${d}` : iso;
}

// date（未来/今日なら upcoming）で status を判定
function isUpcoming(iso) {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${iso}T00:00:00`);
  return d >= today;
}

function statusLabel(event) {
  if (event.status) return event.status;
  return isUpcoming(event.date) ? "Next Event" : "Past Event";
}

// 表示順：日付の新しい回（＝次回）を先頭に
function sortedEvents() {
  return [...events].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 次回イベントのURL（未来回があればその最も近い回、なければ最新回）
function primaryEventUrl() {
  const upcoming = sortedEvents()
    .filter((e) => isUpcoming(e.date) && e.url)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  if (upcoming.length) return upcoming[0].url;
  const latest = sortedEvents().find((e) => e.url);
  return latest ? latest.url : null;
}

function escapeHtml(str = "") {
  return str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

function renderConcepts() {
  const root = document.querySelector("#concept-list");
  if (!root) return;
  root.innerHTML = concepts
    .map(
      (concept) => `
        <article class="info-card" data-suit="${concept.suit}">
          <span class="label" aria-hidden="true">${concept.suit}</span>
          <h3>${escapeHtml(concept.title)}</h3>
          <p>${escapeHtml(concept.body)}</p>
        </article>
      `,
    )
    .join("");
}

// 開催レポート枠。過去回にだけ表示。中身が無ければ「準備中」。
function renderRecap(event, isNext) {
  if (isNext) return ""; // 次回イベントにはレポートを出さない
  const recap = event.recap;
  if (recap && (recap.note || recap.url)) {
    const note = recap.note ? `<p>${escapeHtml(recap.note)}</p>` : "";
    const link = recap.url
      ? `<a class="recap-link" href="${recap.url}" target="_blank" rel="noopener noreferrer">レポートを読む →</a>`
      : "";
    return `
      <div class="event-recap">
        <span class="recap-label">開催レポート</span>
        ${note}
        ${link}
      </div>`;
  }
  return `
    <div class="event-recap is-empty">
      <span class="recap-label">開催レポート</span>
      <p class="muted">準備中です。</p>
    </div>`;
}

// 次回（featured）イベント：大きめの1枚。ワイドサムネを上部に。
function featuredEventCard(event) {
  const title = event.title || `Wonder Tech Hub ${event.number}`;
  const metaPills = [
    `<span class="pill pill-next">${escapeHtml(statusLabel(event))}</span>`,
    `<span class="pill">${formatDate(event.date)}</span>`,
    event.venue ? `<span class="pill">${escapeHtml(event.venue)}</span>` : "",
    event.capacity ? `<span class="pill">${escapeHtml(event.capacity)}</span>` : "",
  ]
    .filter(Boolean)
    .join("");
  const tags =
    Array.isArray(event.tags) && event.tags.length
      ? `<div class="event-tags">${event.tags
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("")}</div>`
      : "";
  const cta = event.url
    ? `<div class="event-actions">
         <a class="button primary" href="${event.url}" target="_blank" rel="noopener noreferrer">Lumaで参加する</a>
       </div>`
    : "";
  const cover = event.cover
    ? `<img class="event-cover" src="${event.cover}" alt="${escapeHtml(title)} ${escapeHtml(event.subtitle)}" loading="lazy" />`
    : "";
  const numberPill = `<span class="pill pill-number">${escapeHtml(event.number)}</span>`;
  return `
    <article class="event-card event-card-next">
      ${cover}
      <div class="event-body">
        <div class="event-meta">${numberPill}${metaPills}</div>
        <h3>${escapeHtml(title)}<br />${escapeHtml(event.subtitle)}</h3>
        <p>${escapeHtml(event.description)}</p>
        ${tags}
        ${cta}
      </div>
    </article>`;
}

// 過去イベント：スクエアサムネを並べたコンパクトカード。
function pastEventCard(event) {
  const title = event.title || `Wonder Tech Hub ${event.number}`;
  const img = event.coverSquare || event.cover;
  const thumb = img
    ? `<img class="past-thumb" src="${img}" alt="${escapeHtml(title)} ${escapeHtml(event.subtitle)}" loading="lazy" />`
    : "";
  const thumbWrap = event.url
    ? `<a class="past-thumb-link" href="${event.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(title)} を Luma で見る">${thumb}</a>`
    : thumb;
  const report =
    event.recap && event.recap.url
      ? `<a class="past-report" href="${event.recap.url}" target="_blank" rel="noopener noreferrer">開催レポート →</a>`
      : `<span class="past-report is-empty">開催レポート準備中</span>`;
  const link = event.url
    ? `<a class="past-link" href="${event.url}" target="_blank" rel="noopener noreferrer">Lumaで見る →</a>`
    : "";
  return `
    <article class="past-card">
      ${thumbWrap}
      <div class="past-info">
        <div class="event-meta">
          <span class="pill pill-number">${escapeHtml(event.number)}</span>
          <span class="pill">${formatDate(event.date)}</span>
        </div>
        <h3 class="past-title">${escapeHtml(event.subtitle)}</h3>
        <div class="past-report-row">${report}</div>
        <div class="past-actions">${link}</div>
      </div>
    </article>`;
}

function renderEvents() {
  const root = document.querySelector("#event-list");
  if (!root) return;
  const all = sortedEvents();
  const upcoming = all.filter((e) => statusLabel(e) === "Next Event");
  const past = all.filter((e) => statusLabel(e) !== "Next Event");
  const featured = upcoming.map(featuredEventCard).join("");
  const pastHtml = past.length
    ? `<div class="past-events">
         <h3 class="past-heading">過去の開催</h3>
         <div class="past-grid">${past.map(pastEventCard).join("")}</div>
       </div>`
    : "";
  root.innerHTML = featured + pastHtml;
}

function renderMemberLinks(links) {
  if (!links) return "";
  const items = [];
  if (links.x) {
    items.push(
      `<a class="member-link" href="${links.x}" target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a>`,
    );
  }
  if (links.instagram) {
    items.push(
      `<a class="member-link" href="${links.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>`,
    );
  }
  return items.length ? `<div class="member-links">${items.join("")}</div>` : "";
}

function renderMembers() {
  const root = document.querySelector("#member-list");
  if (!root) return;
  root.innerHTML = members
    .map((member) => {
      const realName = member.realName
        ? `<span class="member-realname">${escapeHtml(member.realName)}</span>`
        : "";
      const title = member.title
        ? `<span class="member-title">${escapeHtml(member.title)}</span>`
        : "";
      const note = member.note ? `<p class="member-note">${escapeHtml(member.note)}</p>` : "";
      const tags =
        Array.isArray(member.tags) && member.tags.length
          ? `<ul class="member-tags">${member.tags
              .map((t) => `<li>${escapeHtml(t)}</li>`)
              .join("")}</ul>`
          : "";
      // 旧データ互換：role しかない場合はそれを note として表示
      const legacy = !member.note && member.role
        ? `<p class="member-note">${escapeHtml(member.role)}</p>`
        : "";
      const avatar = member.avatar
        ? `<span class="member-avatar"><img src="${member.avatar}" alt="${escapeHtml(member.name)}" loading="lazy" /><span class="member-suit" aria-hidden="true">${member.suit}</span></span>`
        : `<span class="label" aria-hidden="true">${member.suit}</span>`;
      return `
        <article class="info-card member-card" data-suit="${member.suit}">
          <div class="member-top">
            ${avatar}
            <div class="member-head">
              <h3>${escapeHtml(member.name)}${realName}</h3>
              ${title}
            </div>
          </div>
          ${note}${legacy}
          ${tags}
          ${renderMemberLinks(member.links)}
        </article>
      `;
    })
    .join("");
}

function renderAudience() {
  const root = document.querySelector("#audience-list");
  if (!root) return;
  root.innerHTML = audience
    .map(
      (item) => `
        <li class="audience-item">
          <span class="audience-mark" aria-hidden="true">♦</span>
          <span>${escapeHtml(item)}</span>
        </li>
      `,
    )
    .join("");
}

function renderStats() {
  const root = document.querySelector("#stats-list");
  if (!root) return;
  root.innerHTML = stats
    .map(
      (s) => `
        <div class="stat">
          <span class="stat-value">${escapeHtml(s.value)}<span class="stat-unit">${escapeHtml(s.unit)}</span></span>
          <span class="stat-label">${escapeHtml(s.label)}</span>
        </div>
      `,
    )
    .join("");
}

function renderFaqs() {
  const root = document.querySelector("#faq-list");
  if (!root) return;
  root.innerHTML = faqs
    .map(
      (f) => `
        <details class="faq-item">
          <summary>${escapeHtml(f.q)}</summary>
          <p>${escapeHtml(f.a)}</p>
        </details>
      `,
    )
    .join("");
}

// 次回イベントへのCTAリンクを data-next-event 属性を持つ要素に反映
function wireNextEventLinks() {
  const url = primaryEventUrl();
  if (!url) return;
  document.querySelectorAll("[data-next-event]").forEach((el) => {
    el.setAttribute("href", url);
  });
}

renderConcepts();
renderEvents();
renderStats();
renderAudience();
renderFaqs();
renderMembers();
wireNextEventLinks();

// フッターの年を自動更新
const yearEl = document.querySelector("#footer-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
