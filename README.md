# 高二课表系统 - Netlify部署指南

这个项目是一个高二课表生成和下载系统，支持生成完整课表和分天课表（周五、周六），并提供图片下载功能。

## 项目文件结构

```
/Users/gripex/Desktop/高二/
├── 1.png          # 教师图片资源
├── 2.png          # 教师图片资源
├── 3.png          # 教师图片资源
├── 4.png          # 教师图片资源
├── 5.png          # 教师图片资源
├── 6.png          # 教师图片资源
├── 9.jpg          # 教师图片资源
├── b2.png         # 背景图片
├── daily_schedule.html  # 分天课表页面
├── h2.png         # 背景图片
├── j2.png         # 背景图片
├── logo.png       # 有道领世logo
├── m1.png         # 二维码图片
├── netlify.toml   # Netlify配置文件
├── README.md      # 项目说明文件
└── 高二.html      # 主课表生成页面
```

## Netlify部署步骤

### 方法1：通过GitHub/GitLab部署（推荐）

1. **准备代码仓库**
   - 将所有文件上传到GitHub或GitLab仓库
   - 确保`netlify.toml`文件在仓库根目录

2. **连接Netlify**
   - 访问 [Netlify官网](https://www.netlify.com/) 并登录
   - 点击"Add new site" -> "Import an existing project"
   - 选择你的代码托管平台（GitHub/GitLab）
   - 授权并选择你的仓库

3. **配置部署设置**
   - 构建命令：留空（这是静态网站，不需要构建）
   - 发布目录：留空（默认为根目录）
   - 点击"Deploy site"

### 方法2：直接拖放部署

1. **压缩文件**
   - 将所有文件压缩成ZIP文件

2. **上传部署**
   - 访问 [Netlify官网](https://www.netlify.com/) 并登录
   - 点击"Add new site" -> "Deploy manually"
   - 拖放ZIP文件到上传区域

## 主要功能

### 1. 高二.html（主页面）
- 课表生成和编辑
- 下载完整课表为PNG图片
- 支持切换不同渠道的背景

### 2. daily_schedule.html（分天课表页面）
- 显示周五和周六的课表
- 分别下载周五和周六课表为PNG图片

## 技术说明

### 下载功能优化

1. **跨域支持**
   - 图片添加了`crossOrigin = 'anonymous'`属性
   - `netlify.toml`配置了CORS头

2. **性能优化**
   - 使用Blob API替代toDataURL，提高大图片下载性能
   - 添加了图片加载超时机制
   - 优化了html2canvas配置

3. **用户体验**
   - 替换alert弹窗为美观的通知组件
   - 添加了错误处理和降级方案
   - 提供手动保存选项作为最后保障

### 图片资源引用

所有图片资源使用相对路径（`./filename.png`），确保在Netlify部署环境中能正确加载。

## 注意事项

1. **图片资源**
   - 确保所有图片文件都上传到服务器
   - 图片文件名区分大小写

2. **浏览器兼容性**
   - 推荐使用Chrome、Firefox、Edge等现代浏览器
   - 下载功能需要浏览器支持Blob API和html2canvas

3. **安全设置**
   - Netlify配置已包含必要的CORS设置，允许图片跨域访问
   - 网站使用CDN加载外部资源（Tailwind CSS、Font Awesome、html2canvas）

## 故障排除

### 图片下载失败

1. 检查控制台错误信息
2. 确认所有图片资源已正确上传
3. 尝试刷新页面后重新下载
4. 如果自动下载失败，系统会提示右键保存图片

### 样式显示异常

1. 确认Tailwind CSS已正确加载
2. 清除浏览器缓存后重试

## 许可证

保留所有权利。