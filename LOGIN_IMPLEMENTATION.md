# 后端服务登录功能实现说明

## 📋 概述

本项目已完整实现基于后端服务的登录/注册功能，支持JWT Token认证。

## 🔧 核心配置

### 1. 环境配置 (`utils/env.ts`)
```typescript
export const base_url: string = 'https://192.168.2.1:3000'  // 后端服务器地址
export const use_mock: boolean = false  // false=使用后端服务，true=使用Mock数据
```

**注意**: 请根据实际后端服务器地址修改 `base_url`

### 2. API接口配置 (`utils/api_config.ts`)
```typescript
export const API = {
  AUTH: {
    LOGIN: '/api/sign/reg_login',  // 登录/注册接口
  },
  // ... 其他接口
}
```

## 🚀 登录流程

### 前端流程

1. **用户输入** (Sign.ets)
   - 输入账号和密码
   - 验证格式（账号≥3字符，密码≥6字符）

2. **发送请求** (Sign.ets → http.ets)
   ```typescript
   // 调用后端接口
   res = await request.post(API.AUTH.LOGIN, this.form)
   ```

3. **HTTP请求封装** (http.ets)
   - 自动添加 Authorization Header（如果有token）
   - 设置 Content-Type: application/json
   - 超时时间：10秒
   - 错误处理：抛出异常供调用方处理

4. **响应处理** (Sign.ets)
   ```typescript
   if (res.code === 200) {
     // 保存token和用户名
     await storage.set('token', res.data)
     await storage.set('uname', this.form.uname)
     // 跳转首页
     this.navPathStack.clear()
   }
   ```

5. **状态同步** (mine_bar.ets)
   - 页面加载时检查登录状态
   - 页面显示时刷新登录状态
   - 退出登录时清除所有数据

## 📡 后端接口要求

### 登录/注册接口

**接口地址**: `POST /api/sign/reg_login`

**请求参数**:
```json
{
  "uname": "用户名",
  "password": "密码"
}
```

**响应格式**:
```json
{
  "code": 200,
  "data": "jwt_token_string",
  "msg": "登录成功"
}
```

**失败响应**:
```json
{
  "code": 401,
  "data": null,
  "msg": "账号或密码错误"
}
```

## 🔐 Token管理

### Token存储
- 使用 `storage.set('token', token)` 保存
- 使用 `storage.get('token')` 读取
- 退出登录时 `storage.clear()` 清除

### Token使用
HTTP请求时自动在Header中添加：
```
Authorization: Bearer <token>
```

## ✨ 功能特性

### 1. 输入验证
- ✅ 账号长度 ≥ 3字符
- ✅ 密码长度 ≥ 6字符
- ✅ 空值检查

### 2. 错误处理
- ✅ 网络错误提示
- ✅ HTTP状态码检查
- ✅ 超时处理（10秒）
- ✅ 异常捕获和日志记录

### 3. 用户体验
- ✅ 加载状态显示
- ✅ Toast提示信息
- ✅ 登录成功自动跳转
- ✅ 退出登录确认对话框

### 4. 状态管理
- ✅ 登录状态持久化
- ✅ 页面间状态同步
- ✅ 自动刷新登录状态

## 🔍 调试建议

### 1. 检查网络连接
```typescript
// 在 env.ts 中临时切换到 Mock 模式测试UI
export const use_mock: boolean = true
```

### 2. 查看请求日志
```typescript
// http.ets 中已添加错误日志
console.error('POST请求失败:', JSON.stringify(err))
```

### 3. 验证Token存储
```typescript
// 在 mine_bar.ets 中添加调试日志
const token = await storage.get('token')
console.log('当前Token:', token)
```

### 4. 测试后端接口
使用 Postman 或 curl 测试：
```bash
curl -X POST https://192.168.2.1:3000/api/sign/reg_login \
  -H "Content-Type: application/json" \
  -d '{"uname":"test","password":"123456"}'
```

## 🛠️ 常见问题

### Q1: 登录失败，提示网络错误
**解决方案**:
1. 检查 `base_url` 是否正确
2. 确认后端服务是否启动
3. 检查网络连接
4. 查看控制台错误日志

### Q2: Token无效
**解决方案**:
1. 检查后端JWT密钥配置
2. 确认Token格式正确
3. 检查Token过期时间
4. 清除缓存重新登录

### Q3: 登录后状态未更新
**解决方案**:
1. 确认 `storage.set()` 成功执行
2. 检查 `aboutToAppear()` 和 `onPageShow()` 是否正常调用
3. 验证 `refreshLoginStatus()` 逻辑

## 📝 代码位置

- **登录页面**: `entry/src/main/ets/pages/Sign.ets`
- **我的页面**: `entry/src/main/ets/pages/navbar/mine_bar.ets`
- **HTTP工具**: `entry/src/main/ets/utils/http.ets`
- **API配置**: `entry/src/main/ets/utils/api_config.ts`
- **环境配置**: `entry/src/main/ets/utils/env.ts`
- **存储工具**: `entry/src/main/ets/utils/storage.ets`

## 🎯 下一步优化建议

1. **Token刷新机制**: 实现Token自动刷新
2. **记住密码**: 添加记住密码功能（加密存储）
3. **第三方登录**: 集成微信/QQ登录
4. **生物识别**: 支持指纹/面部识别登录
5. **离线模式**: 缓存用户信息支持离线浏览
