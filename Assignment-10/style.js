/* ============================================================
   SKYMART – JavaScript Application
   ============================================================ */

// ===================== API CONFIG =====================
const API_BASE = 'https://dummyjson.com';
const PRODUCTS_PER_PAGE = 12;
const CATEGORY_ICONS = {
  beauty: '💄',
  fragrances: '🌸',
  furniture: '🪑',
  groceries: '🛒',
  'home-decoration': '🏠',
  'kitchen-accessories': '🍳',
  laptops: '💻',
  'mens-shirts': '👕',
  'mens-shoes': '👟',
  'mens-watches': '⌚',
  'mobile-accessories': '📱',
  motorcycle: '🏍️',
  'skin-care': '🧴',
  smartphones: '📲',
  'sports-accessories': '⚽',
  sunglasses: '🕶️',
  tablets: '📟',
  tops: '👚',
  vehicle: '🚗',
  'womens-bags': '👜',
  'womens-dresses': '👗',
  'womens-jewellery': '💍',
  'womens-shoes': '👠',
  'womens-watches': '⌚',
  default: '📦',
};

// ===================== STATE =====================
const state = {
  products: [],
  allProducts: [],
  categories: [],
  cart: JSON.parse(localStorage.getItem('skymart_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('skymart_wishlist') || '[]'),
  currentPage: 'home',
  currentProductId: null,
  productsPage: 1,
  filters: {
    category: 'all',
    search: '',
    sort: 'default',
    maxPrice: 2000,
    minRating: 0,
  },
  viewMode: 'grid',
  theme: localStorage.getItem('skymart_theme') || 'dark',
};

// ===================== DOM UTILS =====================
const $ = (id) => document.getElementById(id);
const $q = (sel, ctx = document) => ctx.querySelector(sel);
const $qa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ===================== THEME =====================
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const moonIcon = $('moon-icon');
  const sunIcon = $('sun-icon');
  if (theme === 'light') {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }
  state.theme = theme;
  localStorage.setItem('skymart_theme', theme);
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// ===================== TOAST =====================
function showToast(message, type = 'info', duration = 3000) {
  const container = $('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: '🛍️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || '💬'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// ===================== CART =====================
function saveCart() {
  localStorage.setItem('skymart_cart', JSON.stringify(state.cart));
}

function updateCartCount() {
  const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = $('cart-count');
  badge.textContent = total;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  if (total > 0) badge.classList.add('bump');
}

function addToCart(product) {
  const existing = state.cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartCount();
  showToast(`"${product.title}" added to cart!`, 'success');
}


function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.id !== productId);
  saveCart();
  updateCartCount();
  renderCartSidebar();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartSidebar();
  updateCartCount();
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCartSidebar() {
  const container = $('cart-items-container');
  const footer = $('cart-footer');
  const subtotalEl = $('cart-subtotal');
  const totalEl = $('cart-total');

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some awesome products to get started!</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'flex';
  const total = getCartTotal();
  subtotalEl.textContent = `$${total.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;

  container.innerHTML = state.cart
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
          <button class="remove-item-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.title}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>`
    )
    .join('');
}

function openCart() {
  $('cart-sidebar').classList.add('open');
  $('cart-overlay').classList.add('open');
  renderCartSidebar();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('cart-sidebar').classList.remove('open');
  $('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===================== WISHLIST =====================
function saveWishlist() {
  localStorage.setItem('skymart_wishlist', JSON.stringify(state.wishlist));
}

function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    showToast('Added to wishlist ❤️', 'info');
  } else {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  }
  saveWishlist();
  // Update all wishlist buttons on page
  $qa(`[data-wishlist="${productId}"]`).forEach((btn) => {
    btn.classList.toggle('active', state.wishlist.includes(productId));
    btn.textContent = state.wishlist.includes(productId) ? '❤️' : '🤍';
  });
}

// ===================== API =====================
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

async function loadCategories() {
  try {
    const data = await fetchJSON(`${API_BASE}/products/categories`);
    // API returns array of {slug, name, url}
    state.categories = Array.isArray(data)
      ? data.map((c) => (typeof c === 'string' ? { slug: c, name: c } : c))
      : [];
  } catch (e) {
    console.error('Failed to load categories', e);
  }
}

async function loadAllProducts() {
  try {
    const data = await fetchJSON(`${API_BASE}/products?limit=194&select=id,title,description,price,rating,stock,category,thumbnail,images,discountPercentage,brand`);
    state.allProducts = data.products || [];
  } catch (e) {
    console.error('Failed to load products', e);
    state.allProducts = [];
  }
}


async function loadProductById(id) {
  try {
    return await fetchJSON(`${API_BASE}/products/${id}`);
  } catch (e) {
    console.error('Failed to load product', e);
    return null;
  }
}

// ===================== HELPERS =====================
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '½';
  stars += '☆'.repeat(5 - full - (half ? 1 : 0));
  return stars;
}

function renderProductCard(product, compact = false) {
  const isWishlisted = state.wishlist.includes(product.id);
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const hasDiscount = product.discountPercentage > 2;

  return `
    <article class="product-card" role="article" aria-label="${product.title}" data-product-id="${product.id}" onclick="navigateToProduct(${product.id})">
      <div class="product-img-wrap">
        <img class="product-img" src="${product.thumbnail}" alt="${product.title}" loading="lazy" />
        ${hasDiscount ? `<span class="product-badge badge-discount">-${Math.round(product.discountPercentage)}%</span>` : ''}
        <button class="product-wishlist ${isWishlisted ? 'active' : ''}"
          data-wishlist="${product.id}"
          onclick="event.stopPropagation(); toggleWishlist(${product.id})"
          aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          ${isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-body">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.rating.toFixed(1)})</span>
        </div>
        <div class="product-footer">
          <div class="price-wrap">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            ${hasDiscount ? `<span class="product-price-original">$${originalPrice}</span>` : ''}
          </div>
          <button class="add-to-cart-btn"
            onclick="event.stopPropagation(); addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})"
            aria-label="Add ${product.title} to cart">
            + Cart
          </button>
        </div>
      </div>
    </article>`;
}

function renderSkeletonGrid(count = 8) {
  return Array.from({ length: count })
    .map(
      () => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line medium"></div>
        <div class="skeleton skeleton-line"></div>
      </div>
    </div>`
    )
    .join('');
}

// ===================== HOME PAGE =====================
function renderHomeCategories(categories) {
  const grid = $('home-categories-grid');
  if (!grid) return;
  const display = categories.slice(0, 8);
  grid.innerHTML = display
    .map((cat) => {
      const slug = typeof cat === 'string' ? cat : cat.slug || cat.name;
      const name = typeof cat === 'string' ? cat : cat.name || cat.slug;
      const icon = CATEGORY_ICONS[slug] || CATEGORY_ICONS.default;
      const count = state.allProducts.filter((p) => p.category === slug).length;
      return `
        <button class="category-card" onclick="navigateToCategory('${slug}')" aria-label="Browse ${name}">
          <div class="category-icon">${icon}</div>
          <div class="category-name">${name}</div>
          <div class="category-count">${count} products</div>
        </button>`;
    })
    .join('');
}

function renderHomeFeatured() {
  const grid = $('home-products-grid');
  if (!grid) return;
  grid.innerHTML = renderSkeletonGrid(8);
  const featured = state.allProducts.sort(() => Math.random() - 0.5).slice(0, 8);
  setTimeout(() => {
    grid.innerHTML = featured.map((p) => renderProductCard(p)).join('');
  }, 400);
}

async function initHomePage() {
  renderHomeCategories(state.categories);
  renderHomeFeatured();
}