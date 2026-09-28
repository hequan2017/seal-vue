[简体中文](README.md) | [English](README.en.md)

# seal-vue

![Build](https://travis-ci.com/hequan2017/seal-vue.svg?branch=master)
![Version](https://img.shields.io/badge/release-0.1-blue.svg)
![Based](https://img.shields.io/badge/based-iviewadmin2.5-blue.svg)
![Framework](https://img.shields.io/badge/framework-vue2.5-green.svg)

> **⚠️ Development of this project has been discontinued!** The code has not been maintained for a long time, so it may fail to deploy or run in different environments. Please be aware! For reference only!

> The Vue front-end of the seal project, based on [iview-admin](https://github.com/iview/iview-admin) 2.5.0, working with the [seal](https://github.com/hequan2017/seal) back-end.

## Introduction

seal is a Django-based development platform template that supports both monolithic (server-rendered) and separated front-end/back-end modes. seal-vue is its API-driven front-end: menus are delivered dynamically by the back-end after login, and it ships with an asset management (ECS) CRUD page plus a K8s Pod WebSSH web terminal. It also works as a reference template for building ops/admin UIs with Vue + iView.

## �?Features

- Login: obtains a token from the back-end `/api/token` endpoint, stores it in a Cookie, supports logout
- Dynamic menus: after login, menu data is fetched from the back-end `system/menu` endpoint and routes/sidebar are generated dynamically
- Asset management: list / create / edit / delete for ECS assets (backed by `/assets/api/ecs`)
- K8s Pod WebSSH: xterm.js + WebSocket terminal in the browser �?enter a pod name and namespace to connect (`/ws/{pod}/{namespace}`)
- Full iview-admin 2.5.0 framework capabilities out of the box: multi-tab pages, breadcrumbs, permission directives, error log collection, etc.

## 🛠 Tech Stack

- Vue 2.5 + Vue Router + Vuex, built with vue-cli 3
- UI: iView 3.4 (iview-admin 2.5.0 template)
- axios 0.18 for HTTP, xterm 3.14 for the web terminal, echarts 4 for charts

## 🚀 Quick Start

```bash
# Clone the project
git clone https://github.com/hequan2017/seal-vue.git
cd seal-vue

# Install dependencies
npm install

# Develop locally
npm run dev

# Build (outputs to dist/)
npm run build
```

- The back-end address is configured in `baseUrl` of `src/config/index.js`: `dev` (testing) and `pro` (production)
- Deploy the [seal](https://github.com/hequan2017/seal) back-end first

## 📸 Demo

> DEMO: <http://129.28.156.219:8004/home> (account admin / password REDACTED_PASSWORD)

![demo1](src/assets/demo/demo1.jpg)
![demo2](src/assets/demo/demo2.jpg)
![demo3](src/assets/demo/demo3.jpg)

## 🔗 Related Projects

- Back-end: [seal](https://github.com/hequan2017/seal)
- Alternative front-end (D2Admin / Element UI): [seal-d2-admin](https://github.com/hequan2017/seal-d2-admin)

## 📄 License

[MIT](http://opensource.org/licenses/MIT)

## Author

> He Quan (何全)
