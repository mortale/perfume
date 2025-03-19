# Backend 服务

这是一个基于 Django 框架的后端服务项目。

## 项目结构

backend/                 # 项目根目录
├── manage.py           # Django 项目管理脚本
├── backend/            # Django 项目配置包
│   ├── __init__.py    # Python 包标识文件
│   ├── settings.py    # 项目核心配置文件
│   ├── urls.py        # URL 路由配置
│   ├── wsgi.py        # WSGI 应用配置
│   └── asgi.py        # ASGI 应用配置
└── package.json        # npm 项目配置文件