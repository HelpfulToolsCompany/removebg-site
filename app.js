const SNIPPETS = {
  curl: {
    before: `curl -H "X-Api-Key: YOUR_REMOVEBG_KEY" \\
  -F "image_file=@photo.jpg" \\
  -F "size=auto" \\
  https://api.remove.bg/v1.0/removebg -o no-bg.png`,
    after: `curl -H "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY" \\
  -H "X-RapidAPI-Host: YOUR_RAPIDAPI_HOST" \\
  -F "image_file=@photo.jpg" \\
  -F "size=auto" \\
  https://YOUR_RAPIDAPI_HOST/v1.0/removebg -o no-bg.png`,
  },
  python: {
    before: `import requests

resp = requests.post(
    "https://api.remove.bg/v1.0/removebg",
    files={"image_file": open("photo.jpg", "rb")},
    data={"size": "auto"},
    headers={"X-Api-Key": "YOUR_REMOVEBG_KEY"},
)
open("no-bg.png", "wb").write(resp.content)`,
    after: `import requests

resp = requests.post(
    "https://YOUR_RAPIDAPI_HOST/v1.0/removebg",
    files={"image_file": open("photo.jpg", "rb")},
    data={"size": "auto"},
    headers={
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "YOUR_RAPIDAPI_HOST",
    },
)
open("no-bg.png", "wb").write(resp.content)`,
  },
  node: {
    before: `const form = new FormData();
form.append("image_url", "https://example.com/photo.jpg");
form.append("size", "auto");

const res = await fetch("https://api.remove.bg/v1.0/removebg", {
  method: "POST",
  headers: { "X-Api-Key": process.env.REMOVEBG_API_KEY },
  body: form,
});
const buf = Buffer.from(await res.arrayBuffer());`,
    after: `const form = new FormData();
form.append("image_url", "https://example.com/photo.jpg");
form.append("size", "auto");

const res = await fetch("https://YOUR_RAPIDAPI_HOST/v1.0/removebg", {
  method: "POST",
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "YOUR_RAPIDAPI_HOST",
  },
  body: form,
});
const buf = Buffer.from(await res.arrayBuffer());`,
  },
  php: {
    before: `$ch = curl_init("https://api.remove.bg/v1.0/removebg");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "X-Api-Key: YOUR_REMOVEBG_KEY"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
  "image_file" => new CURLFile("photo.jpg"),
  "size" => "auto"
]);`,
    after: `$ch = curl_init("https://YOUR_RAPIDAPI_HOST/v1.0/removebg");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY",
  "X-RapidAPI-Host: YOUR_RAPIDAPI_HOST"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
  "image_file" => new CURLFile("photo.jpg"),
  "size" => "auto"
]);`,
  },
};

const beforeEl = document.getElementById("code-before");
const afterEl = document.getElementById("code-after");
const tabButtons = document.querySelectorAll(".tab-btn");

function setLang(lang) {
  const pair = SNIPPETS[lang];
  if (!pair) return;
  beforeEl.textContent = pair.before;
  afterEl.textContent = pair.after;
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

setLang("curl");
