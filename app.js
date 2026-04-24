// crawler-hub 共享数据加载器 + 工具函数

const STAGE_LABEL = {
  world: "世界观", script: "剧本", ref_image: "参考图",
  keyframe: "关键帧", videogen: "视频生成", quality: "质检",
  tts: "配音", sfx: "音效", bgm: "配乐", edit: "剪辑", lip_sync: "对口型",
};

const STAGE_ORDER = [
  "videogen", "keyframe", "ref_image", "script", "world",
  "tts", "bgm", "sfx", "edit", "lip_sync", "quality",
];

function esc(s) {
  return String(s ?? "").replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}

function fmtNumber(n) {
  n = Number(n) || 0;
  if (n >= 1e8) return (n/1e8).toFixed(1) + "亿";
  if (n >= 1e4) return (n/1e4).toFixed(1) + "万";
  return n.toLocaleString();
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

async function loadData() {
  const r = await fetch("data/latest.json?_=" + Date.now());
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function setupNav(weekLabel, metaText) {
  const w = document.getElementById("nav-week");
  if (w) w.textContent = weekLabel || "--";
  const m = document.getElementById("nav-updated");
  if (m) m.textContent = metaText || "";
}

// Intersection Observer: reveal on scroll
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}
