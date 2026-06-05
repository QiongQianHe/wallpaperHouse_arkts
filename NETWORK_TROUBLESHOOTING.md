# 网络连接问题排查指南

## ❌ 当前错误

```
POST请求失败: {"code":2300999,"message":"Unknown Other Error"}
登录异常: {}
```

## 🔍 错误原因分析

错误代码 `2300999` 表示网络请求失败，可能的原因：

### 1. HTTPS 证书问题 ⚠️
**问题**: 使用自签名证书或无效证书时，HarmonyOS 会拒绝连接  
**解决**: 开发环境使用 HTTP 而非 HTTPS

### 2. 服务器地址不可达 🌐
**问题**: 
- 后端服务未启动
- IP地址错误
- 端口被防火墙阻止

### 3. 网络配置问题 📱
**问题**:
- 手机和电脑不在同一WiFi
- 使用了错误的IP地址（127.0.0.1）

## ✅ 解决方案

### 方案1：切换到 HTTP（推荐用于开发）

已修改 `env.ts`：
```typescript
// 从 HTTPS 改为 HTTP
export const base_url: string = 'http://192.168.2.1:3000'
```

### 方案2：检查后端服务是否启动

在电脑上测试后端服务：
```bash
# 测试后端是否响应
curl http://192.168.2.1:3000

# 测试登录接口
curl -X POST http://192.168.2.1:3000/api/sign/reg_login \
  -H "Content-Type: application/json" \
  -d '{"uname":"test","password":"test123"}'
```

### 方案3：确认正确的IP地址

**在Windows上查看IP：**
```powershell
ipconfig
```
找到 `无线局域网适配器 WLAN` 下的 `IPv4 地址`

**常见IP地址段：**
- `192.168.x.x` - 家庭/办公室网络
- `10.x.x.x` - 企业网络
- `172.16.x.x - 172.31.x.x` - 私有网络

### 方案4：检查防火墙设置

**Windows防火墙允许端口：**
1. 打开 Windows Defender 防火墙
2. 点击 "高级设置"
3. 入站规则 → 新建规则
4. 选择 "端口" → TCP → 特定本地端口: 3000
5. 允许连接

### 方案5：使用模拟器测试

如果使用本地回环地址：
```typescript
export const base_url: string = 'http://127.0.0.1:3000'
```
⚠️ 注意：仅适用于模拟器，真机无法访问

## 🛠️ 调试步骤

### 第1步：查看网络配置日志

应用启动时会输出：
```
=== 网络配置检查 ===
后端地址: http://192.168.2.1:3000
协议类型: HTTP
服务器IP: 192.168.2.1
✓ 使用局域网IP
  提示: 确保手机和电脑在同一WiFi网络
=====================
```

### 第2步：执行完整网络诊断

在 `Index.ets` 中启用完整诊断：
```typescript
NetworkDiagnostic.testConnection()
```

会输出：
```
=== 开始网络诊断 ===
后端地址: http://192.168.2.1:3000

[测试1] 尝试连接后端服务器...
✓ 连接成功
  状态码: 200

[测试2] 测试登录接口...
✓ 接口调用成功
  状态码: 200
  响应数据: {"code":200,"data":"token...","msg":"登录成功"}

=== 诊断完成 ===
```

### 第3步：查看详细请求日志

现在每次POST请求都会输出：
```
POST请求: http://192.168.2.1:3000/api/sign/reg_login
请求数据: {"uname":"test","password":"123456"}
请求头: {"Content-Type":"application/json"}
响应状态码: 200
响应数据: {"code":200,"data":"...","msg":"登录成功"}
```

## 📋 检查清单

- [ ] 后端服务已启动
- [ ] 使用 HTTP 而非 HTTPS（开发环境）
- [ ] IP地址正确（不是 127.0.0.1）
- [ ] 端口号正确（3000）
- [ ] 手机和电脑在同一WiFi
- [ ] 防火墙已允许端口3000
- [ ] 后端接口路径正确（/api/sign/reg_login）

## 🎯 快速修复步骤

1. **确认后端服务运行**
   ```bash
   # 在你的后端项目目录
   npm start
   # 或
   node server.js
   ```

2. **获取正确的IP地址**
   ```powershell
   ipconfig | findstr "IPv4"
   ```

3. **更新 env.ts**
   ```typescript
   export const base_url: string = 'http://你的IP:3000'
   export const use_mock: boolean = false
   ```

4. **重新编译运行**
   ```bash
   hvigorw clean
   hvigorw assembleHap
   ```

5. **查看日志确认**
   - 检查 "网络配置检查" 输出
   - 尝试登录
   - 查看详细的请求/响应日志

## 🔧 临时使用 Mock 模式

如果后端暂时无法连接，可以切换到 Mock 模式测试UI：

```typescript
// env.ts
export const use_mock: boolean = true  // 临时切换
```

这样可以先测试前端功能，等后端就绪后再切换回来。

## 📞 仍然无法解决？

收集以下信息以便排查：

1. **网络配置日志**（应用启动时输出）
2. **完整请求日志**（包含请求URL、数据、响应）
3. **后端服务日志**（是否有收到请求）
4. **ping 测试结果**
   ```bash
   ping 192.168.2.1
   ```
5. **telnet 测试端口**
   ```bash
   telnet 192.168.2.1 3000
   ```
