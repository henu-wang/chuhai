# 快速开始 - 5分钟上手FMP MCP Server

## 🎯 目标

让Claude Desktop能够访问Financial Modeling Prep的所有金融数据API。

## ⚡ 超快安装（3个命令）

### MacOS / Linux

```bash
git clone https://github.com/henu-wang/chuhai.git
cd chuhai
chmod +x setup.sh && ./setup.sh
```

### Windows (PowerShell)

```powershell
git clone https://github.com/henu-wang/chuhai.git
cd chuhai
.\setup.ps1
```

脚本会自动：
- ✅ 检查Node.js版本
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 显示配置信息

## 📝 配置Claude Desktop

安装脚本运行后，会显示配置内容。复制到Claude Desktop配置文件中。

### 找到配置文件

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

### 配置内容

脚本会自动生成正确的配置，类似这样：

```json
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["/你的路径/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

## 🔄 重启Claude Desktop

配置完成后，**完全关闭**并**重新启动** Claude Desktop。

## ✅ 测试

在Claude Desktop中输入：

```
请帮我查询苹果公司(AAPL)的当前股价
```

如果Claude能返回股价数据，说明配置成功！🎉

## 🎮 试试这些功能

### 1. 查询股票信息
```
请帮我获取特斯拉(TSLA)的公司简介
```

### 2. 查看财务数据
```
请展示微软(MSFT)最近3年的年度损益表
```

### 3. 搜索公司
```
搜索所有与"电动车"相关的上市公司
```

### 4. 查看新闻
```
给我看看苹果公司最近的新闻
```

### 5. 分析师评级
```
特斯拉的分析师目标价是多少？
```

### 6. 财报日历
```
下周有哪些公司要发布财报？
```

### 7. 技术指标
```
计算AAPL的50日简单移动平均线
```

### 8. 加密货币
```
比特币现在多少钱？
```

## 🎓 更多功能

这个MCP服务器提供**153个工具**，涵盖：

- 📊 公司信息和财务报表
- 💹 实时股票报价
- 📈 历史价格数据
- 📰 新闻和公告
- 👥 分析师评级
- 🔍 内部交易和机构持股
- 💰 加密货币和外汇
- 📊 技术指标
- 🌱 ESG评分
- ...等等更多！

查看 `TOOLS.md` 了解所有可用工具。

## 🔧 常见问题

### Q: 工具没有出现？
A: 完全重启Claude Desktop（不是最小化，是退出）

### Q: 调用失败？
A: 检查网络连接和API Key配置

### Q: 想看调试信息？
A: 在项目目录运行 `npm run dev` 查看日志

## 📚 完整文档

- `README.md` - 详细功能介绍
- `INSTALL.md` - 完整安装指南
- `TOOLS.md` - 所有工具参考

## 🎯 实用案例

### 投资研究
```
帮我分析苹果公司的财务健康状况，包括：
1. 最新财务比率
2. 过去5年的收入增长
3. 分析师评级
4. 内部人交易情况
```

### 市场监控
```
今天美股市场表现如何？给我看：
1. 各行业表现
2. 涨幅榜前10
3. 成交量最大的股票
```

### 新股分析
```
最近有什么新的IPO？帮我筛选出科技行业的
```

### 技术分析
```
对TSLA进行技术分析：
1. RSI指标
2. 50日和200日移动平均线
3. 最近一个月的价格走势
```

---

**就这么简单！现在开始探索金融数据的世界吧！** 🚀

有问题？查看详细文档或在GitHub上提Issue。

出海！一定要出海！
