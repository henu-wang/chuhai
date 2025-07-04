# SEC Form 13F API 数据获取工具

本项目展示如何通过 SEC EDGAR API 获取 Form 13F 机构投资者持仓数据。

## 项目文件

- `form_13f_api_guide.md` - 英文版完整API使用指南
- `SEC_Form_13F_API_Guide_CN.md` - 中文版API使用指南
- `form_13f_extractor.py` - 完整的Python提取器类
- `test_13f_api.py` - API连接测试脚本
- `requirements.txt` - Python依赖包

## 快速开始

1. 安装依赖：
```bash
sudo apt install python3-requests
```

2. 测试API连接：
```bash
python3 test_13f_api.py
```

3. 查看完整实现：
```bash
python3 form_13f_extractor.py
```

## 功能特性

✅ 访问SEC EDGAR API  
✅ 获取机构投资者13F文件列表  
✅ 解析XML格式的持仓数据  
✅ 支持批量数据下载  
✅ 实施速率限制和最佳实践  
✅ 提供中英文文档

## 测试结果

成功验证了以下机构的13F数据访问：
- 伯克希尔哈撒韦 (CIK: 1067983) - 43个文件
- 贝莱德 (CIK: 1364742) - 3个文件  
- 先锋集团 (CIK: 102909) - 4个文件

出海！一定要出海
