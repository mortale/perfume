# Perfume

这是一个使用 Turborepo 搭建的全栈项目，包含前端和后端应用。

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.8+
- pnpm 8+

### 依赖安装
在项目根目录下：
1. 前端依赖：执行 `pnpm install` 安装所有 JavaScript 依赖
2. 后端依赖：
   1. 创建并激活虚拟环境：
      ```bash
      python -m venv venv
      source ./venv/Scripts/activate
      ```
   2. 安装依赖：`pip install -r apps/backend/requirements.txt`

### 开发
- 启动所有应用：使用 `pnpm start` 启动（需要先激活虚拟环境）
- 前端应用：使用 `pnpm start --filter frontend` 启动
- 后端应用：使用 `pnpm start --filter backend` 启动（需要先激活虚拟环境）

## 项目结构

### 应用
- `apps/frontend`: 基于 Next.js 的前端应用
- `apps/backend`: 基于 Django 的后端应用
- `venv`: Python 虚拟环境目录

### 工具集成
本项目已集成以下工具：
- [Django](https://www.djangoproject.com/) - Python Web 框架
- [Django REST framework](https://www.django-rest-framework.org/) - RESTful API 框架
- [Django CORS Headers](https://github.com/adamchainz/django-cors-headers) - 跨域资源共享
- [Turborepo](https://turbo.build/) - 高性能构建系统

### 后端管理命令
后端项目提供了以下管理命令（需要先激活虚拟环境）：
- 创建数据库迁移：`pnpm makemigrations --filter backend`
- 执行数据库迁移：`pnpm build --filter backend`
- 创建超级用户：`pnpm createsuperuser --filter backend`