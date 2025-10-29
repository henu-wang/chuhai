# FMP MCP Server - 本地安装指南

## 📋 前置要求

- Node.js 18 或更高版本
- Claude Desktop应用程序
- FMP API Key: `N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN`

## 🚀 快速安装（3步完成）

### 第一步：克隆并安装

在你的本地机器上运行：

```bash
# 克隆仓库
git clone https://github.com/henu-wang/chuhai.git
cd chuhai

# 安装依赖
npm install

# 构建项目
npm run build
```

### 第二步：配置环境变量

创建 `.env` 文件（或使用已有的）：

```bash
# 在项目根目录创建 .env 文件
cat > .env << 'EOF'
FMP_API_KEY=N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN
FMP_BASE_URL=https://financialmodelingprep.com
EOF
```

### 第三步：配置Claude Desktop

根据你的操作系统，编辑Claude Desktop配置文件：

#### MacOS
```bash
# 配置文件位置
open ~/Library/Application\ Support/Claude/

# 编辑 claude_desktop_config.json
```

#### Windows
```powershell
# 配置文件位置
explorer %APPDATA%\Claude\

# 编辑 claude_desktop_config.json
```

#### Linux
```bash
# 配置文件位置
~/.config/Claude/claude_desktop_config.json
```

## ⚙️ Claude Desktop 配置内容

将以下内容添加到 `claude_desktop_config.json`：

### MacOS 配置
```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/Users/你的用户名/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

**注意**：请将 `/Users/你的用户名/chuhai/dist/index.js` 替换为你实际的项目路径。

可以用以下命令获取完整路径：
```bash
cd chuhai
pwd
# 输出类似：/Users/yourname/chuhai
# 完整路径就是：/Users/yourname/chuhai/dist/index.js
```

### Windows 配置
```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["C:\\Users\\你的用户名\\chuhai\\dist\\index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

可以用以下命令获取完整路径：
```powershell
cd chuhai
cd
# 输出路径，然后加上 \dist\index.js
```

### Linux 配置
```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/home/你的用户名/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

## 🔄 重启Claude Desktop

配置完成后，**完全退出**并**重新启动** Claude Desktop应用程序。

### MacOS
```bash
# 完全退出
killall Claude

# 重新打开 Claude Desktop
open -a Claude
```

### Windows
在任务管理器中结束Claude进程，然后重新打开

### Linux
```bash
# 结束进程
pkill claude

# 重新启动
claude &
```

## ✅ 验证安装

在Claude Desktop中，尝试以下命令：

1. **测试连接**：
   ```
   使用 fmp_get_market_hours 工具检查市场是否开盘
   ```

2. **获取股票报价**：
   ```
   使用 fmp_get_quote 工具获取 AAPL 的报价
   ```

3. **搜索公司**：
   ```
   使用 fmp_search_stock 工具搜索 "Apple"
   ```

如果你能看到数据返回，说明配置成功！

## 🎯 快速测试示例

在Claude Desktop中输入：

```
请帮我获取苹果公司(AAPL)的实时股价
```

Claude应该会自动调用 `fmp_get_quote` 工具并返回结果。

或者：

```
请帮我查看特斯拉(TSLA)最近的财报数据
```

Claude会调用相应的财务报表工具。

## 📊 可用的工具数量

配置成功后，Claude Desktop应该能访问：
- **153个工具**
- **22个功能分类**
- **覆盖FMP API的所有主要功能**

## 🔧 故障排除

### 问题1：Claude Desktop看不到MCP工具

**解决方案**：
1. 确认配置文件路径正确
2. 确认JSON格式正确（使用JSON验证器）
3. 完全重启Claude Desktop
4. 检查Node.js是否已安装：`node --version`

### 问题2：工具调用失败

**解决方案**：
1. 检查API Key是否正确
2. 检查网络连接
3. 查看项目日志（在终端运行 `npm run dev` 查看详细日志）

### 问题3：找不到node命令

**解决方案**：
- MacOS/Linux: 使用完整路径，如 `/usr/local/bin/node`
- Windows: 使用完整路径，如 `C:\\Program Files\\nodejs\\node.exe`

获取node路径：
```bash
which node  # MacOS/Linux
where node  # Windows
```

### 问题4：权限错误

**解决方案**：
```bash
# 确保dist/index.js可执行
chmod +x dist/index.js
```

## 🔍 调试模式

如果遇到问题，可以在终端手动运行服务器查看详细日志：

```bash
cd chuhai
npm run dev
```

然后在另一个终端窗口测试MCP连接。

## 📱 使用MCP Inspector调试

安装并使用MCP Inspector进行调试：

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

这会打开一个Web界面，你可以：
- 查看所有可用工具
- 测试工具调用
- 查看请求和响应
- 调试连接问题

## 🎉 成功标志

配置成功后，你应该能在Claude Desktop中：

1. ✅ 看到FMP相关的工具被自动调用
2. ✅ 获取实时股票数据
3. ✅ 查询公司财务信息
4. ✅ 搜索股票和查看新闻
5. ✅ 访问所有153个FMP工具

## 📞 需要帮助？

如果遇到问题：
1. 查看 `README.md` - 完整功能文档
2. 查看 `TOOLS.md` - 所有工具详细说明
3. 查看项目Issues：https://github.com/henu-wang/chuhai/issues

---

## 💡 专业提示

### 提示1：使用别名简化命令
```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
alias fmp-dev="cd /path/to/chuhai && npm run dev"
alias fmp-build="cd /path/to/chuhai && npm run build"
```

### 提示2：自动启动
如果你经常使用，可以配置系统启动时自动运行MCP服务器。

### 提示3：多环境配置
可以创建多个 `.env` 文件用于不同环境：
- `.env.development`
- `.env.production`

---

出海成功！现在就开始使用吧！🚀
