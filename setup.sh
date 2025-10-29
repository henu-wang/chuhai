#!/bin/bash

# FMP MCP Server - 自动安装脚本
# 适用于 MacOS 和 Linux

set -e

echo "=================================="
echo "FMP MCP Server - 自动安装"
echo "=================================="
echo ""

# 检查Node.js
echo "检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请先安装 Node.js 18 或更高版本"
    echo "访问: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: Node.js 版本过低 (当前: $(node -v))"
    echo "需要 Node.js 18 或更高版本"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 安装依赖
echo "安装依赖..."
npm install
echo "✅ 依赖安装完成"
echo ""

# 构建项目
echo "构建项目..."
npm run build
echo "✅ 项目构建完成"
echo ""

# 设置权限
chmod +x dist/index.js
echo "✅ 权限设置完成"
echo ""

# 获取项目路径
PROJECT_PATH=$(pwd)
INDEX_PATH="$PROJECT_PATH/dist/index.js"

echo "=================================="
echo "安装完成！"
echo "=================================="
echo ""
echo "项目路径: $PROJECT_PATH"
echo "服务器入口: $INDEX_PATH"
echo ""
echo "下一步："
echo "1. 配置 Claude Desktop"
echo "2. 编辑配置文件（根据你的系统）："
echo ""

# 检测操作系统
if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
    echo "   MacOS 配置文件："
    echo "   $CONFIG_PATH"
    echo ""
    echo "3. 添加以下配置到 claude_desktop_config.json："
    echo ""
    cat << EOF
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["$INDEX_PATH"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
EOF
    echo ""
    echo "4. 重启 Claude Desktop："
    echo "   killall Claude && open -a Claude"

elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
    echo "   Linux 配置文件："
    echo "   $CONFIG_PATH"
    echo ""
    echo "3. 添加以下配置到 claude_desktop_config.json："
    echo ""
    cat << EOF
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["$INDEX_PATH"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
EOF
    echo ""
    echo "4. 重启 Claude Desktop"
fi

echo ""
echo "需要帮助？查看 INSTALL.md 获取详细说明"
echo ""
echo "出海！🚀"
