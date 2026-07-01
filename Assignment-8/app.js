// --- 1. Authentication Check & Security Flow ---
const isLoggedIn = localStorage.getItem("isLoggedIn");
const logoutBtn = document.getElementById("logoutBtn");

if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
    });
}

// --- 2. DOM Elements for Settings ---
const settingsModal = document.getElementById('settingsModal');
const settingsBtn = document.getElementById('settingsBtn');
const cancelSettings = document.getElementById('cancelSettings');
const settingsForm = document.getElementById('settingsForm');

const settingsName = document.getElementById('settingsName');
const currencySelect = document.getElementById('currencySelect');
const themeToggle = document.getElementById('themeToggle');

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
};

// --- 3. Operational Logic Modules ---

// Fetch user data configuration cleanly without blind execution overwrites
function loadSettings() {
    const savedData = localStorage.getItem('settings');
    if (savedData) {
        return JSON.parse(savedData);
    }
    
    // Default safe fallback if configuration is missing
    const loginUser = localStorage.getItem("currentUser") || 'Deep';
    return {
        name: loginUser,
        currency: "INR",
        theme: "dark"
    };
}

function openSettingsModal() {
    const currentSettings = loadSettings();
    
    // Sync live variables onto open form fields
    settingsName.value = currentSettings.name;
    currencySelect.value = currentSettings.currency;
    themeToggle.checked = currentSettings.theme === 'dark';
    
    settingsModal.classList.remove('hidden');
}

function closeSettingsModal() {
    settingsModal.classList.add('hidden');
}

function saveSettings(e) {
    e.preventDefault(); 
    
    const operationalConfig = {
        name: settingsName.value.trim(),
        currency: currencySelect.value,
        theme: themeToggle.checked ? 'dark' : 'light'
    };
    
    // Update local storage configuration keys
    localStorage.setItem('settings', JSON.stringify(operationalConfig));
    localStorage.setItem("currentUser", operationalConfig.name);
    
    // Refresh layout views dynamically without refreshing the page
    updateDashboard(operationalConfig);
    applyTheme(operationalConfig.theme);
    closeSettingsModal();
}

function updateDashboard(config) {
    // 1. Update all designated user profile spans across header layouts
    const userNameElements = document.querySelectorAll(".userName");
    userNameElements.forEach((element) => {
        element.textContent = config.name;
    });

    // 2. Scan and update all balance, income, expense card symbols accurately
    const chosenSymbol = currencySymbols[config.currency] || '₹';
    const targetSymbolElements = document.querySelectorAll('.currency-symbol');
    targetSymbolElements.forEach(element => {
        element.textContent = chosenSymbol;
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
}

// --- 4. Wire Up Live Dynamic Event Interactions ---
if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
if (cancelSettings) cancelSettings.addEventListener('click', closeSettingsModal);
if (settingsForm) settingsForm.addEventListener('submit', saveSettings);

// Background overlay click exit optimization rule
if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });
}

// --- 5. Application Lifecycle Initialization Execution ---
document.addEventListener('DOMContentLoaded', () => {
    const activeConfigData = loadSettings();
    updateDashboard(activeConfigData);
    applyTheme(activeConfigData.theme);
});