# Mira Vox 个人主页

一个**零构建依赖**的响应式单页网站，突出创作者介绍、视频与播客企划、品牌合作方式、订阅模块和社交资料。可在本地预览，也可部署到 GitHub Pages；未接入 Manus 托管服务。

## 打开

直接双击 `index.html` 即可在浏览器预览。也可在本目录运行 `python -m http.server 8000`，然后打开 `http://localhost:8000/`。所有页面文件及图像都位于此目录内；无需安装依赖。若仓库 `AILatentspace1/mira-vox-site` 已启用 GitHub Pages，可访问 `https://ailatentspace1.github.io/mira-vox-site/`。

## 上线前替换

1. **真实身份与内容**：当前 `assets/mira-portrait.png` 是原创的**虚构示意肖像**，不是 Mira Vox 的真实照片。请用已获授权的真实头像替换，或继续作为插画示意使用。`assets/video-cover.png` 和 `assets/podcast-cover.png` 是示意封面。页面的栏目文字是演示企划，不代表已发布的作品或既有合作案例。
2. **视频与播客**：在 `index.html` 中替换栏目文案与图片；如有真实播放地址，可把 `data-story` 按钮改为实际媒体链接，或扩展 `script.js` 的 `STORIES` 数据与弹窗。当前点击按钮只显示企划介绍，不会假装播放内容。
3. **社交和合作邮箱**：在 `script.js` 顶部 `PROFILE_LINKS` 对应字段填入**已核实**的资料页 URL（HTTPS）及 `mailto:` 邮箱地址。当前空值会阻止跳转并显示“待配置”提示，避免误导或错误链接。
4. **新闻订阅**：目前是明确标注的本地演示；邮箱仅保存在提交者的当前浏览器 `localStorage`，**不会发送邮件，也不是真正订阅**。正式上线前，需要将表单提交逻辑改接用户选择的邮件营销服务或后端，并加入所需的隐私说明及同意流程。
5. **合作案例**：现有三个卡片展示合作形式，没有虚构真实品牌伙伴。取得品牌名、标志与授权后，可替换为实际案例。

## 文件

- `index.html`：语义化页面与文案
- `styles.css`：视觉样式、响应式布局与降低动态效果适配
- `script.js`：交互与待配置的社交资料
- `assets/`：favicon 和三张原创示意图片

页面使用系统字体、原生 HTML/CSS/JavaScript；无 CDN 或第三方运行时依赖。
