# 基于 Create React App 的项目

## 项目概述
本项目是使用 [Create React App](https://github.com/facebook/create-react-app) 进行初始化和构建的 React 应用。Create React App 是一个官方推荐的用于创建 React 单页应用的工具，它集成了一系列常用的开发工具和配置，帮助开发者快速搭建 React 项目，无需手动配置复杂的 Webpack、Babel 等构建工具，让开发者能够专注于业务逻辑的实现。

## 项目结构
项目的主要目录和文件结构如下：

### 根目录文件
- **`package.json`**：记录项目的元数据，包括项目名称、版本、依赖项、脚本命令等信息。它是 npm 或 pnpm 管理项目依赖和执行脚本的核心文件。
- **`pnpm-lock.yaml`**：pnpm 的锁文件，用于锁定项目依赖的具体版本，确保在不同环境下安装的依赖版本一致，以保证项目的可重复性和稳定性。
- **`README.md`**：即本文件，用于介绍项目的基本信息、使用方法等。

### 主要目录
- **`public`**：
  - 该目录主要存放公共的静态资源文件。
  - `index.html`：作为项目的入口 HTML 文件，React 应用最终会被渲染到该文件中的一个根节点上。
  - 其他静态资源，如图片、字体等也可以放在此目录下，在项目中可以通过相对路径引用这些资源。

- **`src`**：
  - 这是项目的源代码目录，包含了 React 组件、样式文件、工具函数等项目的核心代码。
  - `components`：通常用于存放 React 组件，这些组件可以是功能性组件或类组件，用于构建用户界面。例如，一个按钮组件、一个表单组件等都可以放在这里。
  - `pages`：如果项目采用了页面路由的方式，这里可以存放不同页面的组件，每个页面组件对应一个路由路径。
  - `styles`：存放样式文件，如 CSS、SCSS 等文件，用于对组件进行样式设计。
  - `utils`：存放一些工具函数，例如日期处理函数、数据格式化函数等，这些函数可以在项目的不同地方被复用。

- **`config`**：
  - 用于存放项目的配置文件，如 Webpack、Babel 等的自定义配置文件。如果需要对 Create React App 的默认配置进行扩展或修改，可以在这个目录下创建相应的配置文件。

- **`scripts`**：
  - 包含一些自定义的脚本文件，这些脚本可以用于执行一些特定的任务，如构建、部署等。

## 依赖管理
本项目使用 pnpm 作为包管理器，pnpm 是一个快速、高效的包管理器，它具有磁盘空间利用率高、安装速度快等优点。项目的依赖信息记录在 `package.json` 和 `pnpm-lock.yaml` 文件中。

### 主要依赖
- **`react` 和 `react-dom`**：React 的核心库，用于构建用户界面和管理 DOM 元素。
- **`antd`**：一个流行的 React UI 组件库，提供了丰富的高质量组件，如按钮、表单、表格等，方便开发者快速构建美观的用户界面。
- **其他依赖**：根据项目的具体需求，还可能包含一些其他的依赖，如路由库（如 `react-router-dom`）、状态管理库（如 `redux` 或 `mobx`）等。

## 脚本命令
在项目目录下，可以使用以下脚本命令来进行开发、构建和测试等操作：
### `react-app`项目脚本命令介绍

以下是`react-app`项目`package.json`文件中`scripts`字段所定义的脚本命令及其用途：

#### 开发环境相关命令
- **`start:development`**
  - 命令：`cross-env CUSTOM_ENV=development node scripts/start.js`
  - 用途：设置自定义环境变量`CUSTOM_ENV`为`development`，然后运行`scripts/start.js`脚本，通常用于启动开发服务器。
- **`build:development`**
  - 命令：`pnpm run eslint && cross-env CUSTOM_ENV=development node scripts/build.js`
  - 用途：先运行`eslint`检查代码，然后设置自定义环境变量`CUSTOM_ENV`为`development`，再运行`scripts/build.js`脚本，用于在开发环境下进行项目构建。

#### 测试环境相关命令
- **`start:test`**
  - 命令：`cross-env CUSTOM_ENV=test node scripts/start.js`
  - 用途：设置自定义环境变量`CUSTOM_ENV`为`test`，然后运行`scripts/start.js`脚本，通常用于启动测试环境服务器。
- **`build:test`**
  - 命令：`pnpm run eslint && cross-env CUSTOM_ENV=test node scripts/build.js`
  - 用途：先运行`eslint`检查代码，然后设置自定义环境变量`CUSTOM_ENV`为`test`，再运行`scripts/build.js`脚本，用于在测试环境下进行项目构建。

#### 生产环境相关命令
- **`start:production`**
  - 命令：`cross-env CUSTOM_ENV=production node scripts/start.js`
  - 用途：设置自定义环境变量`CUSTOM_ENV`为`production`，然后运行`scripts/start.js`脚本，通常用于启动生产环境服务器。
- **`build:production`**
  - 命令：`pnpm run eslint && cross-env CUSTOM_ENV=production node scripts/build.js`
  - 用途：先运行`eslint`检查代码，然后设置自定义环境变量`CUSTOM_ENV`为`production`，再运行`scripts/build.js`脚本，用于在生产环境下进行项目构建。

#### 分析命令
- **`analyze`**
  - 命令：`pnpm run clear:cache && pnpm run eslint && cross-env CUSTOM_ENV=production ANALYZE=true node scripts/build.js`
  - 用途：先清除缓存，然后运行`eslint`检查代码，接着设置自定义环境变量`CUSTOM_ENV`为`production`且`ANALYZE`为`true`，最后运行`scripts/build.js`脚本，用于对生产环境构建进行分析。

#### 代码检查命令
- **`eslint`**
  - 命令：`cross-env NODE_ENV=production eslint --fix ./src`
  - 用途：设置`NODE_ENV`为`production`，然后使用`eslint`检查并自动修复`src`目录下的代码问题。

#### Husky相关命令
- **`prepare`**
  - 命令：`husky install`
  - 用途：安装Husky，用于在项目初始化时进行Git钩子的设置。

#### 预览命令
- **`preview`**
  - 命令：`serve -s -u ./build`
  - 用途：使用`serve`工具对`build`目录进行静态文件服务，用于预览构建后的项目。

#### Git相关命令
- **`git:commit`**
  - 命令：`pnpm run eslint && git add . && git commit -m "feat: git:commit" && git push origin master`
  - 用途：先运行`eslint`检查代码，然后将所有文件添加到Git暂存区，提交代码并添加固定的提交信息，最后推送到`origin`的`master`分支。

#### 清理命令
- **`clear:package`**
  - 命令：`rm -rf ./node_modules && rm -rf build && rm -rf coverage`
  - 用途：删除`node_modules`、`build`和`coverage`目录，用于清理项目依赖和构建产物。
- **`clear:cache`**
  - 命令：`rm -rf ./node_modules/.cache`
  - 用途：删除`node_modules`下的`.cache`目录，用于清理缓存。

#### 初始化命令
- **`init:package`**
  - 命令：`pnpm run clear:package && pnpm install`
  - 用途：先清理项目依赖和构建产物，然后重新安装项目依赖。
- **`init:cusenv`**
  - 命令：`node ./customEnv.js`
  - 用途：运行`customEnv.js`脚本，用于初始化自定义环境配置。

#### 依赖检查与更新命令
- **`ncu:check`**
  - 命令：`ncu --target minor`
  - 用途：使用`ncu`工具检查项目依赖的小版本更新情况。
- **`ncu:update`**
  - 命令：`ncu --target minor -u`
  - 用途：使用`ncu`工具将项目依赖更新到小版本的最新版本。
## 项目初始化
如果要在本地运行该项目，可以按照以下步骤进行初始化：

### 克隆项目
首先，将项目代码克隆到本地：
```bash
git clone <项目仓库地址>
cd <项目目录>
```

### 安装依赖
使用 pnpm 安装项目的依赖：
```bash
pnpm install
```

### 启动项目
安装完成后，使用以下命令启动开发服务器：
```bash
pnpm start
```

打开浏览器，访问 `http://localhost:8280` 即可看到项目的运行效果。

## 注意事项
- 在开发过程中，尽量遵循 React 的最佳实践，如使用函数式组件、使用 React Hooks 进行状态管理等。
- 注意代码的模块化和组件的复用性，将复杂的逻辑拆分成多个小的组件和函数，提高代码的可维护性。
- 定期运行测试用例，确保代码的正确性和稳定性，避免引入新的错误。

## 学习资源
- [React 官方文档](https://reactjs.org/docs/getting-started.html)：学习 React 的基础知识和高级特性。
- [Create React App 文档](https://create-react-app.dev/docs/getting-started/)：了解 Create React App 的详细使用方法和配置选项。
- [Jest 官方文档](https://jestjs.io/docs/getting-started)：学习如何使用 Jest 进行单元测试。
