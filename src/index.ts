#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { FMPApiClient } from './api-client.js';
import { FMPTools } from './tools.js';
import type { FMPConfig } from './types.js';

// Load environment variables
dotenv.config();

// Validate configuration
const API_KEY = process.env.FMP_API_KEY;
if (!API_KEY) {
  console.error('Error: FMP_API_KEY environment variable is required');
  process.exit(1);
}

const BASE_URL = process.env.FMP_BASE_URL || 'https://financialmodelingprep.com';

// Create configuration
const config: FMPConfig = {
  apiKey: API_KEY,
  baseUrl: BASE_URL,
};

// Initialize API client and tools
const apiClient = new FMPApiClient(config);
const fmpTools = new FMPTools(apiClient);

// Get all tool definitions and handlers
const toolsMap = new Map(
  fmpTools.getAllTools().map(tool => [tool.definition.name, tool])
);

// Create MCP server
const server = new Server(
  {
    name: 'fmp-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register list tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Array.from(toolsMap.values()).map(tool => tool.definition),
  };
});

// Register call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const tool = toolsMap.get(toolName);

  if (!tool) {
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Tool not found: ${toolName}`
    );
  }

  try {
    const result = await tool.handler(request.params.arguments || {});
    return result;
  } catch (error: any) {
    console.error(`Error executing tool ${toolName}:`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error.message}`
    );
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('FMP MCP Server running on stdio');
  console.error(`Loaded ${toolsMap.size} tools`);
  console.error('API Key:', API_KEY?.substring(0, 8) + '...');
  console.error('Base URL:', BASE_URL);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
