export type HomePageSearchParams = {
  data_id?: string;
  start_date?: string;
  end_date?: string;
  duration?: string;
  [key: string]: string | string[] | undefined;
};

export type StockInfo = {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
};

export type StockMonthRevenue = {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  revenue_growth_rate?: number;
};
