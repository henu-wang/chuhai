#!/usr/bin/env node

/**
 * FMP MCP Server 测试脚本
 * 用于验证服务器是否正常工作
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 FMP MCP Server 测试工具\n');

// 启动MCP服务器
const serverPath = join(__dirname, 'dist', 'index.js');
console.log(`📂 服务器路径: ${serverPath}\n`);

console.log('🚀 启动MCP服务器...\n');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    FMP_API_KEY: process.env.FMP_API_KEY || 'N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN'
  }
});

let initMessage = '';

server.stdout.on('data', (data) => {
  initMessage += data.toString();
});

server.stderr.on('data', (data) => {
  const message = data.toString();
  console.log('📋 服务器输出:', message);

  if (message.includes('FMP MCP Server running')) {
    console.log('\n✅ 服务器启动成功！');
    console.log('\n📊 测试工具列表请求...\n');

    // 发送工具列表请求
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    };

    server.stdin.write(JSON.stringify(listToolsRequest) + '\n');

    // 等待响应
    setTimeout(() => {
      console.log('\n🎉 测试完成！');
      console.log('\n如果你看到服务器启动信息，说明MCP服务器工作正常。');
      console.log('\n下一步：');
      console.log('1. 配置Claude Desktop（参考 INSTALL.md）');
      console.log('2. 重启Claude Desktop');
      console.log('3. 在Claude中测试工具调用\n');

      server.kill();
      process.exit(0);
    }, 2000);
  }
});

server.on('error', (error) => {
  console.error('❌ 错误:', error.message);
  console.log('\n💡 提示:');
  console.log('1. 确保已运行 npm install');
  console.log('2. 确保已运行 npm run build');
  console.log('3. 检查 .env 文件中的 API Key\n');
  process.exit(1);
});

// 超时处理
setTimeout(() => {
  console.log('\n⏱️  测试超时');
  console.log('\n检查清单:');
  console.log('✓ Node.js版本是否>=18？运行: node --version');
  console.log('✓ 是否已安装依赖？运行: npm install');
  console.log('✓ 是否已构建项目？运行: npm run build');
  console.log('✓ .env文件是否存在？');
  console.log('\n查看 INSTALL.md 获取详细帮助\n');

  server.kill();
  process.exit(1);
}, 10000);
