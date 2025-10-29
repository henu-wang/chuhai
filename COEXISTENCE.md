# 与其他FMP MCP共存配置指南

## 🔄 问题说明

如果你的电脑上已经有其他FMP MCP服务器，这个新的"出海"版本需要使用不同的名称来避免冲突。

## ✅ 解决方案

我们的MCP服务器使用唯一的名称：**`fmp-chuhai`**

- **服务器内部名称**: `fmp-chuhai-server`
- **Claude配置中的名称**: `fmp-chuhai`
- **工具前缀**: 所有工具都以 `fmp_` 开头（与标准FMP API保持一致）

## 📝 Claude Desktop配置示例

### 单独使用（只有Chuhai版本）

```json
{
  "mcpServers": {
    "fmp-chuhai": {
      "command": "node",
      "args": ["/你的路径/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

### 与其他FMP MCP共存

```json
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["/path/to/other/fmp/server.js"],
      "env": {
        "FMP_API_KEY": "your_api_key"
      }
    },
    "fmp-chuhai": {
      "command": "node",
      "args": ["/你的路径/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

### 多个MCP服务器共存示例

```json
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["/path/to/other/fmp.js"]
    },
    "fmp-chuhai": {
      "command": "node",
      "args": ["/Users/yourname/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    },
    "github": {
      "command": "node",
      "args": ["/path/to/github-mcp.js"]
    },
    "filesystem": {
      "command": "node",
      "args": ["/path/to/filesystem-mcp.js"]
    }
  }
}
```

## 🔍 如何区分使用

### 方式1：在Claude中明确指定

当你想使用Chuhai版本时，可以明确说明：

```
使用fmp-chuhai服务器查询AAPL的股价
```

或者：

```
用出海版本的FMP工具获取特斯拉的财务数据
```

### 方式2：查看工具列表

两个FMP MCP可能有不同的工具集。Chuhai版本提供**153个工具**，你可以通过工具数量来识别。

### 方式3：检查服务器日志

启动时，Chuhai版本会显示：

```
FMP Chuhai MCP Server running on stdio
Server Name: fmp-chuhai-server (区分于其他FMP MCP)
Loaded 153 tools
```

## 🎯 Chuhai版本的优势

即使你已经有其他FMP MCP，Chuhai版本仍然值得安装：

1. **完整覆盖** - 153个工具，覆盖所有FMP API端点
2. **最新实现** - 2025年最新的API支持
3. **清晰分类** - 22个功能类别，组织良好
4. **详细文档** - 每个工具都有详细说明
5. **中文支持** - 完整的中文文档和注释
6. **持续更新** - 活跃维护和更新

## 🔧 配置步骤

### 1. 查看现有配置

打开Claude Desktop配置文件：

**MacOS:**
```bash
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```powershell
type %APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
cat ~/.config/Claude/claude_desktop_config.json
```

### 2. 添加Chuhai配置

在 `"mcpServers"` 对象中**添加**（不是替换）新的配置：

```json
"fmp-chuhai": {
  "command": "node",
  "args": ["/你的完整路径/chuhai/dist/index.js"],
  "env": {
    "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
  }
}
```

**重要**：
- 确保JSON格式正确（逗号、大括号）
- 使用**完整的绝对路径**
- 不要删除现有的MCP配置

### 3. 验证配置

使用JSON验证器检查格式：
- 在线工具：https://jsonlint.com/
- VS Code：安装JSON插件
- 命令行：`cat config.json | python -m json.tool`

### 4. 重启Claude Desktop

完全退出并重新启动Claude Desktop。

## ✅ 测试共存

### 测试Chuhai版本

```
请使用fmp-chuhai获取苹果公司的信息
```

### 测试其他FMP版本

```
请使用fmp获取苹果公司的信息
```

### 让Claude自动选择

```
获取AAPL的实时股价
```

Claude会自动选择可用的FMP工具。

## 🎨 个性化配置

你可以在配置中给不同的服务器起更清晰的名字：

```json
{
  "mcpServers": {
    "fmp-basic": {
      "command": "...",
      "args": ["..."]
    },
    "fmp-chuhai-complete": {
      "command": "node",
      "args": ["/path/to/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

## 📊 功能对比

### 如何判断使用哪个？

**使用Chuhai版本，如果你需要：**
- ✅ 完整的153个工具
- ✅ 最新的API端点
- ✅ 参议院交易数据
- ✅ ESG评分
- ✅ 批量数据端点
- ✅ 详细的中文文档

**使用其他版本，如果：**
- 你只需要基础功能
- 现有版本已经满足需求
- 想要更轻量的实现

## 🔄 切换和迁移

### 临时禁用某个服务器

在配置中注释掉：

```json
{
  "mcpServers": {
    // "fmp": {
    //   "command": "...",
    //   "args": ["..."]
    // },
    "fmp-chuhai": {
      "command": "node",
      "args": ["/path/to/chuhai/dist/index.js"],
      "env": {
        "FMP_API_KEY": "N1TAoz9ns6c2nqxgTeD8p1CPqqngAIdN"
      }
    }
  }
}
```

### 完全迁移到Chuhai版本

1. 测试Chuhai版本满足所有需求
2. 备份原配置
3. 删除或注释旧的FMP配置
4. 保留Chuhai配置

## 🐛 常见问题

### Q: 两个FMP服务器会冲突吗？

**A:** 不会。只要使用不同的名称（如 `fmp` 和 `fmp-chuhai`），它们可以完美共存。

### Q: 工具会重复吗？

**A:** 工具可能有相同的功能，但它们来自不同的服务器。Claude会根据可用性和适用性选择使用哪个。

### Q: 可以同时使用两个服务器的工具吗？

**A:** 可以！Claude可以在同一个对话中调用不同服务器的工具。

### Q: 哪个会被优先使用？

**A:** Claude会根据工具的描述和上下文自动选择最合适的。你也可以明确指定要使用哪个服务器。

### Q: 如何删除其中一个？

**A:** 直接从配置文件中删除对应的配置块，然后重启Claude Desktop。

## 📞 需要帮助？

如果遇到配置问题：

1. 检查JSON格式是否正确
2. 确认路径是绝对路径
3. 查看Claude Desktop的日志
4. 参考 [INSTALL.md](./INSTALL.md) 的故障排除部分

## 🎉 最佳实践

1. **保持两个版本**：用Chuhai做深度分析，用其他版本做快速查询
2. **清晰命名**：给配置起有意义的名字
3. **定期更新**：保持Chuhai版本最新
4. **文档齐全**：记录你的配置选择

---

**现在你可以同时享受多个FMP MCP的优势了！** 🚀

出海！一定要出海！
