/**
 * SheryStore — Frontend Application Logic
 * Pure ES6 Vanilla JavaScript
 */

class App {
  constructor() {
    this.apiBase = "/api";
    this.accessToken = localStorage.getItem("shery_access_token") || null;
    this.user = JSON.parse(localStorage.getItem("shery_user_data") || "null");

    this.currentPage = 1;
    this.currentCategory = "All";
    this.searchQuery = "";

    this.init();
  }

  init() {
    this.updateAuthUI();
    this.fetchProducts();

    // Check auth status on load if token present
    if (this.accessToken) {
      this.fetchUserProfile();
    }
  }

  /* ==========================================================================
     API FETCH WRAPPER WITH AUTO TOKEN REFRESH
     ========================================================================== */
  async fetchAPI(endpoint, options = {}, isRetry = false) {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers
    };

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(`${this.apiBase}${endpoint}`, config);
      const data = await response.json();

      // Handle 401 Token Expired -> Auto Refresh
      if (response.status === 401 && !isRetry && endpoint !== "/auth/login" && endpoint !== "/auth/register") {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry original request with new token
          return await this.fetchAPI(endpoint, options, true);
        } else {
          this.handleLogout(false);
          this.showToast("Session expired. Please log in again.", "error");
        }
      }

      return { status: response.status, ok: response.ok, data };
    } catch (error) {
      console.error(`[API Error] ${endpoint}:`, error);
      return { status: 500, ok: false, data: { message: "Network error or server unreachable" } };
    }
  }

  /* ==========================================================================
     AUTHENTICATION LOGIC
     ========================================================================== */
  async refreshToken() {
    try {
      const res = await fetch(`${this.apiBase}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: localStorage.getItem("shery_refresh_token") || "" })
      });

      const data = await res.json();
      if (res.ok && data.accessToken) {
        this.setAuthSession(data.accessToken, data.refreshToken, data.user);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  setAuthSession(accessToken, refreshToken, user) {
    this.accessToken = accessToken;
    this.user = user;
    localStorage.setItem("shery_access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("shery_refresh_token", refreshToken);
    }
    localStorage.setItem("shery_user_data", JSON.stringify(user));
    this.updateAuthUI();
  }

  async fetchUserProfile() {
    const { ok, data } = await this.fetchAPI("/auth/me");
    if (ok && data.user) {
      this.user = data.user;
      localStorage.setItem("shery_user_data", JSON.stringify(data.user));
      this.updateAuthUI();
    }
  }

  async handleLoginSubmit(event) {
    event.preventDefault();
    this.clearErrors("login-form");

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const btn = document.getElementById("login-submit-btn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Logging in...`;

    const { ok, data } = await this.fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    btn.disabled = false;
    btn.innerHTML = `<span>Login</span> <i class="fa-solid fa-arrow-right"></i>`;

    if (ok && data.accessToken) {
      this.setAuthSession(data.accessToken, data.refreshToken, data.user);
      this.closeAuthModal();
      this.showToast(`Welcome back, ${data.user.name}!`, "success");
      this.fetchProducts();
    } else {
      if (data.errors) {
        this.displayFieldErrors(data.errors, "login");
      } else {
        const errBox = document.getElementById("login-general-error");
        errBox.textContent = data.message || "Invalid login credentials";
        errBox.classList.remove("hidden");
      }
    }
  }

  async handleRegisterSubmit(event) {
    event.preventDefault();
    this.clearErrors("register-form");

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    const btn = document.getElementById("register-submit-btn");
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;

    const { ok, data } = await this.fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    btn.disabled = false;
    btn.innerHTML = `<span>Create Account</span> <i class="fa-solid fa-user-check"></i>`;

    if (ok && data.user) {
      this.showToast("Registration successful! Please login to continue.", "success");
      this.switchAuthTab("login");
      document.getElementById("login-email").value = email;
    } else {
      if (data.errors) {
        this.displayFieldErrors(data.errors, "reg");
      } else {
        const errBox = document.getElementById("register-general-error");
        errBox.textContent = data.message || "Registration failed";
        errBox.classList.remove("hidden");
      }
    }
  }

  async handleLogout(notify = true) {
    if (this.accessToken) {
      await this.fetchAPI("/auth/logout", { method: "POST" });
    }
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem("shery_access_token");
    localStorage.removeItem("shery_refresh_token");
    localStorage.removeItem("shery_user_data");

    this.updateAuthUI();
    this.switchView("products");
    if (notify) this.showToast("Logged out successfully", "info");
    this.fetchProducts();
  }

  updateAuthUI() {
    const guestControls = document.getElementById("guest-controls");
    const userControls = document.getElementById("user-controls");
    const authRequiredElements = document.querySelectorAll(".auth-required");
    const statAuth = document.getElementById("stat-auth-status");

    if (this.user) {
      guestControls.classList.add("hidden");
      userControls.classList.remove("hidden");

      document.getElementById("user-name-display").textContent = this.user.name;
      document.getElementById("user-avatar-initial").textContent = this.user.name.charAt(0).toUpperCase();

      authRequiredElements.forEach(el => el.classList.remove("hidden"));

      if (statAuth) statAuth.innerHTML = `<i class="fa-solid fa-lock-open" style="color: var(--success)"></i>`;

      // Profile details
      document.getElementById("profile-name").textContent = this.user.name;
      document.getElementById("profile-email").textContent = this.user.email;
      document.getElementById("profile-id").textContent = this.user._id || "--";
      document.getElementById("profile-created").textContent = this.user.createdAt ? new Date(this.user.createdAt).toLocaleDateString() : "--";
      document.getElementById("profile-avatar-large").textContent = this.user.name.charAt(0).toUpperCase();
      document.getElementById("profile-access-token").textContent = this.accessToken ? `${this.accessToken.slice(0, 24)}...` : "None";
    } else {
      guestControls.classList.remove("hidden");
      userControls.classList.add("hidden");

      authRequiredElements.forEach(el => el.classList.add("hidden"));
      if (statAuth) statAuth.innerHTML = `<i class="fa-solid fa-lock" style="color: var(--text-dim)"></i>`;
    }
  }

  /* ==========================================================================
     PRODUCT CRUD LOGIC
     ========================================================================== */
  async fetchProducts() {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading products catalog...</p>
      </div>
    `;

    let query = `?page=${this.currentPage}&limit=9`;
    if (this.currentCategory !== "All") query += `&category=${encodeURIComponent(this.currentCategory)}`;
    if (this.searchQuery) query += `&search=${encodeURIComponent(this.searchQuery)}`;

    const { ok, data } = await this.fetchAPI(`/products${query}`);

    if (ok && data.products) {
      document.getElementById("stat-count").textContent = data.total || 0;
      this.renderProductsGrid(data.products);
      this.renderPagination(data.page, data.totalPages);
    } else {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; color:var(--warning); margin-bottom:12px;"></i>
          <p>Failed to load products. Check server logs or MongoDB connection.</p>
        </div>
      `;
    }
  }

  renderProductsGrid(products) {
    const grid = document.getElementById("products-grid");
    if (!products || products.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-box-open" style="font-size:2.5rem; color:var(--text-dim); margin-bottom:12px;"></i>
          <h3>No Products Found</h3>
          <p>Try searching for a different keyword or create a new product.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(prod => {
      const isOwnerOrAuth = !!this.user;
      const stockBadge = prod.stock > 0 
        ? `<span class="stock-tag stock-in"><i class="fa-solid fa-check"></i> ${prod.stock} in stock</span>`
        : `<span class="stock-tag stock-out"><i class="fa-solid fa-xmark"></i> Out of stock</span>`;

      return `
        <div class="product-card" id="product-${prod._id}">
          <div class="product-image-box">
            <img src="${prod.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'}" alt="${this.escapeHTML(prod.name)}" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'">
            <span class="category-tag">${this.escapeHTML(prod.category)}</span>
            ${stockBadge}
          </div>
          <div class="product-info">
            <h4 class="product-title">${this.escapeHTML(prod.name)}</h4>
            <p class="product-desc">${this.escapeHTML(prod.description || 'No description provided.')}</p>
            <div class="product-meta-bottom">
              <span class="product-price">$${prod.price.toFixed(2)}</span>
              ${isOwnerOrAuth ? `
                <div class="product-actions">
                  <button class="btn btn-icon btn-outline" title="Edit Product" onclick="app.openEditProductModal('${prod._id}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-icon btn-danger-soft" title="Delete Product" onclick="app.openDeleteModal('${prod._id}', '${this.escapeJS(prod.name)}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderPagination(page, totalPages) {
    const container = document.getElementById("pagination-controls");
    if (totalPages <= 1) {
      container.classList.add("hidden");
      return;
    }
    container.classList.remove("hidden");
    document.getElementById("page-indicator").textContent = `Page ${page} of ${totalPages}`;
    document.getElementById("prev-page-btn").disabled = page <= 1;
    document.getElementById("next-page-btn").disabled = page >= totalPages;
  }

  changePage(delta) {
    this.currentPage += delta;
    this.fetchProducts();
  }

  handleSearch() {
    this.searchQuery = document.getElementById("search-input").value.trim();
    const clearBtn = document.getElementById("clear-search-btn");
    if (this.searchQuery) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
    this.currentPage = 1;
    this.fetchProducts();
  }

  clearSearch() {
    document.getElementById("search-input").value = "";
    this.searchQuery = "";
    document.getElementById("clear-search-btn").classList.add("hidden");
    this.currentPage = 1;
    this.fetchProducts();
  }

  handleCategoryChange() {
    this.currentCategory = document.getElementById("category-filter").value;
    this.currentPage = 1;
    this.fetchProducts();
  }

  async handleProductSubmit(event) {
    event.preventDefault();
    this.clearErrors("product-form");

    const prodId = document.getElementById("prod-id").value;
    const name = document.getElementById("prod-name").value.trim();
    const price = document.getElementById("prod-price").value;
    const stock = document.getElementById("prod-stock").value;
    const category = document.getElementById("prod-category").value;
    const imageUrl = document.getElementById("prod-image").value.trim();
    const description = document.getElementById("prod-desc").value.trim();

    const btn = document.getElementById("product-submit-btn");
    btn.disabled = true;

    const payload = { name, price, stock, category, imageUrl, description };
    const method = prodId ? "PUT" : "POST";
    const endpoint = prodId ? `/products/${prodId}` : "/products";

    const { ok, data } = await this.fetchAPI(endpoint, {
      method,
      body: JSON.stringify(payload)
    });

    btn.disabled = false;

    if (ok && data.product) {
      this.closeProductModal();
      this.showToast(`Product ${prodId ? 'updated' : 'created'} successfully!`, "success");
      this.fetchProducts();
    } else {
      if (data.errors) {
        this.displayFieldErrors(data.errors, "prod");
      } else {
        const errBox = document.getElementById("product-general-error");
        errBox.textContent = data.message || "Failed to save product";
        errBox.classList.remove("hidden");
      }
    }
  }

  async openEditProductModal(id) {
    const { ok, data } = await this.fetchAPI(`/products/${id}`);
    if (ok && data.product) {
      const p = data.product;
      document.getElementById("prod-id").value = p._id;
      document.getElementById("prod-name").value = p.name;
      document.getElementById("prod-price").value = p.price;
      document.getElementById("prod-stock").value = p.stock;
      document.getElementById("prod-category").value = p.category || "General";
      document.getElementById("prod-image").value = p.imageUrl || "";
      document.getElementById("prod-desc").value = p.description || "";

      document.getElementById("product-modal-title").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Product`;
      document.getElementById("product-modal-subtitle").textContent = `Update item #${p._id.slice(-6)}`;
      document.getElementById("product-submit-text").textContent = "Update Product";

      document.getElementById("product-modal").classList.remove("hidden");
    } else {
      this.showToast("Could not fetch product details for editing", "error");
    }
  }

  openProductModal() {
    if (!this.user) {
      this.openAuthModal("login");
      return;
    }
    document.getElementById("product-form").reset();
    document.getElementById("prod-id").value = "";
    this.clearErrors("product-form");

    document.getElementById("product-modal-title").innerHTML = `<i class="fa-solid fa-plus"></i> Add New Product`;
    document.getElementById("product-modal-subtitle").textContent = "Create a new product in the store database";
    document.getElementById("product-submit-text").textContent = "Create Product";

    document.getElementById("product-modal").classList.remove("hidden");
  }

  closeProductModal() {
    document.getElementById("product-modal").classList.add("hidden");
  }

  openDeleteModal(id, name) {
    document.getElementById("delete-product-id").value = id;
    document.getElementById("delete-product-name").textContent = name;
    document.getElementById("delete-modal").classList.remove("hidden");
  }

  closeDeleteModal() {
    document.getElementById("delete-modal").classList.add("hidden");
  }

  async confirmDeleteProduct() {
    const id = document.getElementById("delete-product-id").value;
    const btn = document.getElementById("confirm-delete-btn");
    btn.disabled = true;

    const { ok, data } = await this.fetchAPI(`/products/${id}`, { method: "DELETE" });
    btn.disabled = false;
    this.closeDeleteModal();

    if (ok) {
      this.showToast("Product deleted successfully", "success");
      this.fetchProducts();
    } else {
      this.showToast(data.message || "Failed to delete product", "error");
    }
  }

  /* ==========================================================================
     UI MODAL & NAVIGATION CONTROLS
     ========================================================================== */
  switchView(viewName) {
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) targetSec.classList.remove("hidden");

    const navBtn = document.getElementById(`nav-${viewName}-btn`);
    if (navBtn) navBtn.classList.add("active");
  }

  openAuthModal(tab = "login") {
    this.switchAuthTab(tab);
    document.getElementById("auth-modal").classList.remove("hidden");
  }

  closeAuthModal() {
    document.getElementById("auth-modal").classList.add("hidden");
  }

  switchAuthTab(tab) {
    this.clearErrors("login-form");
    this.clearErrors("register-form");

    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("login-form");
    const formRegister = document.getElementById("register-form");

    if (tab === "login") {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      formLogin.classList.remove("hidden");
      formRegister.classList.add("hidden");
    } else {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      formRegister.classList.remove("hidden");
      formLogin.classList.add("hidden");
    }
  }

  displayFieldErrors(errors, prefix) {
    errors.forEach(err => {
      const fieldId = `err-${prefix}-${err.field}`;
      const errEl = document.getElementById(fieldId);
      if (errEl) {
        errEl.textContent = err.message;
        const wrapper = errEl.previousElementSibling;
        if (wrapper && wrapper.classList.contains("input-wrapper")) {
          wrapper.classList.add("has-error");
        }
      }
    });
  }

  clearErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll(".field-error").forEach(el => el.textContent = "");
    form.querySelectorAll(".input-wrapper").forEach(el => el.classList.remove("has-error"));
    form.querySelectorAll(".alert-box").forEach(el => el.classList.add("hidden"));
  }

  async testRefreshToken() {
    const refreshed = await this.refreshToken();
    if (refreshed) {
      this.showToast("Refresh Token verified & new access token issued!", "success");
      this.updateAuthUI();
    } else {
      this.showToast("Failed to refresh token. Session expired.", "error");
    }
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "fa-circle-info";
    if (type === "success") icon = "fa-circle-check";
    if (type === "error") icon = "fa-triangle-exclamation";

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${this.escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideInRight 0.3s reverse";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  escapeJS(str) {
    return String(str || '').replace(/'/g, "\\'");
  }
}

// Global App Instance
const app = new App();
