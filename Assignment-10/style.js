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