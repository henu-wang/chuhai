# FMP MCP Server - 完整工具列表

本文档列出所有可用的工具及其参数说明。

## 公司信息 (Company Information) - 6个工具

### fmp_get_company_profile
获取公司详细信息
- `symbol` (必需): 股票代码，如 "AAPL"

### fmp_get_company_outlook
获取公司综合展望
- `symbol` (必需): 股票代码

### fmp_get_key_executives
获取公司高管名单
- `symbol` (必需): 股票代码

### fmp_get_company_core
获取公司核心信息（CIK、ISIN、CUSIP等）
- `symbol` (必需): 股票代码

### fmp_get_market_cap
获取历史市值数据
- `symbol` (必需): 股票代码

### fmp_get_employee_count
获取历史员工数量
- `symbol` (必需): 股票代码

## 股票报价 (Stock Quotes) - 10个工具

### fmp_get_quote
获取实时股票报价
- `symbol` (必需): 股票代码

### fmp_get_quote_batch
批量获取多只股票报价
- `symbols` (必需): 逗号分隔的股票代码，如 "AAPL,MSFT,GOOGL"

### fmp_get_full_quote
获取完整报价（包含买卖盘）
- `symbol` (必需): 股票代码

### fmp_get_simple_quote
获取简化报价
- `symbol` (必需): 股票代码

### fmp_get_otc_quote
获取OTC股票报价
- `symbol` (必需): OTC股票代码

### fmp_get_aftermarket_quote
获取盘前/盘后交易数据
- `symbol` (必需): 股票代码

### fmp_get_batch_aftermarket_quote
批量获取盘前/盘后报价
- `symbols` (必需): 逗号分隔的股票代码

### fmp_get_forex_quote
获取外汇报价
- `pair` (必需): 外汇对，如 "EURUSD"

### fmp_get_crypto_quote
获取加密货币报价
- `symbol` (必需): 加密货币对，如 "BTCUSD"

## 财务报表 (Financial Statements) - 10个工具

### fmp_get_income_statement
获取损益表
- `symbol` (必需): 股票代码
- `period` (可选): "annual" 或 "quarter"，默认 "annual"
- `limit` (可选): 返回期数，默认 40

### fmp_get_balance_sheet
获取资产负债表
- `symbol` (必需): 股票代码
- `period` (可选): "annual" 或 "quarter"
- `limit` (可选): 返回期数

### fmp_get_cash_flow_statement
获取现金流量表
- `symbol` (必需): 股票代码
- `period` (可选): "annual" 或 "quarter"
- `limit` (可选): 返回期数

### fmp_get_income_statement_as_reported
获取SEC原始损益表
- `symbol` (必需): 股票代码
- `period` (可选): "FY" 或 "Q1"~"Q4"
- `limit` (可选): 返回期数

### fmp_get_balance_sheet_as_reported
获取SEC原始资产负债表
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

### fmp_get_cash_flow_as_reported
获取SEC原始现金流量表
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

### fmp_get_full_financial_as_reported
获取完整SEC原始财务报表
- `symbol` (必需): 股票代码
- `period` (可选): 期间

### fmp_get_financial_report_dates
获取可用财务报告日期
- `symbol` (必需): 股票代码

### fmp_get_annual_report_json
获取年度报告（10-K）JSON格式
- `symbol` (必需): 股票代码
- `year` (必需): 财年

### fmp_get_quarter_report_json
获取季度报告（10-Q）JSON格式
- `symbol` (必需): 股票代码
- `year` (必需): 财年
- `quarter` (必需): "Q1", "Q2", "Q3", "Q4"

## 财务比率与指标 (Financial Ratios & Metrics) - 8个工具

### fmp_get_financial_ratios
获取财务比率（P/E、P/B、ROE等）
- `symbol` (必需): 股票代码
- `period` (可选): "annual" 或 "quarter"
- `limit` (可选): 返回期数

### fmp_get_key_metrics
获取关键指标
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

### fmp_get_enterprise_value
获取企业价值
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

### fmp_get_financial_growth
获取财务增长指标
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

### fmp_get_rating
获取FMP评级
- `symbol` (必需): 股票代码

### fmp_get_historical_rating
获取历史评级
- `symbol` (必需): 股票代码
- `limit` (可选): 返回数量

### fmp_get_dcf
获取DCF估值
- `symbol` (必需): 股票代码

### fmp_get_historical_dcf
获取历史DCF估值
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 返回期数

## 历史价格数据 (Historical Price Data) - 5个工具

### fmp_get_historical_daily
获取日线历史数据
- `symbol` (必需): 股票代码
- `from` (可选): 开始日期 "YYYY-MM-DD"
- `to` (可选): 结束日期 "YYYY-MM-DD"

### fmp_get_historical_chart
获取分钟级历史数据
- `symbol` (必需): 股票代码
- `interval` (必需): "1min", "5min", "15min", "30min", "1hour", "4hour"
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_historical_dividends
获取历史分红数据
- `symbol` (必需): 股票代码

### fmp_get_historical_splits
获取历史拆股数据
- `symbol` (必需): 股票代码

### fmp_get_survivorship_bias_free
获取无幸存者偏差数据
- `symbol` (必需): 股票代码

## 新闻与公告 (News & Press Releases) - 4个工具

### fmp_get_stock_news
获取股票新闻
- `symbol` (可选): 股票代码，不填则返回所有股票新闻
- `limit` (可选): 数量，默认 50
- `page` (可选): 页码

### fmp_get_fmp_articles
获取FMP文章
- `page` (可选): 页码
- `size` (可选): 页面大小

### fmp_get_general_news
获取一般市场新闻
- `page` (可选): 页码

### fmp_get_press_releases
获取公司新闻稿
- `symbol` (必需): 股票代码
- `limit` (可选): 数量
- `page` (可选): 页码

## 日历与事件 (Calendar & Events) - 7个工具

### fmp_get_earnings_calendar
获取财报日历
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_historical_earnings
获取历史财报数据
- `symbol` (必需): 股票代码
- `limit` (可选): 数量

### fmp_get_earnings_surprises
获取财报惊喜（实际vs预期）
- `symbol` (必需): 股票代码

### fmp_get_ipo_calendar
获取IPO日历
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_stock_split_calendar
获取拆股日历
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_dividend_calendar
获取分红日历
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_economic_calendar
获取经济日历
- `from` (可选): 开始日期
- `to` (可选): 结束日期

## 分析师数据 (Analyst Data) - 6个工具

### fmp_get_analyst_estimates
获取分析师预估
- `symbol` (必需): 股票代码
- `period` (可选): 期间
- `limit` (可选): 数量

### fmp_get_analyst_recommendations
获取分析师建议
- `symbol` (必需): 股票代码

### fmp_get_price_target
获取目标价格
- `symbol` (必需): 股票代码

### fmp_get_price_target_summary
获取目标价格汇总
- `symbol` (必需): 股票代码

### fmp_get_upgrades_downgrades
获取评级升降级
- `symbol` (必需): 股票代码

### fmp_get_upgrades_downgrades_consensus
获取评级共识
- `symbol` (必需): 股票代码

## 内部交易 (Insider Trading) - 5个工具

### fmp_get_insider_trading
获取内部交易记录
- `symbol` (必需): 股票代码
- `limit` (可选): 数量
- `page` (可选): 页码

### fmp_get_insider_trading_rss
获取内部交易RSS订阅
- `page` (可选): 页码

### fmp_get_cik_mapper
获取CIK映射
- `name` (可选): 公司名称
- `symbol` (可选): 股票代码

### fmp_get_insider_roster
获取内部人员名单
- `symbol` (必需): 股票代码

### fmp_get_insider_statistics
获取内部交易统计
- `symbol` (必需): 股票代码

## 机构持股 (Institutional Holdings) - 7个工具

### fmp_get_institutional_holdings
获取机构持股
- `symbol` (必需): 股票代码

### fmp_get_mutual_fund_holdings
获取共同基金持股
- `symbol` (必需): 股票代码

### fmp_get_etf_holdings
获取ETF持股
- `symbol` (必需): ETF代码

### fmp_get_etf_sector_weightings
获取ETF行业配置
- `symbol` (必需): ETF代码

### fmp_get_etf_country_weightings
获取ETF国家配置
- `symbol` (必需): ETF代码

### fmp_get_form_13f
获取13F报告
- `cik` (必需): CIK号码
- `date` (必需): 日期

### fmp_get_cusip_mapper
根据CUSIP获取股票代码
- `cusip` (必需): CUSIP标识

## SEC文件 (SEC Filings) - 2个工具

### fmp_get_sec_filings
获取SEC文件
- `symbol` (必需): 股票代码
- `type` (可选): 文件类型（10-K、10-Q、8-K等）
- `limit` (可选): 数量
- `page` (可选): 页码

### fmp_get_rss_feed
获取8-K文件RSS订阅
- `type` (可选): 文件类型
- `limit` (可选): 数量
- `page` (可选): 页码

## 市场指标 (Market Indicators) - 7个工具

### fmp_get_sector_performance
获取当前行业表现
无参数

### fmp_get_historical_sector_performance
获取历史行业表现
- `limit` (可选): 期数

### fmp_get_market_hours
检查市场是否开盘
无参数

### fmp_get_delisted
获取退市公司列表
- `limit` (可选): 数量
- `page` (可选): 页码

### fmp_get_stock_screener
股票筛选器
- `marketCapMoreThan` (可选): 最小市值
- `betaMoreThan` (可选): 最小Beta值
- `volumeMoreThan` (可选): 最小成交量
- `sector` (可选): 行业
- `exchange` (可选): 交易所
- `limit` (可选): 结果数量

### fmp_get_gainers_losers
获取涨幅榜
无参数

### fmp_get_most_active
获取成交活跃榜
无参数

## 加密货币与外汇 (Crypto & Forex) - 5个工具

### fmp_get_crypto_list
获取可用加密货币列表
无参数

### fmp_get_forex_list
获取可用外汇对列表
无参数

### fmp_get_crypto_quote
获取加密货币报价
- `symbol` (必需): 加密货币代码

### fmp_get_crypto_historical
获取加密货币历史数据
- `symbol` (必需): 加密货币代码
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_forex_historical
获取外汇历史数据
- `pair` (必需): 外汇对
- `from` (可选): 开始日期
- `to` (可选): 结束日期

## 大宗商品与经济 (Commodities & Economics) - 5个工具

### fmp_get_commodities_list
获取可用大宗商品列表
无参数

### fmp_get_commodity_quote
获取大宗商品报价
- `symbol` (必需): 商品代码

### fmp_get_commodity_historical
获取大宗商品历史数据
- `symbol` (必需): 商品代码
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_treasury_rates
获取美国国债利率
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_get_economic_indicator
获取经济指标
- `indicator` (必需): 指标名称（如 "GDP", "unemploymentRate"）
- `from` (可选): 开始日期
- `to` (可选): 结束日期

## 技术指标 (Technical Indicators) - 5个工具

### fmp_get_sma
获取简单移动平均（SMA）
- `symbol` (必需): 股票代码
- `period` (必需): 周期（如 50, 200）
- `type` (必需): 时间间隔

### fmp_get_ema
获取指数移动平均（EMA）
- `symbol` (必需): 股票代码
- `period` (必需): 周期
- `type` (必需): 时间间隔

### fmp_get_rsi
获取相对强弱指标（RSI）
- `symbol` (必需): 股票代码
- `period` (必需): 周期（通常14）
- `type` (必需): 时间间隔

### fmp_get_adx
获取平均趋向指标（ADX）
- `symbol` (必需): 股票代码
- `period` (必需): 周期
- `type` (必需): 时间间隔

### fmp_get_standard_deviation
获取标准差
- `symbol` (必需): 股票代码
- `period` (必需): 周期
- `type` (必需): 时间间隔

## 搜索与发现 (Search & Discovery) - 6个工具

### fmp_search_stock
搜索股票
- `query` (必需): 搜索关键词
- `limit` (可选): 结果数量
- `exchange` (可选): 交易所

### fmp_search_name
按公司名称搜索
- `query` (必需): 公司名称
- `limit` (可选): 结果数量
- `exchange` (可选): 交易所

### fmp_get_symbols_list
获取所有股票代码列表
无参数

### fmp_get_etf_list
获取所有ETF列表
无参数

### fmp_get_tradable_symbols
获取可交易符号列表
无参数

### fmp_get_exchanges_list
获取所有交易所列表
无参数

## 财报电话会议 (Earnings Transcripts) - 3个工具

### fmp_get_earnings_call_transcript
获取财报电话会议记录
- `symbol` (必需): 股票代码
- `quarter` (必需): 季度（1-4）
- `year` (必需): 年份

### fmp_get_batch_earnings_call_transcript
批量获取财报会议记录
- `symbol` (必需): 股票代码
- `year` (必需): 年份

### fmp_get_earnings_call_dates
获取可用财报电话会议日期
- `symbol` (必需): 股票代码

## ESG评分 (ESG Scores) - 2个工具

### fmp_get_esg_score
获取ESG评分
- `symbol` (必需): 股票代码

### fmp_get_esg_ratings
获取ESG评级
- `symbol` (必需): 股票代码

## 高级指标 (Advanced Metrics) - 3个工具

### fmp_get_owner_earnings
获取所有者收益
- `symbol` (必需): 股票代码

### fmp_get_shares_float
获取当前流通股
- `symbol` (必需): 股票代码

### fmp_get_historical_shares_float
获取历史流通股数据
- `symbol` (必需): 股票代码

## 并购数据 (Mergers & Acquisitions) - 2个工具

### fmp_get_mergers_acquisitions
获取并购新闻
- `from` (可选): 开始日期
- `to` (可选): 结束日期

### fmp_search_mergers_acquisitions
搜索并购信息
- `name` (必需): 公司名称

## 参议院交易 (Senate Trading) - 2个工具

### fmp_get_senate_trading
获取参议院股票交易
- `symbol` (可选): 股票代码

### fmp_get_senate_disclosure
获取参议院财务披露
- `symbol` (可选): 股票代码

## 批量数据 (Bulk Data) - 3个工具

### fmp_get_bulk_profiles
批量获取公司简介
无参数

### fmp_get_bulk_quotes
批量获取NYSE报价
无参数

### fmp_get_batch_eod_prices
批量获取收盘价
- `date` (必需): 日期 "YYYY-MM-DD"

---

**总计：153个工具**

涵盖FMP API的所有主要功能类别。
