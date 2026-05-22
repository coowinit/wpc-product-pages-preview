# Product Category Page Hover Pagination Demo

这是一个完整的产品分类页静态示例，基于 HTML、CSS 和 JavaScript 实现。

## 功能说明

- 页面最大宽度：`1200px`
- 桌面端：一行 3 列
- 平板端：一行 2 列
- 手机端：一行 1 列
- 产品分类按钮：All / Decking / Wall Cladding / Fencing / Accessories
- 分页功能：默认每页显示 6 个产品
- 产品卡片 hover 时，默认产品图切换为场景图
- 手机端没有 hover，点击图片区域可切换图片
- 标题最多显示 2 行，超过 2 行自动隐藏
- 有些产品标题为 1 行，有些为 2 行，也包含超长标题测试
- CSS 和 JS 已经单独拆分

## 文件结构

```text
product-category-page-hover-pagination/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── svg/
│       ├── product-1.svg
│       ├── product-2.svg
│       ├── product-3.svg
│       ├── scene-1.svg
│       ├── scene-2.svg
│       └── scene-3.svg
└── README.md
```

## 修改产品数据

产品数据集中在 `js/script.js` 的 `products` 数组中：

```js
{
  id: 1,
  title: 'Enhance® Essentials Decking Kit',
  category: 'decking',
  badge: 'NEW',
  price: '$5.00',
  ratingCount: 12,
  quantity: 1,
  productImage: 'assets/svg/product-1.svg',
  sceneImage: 'assets/svg/scene-1.svg',
}
```

## 修改分类按钮

分类按钮在 `index.html` 中：

```html
<button class="filter-btn" type="button" data-category="decking">Decking</button>
```

对应的分类名称在 `js/script.js` 中：

```js
const categoryNames = {
  decking: 'Decking',
};
```

产品数据中的 `category` 需要和按钮的 `data-category` 保持一致。

## 修改每页数量

在 `js/script.js` 中修改：

```js
const productsPerPage = 6;
```

## 标题最多显示 2 行

标题限制在 `css/style.css` 中：

```css
.product-title a {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## 图片替换方式

替换 `assets/svg/` 中的 SVG，或直接在 `js/script.js` 中修改图片路径：

```js
productImage: 'assets/svg/product-1.svg',
sceneImage: 'assets/svg/scene-1.svg',
```

- `productImage`：默认产品图
- `sceneImage`：hover 后显示的场景图
