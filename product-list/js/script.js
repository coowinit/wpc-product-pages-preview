const products = [
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
  },
  {
    id: 2,
    title: 'SunComfortable™ Decking Sample Kit',
    category: 'decking',
    badge: 'NEW',
    price: '$5.00',
    ratingCount: 2,
    quantity: 2,
    productImage: 'assets/svg/product-2.svg',
    sceneImage: 'assets/svg/scene-2.svg',
  },
  {
    id: 3,
    title: 'Contemporary Greys Decking Sample Kit',
    category: 'decking',
    badge: 'NEW',
    price: '$5.00',
    ratingCount: 10,
    quantity: 1,
    productImage: 'assets/svg/product-3.svg',
    sceneImage: 'assets/svg/scene-3.svg',
  },
  {
    id: 4,
    title: 'Classic Brown Wall Cladding Kit',
    category: 'wall',
    badge: 'NEW',
    price: '$6.00',
    ratingCount: 8,
    quantity: 1,
    productImage: 'assets/svg/product-1.svg',
    sceneImage: 'assets/svg/scene-1.svg',
  },
  {
    id: 5,
    title: 'Modern Grey Wall Cladding Sample Kit',
    category: 'wall',
    badge: 'HOT',
    price: '$6.00',
    ratingCount: 6,
    quantity: 1,
    productImage: 'assets/svg/product-3.svg',
    sceneImage: 'assets/svg/scene-3.svg',
  },
  {
    id: 6,
    title: 'Coastal White Wall Panel Sample Pack for Exterior Design',
    category: 'wall',
    badge: 'NEW',
    price: '$6.00',
    ratingCount: 4,
    quantity: 1,
    productImage: 'assets/svg/product-2.svg',
    sceneImage: 'assets/svg/scene-2.svg',
  },
  {
    id: 7,
    title: 'Outdoor Fence Board Sample Pack',
    category: 'fencing',
    badge: 'NEW',
    price: '$5.00',
    ratingCount: 7,
    quantity: 1,
    productImage: 'assets/svg/product-1.svg',
    sceneImage: 'assets/svg/scene-1.svg',
  },
  {
    id: 8,
    title: 'Garden Privacy Fence Colour Sample Kit',
    category: 'fencing',
    badge: 'NEW',
    price: '$5.00',
    ratingCount: 5,
    quantity: 1,
    productImage: 'assets/svg/product-3.svg',
    sceneImage: 'assets/svg/scene-3.svg',
  },
  {
    id: 9,
    title: 'Natural Timber Look Composite Fence Sample Kit With Extra Long Product Name Hidden After Two Lines',
    category: 'fencing',
    badge: 'SALE',
    price: '$5.00',
    ratingCount: 9,
    quantity: 1,
    productImage: 'assets/svg/product-2.svg',
    sceneImage: 'assets/svg/scene-2.svg',
  },
  {
    id: 10,
    title: 'Starter Clip Accessory Pack',
    category: 'accessories',
    badge: 'NEW',
    price: '$12.00',
    ratingCount: 11,
    quantity: 1,
    productImage: 'assets/svg/product-2.svg',
    sceneImage: 'assets/svg/scene-2.svg',
  },
  {
    id: 11,
    title: 'Hidden Fastener and Screw Kit',
    category: 'accessories',
    badge: 'HOT',
    price: '$18.00',
    ratingCount: 15,
    quantity: 1,
    productImage: 'assets/svg/product-1.svg',
    sceneImage: 'assets/svg/scene-1.svg',
  },
  {
    id: 12,
    title: 'Edge Trim Finishing Accessory for Decking and Wall Projects',
    category: 'accessories',
    badge: 'NEW',
    price: '$16.00',
    ratingCount: 3,
    quantity: 1,
    productImage: 'assets/svg/product-3.svg',
    sceneImage: 'assets/svg/scene-3.svg',
  },
];

const categoryNames = {
  all: 'All Products',
  decking: 'Decking',
  wall: 'Wall Cladding',
  fencing: 'Fencing',
  accessories: 'Accessories',
};

const productsPerPage = 6;
let currentCategory = 'all';
let currentPage = 1;

const productGrid = document.querySelector('#productGrid');
const pagination = document.querySelector('#pagination');
const emptyState = document.querySelector('#emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');

function getFilteredProducts() {
  if (currentCategory === 'all') {
    return products;
  }

  return products.filter((product) => product.category === currentCategory);
}

function getStars() {
  return '★★★★★';
}

function getShippingIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 6h11v8h2.2l2-3H21v6h-2.05a2.5 2.5 0 0 1-4.9 0H9.95a2.5 2.5 0 0 1-4.9 0H3V6Zm2 2v7h.76a2.5 2.5 0 0 1 3.48 0H12V8H5Zm11 5h.13l1.96-3H16v3Zm.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-9 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </svg>
  `;
}

function createProductCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}">
      <span class="badge">${product.badge}</span>

      <a class="product-image-link" href="#" aria-label="${product.title}">
        <div class="image-box" data-hover-switch>
          <img class="product-img" src="${product.productImage}" alt="${product.title} product image" />
          <img class="scene-img" src="${product.sceneImage}" alt="${product.title} scene image" />
        </div>
      </a>

      <span class="category-label">${categoryNames[product.category]}</span>

      <h3 class="product-title" title="${product.title}">
        <a href="#">${product.title}</a>
      </h3>

      <div class="rating-row" aria-label="5 stars, ${product.ratingCount} reviews">
        <span>${getStars()}</span><span class="rating-count">(${product.ratingCount})</span>
      </div>

      <div class="product-bottom">
        <div class="price-qty-row">
          <div class="price-info">
            <div class="price">${product.price}</div>
            <div class="shipping">${getShippingIcon()} Ships free</div>
          </div>

          <div class="qty-control" aria-label="Quantity selector">
            <button class="qty-btn" type="button" data-action="minus" aria-label="Decrease quantity">−</button>
            <input class="qty-input" type="text" value="${product.quantity}" inputmode="numeric" aria-label="Quantity" />
            <button class="qty-btn" type="button" data-action="plus" aria-label="Increase quantity">＋</button>
          </div>
        </div>

        <button class="add-to-cart" type="button">Add to Cart</button>
      </div>
    </article>
  `;
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  currentPage = Math.min(currentPage, totalPages);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  productGrid.innerHTML = visibleProducts.map(createProductCard).join('');
  emptyState.hidden = filteredProducts.length > 0;

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    pagination.hidden = true;
    pagination.innerHTML = '';
    return;
  }

  pagination.hidden = false;

  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    const activeClass = page === currentPage ? ' is-active' : '';
    const ariaCurrent = page === currentPage ? ' aria-current="page"' : '';

    return `<button class="page-btn${activeClass}" type="button" data-page="${page}"${ariaCurrent}>${page}</button>`;
  }).join('');

  pagination.innerHTML = `
    <button class="page-btn" type="button" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
    ${pageButtons}
    <button class="page-btn" type="button" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    currentPage = 1;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    renderProducts();
  });
});

pagination.addEventListener('click', (event) => {
  const button = event.target.closest('.page-btn');

  if (!button || button.disabled) {
    return;
  }

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const pageValue = button.dataset.page;

  if (pageValue === 'prev') {
    currentPage = Math.max(1, currentPage - 1);
  } else if (pageValue === 'next') {
    currentPage = Math.min(totalPages, currentPage + 1);
  } else {
    currentPage = Number(pageValue);
  }

  renderProducts();
  document.querySelector('.category-filter').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

productGrid.addEventListener('click', (event) => {
  const qtyButton = event.target.closest('.qty-btn');

  if (qtyButton) {
    const control = qtyButton.closest('.qty-control');
    const input = control.querySelector('.qty-input');
    const currentValue = parseInt(input.value, 10) || 1;

    if (qtyButton.dataset.action === 'minus') {
      input.value = Math.max(1, currentValue - 1);
    }

    if (qtyButton.dataset.action === 'plus') {
      input.value = currentValue + 1;
    }

    return;
  }

  const imageBox = event.target.closest('[data-hover-switch]');

  if (imageBox && window.matchMedia('(hover: none)').matches) {
    event.preventDefault();
    imageBox.closest('.product-card').classList.toggle('is-touch-active');
  }
});

productGrid.addEventListener('input', (event) => {
  if (!event.target.classList.contains('qty-input')) {
    return;
  }

  event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

productGrid.addEventListener('blur', (event) => {
  if (!event.target.classList.contains('qty-input')) {
    return;
  }

  if (!event.target.value || parseInt(event.target.value, 10) < 1) {
    event.target.value = 1;
  }
}, true);

renderProducts();
