# 🎯 从这里开始！

## 欢迎使用FMP Chuhai MCP服务器

这是一个完整的Financial Modeling Prep API的MCP实现，提供**153个金融数据工具**。

---

## ⚡ 3步快速部署

### 1️⃣ 克隆项目
```bash
git clone https://github.com/henu-wang/chuhai.git
cd chuhai
```

### 2️⃣ 运行安装脚本
```bash
# MacOS/Linux
chmod +x setup.sh && ./setup.sh

# Windows (PowerShell)
.\setup.ps1
```

### 3️⃣ 配置Claude Desktop
将脚本输出的配置复制到Claude Desktop配置文件中，然后重启Claude。

**配置文件位置：**
- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**配置内容示例：**
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

---

## 📚 选择你的文档

根据你的需求选择合适的文档：

### 🚀 我想快速开始（5分钟）
👉 **[QUICKSTART.md](./QUICKSTART.md)**

### 🇨🇳 我需要中文配置说明
👉 **[配置说明.md](./配置说明.md)**

### 📖 我需要详细安装指南
👉 **[INSTALL.md](./INSTALL.md)**

### 🤝 我已经有其他FMP MCP
👉 **[COEXISTENCE.md](./COEXISTENCE.md)** 或 **[配置说明.md](./配置说明.md)**

### 🎓 我想看完整教程
👉 **[最终部署指南.md](./最终部署指南.md)**

### 🔧 我想了解所有工具
👉 **[TOOLS.md](./TOOLS.md)**

### 📘 我想看项目文档
👉 **[README.md](./README.md)**

---

## ✅ 测试部署

在Claude Desktop中输入：
```
请帮我查询苹果公司(AAPL)的当前股价
```

如果返回数据，说明部署成功！🎉

---

## 🆘 遇到问题？

1. **工具看不见？** → 完全重启Claude Desktop
2. **调用失败？** → 检查 [INSTALL.md](./INSTALL.md) 的故障排除部分
3. **配置冲突？** → 查看 [配置说明.md](./配置说明.md)

---

## 🎁 你将获得什么

- ✅ 153个金融数据工具
- ✅ 实时股票报价
- ✅ 完整财务报表
- ✅ 技术指标分析
- ✅ 新闻和事件日历
- ✅ ESG评分
- ✅ 参议院交易数据
- ✅ 还有更多...

---

**出海！一定要出海！** 🚀

现在就开始吧！
