# Product Detail Swiper Page - v3

这是一个产品详情页 HTML 示例，适合后期集成到 WooCommerce 产品详情页，也可以改造成普通 B2B 询盘商城的详情页模板。

## 本次优化

- 页面最大宽度保持为 `1200px`。
- 桌面端详情区调整为左右 `1:1` 比例，避免左侧主图过大、右侧内容过窄。
- 左侧缩略图整体高度与主图外框高度一致。
- 缩略图超出后隐藏，通过上 / 下圆形箭头逐个切换。
- 点击下箭头时，缩略图会向上移动一格，同时主图也切换到对应图片。
- 缩略图不是第一张时，顶部自动出现向上箭头；回到第一张时自动隐藏。
- 放大镜按钮继续绝对定位在主图右下角。
- 手机端自动改为主图在上、缩略图横向排列、产品信息在下。

## 文件结构

```text
product-detail-swiper-page-v3-balanced-gallery/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── kit-*.svg
    ├── swatch-*.svg
    └── scene-*.svg
```

## 集成提示

- WooCommerce 中可以把 `Add to Cart` 与产品 ID、变体 ID、数量字段绑定。
- B2B 询盘系统中可以隐藏 `Add to Cart`，只保留 `Request Quote`。
- 色卡切换逻辑在 `js/script.js` 的 `productVariants` 中维护；每个色卡只对应一张产品图。
- 缩略图箭头逻辑集中在 `goToGalleryIndex()`、`syncThumbPosition()`、`updateThumbNavState()` 中。
