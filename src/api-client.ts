import axios, { AxiosInstance } from 'axios';
import type { FMPConfig } from './types.js';

export class FMPApiClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: FMPConfig) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  private buildUrl(path: string, params: Record<string, any> = {}): string {
    const url = new URL(path, this.client.defaults.baseURL);
    url.searchParams.append('apikey', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  async get<T = any>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, params);
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`FMP API Error: ${error.message}`);
    }
  }

  async post<T = any>(endpoint: string, data: any = {}, params: Record<string, any> = {}): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, params);
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(`FMP API Error: ${error.message}`);
    }
  }
}
