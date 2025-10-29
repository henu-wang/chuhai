# FMP MCP Server - 出海！

完整的Financial Modeling Prep (FMP) API的Model Context Protocol (MCP)服务器实现。提供150+个工具，涵盖所有FMP API功能。

## 功能特性

这个MCP服务器提供对FMP API所有主要功能的访问，包括：

### 📊 公司信息 (Company Information)
- 公司简介、高管信息
- 公司核心数据（CIK、ISIN、CUSIP）
- 市值和员工数历史数据

### 💹 股票报价 (Stock Quotes)
- 实时股票报价
- 批量报价查询
- 盘前/盘后交易数据
- OTC股票报价

### 📈 财务报表 (Financial Statements)
- 损益表（Income Statement）
- 资产负债表（Balance Sheet）
- 现金流量表（Cash Flow Statement）
- SEC原始报告数据
- 年度和季度报告（10-K、10-Q）

### 📉 财务比率与指标 (Financial Ratios & Metrics)
- 财务比率（P/E、P/B、ROE等）
- 关键指标（市值、EPS、每股收入等）
- 企业价值（Enterprise Value）
- DCF估值（Discounted Cash Flow）
- 财务增长指标

### 📅 历史价格数据 (Historical Price Data)
- 日线历史数据
- 分钟级历史数据（1分钟、5分钟、15分钟等）
- 历史分红和拆股数据
- 无幸存者偏差数据

### 📰 新闻与公告 (News & Press Releases)
- 股票新闻
- FMP文章分析
- 一般市场新闻
- 公司新闻稿

### 📆 日历与事件 (Calendar & Events)
- 财报日历
- IPO日历
- 股票拆分日历
- 分红日历
- 经济日历

### 👥 分析师数据 (Analyst Data)
- 分析师预估
- 分析师建议
- 目标价格
- 评级升降级

### 🔍 内部交易 (Insider Trading)
- 内部交易记录
- 内部人员名单
- 内部交易统计
- CIK查询

### 🏦 机构持股 (Institutional Holdings)
- 机构持股信息
- 共同基金持股
- ETF持股和配置
- 13F报告

### 📄 SEC文件 (SEC Filings)
- SEC文件查询（10-K、10-Q、8-K等）
- RSS订阅源

### 📊 市场指标 (Market Indicators)
- 行业表现
- 市场时间查询
- 股票筛选器
- 涨跌幅排行
- 成交量排行

### 💰 加密货币与外汇 (Crypto & Forex)
- 加密货币报价和历史数据
- 外汇对报价和历史数据
- 可用交易对列表

### 🌾 大宗商品与经济 (Commodities & Economics)
- 大宗商品报价和历史数据
- 美国国债利率
- 经济指标（GDP、失业率、CPI等）

### 📈 技术指标 (Technical Indicators)
- SMA（简单移动平均）
- EMA（指数移动平均）
- RSI（相对强弱指标）
- ADX（平均趋向指标）
- 标准差

### 🔎 搜索与发现 (Search & Discovery)
- 股票搜索
- 公司名称搜索
- 符号列表
- ETF列表
- 交易所列表

### 🎤 财报电话会议 (Earnings Transcripts)
- 财报电话会议记录
- 批量记录下载
- 可用日期查询

### 🌱 ESG评分 (ESG Scores)
- 环境、社会和治理评分
- ESG评级

### 📊 高级指标 (Advanced Metrics)
- 所有者收益
- 流通股数据
- 历史流通股

### 🤝 并购数据 (Mergers & Acquisitions)
- 并购新闻
- 并购搜索

### 🏛️ 参议院交易 (Senate Trading)
- 美国参议院股票交易活动
- 财务披露报告

### 📦 批量数据 (Bulk Data)
- 批量公司简介
- 批量报价
- 批量收盘价

## 安装

### 前置要求

- Node.js 18 或更高版本
- FMP API Key（从 https://financialmodelingprep.com 获取）

### 安装步骤

1. 克隆仓库：
```bash
git clone <repository-url>
cd chuhai
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，添加你的 API Key
```

4. 构建项目：
```bash
npm run build
```

## 使用方法

### 开发模式

```bash
npm run dev
```

### 生产模式

```bash
npm run build
npm start
```

### 在Claude Desktop中使用

在Claude Desktop配置文件中添加以下内容：

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["/path/to/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## 可用工具示例

### 获取公司简介
```
工具: fmp_get_company_profile
参数: { "symbol": "AAPL" }
```

### 获取实时报价
```
工具: fmp_get_quote
参数: { "symbol": "TSLA" }
```

### 获取损益表
```
工具: fmp_get_income_statement
参数: {
  "symbol": "MSFT",
  "period": "annual",
  "limit": 5
}
```

### 获取历史价格
```
工具: fmp_get_historical_daily
参数: {
  "symbol": "GOOGL",
  "from": "2024-01-01",
  "to": "2024-12-31"
}
```

### 搜索股票
```
工具: fmp_search_stock
参数: {
  "query": "apple",
  "limit": 10
}
```

### 获取财报日历
```
工具: fmp_get_earnings_calendar
参数: {
  "from": "2025-01-01",
  "to": "2025-01-31"
}
```

## 工具分类

服务器提供150+个工具，按以下类别组织：

1. **公司信息** (6个工具) - 公司简介、高管、核心信息等
2. **股票报价** (10个工具) - 实时报价、批量报价、盘前盘后等
3. **财务报表** (10个工具) - 三大报表及SEC原始数据
4. **财务比率** (8个工具) - 各类财务比率和估值指标
5. **历史价格** (5个工具) - 日线、分钟级历史数据
6. **新闻** (4个工具) - 股票新闻和公司公告
7. **日历** (7个工具) - 各类事件日历
8. **分析师** (6个工具) - 分析师预估和建议
9. **内部交易** (5个工具) - 内部人交易数据
10. **机构持股** (7个工具) - 机构和ETF持股
11. **SEC文件** (2个工具) - SEC文件查询
12. **市场数据** (7个工具) - 市场指标和筛选
13. **加密货币** (5个工具) - 加密货币和外汇
14. **大宗商品** (5个工具) - 商品和经济数据
15. **技术指标** (5个工具) - 各类技术分析指标
16. **搜索** (6个工具) - 搜索和发现功能
17. **财报记录** (3个工具) - 财报电话会议记录
18. **ESG** (2个工具) - ESG评分和评级
19. **高级指标** (3个工具) - 所有者收益、流通股等
20. **并购** (2个工具) - 并购新闻和搜索
21. **参议院** (2个工具) - 参议院交易数据
22. **批量数据** (3个工具) - 批量数据端点

## API限制

请注意FMP API的使用限制：
- 免费计划：250次请求/天
- Starter计划：250次请求/分钟
- Professional+计划：更高限制

某些端点（如批量数据）可能需要更高级别的订阅。

## 项目结构

```
chuhai/
├── src/
│   ├── index.ts          # MCP服务器主入口
│   ├── api-client.ts     # FMP API客户端
│   ├── tools.ts          # 所有工具定义和实现
│   └── types.ts          # TypeScript类型定义
├── dist/                 # 编译输出目录
├── package.json
├── tsconfig.json
├── .env                  # 环境变量（不提交到git）
├── .env.example          # 环境变量示例
└── README.md
```

## 开发

### 添加新工具

1. 在 `src/tools.ts` 中添加工具处理函数
2. 在 `getAllTools()` 方法中注册工具定义
3. 重新构建项目

### 调试

使用MCP Inspector进行调试：

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## 故障排除

### API Key错误
确保 `.env` 文件中的 `FMP_API_KEY` 配置正确。

### 请求超时
某些批量端点可能需要较长时间，可以在 `src/api-client.ts` 中调整超时设置。

### 工具未显示
重启Claude Desktop应用程序以重新加载MCP配置。

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！

## 相关链接

- [FMP API 文档](https://site.financialmodelingprep.com/developer/docs)
- [MCP SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude Desktop](https://claude.ai/desktop)

---

出海！一定要出海！🚀
