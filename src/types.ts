export interface FMPConfig {
  apiKey: string;
  baseUrl: string;
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolHandler {
  (args: any): Promise<any>;
}
