# WPC Product Pages GitHub Preview

这是一个用于 GitHub Pages 预览的静态页面包，整理了两个已确认的页面：

1. `product-list/`：产品分类列表页
2. `product-detail/`：产品详情页

根目录的 `index.html` 是入口页，上传到 GitHub 并开启 GitHub Pages 后，可以通过入口页跳转预览这两个页面。

## 页面说明

### Product Category Page

路径：`product-list/index.html`

功能：

- 页面最大宽度：`1200px`
- 桌面端一行 3 列
- 产品分类按钮
- 分页功能
- 产品标题最多显示 2 行，超出隐藏
- 产品图 hover 切换场景图
- 手机端响应式布局
- CSS 和 JS 独立拆分

### Product Detail Page

路径：`product-detail/index.html`

功能：

- 页面最大宽度：`1200px`
- 详情主体左右 `1:1` 布局
- Swiper 主图轮播
- 左侧缩略图高度和主图外框高度一致
- 缩略图超出隐藏，通过上下箭头逐个切换
- 色卡切换，每个色卡对应一张产品图
- 支持 Add to Cart 和 Request Quote
- 放大镜按钮绝对定位到主图右下角
- 手机端响应式布局
- CSS 和 JS 独立拆分

## 文件结构

```text
wpc-product-pages-github-preview/
├── index.html
├── README.md
├── product-list/
│   ├── index.html
│   ├── README.md
│   ├── css/
│   ├── js/
│   └── assets/
└── product-detail/
    ├── index.html
    ├── README.md
    ├── css/
    ├── js/
    └── images/
```

## GitHub Pages 使用方式

1. 新建 GitHub 仓库。
2. 上传本文件夹中的所有文件到仓库根目录。
3. 在仓库中进入 `Settings` → `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成链接。
7. 打开 Pages 链接即可看到入口页。

## 后续集成方向

- WooCommerce：可将产品列表页结构拆入产品归档模板，将详情页图库、色卡、数量、Add to Cart 区域拆入单品模板。
- B2B 询盘商城：可隐藏支付相关按钮，只保留 `Request Quote`，并绑定询盘表单或 WhatsApp / 邮件表单。
