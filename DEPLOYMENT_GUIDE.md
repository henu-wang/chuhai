# 🚀 本地部署指南 - 让Claude Desktop使用FMP MCP

## 📦 项目已完成

✅ **153个FMP API工具**已全部实现并测试
✅ 代码已推送到GitHub仓库
✅ 完整文档已准备就绪
✅ 自动化安装脚本已创建

## 🎯 你的下一步操作

### 步骤1️⃣: 在你的本地电脑克隆项目

打开终端（MacOS/Linux）或PowerShell（Windows），运行：

```bash
# 克隆项目到本地
git clone https://github.com/henu-wang/chuhai.git

# 进入项目目录
cd chuhai
```

### 步骤2️⃣: 运行自动安装脚本

#### 如果你使用 MacOS 或 Linux：

```bash
chmod +x setup.sh
./setup.sh
```

#### 如果你使用 Windows：

```powershell
.\setup.ps1
```

脚本会自动完成：
- ✅ 检查Node.js环境
- ✅ 安装项目依赖
- ✅ 编译TypeScript代码
- ✅ 生成配置信息

### 步骤3️⃣: 配置Claude Desktop

安装脚本完成后，会显示一段JSON配置。

#### 找到Claude Desktop配置文件：

**MacOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

#### 添加配置：

将脚本输出的JSON配置复制到配置文件中。配置类似这样：

```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/你的完整路径/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

**重要提示：**
- 确保路径是**绝对路径**（完整路径）
- Windows用户注意使用双反斜杠 `\\` 或单斜杠 `/`
- 确保JSON格式正确（可以用在线JSON验证器检查）

### 步骤4️⃣: 重启Claude Desktop

**完全退出** Claude Desktop（不是最小化），然后重新打开。

#### MacOS:
```bash
# 完全退出
killall Claude

# 重新启动
open -a Claude
```

#### Windows:
- 任务管理器中结束Claude进程
- 重新打开Claude Desktop

#### Linux:
```bash
pkill claude
claude &
```

### 步骤5️⃣: 测试功能

在Claude Desktop中输入以下任意一句来测试：

```
请帮我查询苹果公司(AAPL)的当前股价
```

或

```
搜索特斯拉相关的股票信息
```

或

```
给我看看微软最新的财务数据
```

如果Claude能返回详细的金融数据，**恭喜你，部署成功！** 🎉

## 🎮 可以做什么？

现在你的Claude Desktop拥有**153个金融数据工具**，你可以：

### 📊 投资研究
```
分析苹果公司的财务健康状况，包括：
- 最新的财务比率
- 过去5年的收入增长趋势
- 分析师评级和目标价
- 内部人交易情况
```

### 💹 实时监控
```
今天美股市场表现如何？显示：
- 各行业涨跌幅
- 成交量最大的股票
- 涨幅榜和跌幅榜前10
```

### 📈 技术分析
```
对特斯拉进行技术分析：
- 计算50日和200日移动平均线
- RSI指标
- 最近一个月的价格走势图数据
```

### 📰 新闻追踪
```
给我看看英伟达最近一周的所有新闻和公告
```

### 🔍 公司搜索
```
帮我找出所有市值超过1000亿美元的科技公司
```

### 📅 事件提醒
```
未来两周有哪些重要公司要发布财报？
```

## 📚 文档参考

- **[QUICKSTART.md](./QUICKSTART.md)** - 快速开始（5分钟）
- **[INSTALL.md](./INSTALL.md)** - 详细安装和故障排除
- **[TOOLS.md](./TOOLS.md)** - 所有153个工具详细说明
- **[README.md](./README.md)** - 完整项目文档

## 🔧 常见问题

### Q: 看不到FMP工具？
**A:**
1. 检查配置文件路径是否正确
2. 确认JSON格式无误
3. **完全重启**Claude Desktop（不是最小化）
4. 检查控制台是否有错误信息

### Q: 工具调用失败？
**A:**
1. 检查网络连接
2. 验证API Key是否正确
3. 运行测试脚本：`node test-mcp.js`

### Q: 如何查看详细日志？
**A:**
在项目目录运行：
```bash
npm run dev
```
这会启动开发模式，显示所有调试信息。

### Q: 如何更新到最新版本？
**A:**
```bash
cd chuhai
git pull
npm install
npm run build
# 然后重启Claude Desktop
```

## 🎯 项目结构

```
chuhai/
├── src/                    # 源代码
│   ├── index.ts           # MCP服务器入口
│   ├── api-client.ts      # API客户端
│   ├── tools.ts           # 153个工具实现
│   └── types.ts           # 类型定义
├── dist/                   # 编译输出（执行文件在这里）
├── docs/                   # 文档
│   ├── QUICKSTART.md      # 快速开始
│   ├── INSTALL.md         # 安装指南
│   └── TOOLS.md           # 工具参考
├── setup.sh               # MacOS/Linux安装脚本
├── setup.ps1              # Windows安装脚本
├── test-mcp.js            # 测试脚本
├── package.json           # 项目配置
└── README.md              # 主文档
```

## 🌟 专业提示

1. **书签常用查询**：将常用的金融查询保存为Claude的对话模板
2. **组合使用工具**：让Claude同时查询多个数据源进行对比分析
3. **定期更新**：定期`git pull`获取最新功能
4. **自定义脚本**：可以基于这些工具创建自己的分析脚本

## 🎊 你现在拥有的能力

通过Claude Desktop + FMP MCP，你可以：

- 📊 访问**数千家**上市公司的实时和历史数据
- 💰 追踪股票、加密货币、外汇、大宗商品
- 📈 进行技术分析和基本面分析
- 📰 获取最新的金融新闻和公告
- 👥 查看内部交易和机构持仓
- 📅 追踪重要的财经日历事件
- 🌱 评估ESG（环境、社会、治理）指标
- 🏛️ 监控政府官员的股票交易
- ...还有更多！

## 📞 获取帮助

遇到问题？
1. 查看 [INSTALL.md](./INSTALL.md) 的故障排除部分
2. 运行测试脚本验证配置
3. 在GitHub上提Issue

## 🎉 开始使用吧！

一切就绪！现在打开Claude Desktop，开始探索金融数据的无限可能。

记住项目口号：**出海！一定要出海！** 🚀

---

**祝你使用愉快！如有任何问题，随时查阅文档或寻求帮助。**
