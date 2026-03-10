// QuarkSketch — Main Menu

function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else if (child) node.appendChild(child);
  }
  return node;
}

function show(screen) {
  document.body.innerHTML = "";
  document.body.appendChild(rotateMsg());
  document.body.appendChild(screen);
}

function rotateMsg() {
  return el("div", { class: "rotate-msg" },
    el("p", {}, "Rotate your device to landscape to play QuarkSketch!"),
  );
}

function settingsPanel(onClose) {
  const darkInput = el("input", { type: "checkbox" });
  if (document.body.classList.contains("dark")) darkInput.checked = true;
  darkInput.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkInput.checked);
  });

  return el("div", { class: "settings-panel" },
    el("h3", {}, "Settings"),
    el("div", { class: "setting-row" },
      el("span", {}, "Dark Mode"),
      el("label", { class: "toggle" }, darkInput, el("span", { class: "toggle-track" })),
    ),
    el("button", { class: "close-btn", onclick: onClose }, "Close"),
  );
}

function mainMenu() {
  let settingsOpen = false;
  const settingsSlot = el("div", {});

  function toggleSettings() {
    settingsOpen = !settingsOpen;
    settingsSlot.innerHTML = "";
    if (settingsOpen) settingsSlot.appendChild(settingsPanel(() => {
      settingsOpen = false;
      settingsSlot.innerHTML = "";
    }));
  }

  return el("div", { class: "screen" },
    el("img", { class: "logo-img", src: "quarksketch_logo.png", alt: "QuarkSketch" }),
    el("div", { class: "btn-group" },
      el("button", { class: "btn-play",     onclick() { /* TODO */ } }, "Single Player"),
      el("button", { class: "btn-multi",    onclick() { /* TODO */ } }, "Multiplayer"),
      el("button", { class: "btn-leader",   onclick() { /* TODO */ } }, "Leaderboard"),
      el("button", { class: "btn-settings", onclick: toggleSettings  }, "Settings"),
    ),
    settingsSlot,
  );
}

show(mainMenu());