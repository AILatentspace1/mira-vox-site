"use strict";

// Replace empty values with Mira Vox's verified profile URLs before publishing.
// The email entry may be a mailto: URL such as mailto:hello@yourdomain.com.
const PROFILE_LINKS = {
  instagram: "",
  youtube: "",
  tiktok: "",
  spotify: "",
  xiaohongshu: "",
  email: ""
};

const STORIES = {
  video: {
    kicker: "VIDEO STORIES / 视频企划",
    title: "镜头之外，也是故事。",
    description: "关于日常、创作与灵感的影像企划。以柔软而真诚的视角记录那些容易被忽略，却值得停下来细看的片刻。"
  },
  podcast: {
    kicker: "PODCAST NOTES / 播客企划",
    title: "慢一点，好好说话。",
    description: "一档关于创造、生活和成长的声音企划。希望每一场不急着结束的对话，都能带来一点新的看见。"
  }
};

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "展开菜单");
  mobileNav.hidden = true;
};
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "展开菜单" : "收起菜单");
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const dialog = document.querySelector("#story-dialog");
document.querySelectorAll("[data-story]").forEach((button) => {
  button.addEventListener("click", () => {
    const story = STORIES[button.dataset.story];
    if (!story) return;
    document.querySelector("#dialog-kicker").textContent = story.kicker;
    document.querySelector("#dialog-title").textContent = story.title;
    document.querySelector("#dialog-description").textContent = story.description;
    dialog.showModal();
  });
});
document.querySelectorAll(".dialog-close, .dialog-dismiss").forEach((button) => {
  button.addEventListener("click", () => dialog.close());
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
}

document.querySelectorAll("[data-profile]").forEach((link) => {
  const key = link.dataset.profile;
  const url = PROFILE_LINKS[key];
  const valid = typeof url === "string" && (url.startsWith("https://") || (key === "email" && url.startsWith("mailto:")));
  if (valid) {
    link.href = url;
    if (key !== "email") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  } else {
    link.setAttribute("aria-label", `${link.textContent.trim()}，链接待配置`);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("此社交资料尚未配置，请在 script.js 中填入真实链接。");
    });
  }
});

const form = document.querySelector("#newsletter-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  formMessage.classList.remove("error");
  if (!email || !emailInput.checkValidity()) {
    formMessage.textContent = "请输入有效的邮箱地址。";
    formMessage.classList.add("error");
    emailInput.focus();
    return;
  }
  try {
    localStorage.setItem("mira-vox-newsletter-demo", email);
    formMessage.textContent = "已保存在当前浏览器。本地演示不会发送订阅邮件。";
    form.reset();
  } catch {
    formMessage.textContent = "当前浏览器无法保存本地数据；请启用存储后重试。";
    formMessage.classList.add("error");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
