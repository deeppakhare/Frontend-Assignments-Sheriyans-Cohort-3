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


// ==========================================================================
// FEATURE C: TRANSACTION ENGINE MANAGEMENT LAYER
// ==========================================================================

// --- 1. DOM Element Mappings ---
const transactionModal = document.getElementById('transactionModal');
const addTransactionBtn = document.querySelector('.addBtn button');
const cancelTransactionBtn = document.getElementById('cancelTransaction');
const transactionForm = document.getElementById('transactionForm');

const tableSearch = document.getElementById('tableSearch');
const tableFilter = document.getElementById('tableFilter');
const transactionTableBody = document.getElementById('transactionTableBody');
const tableContainer = document.getElementById('tableContainer');
const emptyState = document.getElementById('emptyState');

// --- 2. State & Storage Engine IO API Hooks ---
function getTransactions() {
    const records = localStorage.getItem('transactions');
    return records ? JSON.parse(records) : [];
}

function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// --- 3. Modal Layer Interface Control Flows ---
if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', () => {
        // Set date input selector automatically to current local calendar day
        document.getElementById('txDate').value = new Date().toISOString().split('T')[0];
        transactionModal.classList.remove('hidden');
    });
}

function closeTransactionModal() {
    transactionForm.reset();
    transactionModal.classList.add('hidden');
}

if (cancelTransactionBtn) cancelTransactionBtn.addEventListener('click', closeTransactionModal);

// Close overlay on outer backdrop mesh point clicks
transactionModal.addEventListener('click', (e) => {
    if (e.target === transactionModal) closeTransactionModal();
});

// --- 4. Form Processing & Transaction Validation Actions  ---
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('txType').value;
    const description = document.getElementById('txDescription').value.trim();
    const amount = parseFloat(document.getElementById('txAmount').value);
    const date = document.getElementById('txDate').value;
    const category = document.getElementById('txCategory').value;

    // Safety structural validation checks
    if (!description || isNaN(amount) || amount <= 0 || !date) {
        alert("Please provide valid information inside all required inputs.");
        return;
    }

    // Build unique tracking entity [cite: 116, 154]
    const newTransaction = {
        id: Date.now(), // Safe millisecond stamp identifier 
        type,
        description,
        amount,
        date,
        category
    };

    const records = getTransactions();
    records.unshift(newTransaction); // Insert at top of list
    saveTransactions(records);

    closeTransactionModal();
    masterRefresh(); // Global visual UI synchronized pipeline rebuild [cite: 109]
});

// --- 5. Interactive Delete Request Handlers [cite: 74, 123] ---
window.deleteTransactionItem = function(id) {
    if (confirm("Are you sure you want to delete this structural ledger record?")) {
        let records = getTransactions();
        records = records.filter(item => item.id !== id);
        saveTransactions(records);
        masterRefresh();
    }
};

// --- 6. Live Re-rendering Data Processing Pipeline ---
function renderTransactionTable() {
    const records = getTransactions();
    const searchQuery = tableSearch.value.toLowerCase().trim();
    const filterValue = tableFilter.value;

    // Filter collection datasets based on search constraints
    const processedData = records.filter(item => {
        const matchesSearch = item.description.toLowerCase().includes(searchQuery) || 
                              item.category.toLowerCase().includes(searchQuery);
        const matchesType = filterValue === 'all' || item.type === filterValue;
        return matchesSearch && matchesType;
    });

    // Toggle Empty State graphics cleanly [cite: 68]
    if (processedData.length === 0) {
        tableContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        transactionTableBody.innerHTML = '';
        return;
    }

    tableContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');

    // Rebuild active DOM rows dynamically
    let rowsHTML = '';
    processedData.forEach(item => {
        const settings = JSON.parse(localStorage.getItem('settings')) || { currency: 'INR' };
        const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
        const activeSymbol = symbols[settings.currency] || '₹';

        const displayAmount = `${item.type === 'income' ? '+' : '-'}${activeSymbol}${item.amount.toFixed(2)}`;
        const amountClass = item.type === 'income' ? 'tx-income' : 'tx-expense';

        rowsHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td><span class="badge">${item.category}</span></td>
                <td class="${amountClass}">${displayAmount}</td>
                <td><span class="badge" style="text-transform: capitalize;">${item.type}</span></td>
                <td>
                    <button class="btn-delete" onclick="deleteTransactionItem(${item.id})" title="Delete Transaction">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    transactionTableBody.innerHTML = rowsHTML;
}

// --- 7. Live Sync Calculations For Metric Summary Cards [cite: 52, 103] ---
function updateSummaryStatCards() {
    const records = getTransactions();
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(item => {
        if (item.type === 'income') totalIncome += item.amount;
        else totalExpense += item.amount;
    });

    const netBalance = totalIncome - totalExpense;
    const settings = JSON.parse(localStorage.getItem('settings')) || { currency: 'INR' };
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
    const activeSymbol = symbols[settings.currency] || '₹';

    // Target elements via existing summary-card child structures
    const cardDivs = {
        balance: document.querySelector('#div3 .symbol h3'),
        income: document.querySelector('#div4 .symbol h3'),
        expense: document.querySelector('#div5 .symbol h3'),
        count: document.querySelector('#div6 .symbol h3')
    };

    if (cardDivs.balance) cardDivs.balance.innerHTML = `<span class="currency-symbol">${activeSymbol}</span>${netBalance.toFixed(2)}`;
    if (cardDivs.income) cardDivs.income.innerHTML = `<span class="currency-symbol">${activeSymbol}</span>${totalIncome.toFixed(2)}`;
    if (cardDivs.expense) cardDivs.expense.innerHTML = `<span class="currency-symbol">${activeSymbol}</span>${totalExpense.toFixed(2)}`;
    if (cardDivs.count) cardDivs.count.innerHTML = `${records.length}`;
}

// --- 8. Master Dynamic Refresh Framework Execution Orchestrator [cite: 109, 119] ---
window.masterRefresh = function() {
    renderTransactionTable();
    updateSummaryStatCards();
    
    // Placeholder hook for your next target: Cash Flow Analysis chart renderer execution
    if (typeof renderCashFlowChart === 'function') {
        renderCashFlowChart();
    }
};

// --- 9. Assign Control Input Change Event Triggers ---
if (tableSearch) tableSearch.addEventListener('input', renderTransactionTable);
if (tableFilter) tableFilter.addEventListener('change', renderTransactionTable);

// Auto-run layout hooks during window framework context bootstrap launches
document.addEventListener('DOMContentLoaded', () => {
    masterRefresh();
});


// ==========================================================================
// FEATURE A: DYNAMIC CASH FLOW GRAPH ANALYSIS ENGINE
// ==========================================================================

// --- 1. State Reference Variables ---
let cashFlowChartInstance = null;
const chartTimeframeSelect = document.getElementById('chartTimeframe');

// --- 2. Generation of Historical Calendar Month Buckets ---
function generateRecentMonthBuckets(count) {
    const labels = [];
    const queryKeys = []; // Formatted as 'YYYY-MM' for exact map matching
    
    const currentDate = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
        const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        
        // Human Readable Label (e.g. "Oct", "Nov")
        const monthLabel = targetDate.toLocaleString('default', { month: 'short' });
        labels.push(monthLabel);
        
        // Normalized key format mapping matching string values
        const year = targetDate.getFullYear();
        const monthNum = String(targetDate.getMonth() + 1).padStart(2, '0');
        queryKeys.push(`${year}-${monthNum}`);
    }
    
    return { labels, queryKeys };
}

// --- 3. Primary Chart Rebuild & Renderer Pipeline ---
window.renderCashFlowChart = function() {
    const canvas = document.getElementById('cashFlowChart');
    if (!canvas) return; // Prevent break errors if called prematurely

    const timeframeMonths = parseInt(chartTimeframeSelect ? chartTimeframeSelect.value : 6);
    const { labels, queryKeys } = generateRecentMonthBuckets(timeframeMonths);

    // Initializing tracking buckets arrays filled with safe zero indexes
    const incomeData = new Array(timeframeMonths).fill(0);
    const expenseData = new Array(timeframeMonths).fill(0);

    // Read live array state records
    const records = typeof getTransactions === 'function' ? getTransactions() : [];

    // Map transaction data items to correct historical calendar buckets
    records.forEach(item => {
        if (!item.date) return;
        
        // Extract 'YYYY-MM' chunk sequence from 'YYYY-MM-DD' configuration
        const itemMonthKey = item.date.substring(0, 7); 
        const bucketIndex = queryKeys.indexOf(itemMonthKey);

        if (bucketIndex !== -1) {
            if (item.type === 'income') {
                incomeData[bucketIndex] += item.amount;
            } else if (item.type === 'expense') {
                expenseData[bucketIndex] += item.amount;
            }
        }
    });

    // Cleanly destroy the previous canvas instance if one exists to prevent layout shifting
    if (cashFlowChartInstance) {
        cashFlowChartInstance.destroy();
    }

    // Determine current text color variables dynamically to match themes
    const isDarkTheme = document.body.classList.contains('dark-theme') || !document.body.classList.contains('light-theme');
    const chartTextColor = isDarkTheme ? '#94a3b8' : '#64748b';
    const gridLineColor = isDarkTheme ? 'rgba(34, 33, 61, 0.5)' : 'rgba(203, 213, 225, 0.5)';

    // Instantiate Chart Configuration Layer
    const ctx = canvas.getContext('2d');
    cashFlowChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    // Colors match the dark green layout styling of metric logo2
                    backgroundColor: 'rgb(79, 242, 155)',
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    // Colors match the red graphic styling of metric logo3
                    backgroundColor: 'rgb(248, 85, 120)',
                    borderRadius: 6,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: chartTextColor,
                        font: { family: 'sales, sans-serif', size: 12 }
                    }
                },
                tooltip: {
                    padding: 10,
                    bodyFont: { family: 'sales, sans-serif' },
                    titleFont: { family: 'sales, sans-serif', weight: 'bold' }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: chartTextColor, font: { family: 'sales, sans-serif' } }
                },
                y: {
                    grid: { color: gridLineColor },
                    ticks: { 
                        color: chartTextColor, 
                        font: { family: 'sales, sans-serif' },
                        callback: function(value) {
                            const activeSettings = JSON.parse(localStorage.getItem('settings')) || { currency: 'INR' };
                            const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };
                            return (symbols[activeSettings.currency] || '₹') + value;
                        }
                    }
                }
            }
        }
    });
};

// --- 4. Wire Up Live Change Events Utilities ---
if (chartTimeframeSelect) {
    chartTimeframeSelect.addEventListener('change', window.renderCashFlowChart);
}

// Hook thematic observer rule to adjust graphs if user toggles Settings Dark/Light switch configuration
const settingsObserverForm = document.getElementById('settingsForm');
if (settingsObserverForm) {
    settingsObserverForm.addEventListener('submit', () => {
        // Delayed launch sequence to allow DOM token classes processing updates
        setTimeout(() => {
            if (typeof window.renderCashFlowChart === 'function') window.renderCashFlowChart();
        }, 50);
    });
}