
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




function loadSettings() {
    const savedData = localStorage.getItem('settings');
    if (savedData) {
        return JSON.parse(savedData);
    }
    
    
    const loginUser = localStorage.getItem("currentUser") || 'Deep';
    return {
        name: loginUser,
        currency: "INR",
        theme: "dark"
    };
}

function openSettingsModal() {
    const currentSettings = loadSettings();
    
    
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
    
    
    localStorage.setItem('settings', JSON.stringify(operationalConfig));
    localStorage.setItem("currentUser", operationalConfig.name);
    
    
    updateDashboard(operationalConfig);
    applyTheme(operationalConfig.theme);
    closeSettingsModal();
}

function updateDashboard(config) {
    
    const userNameElements = document.querySelectorAll(".userName");
    userNameElements.forEach((element) => {
        element.textContent = config.name;
    });

    
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


if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
if (cancelSettings) cancelSettings.addEventListener('click', closeSettingsModal);
if (settingsForm) settingsForm.addEventListener('submit', saveSettings);


if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const activeConfigData = loadSettings();
    updateDashboard(activeConfigData);
    applyTheme(activeConfigData.theme);
});







const transactionModal = document.getElementById('transactionModal');
const addTransactionBtn = document.querySelector('.addBtn button');
const cancelTransactionBtn = document.getElementById('cancelTransaction');
const transactionForm = document.getElementById('transactionForm');

const tableSearch = document.getElementById('tableSearch');
const tableFilter = document.getElementById('tableFilter');
const transactionTableBody = document.getElementById('transactionTableBody');
const tableContainer = document.getElementById('tableContainer');
const emptyState = document.getElementById('emptyState');


function getTransactions() {
    const records = localStorage.getItem('transactions');
    return records ? JSON.parse(records) : [];
}

function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', () => {
        
        document.getElementById('txDate').value = new Date().toISOString().split('T')[0];
        transactionModal.classList.remove('hidden');
    });
}

function closeTransactionModal() {
    transactionForm.reset();
    transactionModal.classList.add('hidden');
}

if (cancelTransactionBtn) cancelTransactionBtn.addEventListener('click', closeTransactionModal);


transactionModal.addEventListener('click', (e) => {
    if (e.target === transactionModal) closeTransactionModal();
});


transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('txType').value;
    const description = document.getElementById('txDescription').value.trim();
    const amount = parseFloat(document.getElementById('txAmount').value);
    const date = document.getElementById('txDate').value;
    const category = document.getElementById('txCategory').value;

    
    if (!description || isNaN(amount) || amount <= 0 || !date) {
        alert("Please provide valid information inside all required inputs.");
        return;
    }

    
    const newTransaction = {
        id: Date.now(), 
        type,
        description,
        amount,
        date,
        category
    };

    const records = getTransactions();
    records.unshift(newTransaction); 
    saveTransactions(records);

    closeTransactionModal();
    masterRefresh(); 
});


window.deleteTransactionItem = function(id) {
    if (confirm("Are you sure you want to delete this structural ledger record?")) {
        let records = getTransactions();
        records = records.filter(item => item.id !== id);
        saveTransactions(records);
        masterRefresh();
    }
};


function renderTransactionTable() {
    const records = getTransactions();
    const searchQuery = tableSearch.value.toLowerCase().trim();
    const filterValue = tableFilter.value;

    
    const processedData = records.filter(item => {
        const matchesSearch = item.description.toLowerCase().includes(searchQuery) || 
                              item.category.toLowerCase().includes(searchQuery);
        const matchesType = filterValue === 'all' || item.type === filterValue;
        return matchesSearch && matchesType;
    });

    
    if (processedData.length === 0) {
        tableContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        transactionTableBody.innerHTML = '';
        return;
    }

    tableContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');

    
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


window.masterRefresh = function() {
    renderTransactionTable();
    updateSummaryStatCards();
    
    
    if (typeof renderCashFlowChart === 'function') {
        renderCashFlowChart();
    }
};


if (tableSearch) tableSearch.addEventListener('input', renderTransactionTable);
if (tableFilter) tableFilter.addEventListener('change', renderTransactionTable);


document.addEventListener('DOMContentLoaded', () => {
    masterRefresh();
});







let cashFlowChartInstance = null;
const chartTimeframeSelect = document.getElementById('chartTimeframe');


function generateRecentMonthBuckets(count) {
    const labels = [];
    const queryKeys = []; 
    
    const currentDate = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
        const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        
        
        const monthLabel = targetDate.toLocaleString('default', { month: 'short' });
        labels.push(monthLabel);
        
        
        const year = targetDate.getFullYear();
        const monthNum = String(targetDate.getMonth() + 1).padStart(2, '0');
        queryKeys.push(`${year}-${monthNum}`);
    }
    
    return { labels, queryKeys };
}


window.renderCashFlowChart = function() {
    const canvas = document.getElementById('cashFlowChart');
    if (!canvas) return; 

    const timeframeMonths = parseInt(chartTimeframeSelect ? chartTimeframeSelect.value : 6);
    const { labels, queryKeys } = generateRecentMonthBuckets(timeframeMonths);

    
    const incomeData = new Array(timeframeMonths).fill(0);
    const expenseData = new Array(timeframeMonths).fill(0);

    
    const records = typeof getTransactions === 'function' ? getTransactions() : [];

    
    records.forEach(item => {
        if (!item.date) return;
        
        
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

    
    if (cashFlowChartInstance) {
        cashFlowChartInstance.destroy();
    }

    
    const isDarkTheme = document.body.classList.contains('dark-theme') || !document.body.classList.contains('light-theme');
    const chartTextColor = isDarkTheme ? '#94a3b8' : '#64748b';
    const gridLineColor = isDarkTheme ? 'rgba(34, 33, 61, 0.5)' : 'rgba(203, 213, 225, 0.5)';

    
    const ctx = canvas.getContext('2d');
    cashFlowChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    
                    backgroundColor: 'rgb(79, 242, 155)',
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    
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


if (chartTimeframeSelect) {
    chartTimeframeSelect.addEventListener('change', window.renderCashFlowChart);
}


const settingsObserverForm = document.getElementById('settingsForm');
if (settingsObserverForm) {
    settingsObserverForm.addEventListener('submit', () => {
        
        setTimeout(() => {
            if (typeof window.renderCashFlowChart === 'function') window.renderCashFlowChart();
        }, 50);
    });
}







const dashThemeToggle = document.getElementById('dashThemeToggle');
const dashResetDataBtn = document.getElementById('dashResetDataBtn');


function syncThemeToggleButtonState() {
    if (!dashThemeToggle) return;
    const isDark = document.body.classList.contains('dark-theme') || !document.body.classList.contains('light-theme');
    dashThemeToggle.checked = isDark;
}

if (dashThemeToggle) {
    dashThemeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
        
        
        if (typeof window.renderCashFlowChart === 'function') {
            window.renderCashFlowChart();
        }
    });
}


if (dashResetDataBtn) {
    dashResetDataBtn.addEventListener('click', () => {
        if (confirm("WARNING: Are you absolutely certain you want to permanently clear all recorded transaction histories from browser storage? This cannot be undone.")) {
            localStorage.removeItem('transactions');
            alert("Local tracking database cleared successfully.");
            window.masterRefresh();
        }
    });
}




const previousMasterRefresh = window.masterRefresh;
window.masterRefresh = function() {
    if (typeof previousMasterRefresh === 'function') {
        previousMasterRefresh();
    }
    calculateQuickSummaryMetrics();
    syncThemeToggleButtonState();
};

document.addEventListener('DOMContentLoaded', () => {
    syncThemeToggleButtonState();
    calculateQuickSummaryMetrics();
});