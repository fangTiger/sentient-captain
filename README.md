# Sentient中文网站-v1

Sentient中文网站，目前仅为静态网站，偏技术普及，正在对接DC相关API中，敬请期待...

## ✨ 功能

- **响应式设计**：在不同设备上提供一致的用户体验。
- **平滑滚动导航**：点击导航链接时，页面平滑滚动到相应部分。
- **深色/浅色主题切换**：用户可以根据喜好切换网站主题。
- **回到顶部按钮**：方便用户快速返回页面顶部。
- **Mermaid图表渲染**：所有技术架构图、流程图和模块图均能正确渲染。
- **卡片悬停效果**：为网站内容卡片添加了交互式的悬停动画效果。
- **MathJax支持**：支持数学公式的渲染。

## 🛠️ 技术栈

- **React**：用于构建用户界面的JavaScript库。
- **Vite**：下一代前端工具，提供快速的开发体验。
- **Mermaid.js**：用于从文本和代码生成图表和流程图的JavaScript库。
- **MathJax**：用于在Web上显示数学公式的开源JavaScript显示引擎。
- **CSS**：用于样式化页面。

## 📂 项目结构

```
sentient-website/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── pnpm-lock.yaml
└── README.md
```

- `public/`: 包含静态资源，如网站图标。
- `src/App.jsx`: 主要的React组件，包含了网站的布局、内容和逻辑。
- `src/App.css`: 网站的全局样式文件。
- `src/main.jsx`: React应用的入口文件。
- `index.html`: 网站的HTML模板文件，包含了CSP配置和外部脚本引用。
- `package.json`: 项目的依赖和脚本配置。
- `README.md`: 项目说明文件。

## 🐛 常见问题与解决方案

### Mermaid图表渲染问题

如果Mermaid图表无法正确显示，可能是由于Content Security Policy (CSP) 限制或Mermaid渲染逻辑问题。本项目已在 `index.html` 中配置了宽松的CSP策略，并优化了 `App.jsx` 中的Mermaid渲染逻辑，以确保图表正常显示。

### MathJax公式渲染问题

如果MathJax公式无法正确显示，可能是由于CSP限制了字体加载。

## 🤝 贡献

欢迎对本项目进行贡献。如果您发现任何问题或有改进建议，请提交Issue或Pull Request、联系维护者Captain(@mycndota)。

## 📄 许可证

本项目采用MIT许可证。



