import type { FMPApiClient } from './api-client.js';
import type { ToolDefinition, ToolHandler } from './types.js';

export class FMPTools {
  private client: FMPApiClient;

  constructor(client: FMPApiClient) {
    this.client = client;
  }

  // =============================================================================
  // 1. COMPANY INFORMATION & PROFILE
  // =============================================================================

  getCompanyProfile: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/profile/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCompanyOutlook: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/company-outlook`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getKeyExecutives: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/key-executives/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCompanyCore: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/company-core-information`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getMarketCap: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/market-capitalization/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEmployeeCount: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/employee_count`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 2. STOCK QUOTES & PRICES
  // =============================================================================

  getQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/quote/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getQuoteBatch: ToolHandler = async (args: { symbols: string }) => {
    const data = await this.client.get(`/api/v3/quote/${args.symbols}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getFullQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/quote-order/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getSimpleQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/quote-short/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getOTCQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/otc/real-time-price/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getStockPriceFull: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/stock/full/real-time-price/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getAftermarketQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/pre-post-market-trade/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBatchAftermarketQuote: ToolHandler = async (args: { symbols: string }) => {
    const data = await this.client.get(`/api/v4/batch-pre-post-market-trade/${args.symbols}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getLastForex: ToolHandler = async (args: { pair: string }) => {
    const data = await this.client.get(`/api/v3/fx/${args.pair}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getLastCrypto: ToolHandler = async (args: { pair: string }) => {
    const data = await this.client.get(`/api/v3/quote/${args.pair}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 3. FINANCIAL STATEMENTS
  // =============================================================================

  getIncomeStatement: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/income-statement/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBalanceSheet: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/balance-sheet-statement/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCashFlowStatement: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/cash-flow-statement/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getIncomeStatementAsReported: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/income-statement-as-reported/${args.symbol}`, {
      period: args.period,
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBalanceSheetAsReported: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/balance-sheet-statement-as-reported/${args.symbol}`, {
      period: args.period,
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCashFlowAsReported: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/cash-flow-statement-as-reported/${args.symbol}`, {
      period: args.period,
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getFullFinancialAsReported: ToolHandler = async (args: { symbol: string; period?: string }) => {
    const data = await this.client.get(`/api/v3/financial-statement-full-as-reported/${args.symbol}`, {
      period: args.period
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getFinancialReportDates: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/financial-reports-dates`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getAnnualReportJSON: ToolHandler = async (args: { symbol: string; year: number }) => {
    const data = await this.client.get(`/api/v4/financial-reports-json`, {
      symbol: args.symbol,
      year: args.year,
      period: 'FY'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getQuarterReportJSON: ToolHandler = async (args: { symbol: string; year: number; quarter: string }) => {
    const data = await this.client.get(`/api/v4/financial-reports-json`, {
      symbol: args.symbol,
      year: args.year,
      period: args.quarter
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 4. FINANCIAL RATIOS & METRICS
  // =============================================================================

  getFinancialRatios: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/ratios/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getKeyMetrics: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/key-metrics/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEnterpriseValue: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/enterprise-values/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getFinancialGrowth: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/financial-growth/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getRating: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/rating/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalRating: ToolHandler = async (args: { symbol: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/historical-rating/${args.symbol}`, {
      limit: args.limit || 100
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getDiscountedCashFlow: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/discounted-cash-flow/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalDCF: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/historical-discounted-cash-flow-statement/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 40
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 5. HISTORICAL PRICE DATA
  // =============================================================================

  getHistoricalDaily: ToolHandler = async (args: { symbol: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/${args.symbol}`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalChart: ToolHandler = async (args: { symbol: string; interval: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/historical-chart/${args.interval}/${args.symbol}`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalDividends: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/stock_dividend/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalSplits: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/stock_split/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getSurvivorshipBiasFree: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/historical-price-adjusted-full/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 6. NEWS & PRESS RELEASES
  // =============================================================================

  getStockNews: ToolHandler = async (args: { symbol?: string; limit?: number; page?: number }) => {
    const params: any = { limit: args.limit || 50 };
    if (args.symbol) params.tickers = args.symbol;
    if (args.page) params.page = args.page;

    const data = await this.client.get(`/api/v3/stock_news`, params);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getFMPArticles: ToolHandler = async (args: { page?: number; size?: number }) => {
    const data = await this.client.get(`/api/v3/fmp/articles`, {
      page: args.page || 0,
      size: args.size || 50
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getGeneralNews: ToolHandler = async (args: { page?: number }) => {
    const data = await this.client.get(`/api/v4/general_news`, {
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getPressReleases: ToolHandler = async (args: { symbol: string; limit?: number; page?: number }) => {
    const data = await this.client.get(`/api/v3/press-releases/${args.symbol}`, {
      limit: args.limit || 100,
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 7. CALENDAR & EVENTS
  // =============================================================================

  getEarningsCalendar: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/earning_calendar`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalEarnings: ToolHandler = async (args: { symbol: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/historical/earning_calendar/${args.symbol}`, {
      limit: args.limit || 80
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEarningsSurprises: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/earnings-surprises/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getIPOCalendar: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/ipo_calendar`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getStockSplitCalendar: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/stock_split_calendar`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getDividendCalendar: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/stock_dividend_calendar`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEconomicCalendar: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/economic_calendar`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 8. ANALYST ESTIMATES & RECOMMENDATIONS
  // =============================================================================

  getAnalystEstimates: ToolHandler = async (args: { symbol: string; period?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/analyst-estimates/${args.symbol}`, {
      period: args.period || 'annual',
      limit: args.limit || 30
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getAnalystRecommendations: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/analyst-stock-recommendations/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getPriceTarget: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/price-target`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getPriceTargetSummary: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/price-target-summary`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getUpgradesDowngrades: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/upgrades-downgrades`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getUpgradesDowngradesConsensus: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/upgrades-downgrades-consensus`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 9. INSIDER TRADING
  // =============================================================================

  getInsiderTrading: ToolHandler = async (args: { symbol: string; limit?: number; page?: number }) => {
    const data = await this.client.get(`/api/v4/insider-trading`, {
      symbol: args.symbol,
      limit: args.limit || 100,
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getInsiderTradingRSS: ToolHandler = async (args: { page?: number }) => {
    const data = await this.client.get(`/api/v4/insider-trading-rss-feed`, {
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCIKMapper: ToolHandler = async (args: { name?: string; symbol?: string }) => {
    const params: any = {};
    if (args.name) params.name = args.name;
    if (args.symbol) params.symbol = args.symbol;

    const data = await this.client.get(`/api/v3/cik_list`, params);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getInsiderRoster: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/insider-roaster`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getInsiderStatistics: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/insider-roaster-statistic`, { symbol: args.symbol });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 10. INSTITUTIONAL HOLDINGS & OWNERSHIP
  // =============================================================================

  getInstitutionalHoldings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/institutional-holder/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getMutualFundHoldings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/mutual-fund-holder/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getETFHoldings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/etf-holder/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getETFSectorWeightings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/etf-sector-weightings/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getETFCountryWeightings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/etf-country-weightings/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getForm13FList: ToolHandler = async (args: { cik: string; date: string }) => {
    const data = await this.client.get(`/api/v3/form-thirteen/${args.cik}`, { date: args.date });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCUSIPMapper: ToolHandler = async (args: { cusip: string }) => {
    const data = await this.client.get(`/api/v3/cusip/${args.cusip}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 11. SEC FILINGS
  // =============================================================================

  getSECFilings: ToolHandler = async (args: { symbol: string; type?: string; limit?: number; page?: number }) => {
    const data = await this.client.get(`/api/v3/sec_filings/${args.symbol}`, {
      type: args.type,
      limit: args.limit || 100,
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getRSSFeed: ToolHandler = async (args: { type?: string; limit?: number; page?: number }) => {
    const data = await this.client.get(`/api/v4/rss_feed_8k`, {
      type: args.type,
      limit: args.limit || 100,
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 12. MARKET INDICATORS & STATISTICS
  // =============================================================================

  getSectorPerformance: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/sector-performance`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalSectorPerformance: ToolHandler = async (args: { limit?: number }) => {
    const data = await this.client.get(`/api/v3/historical-sectors-performance`, {
      limit: args.limit || 30
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getMarketHours: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/is-the-market-open`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getDelisted: ToolHandler = async (args: { limit?: number; page?: number }) => {
    const data = await this.client.get(`/api/v3/delisted-companies`, {
      limit: args.limit || 100,
      page: args.page || 0
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getStockScreener: ToolHandler = async (args: { marketCapMoreThan?: number; betaMoreThan?: number; volumeMoreThan?: number; sector?: string; exchange?: string; limit?: number }) => {
    const data = await this.client.get(`/api/v3/stock-screener`, {
      marketCapMoreThan: args.marketCapMoreThan,
      betaMoreThan: args.betaMoreThan,
      volumeMoreThan: args.volumeMoreThan,
      sector: args.sector,
      exchange: args.exchange,
      limit: args.limit || 100
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getGainersLosers: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/stock_market/gainers`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getMostActive: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/stock_market/actives`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 13. CRYPTO & FOREX
  // =============================================================================

  getCryptoList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/symbol/available-cryptocurrencies`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getForexList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/symbol/available-forex-currency-pairs`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCryptoQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/quote/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCryptoHistorical: ToolHandler = async (args: { symbol: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/${args.symbol}`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getForexHistorical: ToolHandler = async (args: { pair: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/${args.pair}`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 14. COMMODITIES & ECONOMICS
  // =============================================================================

  getCommoditiesList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/symbol/available-commodities`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCommodityQuote: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v3/quote/${args.symbol}`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getCommodityHistorical: ToolHandler = async (args: { symbol: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v3/historical-price-full/${args.symbol}`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getTreasuryRates: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v4/treasury`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEconomicIndicator: ToolHandler = async (args: { indicator: string; from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v4/economic`, {
      name: args.indicator,
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 15. TECHNICAL INDICATORS
  // =============================================================================

  getSMA: ToolHandler = async (args: { symbol: string; period: number; type: string }) => {
    const data = await this.client.get(`/api/v3/technical_indicator/${args.type}/${args.symbol}`, {
      period: args.period,
      type: 'sma'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEMA: ToolHandler = async (args: { symbol: string; period: number; type: string }) => {
    const data = await this.client.get(`/api/v3/technical_indicator/${args.type}/${args.symbol}`, {
      period: args.period,
      type: 'ema'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getRSI: ToolHandler = async (args: { symbol: string; period: number; type: string }) => {
    const data = await this.client.get(`/api/v3/technical_indicator/${args.type}/${args.symbol}`, {
      period: args.period,
      type: 'rsi'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getADX: ToolHandler = async (args: { symbol: string; period: number; type: string }) => {
    const data = await this.client.get(`/api/v3/technical_indicator/${args.type}/${args.symbol}`, {
      period: args.period,
      type: 'adx'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getStandardDeviation: ToolHandler = async (args: { symbol: string; period: number; type: string }) => {
    const data = await this.client.get(`/api/v3/technical_indicator/${args.type}/${args.symbol}`, {
      period: args.period,
      type: 'standardDeviation'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 16. SEARCH & DISCOVERY
  // =============================================================================

  searchStock: ToolHandler = async (args: { query: string; limit?: number; exchange?: string }) => {
    const data = await this.client.get(`/api/v3/search`, {
      query: args.query,
      limit: args.limit || 10,
      exchange: args.exchange
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  searchName: ToolHandler = async (args: { query: string; limit?: number; exchange?: string }) => {
    const data = await this.client.get(`/api/v3/search-name`, {
      query: args.query,
      limit: args.limit || 10,
      exchange: args.exchange
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getSymbolsList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/stock/list`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getETFList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/etf/list`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getTradableSymbols: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/available-traded/list`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getExchangesList: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/exchanges-list`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 17. EARNINGS & TRANSCRIPTS
  // =============================================================================

  getEarningsCallTranscript: ToolHandler = async (args: { symbol: string; quarter: number; year: number }) => {
    const data = await this.client.get(`/api/v3/earning_call_transcript/${args.symbol}`, {
      quarter: args.quarter,
      year: args.year
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBatchEarningsCallTranscript: ToolHandler = async (args: { symbol: string; year: number }) => {
    const data = await this.client.get(`/api/v4/batch_earning_call_transcript/${args.symbol}`, {
      year: args.year
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getEarningsCallDates: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/earning_call_transcript`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 18. ESG & SUSTAINABILITY
  // =============================================================================

  getESGScore: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/esg-environmental-social-governance-data`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getESGRatings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/esg-environmental-social-governance-data-ratings`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 19. OWNER EARNINGS & ADVANCED METRICS
  // =============================================================================

  getOwnerEarnings: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/owner_earnings`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getSharesFloat: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/shares_float`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getHistoricalSharesFloat: ToolHandler = async (args: { symbol: string }) => {
    const data = await this.client.get(`/api/v4/historical/shares_float`, {
      symbol: args.symbol
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 20. MERGERS & ACQUISITIONS
  // =============================================================================

  getMergersAcquisitions: ToolHandler = async (args: { from?: string; to?: string }) => {
    const data = await this.client.get(`/api/v4/mergers-acquisitions-rss-feed`, {
      from: args.from,
      to: args.to
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getMergersAcquisitionsSearch: ToolHandler = async (args: { name: string }) => {
    const data = await this.client.get(`/api/v4/mergers-acquisitions/search`, {
      name: args.name
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 21. SENATE & CONGRESSIONAL TRADING
  // =============================================================================

  getSenateTrading: ToolHandler = async (args: { symbol?: string }) => {
    const params: any = {};
    if (args.symbol) params.symbol = args.symbol;

    const data = await this.client.get(`/api/v4/senate-trading`, params);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getSenateDisclosure: ToolHandler = async (args: { symbol?: string }) => {
    const params: any = {};
    if (args.symbol) params.symbol = args.symbol;

    const data = await this.client.get(`/api/v4/senate-disclosure`, params);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // 22. BULK DATA ENDPOINTS
  // =============================================================================

  getBulkProfiles: ToolHandler = async () => {
    const data = await this.client.get(`/api/v4/profile/all`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBulkQuotes: ToolHandler = async () => {
    const data = await this.client.get(`/api/v3/quotes/nyse`);
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  getBatchEODPrices: ToolHandler = async (args: { date: string }) => {
    const data = await this.client.get(`/api/v4/batch-request-end-of-day-prices`, {
      date: args.date
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  };

  // =============================================================================
  // TOOL DEFINITIONS
  // =============================================================================

  getAllTools(): Array<{ definition: ToolDefinition; handler: ToolHandler }> {
    return [
      // Company Information
      {
        definition: {
          name: 'fmp_get_company_profile',
          description: 'Get detailed company profile information including sector, industry, CEO, description, and more',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol (e.g., AAPL)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCompanyProfile
      },
      {
        definition: {
          name: 'fmp_get_company_outlook',
          description: 'Get comprehensive company outlook with profile, financials, and ratings',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCompanyOutlook
      },
      {
        definition: {
          name: 'fmp_get_key_executives',
          description: 'Get list of key executives with titles and pay information',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getKeyExecutives
      },
      {
        definition: {
          name: 'fmp_get_company_core',
          description: 'Get core company information including CIK, ISIN, CUSIP, exchange, and more',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCompanyCore
      },
      {
        definition: {
          name: 'fmp_get_market_cap',
          description: 'Get historical market capitalization data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getMarketCap
      },
      {
        definition: {
          name: 'fmp_get_employee_count',
          description: 'Get historical employee count data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getEmployeeCount
      },

      // Stock Quotes
      {
        definition: {
          name: 'fmp_get_quote',
          description: 'Get real-time stock quote with price, volume, and change information',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getQuote
      },
      {
        definition: {
          name: 'fmp_get_quote_batch',
          description: 'Get quotes for multiple symbols at once (comma-separated)',
          inputSchema: {
            type: 'object',
            properties: {
              symbols: { type: 'string', description: 'Comma-separated stock symbols (e.g., AAPL,MSFT,GOOGL)' }
            },
            required: ['symbols']
          }
        },
        handler: this.getQuoteBatch
      },
      {
        definition: {
          name: 'fmp_get_full_quote',
          description: 'Get extended quote with bid/ask prices and sizes',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getFullQuote
      },
      {
        definition: {
          name: 'fmp_get_simple_quote',
          description: 'Get simplified quote with just price and volume',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getSimpleQuote
      },
      {
        definition: {
          name: 'fmp_get_otc_quote',
          description: 'Get real-time quote for OTC (Over-the-Counter) stocks',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'OTC stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getOTCQuote
      },
      {
        definition: {
          name: 'fmp_get_aftermarket_quote',
          description: 'Get pre-market and after-market trading data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getAftermarketQuote
      },
      {
        definition: {
          name: 'fmp_get_batch_aftermarket_quote',
          description: 'Get pre/post-market quotes for multiple symbols',
          inputSchema: {
            type: 'object',
            properties: {
              symbols: { type: 'string', description: 'Comma-separated stock symbols' }
            },
            required: ['symbols']
          }
        },
        handler: this.getBatchAftermarketQuote
      },
      {
        definition: {
          name: 'fmp_get_forex_quote',
          description: 'Get latest forex pair quote',
          inputSchema: {
            type: 'object',
            properties: {
              pair: { type: 'string', description: 'Forex pair (e.g., EURUSD)' }
            },
            required: ['pair']
          }
        },
        handler: this.getLastForex
      },
      {
        definition: {
          name: 'fmp_get_crypto_quote',
          description: 'Get latest cryptocurrency quote',
          inputSchema: {
            type: 'object',
            properties: {
              pair: { type: 'string', description: 'Crypto pair (e.g., BTCUSD)' }
            },
            required: ['pair']
          }
        },
        handler: this.getLastCrypto
      },

      // Financial Statements
      {
        definition: {
          name: 'fmp_get_income_statement',
          description: 'Get income statement data (annual or quarterly)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter', enum: ['annual', 'quarter'] },
              limit: { type: 'number', description: 'Number of periods to return (default: 40)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getIncomeStatement
      },
      {
        definition: {
          name: 'fmp_get_balance_sheet',
          description: 'Get balance sheet statement data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter', enum: ['annual', 'quarter'] },
              limit: { type: 'number', description: 'Number of periods to return (default: 40)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getBalanceSheet
      },
      {
        definition: {
          name: 'fmp_get_cash_flow_statement',
          description: 'Get cash flow statement data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter', enum: ['annual', 'quarter'] },
              limit: { type: 'number', description: 'Number of periods to return (default: 40)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCashFlowStatement
      },
      {
        definition: {
          name: 'fmp_get_income_statement_as_reported',
          description: 'Get income statement as originally reported to SEC',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: FY or Q1-Q4' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getIncomeStatementAsReported
      },
      {
        definition: {
          name: 'fmp_get_balance_sheet_as_reported',
          description: 'Get balance sheet as originally reported to SEC',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: FY or Q1-Q4' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getBalanceSheetAsReported
      },
      {
        definition: {
          name: 'fmp_get_cash_flow_as_reported',
          description: 'Get cash flow statement as originally reported to SEC',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: FY or Q1-Q4' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCashFlowAsReported
      },
      {
        definition: {
          name: 'fmp_get_full_financial_as_reported',
          description: 'Get full financial statement as reported in a single call',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: FY or Q1-Q4' }
            },
            required: ['symbol']
          }
        },
        handler: this.getFullFinancialAsReported
      },
      {
        definition: {
          name: 'fmp_get_financial_report_dates',
          description: 'Get available dates for financial reports',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getFinancialReportDates
      },
      {
        definition: {
          name: 'fmp_get_annual_report_json',
          description: 'Get annual report (10-K) in JSON format',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              year: { type: 'number', description: 'Fiscal year' }
            },
            required: ['symbol', 'year']
          }
        },
        handler: this.getAnnualReportJSON
      },
      {
        definition: {
          name: 'fmp_get_quarter_report_json',
          description: 'Get quarterly report (10-Q) in JSON format',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              year: { type: 'number', description: 'Fiscal year' },
              quarter: { type: 'string', description: 'Quarter: Q1, Q2, Q3, or Q4', enum: ['Q1', 'Q2', 'Q3', 'Q4'] }
            },
            required: ['symbol', 'year', 'quarter']
          }
        },
        handler: this.getQuarterReportJSON
      },

      // Financial Ratios & Metrics
      {
        definition: {
          name: 'fmp_get_financial_ratios',
          description: 'Get financial ratios (P/E, P/B, ROE, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getFinancialRatios
      },
      {
        definition: {
          name: 'fmp_get_key_metrics',
          description: 'Get key metrics (market cap, P/E, EPS, revenue per share, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getKeyMetrics
      },
      {
        definition: {
          name: 'fmp_get_enterprise_value',
          description: 'Get enterprise value and related metrics',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getEnterpriseValue
      },
      {
        definition: {
          name: 'fmp_get_financial_growth',
          description: 'Get financial statement growth metrics (revenue growth, earnings growth, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getFinancialGrowth
      },
      {
        definition: {
          name: 'fmp_get_rating',
          description: 'Get current FMP company rating (Strong Buy, Buy, Hold, Sell, Strong Sell)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getRating
      },
      {
        definition: {
          name: 'fmp_get_historical_rating',
          description: 'Get historical FMP rating changes',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              limit: { type: 'number', description: 'Number of ratings to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalRating
      },
      {
        definition: {
          name: 'fmp_get_dcf',
          description: 'Get current discounted cash flow (DCF) valuation',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getDiscountedCashFlow
      },
      {
        definition: {
          name: 'fmp_get_historical_dcf',
          description: 'Get historical DCF valuations',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalDCF
      },

      // Historical Price Data
      {
        definition: {
          name: 'fmp_get_historical_daily',
          description: 'Get historical daily stock prices (OHLCV)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalDaily
      },
      {
        definition: {
          name: 'fmp_get_historical_chart',
          description: 'Get intraday historical data at various intervals (1min, 5min, 15min, 30min, 1hour, 4hour)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              interval: { type: 'string', description: 'Time interval', enum: ['1min', '5min', '15min', '30min', '1hour', '4hour'] },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['symbol', 'interval']
          }
        },
        handler: this.getHistoricalChart
      },
      {
        definition: {
          name: 'fmp_get_historical_dividends',
          description: 'Get historical dividend payments',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalDividends
      },
      {
        definition: {
          name: 'fmp_get_historical_splits',
          description: 'Get historical stock splits',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalSplits
      },
      {
        definition: {
          name: 'fmp_get_survivorship_bias_free',
          description: 'Get survivorship bias-free historical data (includes delisted companies)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getSurvivorshipBiasFree
      },

      // News & Press Releases
      {
        definition: {
          name: 'fmp_get_stock_news',
          description: 'Get latest stock news articles',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol (optional - omit for all stocks)' },
              limit: { type: 'number', description: 'Number of articles (default: 50)' },
              page: { type: 'number', description: 'Page number for pagination' }
            }
          }
        },
        handler: this.getStockNews
      },
      {
        definition: {
          name: 'fmp_get_fmp_articles',
          description: 'Get FMP published articles and analysis',
          inputSchema: {
            type: 'object',
            properties: {
              page: { type: 'number', description: 'Page number' },
              size: { type: 'number', description: 'Page size (default: 50)' }
            }
          }
        },
        handler: this.getFMPArticles
      },
      {
        definition: {
          name: 'fmp_get_general_news',
          description: 'Get general market news',
          inputSchema: {
            type: 'object',
            properties: {
              page: { type: 'number', description: 'Page number' }
            }
          }
        },
        handler: this.getGeneralNews
      },
      {
        definition: {
          name: 'fmp_get_press_releases',
          description: 'Get company press releases',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              limit: { type: 'number', description: 'Number of press releases' },
              page: { type: 'number', description: 'Page number' }
            },
            required: ['symbol']
          }
        },
        handler: this.getPressReleases
      },

      // Calendar & Events
      {
        definition: {
          name: 'fmp_get_earnings_calendar',
          description: 'Get earnings calendar for upcoming earnings announcements',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getEarningsCalendar
      },
      {
        definition: {
          name: 'fmp_get_historical_earnings',
          description: 'Get historical earnings data for a company',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              limit: { type: 'number', description: 'Number of earnings to return' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalEarnings
      },
      {
        definition: {
          name: 'fmp_get_earnings_surprises',
          description: 'Get earnings surprises (actual vs estimated)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getEarningsSurprises
      },
      {
        definition: {
          name: 'fmp_get_ipo_calendar',
          description: 'Get upcoming IPO calendar',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getIPOCalendar
      },
      {
        definition: {
          name: 'fmp_get_stock_split_calendar',
          description: 'Get upcoming stock split calendar',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getStockSplitCalendar
      },
      {
        definition: {
          name: 'fmp_get_dividend_calendar',
          description: 'Get upcoming dividend calendar',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getDividendCalendar
      },
      {
        definition: {
          name: 'fmp_get_economic_calendar',
          description: 'Get economic events calendar (GDP, unemployment, CPI, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getEconomicCalendar
      },

      // Analyst Data
      {
        definition: {
          name: 'fmp_get_analyst_estimates',
          description: 'Get analyst estimates for revenue, earnings, etc.',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'string', description: 'Period: annual or quarter' },
              limit: { type: 'number', description: 'Number of periods' }
            },
            required: ['symbol']
          }
        },
        handler: this.getAnalystEstimates
      },
      {
        definition: {
          name: 'fmp_get_analyst_recommendations',
          description: 'Get analyst buy/sell recommendations',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getAnalystRecommendations
      },
      {
        definition: {
          name: 'fmp_get_price_target',
          description: 'Get analyst price targets',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getPriceTarget
      },
      {
        definition: {
          name: 'fmp_get_price_target_summary',
          description: 'Get price target summary (average, high, low)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getPriceTargetSummary
      },
      {
        definition: {
          name: 'fmp_get_upgrades_downgrades',
          description: 'Get analyst upgrades and downgrades',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getUpgradesDowngrades
      },
      {
        definition: {
          name: 'fmp_get_upgrades_downgrades_consensus',
          description: 'Get consensus on upgrades/downgrades',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getUpgradesDowngradesConsensus
      },

      // Insider Trading
      {
        definition: {
          name: 'fmp_get_insider_trading',
          description: 'Get insider trading transactions',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              limit: { type: 'number', description: 'Number of transactions' },
              page: { type: 'number', description: 'Page number' }
            },
            required: ['symbol']
          }
        },
        handler: this.getInsiderTrading
      },
      {
        definition: {
          name: 'fmp_get_insider_trading_rss',
          description: 'Get latest insider trading RSS feed',
          inputSchema: {
            type: 'object',
            properties: {
              page: { type: 'number', description: 'Page number' }
            }
          }
        },
        handler: this.getInsiderTradingRSS
      },
      {
        definition: {
          name: 'fmp_get_cik_mapper',
          description: 'Get CIK (Central Index Key) for a company',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Company name' },
              symbol: { type: 'string', description: 'Stock symbol' }
            }
          }
        },
        handler: this.getCIKMapper
      },
      {
        definition: {
          name: 'fmp_get_insider_roster',
          description: 'Get list of company insiders',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getInsiderRoster
      },
      {
        definition: {
          name: 'fmp_get_insider_statistics',
          description: 'Get insider trading statistics',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getInsiderStatistics
      },

      // Institutional Holdings
      {
        definition: {
          name: 'fmp_get_institutional_holdings',
          description: 'Get institutional holder information',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getInstitutionalHoldings
      },
      {
        definition: {
          name: 'fmp_get_mutual_fund_holdings',
          description: 'Get mutual fund holdings',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getMutualFundHoldings
      },
      {
        definition: {
          name: 'fmp_get_etf_holdings',
          description: 'Get ETF holdings information',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'ETF symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getETFHoldings
      },
      {
        definition: {
          name: 'fmp_get_etf_sector_weightings',
          description: 'Get ETF sector allocation weightings',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'ETF symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getETFSectorWeightings
      },
      {
        definition: {
          name: 'fmp_get_etf_country_weightings',
          description: 'Get ETF country allocation weightings',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'ETF symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getETFCountryWeightings
      },
      {
        definition: {
          name: 'fmp_get_form_13f',
          description: 'Get Form 13F filings (institutional holdings)',
          inputSchema: {
            type: 'object',
            properties: {
              cik: { type: 'string', description: 'CIK number' },
              date: { type: 'string', description: 'Filing date (YYYY-MM-DD)' }
            },
            required: ['cik', 'date']
          }
        },
        handler: this.getForm13FList
      },
      {
        definition: {
          name: 'fmp_get_cusip_mapper',
          description: 'Get stock symbol from CUSIP',
          inputSchema: {
            type: 'object',
            properties: {
              cusip: { type: 'string', description: 'CUSIP identifier' }
            },
            required: ['cusip']
          }
        },
        handler: this.getCUSIPMapper
      },

      // SEC Filings
      {
        definition: {
          name: 'fmp_get_sec_filings',
          description: 'Get SEC filings (10-K, 10-Q, 8-K, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              type: { type: 'string', description: 'Filing type (e.g., 10-K, 10-Q, 8-K)' },
              limit: { type: 'number', description: 'Number of filings' },
              page: { type: 'number', description: 'Page number' }
            },
            required: ['symbol']
          }
        },
        handler: this.getSECFilings
      },
      {
        definition: {
          name: 'fmp_get_rss_feed',
          description: 'Get RSS feed of latest 8-K filings',
          inputSchema: {
            type: 'object',
            properties: {
              type: { type: 'string', description: 'Filing type' },
              limit: { type: 'number', description: 'Number of filings' },
              page: { type: 'number', description: 'Page number' }
            }
          }
        },
        handler: this.getRSSFeed
      },

      // Market Data
      {
        definition: {
          name: 'fmp_get_sector_performance',
          description: 'Get current sector performance',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getSectorPerformance
      },
      {
        definition: {
          name: 'fmp_get_historical_sector_performance',
          description: 'Get historical sector performance',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of periods' }
            }
          }
        },
        handler: this.getHistoricalSectorPerformance
      },
      {
        definition: {
          name: 'fmp_get_market_hours',
          description: 'Check if the market is currently open',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getMarketHours
      },
      {
        definition: {
          name: 'fmp_get_delisted',
          description: 'Get list of delisted companies',
          inputSchema: {
            type: 'object',
            properties: {
              limit: { type: 'number', description: 'Number of companies' },
              page: { type: 'number', description: 'Page number' }
            }
          }
        },
        handler: this.getDelisted
      },
      {
        definition: {
          name: 'fmp_get_stock_screener',
          description: 'Screen stocks by various criteria',
          inputSchema: {
            type: 'object',
            properties: {
              marketCapMoreThan: { type: 'number', description: 'Minimum market cap' },
              betaMoreThan: { type: 'number', description: 'Minimum beta' },
              volumeMoreThan: { type: 'number', description: 'Minimum volume' },
              sector: { type: 'string', description: 'Sector filter' },
              exchange: { type: 'string', description: 'Exchange (NYSE, NASDAQ, etc.)' },
              limit: { type: 'number', description: 'Number of results' }
            }
          }
        },
        handler: this.getStockScreener
      },
      {
        definition: {
          name: 'fmp_get_gainers_losers',
          description: 'Get top gainers for the day',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getGainersLosers
      },
      {
        definition: {
          name: 'fmp_get_most_active',
          description: 'Get most active stocks by volume',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getMostActive
      },

      // Crypto & Forex
      {
        definition: {
          name: 'fmp_get_crypto_list',
          description: 'Get list of available cryptocurrencies',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getCryptoList
      },
      {
        definition: {
          name: 'fmp_get_forex_list',
          description: 'Get list of available forex pairs',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getForexList
      },
      {
        definition: {
          name: 'fmp_get_crypto_quote',
          description: 'Get cryptocurrency quote',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Crypto symbol (e.g., BTCUSD)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCryptoQuote
      },
      {
        definition: {
          name: 'fmp_get_crypto_historical',
          description: 'Get historical cryptocurrency prices',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Crypto symbol' },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCryptoHistorical
      },
      {
        definition: {
          name: 'fmp_get_forex_historical',
          description: 'Get historical forex pair prices',
          inputSchema: {
            type: 'object',
            properties: {
              pair: { type: 'string', description: 'Forex pair (e.g., EURUSD)' },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['pair']
          }
        },
        handler: this.getForexHistorical
      },

      // Commodities & Economics
      {
        definition: {
          name: 'fmp_get_commodities_list',
          description: 'Get list of available commodities',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getCommoditiesList
      },
      {
        definition: {
          name: 'fmp_get_commodity_quote',
          description: 'Get commodity quote',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Commodity symbol (e.g., GCUSD for Gold)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCommodityQuote
      },
      {
        definition: {
          name: 'fmp_get_commodity_historical',
          description: 'Get historical commodity prices',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Commodity symbol' },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['symbol']
          }
        },
        handler: this.getCommodityHistorical
      },
      {
        definition: {
          name: 'fmp_get_treasury_rates',
          description: 'Get US Treasury rates',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getTreasuryRates
      },
      {
        definition: {
          name: 'fmp_get_economic_indicator',
          description: 'Get economic indicators (GDP, unemployment, CPI, etc.)',
          inputSchema: {
            type: 'object',
            properties: {
              indicator: { type: 'string', description: 'Indicator name (e.g., GDP, unemploymentRate)' },
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            },
            required: ['indicator']
          }
        },
        handler: this.getEconomicIndicator
      },

      // Technical Indicators
      {
        definition: {
          name: 'fmp_get_sma',
          description: 'Get Simple Moving Average (SMA)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'number', description: 'Time period (e.g., 50, 200)' },
              type: { type: 'string', description: 'Interval: 1min, 5min, 15min, 30min, 1hour, 4hour, daily' }
            },
            required: ['symbol', 'period', 'type']
          }
        },
        handler: this.getSMA
      },
      {
        definition: {
          name: 'fmp_get_ema',
          description: 'Get Exponential Moving Average (EMA)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'number', description: 'Time period' },
              type: { type: 'string', description: 'Interval' }
            },
            required: ['symbol', 'period', 'type']
          }
        },
        handler: this.getEMA
      },
      {
        definition: {
          name: 'fmp_get_rsi',
          description: 'Get Relative Strength Index (RSI)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'number', description: 'Time period (typically 14)' },
              type: { type: 'string', description: 'Interval' }
            },
            required: ['symbol', 'period', 'type']
          }
        },
        handler: this.getRSI
      },
      {
        definition: {
          name: 'fmp_get_adx',
          description: 'Get Average Directional Index (ADX)',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'number', description: 'Time period' },
              type: { type: 'string', description: 'Interval' }
            },
            required: ['symbol', 'period', 'type']
          }
        },
        handler: this.getADX
      },
      {
        definition: {
          name: 'fmp_get_standard_deviation',
          description: 'Get Standard Deviation',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              period: { type: 'number', description: 'Time period' },
              type: { type: 'string', description: 'Interval' }
            },
            required: ['symbol', 'period', 'type']
          }
        },
        handler: this.getStandardDeviation
      },

      // Search
      {
        definition: {
          name: 'fmp_search_stock',
          description: 'Search for stocks by symbol or name',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query' },
              limit: { type: 'number', description: 'Number of results' },
              exchange: { type: 'string', description: 'Exchange filter (NYSE, NASDAQ, etc.)' }
            },
            required: ['query']
          }
        },
        handler: this.searchStock
      },
      {
        definition: {
          name: 'fmp_search_name',
          description: 'Search stocks by company name',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Company name' },
              limit: { type: 'number', description: 'Number of results' },
              exchange: { type: 'string', description: 'Exchange filter' }
            },
            required: ['query']
          }
        },
        handler: this.searchName
      },
      {
        definition: {
          name: 'fmp_get_symbols_list',
          description: 'Get complete list of all stock symbols',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getSymbolsList
      },
      {
        definition: {
          name: 'fmp_get_etf_list',
          description: 'Get complete list of all ETF symbols',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getETFList
      },
      {
        definition: {
          name: 'fmp_get_tradable_symbols',
          description: 'Get list of tradable symbols',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getTradableSymbols
      },
      {
        definition: {
          name: 'fmp_get_exchanges_list',
          description: 'Get list of all exchanges',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getExchangesList
      },

      // Earnings Transcripts
      {
        definition: {
          name: 'fmp_get_earnings_call_transcript',
          description: 'Get earnings call transcript text',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              quarter: { type: 'number', description: 'Quarter (1-4)' },
              year: { type: 'number', description: 'Year' }
            },
            required: ['symbol', 'quarter', 'year']
          }
        },
        handler: this.getEarningsCallTranscript
      },
      {
        definition: {
          name: 'fmp_get_batch_earnings_call_transcript',
          description: 'Get all earnings call transcripts for a year',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' },
              year: { type: 'number', description: 'Year' }
            },
            required: ['symbol', 'year']
          }
        },
        handler: this.getBatchEarningsCallTranscript
      },
      {
        definition: {
          name: 'fmp_get_earnings_call_dates',
          description: 'Get available earnings call dates',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getEarningsCallDates
      },

      // ESG
      {
        definition: {
          name: 'fmp_get_esg_score',
          description: 'Get Environmental, Social, and Governance (ESG) scores',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getESGScore
      },
      {
        definition: {
          name: 'fmp_get_esg_ratings',
          description: 'Get ESG ratings and rankings',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getESGRatings
      },

      // Advanced Metrics
      {
        definition: {
          name: 'fmp_get_owner_earnings',
          description: 'Get owner earnings calculation',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getOwnerEarnings
      },
      {
        definition: {
          name: 'fmp_get_shares_float',
          description: 'Get current shares float',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getSharesFloat
      },
      {
        definition: {
          name: 'fmp_get_historical_shares_float',
          description: 'Get historical shares float data',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol' }
            },
            required: ['symbol']
          }
        },
        handler: this.getHistoricalSharesFloat
      },

      // M&A
      {
        definition: {
          name: 'fmp_get_mergers_acquisitions',
          description: 'Get mergers and acquisitions news',
          inputSchema: {
            type: 'object',
            properties: {
              from: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
              to: { type: 'string', description: 'End date (YYYY-MM-DD)' }
            }
          }
        },
        handler: this.getMergersAcquisitions
      },
      {
        definition: {
          name: 'fmp_search_mergers_acquisitions',
          description: 'Search mergers and acquisitions by company name',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Company name' }
            },
            required: ['name']
          }
        },
        handler: this.getMergersAcquisitionsSearch
      },

      // Senate Trading
      {
        definition: {
          name: 'fmp_get_senate_trading',
          description: 'Get US Senate stock trading activity',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol (optional)' }
            }
          }
        },
        handler: this.getSenateTrading
      },
      {
        definition: {
          name: 'fmp_get_senate_disclosure',
          description: 'Get Senate financial disclosure reports',
          inputSchema: {
            type: 'object',
            properties: {
              symbol: { type: 'string', description: 'Stock symbol (optional)' }
            }
          }
        },
        handler: this.getSenateDisclosure
      },

      // Bulk Data
      {
        definition: {
          name: 'fmp_get_bulk_profiles',
          description: 'Get all company profiles in bulk',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getBulkProfiles
      },
      {
        definition: {
          name: 'fmp_get_bulk_quotes',
          description: 'Get all NYSE quotes in bulk',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        handler: this.getBulkQuotes
      },
      {
        definition: {
          name: 'fmp_get_batch_eod_prices',
          description: 'Get batch end-of-day prices for a specific date',
          inputSchema: {
            type: 'object',
            properties: {
              date: { type: 'string', description: 'Date (YYYY-MM-DD)' }
            },
            required: ['date']
          }
        },
        handler: this.getBatchEODPrices
      }
    ];
  }
}
