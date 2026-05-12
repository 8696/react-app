# React App

基于 **Vite + React 19 + TypeScript + Ant Design** 构建的前端技术示例与工程实践项目，涵盖组件封装、状态管理、主题定制、样式方案、路由、工具库等多个技术方向的演示页面。

---

## 技术栈

| 类别 | 技术 |
|---|---|
| 构建工具 | [Vite 8](https://vitejs.dev/) |
| 前端框架 | React 19 + TypeScript |
| UI 组件库 | [Ant Design 6](https://ant.design/) |
| 路由 | React Router DOM v6 |
| 样式方案 | Less / SCSS / CSS Module / Tailwind CSS / Styled Components |
| 请求库 | Axios + await-to-js |
| Hooks 库 | ahooks |
| 日期处理 | Day.js / Moment.js |
| 代码规范 | ESLint + TypeScript ESLint |
| 包管理器 | Yarn |

---

## 项目结构

```
react-app/
├── public/                   # 静态资源（不经过 Vite 处理）
├── src/
│   ├── App.tsx               # 应用根组件，配置路由、主题、国际化
│   ├── index.tsx             # 应用入口
│   ├── env.config.ts         # 环境变量统一导出
│   ├── vite-env.d.ts         # Vite 环境变量类型声明
│   ├── index.less            # 全局样式
│   ├── style/                # 全局样式文件
│   ├── theme/                # 默认主题配置
│   ├── provider/
│   │   └── theme.tsx         # 主题 Context Provider
│   ├── layout/               # 全局布局（侧边导航 + 路由出口）
│   ├── component/            # 通用基础组件
│   │   ├── DemoTitle/        # 示例页标题组件
│   │   └── BodySpin/         # 全局加载组件
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useCheckAppVersion/   # 检测应用版本更新
│   │   ├── useAntdHolderRender/  # Antd 全局静态方法挂载
│   │   ├── useDayJsToZhCn/       # Day.js 中文本地化
│   │   ├── useGetRef/            # Ref 获取
│   │   └── useGetState/          # 同步获取最新 state
│   ├── helper/               # 工具函数
│   │   ├── http.ts           # Axios 请求封装
│   │   ├── token.ts          # Token 管理
│   │   ├── utils.ts          # 通用工具函数
│   │   └── type.ts           # 公共类型定义
│   └── view/                 # 页面（演示模块）
│       ├── nav.ts            # 导航路由配置
│       ├── home/             # 首页
│       ├── antd/             # Antd 组件演示
│       ├── antd-icon/        # Antd 图标演示
│       ├── antd-typography/  # Antd 排版演示
│       ├── antd-watermark/   # Antd 水印演示
│       ├── antd-timeline/    # Antd 时间线演示
│       ├── theme/            # 主题定制演示
│       ├── tailwind/         # Tailwind CSS 演示
│       ├── css-module/       # CSS Module 演示（Less / SCSS）
│       ├── styled-components-demo/ # Styled Components 演示
│       ├── state-render/     # 状态渲染机制演示
│       ├── hooks/            # Hooks 演示
│       ├── use-request/      # 请求封装演示
│       ├── http-proxy/       # 代理请求演示
│       ├── await-to-js/      # await-to-js 使用演示
│       ├── router/           # 路由嵌套演示
│       ├── modal/            # Modal 弹窗演示
│       ├── table/            # 表格演示
│       ├── table-pagination/ # 表格分页演示
│       ├── find-array/       # 数组操作演示
│       ├── change-tab/       # Tab 切换演示
│       ├── use-virtual-list/ # 虚拟列表演示
│       ├── svg/              # SVG 导入演示
│       ├── env/              # 环境变量演示
│       ├── recorder/         # 录音功能演示
│       ├── mp3-slice-play/   # MP3 分片播放演示
│       ├── moment-to-day-js/ # Moment → Day.js 迁移演示
│       ├── day-js-to-moment/ # Day.js → Moment 演示
│       ├── template/         # 页面模板
│       └── error/
│           └── 404/          # 404 错误页
├── vite.config.mts           # Vite 配置
├── .env                      # 公共环境变量
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── package.json
└── yarn.lock
```

---

## 环境变量

项目通过 Vite 多模式（`--mode`）加载对应的 `.env.*` 文件，环境变量必须以 `VITE_` 开头才能在客户端代码中访问。

| 变量名 | 说明 |
|---|---|
| `VITE_URL_API` | 后端接口基础地址 |
| `VITE_CUSTOM_ENV` | 当前自定义环境标识 |
| `VITE_CURRENT_ENV_FILE` | 当前加载的 env 文件名 |
| `DROP_CONSOLE` | 构建时是否移除 console（`true` / `false`）|
| `GENERATE_SOURCEMAP` | 是否生成 sourcemap（默认 `true`）|
| `ANALYZE` | 是否开启产物分析（`true` / `false`）|

---

## 快速开始

### 环境要求

- Node.js `>= 22.12.0`
- Yarn `>= 1.22.0`

### 克隆项目

```bash
git clone <仓库地址>
cd react-app
```

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn start:development
```

启动后访问 [http://localhost:8280](http://localhost:8280)

---

## 脚本命令

### 开发 & 构建

| 命令 | 说明 |
|---|---|
| `yarn start:development` | 启动开发环境（`mode=development`）|
| `yarn start:test` | 启动测试环境（`mode=test`）|
| `yarn start:production` | 启动生产环境（`mode=production`）|
| `yarn build:development` | ESLint 检查 + 构建开发包 |
| `yarn build:test` | ESLint 检查 + 构建测试包 |
| `yarn build:production` | ESLint 检查 + 构建生产包 |
| `yarn preview` | 预览 `dist` 目录构建产物 |

### 分析 & 检查

| 命令 | 说明 |
|---|---|
| `yarn analyze` | 构建并输出产物体积分析报告（`dist/stats.html`）|
| `yarn eslint` | ESLint 检查并自动修复 `src` 目录 |

### 清理 & 初始化

| 命令 | 说明 |
|---|---|
| `yarn clear:cache` | 清除 Vite 缓存（`node_modules/.vite`）|
| `yarn clear:package` | 删除 `node_modules`、`dist`、`coverage` |
| `yarn init:package` | 清理后重新安装依赖 |
| `yarn init:cusenv` | 初始化自定义环境配置 |

### 依赖更新

| 命令 | 说明 |
|---|---|
| `yarn ncu:check` | 检查 antd 相关依赖的小版本更新 |
| `yarn ncu:update` | 将 antd 相关依赖升级到最新小版本并重新安装 |

---

## 构建产物结构

```
dist/
├── index.html
├── version.json              # 构建时间戳（用于版本检测）
└── static/
    ├── js/                   # JS chunk 文件
    ├── css/                  # CSS 文件
    └── media/                # 图片等静态资源
```

> 每次构建会在 `dist/` 根目录生成 `version.json`，配合 `useCheckAppVersion` Hook 可实现自动检测新版本并提示用户刷新。

---

## Vite 配置说明

- **路径别名**：`@` 指向 `src/` 目录
- **开发代理**：`/api` 请求转发至 `http://proxy.info.icode.link/`
- **CSS 预处理器**：Less（支持 `javascriptEnabled`）、SCSS
- **代码压缩**：Terser，支持 `drop_console`、`drop_debugger`
- **SVG**：通过 `vite-plugin-svgr` 支持 SVG 作为 React 组件导入
- **Styled Components**：通过 Babel 插件支持 displayName、文件名调试

---

## 代码规范

项目使用 ESLint 进行代码检查，规范基于：
- `@typescript-eslint` 针对 TypeScript
- `eslint-plugin-react` 针对 React
- `eslint-plugin-react-hooks` 针对 React Hooks

构建命令（`build:*`）均会在构建前自动执行 ESLint 检查。
