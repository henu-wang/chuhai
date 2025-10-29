# ⚠️ 安装问题解决方案

## 问题：找不到 setup.sh 文件

如果你遇到 `chmod: setup.sh: No such file or directory` 错误，请按以下步骤操作：

---

## 解决方案1：确认你在正确的目录

```bash
# 确保你在 chuhai 目录中
pwd
# 应该显示类似：/Users/yourname/chuhai 或 C:\Users\yourname\chuhai

# 如果不在，进入目录
cd chuhai

# 检查文件是否存在
ls -la setup.sh
```

---

## 解决方案2：克隆正确的分支

当前代码在开发分支上，你需要克隆并切换到正确的分支：

```bash
# 如果还没克隆，重新克隆
git clone https://github.com/henu-wang/chuhai.git
cd chuhai

# 切换到开发分支
git checkout claude/implement-fmp-api-mcp-011CUakzDVkv3AVk5XBxC52v

# 拉取最新代码
git pull

# 现在检查文件
ls -la setup.sh
```

---

## 解决方案3：手动安装（推荐，最可靠）

如果上述方法都不行，直接手动安装：

### 步骤1：确认目录结构

```bash
cd chuhai

# 检查必要文件是否存在
ls src/
ls package.json
```

如果 `src/` 目录或 `package.json` 不存在，说明克隆不完整。

### 步骤2：手动执行安装命令

```bash
# 1. 检查 Node.js 版本
node --version
# 应该显示 v18 或更高

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 验证构建结果
ls dist/index.js
```

### 步骤3：获取完整路径

```bash
# MacOS/Linux
pwd
# 记下输出，比如：/Users/yourname/chuhai

# Windows (PowerShell)
cd
# 记下输出，比如：C:\Users\yourname\chuhai
```

### 步骤4：手动配置 Claude Desktop

**MacOS 配置文件位置：**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows 配置文件位置：**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**配置内容：**

```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/你第3步记录的完整路径/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

**MacOS 示例：**
```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/Users/yourname/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

**Windows 示例：**
```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["C:\\Users\\yourname\\chuhai\\dist\\index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

**注意事项：**
- 使用**完整的绝对路径**
- Windows 用户使用双反斜杠 `\\` 或单斜杠 `/`
- 确保 JSON 格式正确（可用 https://jsonlint.com 验证）

### 步骤5：重启 Claude Desktop

**MacOS:**
```bash
killall Claude
open -a Claude
```

**Windows:** 任务管理器结束 Claude 进程，然后重新打开

**Linux:**
```bash
pkill claude
claude &
```

---

## 解决方案4：直接下载文件

如果 git 克隆有问题，可以直接从 GitHub 下载：

1. 访问：https://github.com/henu-wang/chuhai/tree/claude/implement-fmp-api-mcp-011CUakzDVkv3AVk5XBxC52v
2. 点击绿色的 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到你想要的位置
5. 按照**解决方案3**的步骤2-5执行

---

## 测试是否安装成功

### 测试1：检查构建结果

```bash
cd chuhai
node dist/index.js
```

应该看到类似输出：
```
FMP Chuhai MCP Server running on stdio
Server Name: fmp-chuhai-server (区分于其他FMP MCP)
Loaded 153 tools
API Key: N1TAoz9n...
```

按 Ctrl+C 退出。

### 测试2：在 Claude Desktop 中测试

输入：
```
请帮我查询苹果公司(AAPL)的当前股价
```

如果返回股价数据，说明成功！🎉

---

## 常见问题排查

### Q1: `npm install` 失败
**A:** 检查 Node.js 版本：
```bash
node --version
```
需要 v18 或更高。如果版本太低，访问 https://nodejs.org 下载最新版。

### Q2: `npm run build` 报错
**A:** 确保在 chuhai 目录中，并且 package.json 存在：
```bash
cd chuhai
cat package.json
```

### Q3: Claude Desktop 看不到工具
**A:**
1. 检查配置文件路径是否正确
2. 确认 JSON 格式无误
3. **完全重启** Claude Desktop（不是最小化）
4. 查看 dist/index.js 文件是否存在

### Q4: `command not found: node`
**A:** Node.js 未安装或未加入 PATH。安装 Node.js：
- MacOS: `brew install node` 或从 https://nodejs.org 下载
- Windows: 从 https://nodejs.org 下载安装包
- Linux: `sudo apt install nodejs npm` 或 `sudo yum install nodejs npm`

### Q5: 权限错误（MacOS/Linux）
**A:**
```bash
chmod +x dist/index.js
```

---

## 获取完整路径的技巧

### MacOS/Linux:
```bash
cd chuhai
echo "$(pwd)/dist/index.js"
```
复制输出的完整路径。

### Windows (PowerShell):
```powershell
cd chuhai
Write-Host "$PWD\dist\index.js"
```
复制输出的完整路径。

### Windows (CMD):
```cmd
cd chuhai
echo %cd%\dist\index.js
```
复制输出的完整路径。

---

## 仍然有问题？

1. **检查你的当前位置**
   ```bash
   pwd  # MacOS/Linux
   cd   # Windows
   ```

2. **列出当前目录的文件**
   ```bash
   ls -la  # MacOS/Linux
   dir     # Windows
   ```

3. **确认项目结构**
   应该看到这些文件/目录：
   ```
   src/
   dist/
   package.json
   tsconfig.json
   README.md
   setup.sh
   setup.ps1
   ```

4. **查看详细错误信息**
   把完整的错误信息发给我，我可以帮你诊断。

---

**推荐：使用解决方案3（手动安装），这是最可靠的方法！**

只需3个命令：
```bash
npm install
npm run build
# 然后手动配置 Claude Desktop
```

需要帮助？查看完整文档 [INSTALL.md](./INSTALL.md)
