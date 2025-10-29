# FMP MCP Server - Windows 自动安装脚本

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "FMP MCP Server - 自动安装" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 检查Node.js
Write-Host "检查 Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js 版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: 未找到 Node.js" -ForegroundColor Red
    Write-Host "请先安装 Node.js 18 或更高版本" -ForegroundColor Red
    Write-Host "访问: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
} else {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 构建项目
Write-Host "构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 项目构建完成" -ForegroundColor Green
} else {
    Write-Host "❌ 项目构建失败" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 获取项目路径
$projectPath = (Get-Location).Path
$indexPath = Join-Path $projectPath "dist\index.js"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "安装完成！" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "项目路径: $projectPath" -ForegroundColor Yellow
Write-Host "服务器入口: $indexPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "1. 配置 Claude Desktop" -ForegroundColor White
Write-Host "2. 编辑配置文件：" -ForegroundColor White

$configPath = "$env:APPDATA\Claude\claude_desktop_config.json"
Write-Host "   $configPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. 添加以下配置到 claude_desktop_config.json：" -ForegroundColor White
Write-Host ""

$config = @"
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["$($indexPath -replace '\\', '\\')"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}

注意：如果你已经有其他FMP MCP，请保留原有配置，将此配置添加到同一个文件中。
查看 COEXISTENCE.md 了解如何与其他FMP MCP共存。
"@

Write-Host $config -ForegroundColor Green
Write-Host ""
Write-Host "4. 重启 Claude Desktop" -ForegroundColor White
Write-Host "   - 在任务管理器中结束 Claude 进程" -ForegroundColor Gray
Write-Host "   - 重新打开 Claude Desktop" -ForegroundColor Gray
Write-Host ""
Write-Host "需要帮助？查看 INSTALL.md 获取详细说明" -ForegroundColor Yellow
Write-Host ""
Write-Host "出海！🚀" -ForegroundColor Cyan
