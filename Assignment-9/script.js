// --- Global Window Layer Manager ---
let highestZIndex = 100;

// --- Fallback Data ---
const fallbackQuotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Your talent determines what you can do. Your motivation determines how much you are willing to do. Your attitude determines how well you do it.", author: "Lou Holtz" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Do not wait for standard opportunities. Seize common occasions and make them great.", author: "Orison Swett Marden" },
  { quote: "The standard limit of our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "You do not find a happy life. You make it.", author: "Camilla Eyring Kimball" },
  { quote: "Determine never to be idle. No person will have occasion to complain of the want of time who never loses any.", author: "Thomas Jefferson" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Systems
  initTheme();
  initClock();
  initWindows();
  initStartMenu();
  initTodoApp();
  initPlannerApp();
  initQuoteApp();
  initPomodoroApp();
  initGoalsApp();
  initWeatherApp();
  updateGlobalStats();
  
  // Dynamic Background Engine Check
  updateDynamicBackground();
  setInterval(updateDynamicBackground, 60000); // Check background theme every minute
});

/* ==========================================
   1. WINDOW MANAGEMENT ENGINE
   ========================================== */
function initWindows() {
  const windowContainer = document.getElementById("window-container");
  const desktop = document.getElementById("desktop");
  const taskbarTabs = document.getElementById("taskbar-tabs");
  const windows = document.querySelectorAll(".window");
  
  // Center window helper
  const centerWindow = (win) => {
    if (win.classList.contains("maximized")) return;
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight - 48; // subtract taskbar
    const winWidth = Math.min(parseInt(window.getComputedStyle(win).width), desktopWidth - 20);
    const winHeight = Math.min(parseInt(window.getComputedStyle(win).height), desktopHeight - 20);
    
    win.style.left = `${(desktopWidth - winWidth) / 2}px`;
    win.style.top = `${(desktopHeight - winHeight) / 2}px`;
  };

  // Focus helper
  const focusWindow = (win) => {
    highestZIndex += 1;
    win.style.zIndex = highestZIndex;
    windows.forEach(w => w.classList.remove("active-window"));
    win.classList.add("active-window");
    
    // Highlight taskbar tab
    const appName = win.getAttribute("data-app");
    document.querySelectorAll(".taskbar-tab").forEach(tab => {
      if (tab.getAttribute("data-app") === appName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  };

  // Setup App launch from Desktop icons
  const shortcuts = [
    { id: "shortcut-todo", winId: "window-todo" },
    { id: "shortcut-planner", winId: "window-planner" },
    { id: "shortcut-quote", winId: "window-quote" },
    { id: "shortcut-pomodoro", winId: "window-pomodoro" },
    { id: "shortcut-goals", winId: "window-goals" }
  ];

  shortcuts.forEach(shortcut => {
    const btn = document.getElementById(shortcut.id);
    const win = document.getElementById(shortcut.winId);
    if (!btn || !win) return;

    btn.addEventListener("click", () => {
      if (win.classList.contains("hidden")) {
        win.classList.remove("hidden");
        centerWindow(win);
        createTaskbarTab(win);
      }
      focusWindow(win);
    });
  });

  // Taskbar Tab creation/management
  function createTaskbarTab(win) {
    const appName = win.getAttribute("data-app");
    const appTitle = win.querySelector(".window-header-title span").textContent;
    const appIconSVG = win.querySelector(".window-app-icon").outerHTML;
    
    // Check if tab already exists
    let tab = document.querySelector(`.taskbar-tab[data-app="${appName}"]`);
    if (tab) return;

    tab = document.createElement("button");
    tab.className = "taskbar-tab active";
    tab.setAttribute("data-app", appName);
    tab.innerHTML = `${appIconSVG} <span>${appTitle}</span>`;
    
    tab.addEventListener("click", () => {
      if (win.classList.contains("hidden")) {
        win.classList.remove("hidden");
        focusWindow(win);
      } else if (win.classList.contains("active-window")) {
        // Minimize if clicked while active
        win.classList.add("hidden");
        tab.classList.remove("active");
      } else {
        focusWindow(win);
      }
    });

    taskbarTabs.appendChild(tab);
  }

  // Remove Taskbar Tab
  function removeTaskbarTab(appName) {
    const tab = document.querySelector(`.taskbar-tab[data-app="${appName}"]`);
    if (tab) tab.remove();
  }

  // Window Controls (Minimize, Maximize, Close) and Dragging
  windows.forEach(win => {
    const header = win.querySelector(".window-header");
    const minimizeBtn = win.querySelector(".win-btn.minimize");
    const maximizeBtn = win.querySelector(".win-btn.maximize");
    const closeBtn = win.querySelector(".win-btn.close");
    const appName = win.getAttribute("data-app");

    // Click inside window focuses it
    win.addEventListener("mousedown", () => focusWindow(win));
    win.addEventListener("touchstart", () => focusWindow(win), { passive: true });

    // Minimize action
    minimizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.add("hidden");
      const tab = document.querySelector(`.taskbar-tab[data-app="${appName}"]`);
      if (tab) tab.classList.remove("active");
    });

    // Maximize action
    maximizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.toggle("maximized");
      if (win.classList.contains("maximized")) {
        win.style.top = "0px";
        win.style.left = "0px";
      } else {
        centerWindow(win);
      }
    });

    // Close action
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.add("hidden");
      win.classList.remove("maximized");
      removeTaskbarTab(appName);
    });

    // Drag Window Logic
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const dragStart = (e) => {
      if (win.classList.contains("maximized")) return;
      
      // Determine click source
      const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
      
      isDragging = true;
      startX = clientX;
      startY = clientY;
      
      const style = window.getComputedStyle(win);
      initialLeft = parseInt(style.left) || 0;
      initialTop = parseInt(style.top) || 0;

      focusWindow(win);

      if (e.type === "mousedown") {
        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);
      } else {
        document.addEventListener("touchmove", dragMove, { passive: false });
        document.addEventListener("touchend", dragEnd);
      }
    };

    const dragMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault(); // Stop mobile scrolling while dragging

      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Keep header within screen boundaries
      const desktopHeight = window.innerHeight - 48;
      const desktopWidth = window.innerWidth;
      
      newTop = Math.max(0, Math.min(newTop, desktopHeight - 38));
      newLeft = Math.max(-200, Math.min(newLeft, desktopWidth - 100));

      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    };

    const dragEnd = () => {
      isDragging = false;
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragEnd);
      document.removeEventListener("touchmove", dragMove);
      document.removeEventListener("touchend", dragEnd);
    };

    header.addEventListener("mousedown", dragStart);
    header.addEventListener("touchstart", dragStart, { passive: true });
  });

  // Handle Window Resizing positioning fixes
  window.addEventListener("resize", () => {
    windows.forEach(win => {
      if (!win.classList.contains("hidden") && !win.classList.contains("maximized")) {
        // Keep header within bounds
        const style = window.getComputedStyle(win);
        let currentLeft = parseInt(style.left) || 0;
        let currentTop = parseInt(style.top) || 0;
        const desktopHeight = window.innerHeight - 48;
        const desktopWidth = window.innerWidth;

        currentTop = Math.max(0, Math.min(currentTop, desktopHeight - 38));
        currentLeft = Math.max(0, Math.min(currentLeft, desktopWidth - 200));

        win.style.left = `${currentLeft}px`;
        win.style.top = `${currentTop}px`;
      }
    });
  });
}

/* ==========================================
   2. DATE, TIME & CLOCK ENGINE
   ========================================== */
function initClock() {
  const clockTime = document.getElementById("clock-time");
  const clockDate = document.getElementById("clock-date");

  const updateClock = () => {
    const now = new Date();
    
    // Formatting Time: HH:MM:SS AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Formatting Date: Day, Mon Date Year (e.g. Wednesday, Jul 15, 2026)
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = now.toLocaleDateString("en-US", options);

    clockTime.textContent = formattedTime;
    clockDate.textContent = formattedDate;
  };

  updateClock();
  setInterval(updateClock, 1000); // Live updates every second
}

/* ==========================================
   3. THEME MANAGER & START MENU ENGINE
   ========================================== */
function initTheme() {
  const lightBtn = document.getElementById("theme-light-btn");
  const darkBtn = document.getElementById("theme-dark-btn");
  
  // Set theme helper
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("productivity-theme", theme);
    
    if (theme === "light") {
      lightBtn.classList.add("active");
      darkBtn.classList.remove("active");
    } else {
      darkBtn.classList.add("active");
      lightBtn.classList.remove("active");
    }
  };

  // Load Saved Theme
  const savedTheme = localStorage.getItem("productivity-theme") || "dark";
  setTheme(savedTheme);

  // Bind Switch Actions
  lightBtn.addEventListener("click", () => setTheme("light"));
  darkBtn.addEventListener("click", () => setTheme("dark"));
}

function initStartMenu() {
  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");
  const clearBtn = document.getElementById("clear-all-storage");

  const toggleStartMenu = (e) => {
    e.stopPropagation();
    startMenu.classList.toggle("hidden");
    const expanded = !startMenu.classList.contains("hidden");
    startBtn.setAttribute("aria-expanded", expanded);
    if (expanded) updateGlobalStats();
  };

  startBtn.addEventListener("click", toggleStartMenu);

  // Click outside to close start menu
  document.addEventListener("click", (e) => {
    if (!startMenu.classList.contains("hidden") && !startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.add("hidden");
      startBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Storage wipe button
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all daily tasks, goals, planner and configurations?")) {
      localStorage.clear();
      window.location.reload();
    }
  });
}

/* ==========================================
   4. DYNAMIC BACKGROUND ENGINE
   ========================================== */
function updateDynamicBackground() {
  const desktop = document.getElementById("desktop");
  const stateIndicator = document.getElementById("bg-state-text");
  const currentHour = new Date().getHours();
  
  // Reset previous background classes
  desktop.classList.remove("bg-morning", "bg-afternoon", "bg-evening", "bg-night");

  let phase = "";
  if (currentHour >= 5 && currentHour < 11) {
    phase = "morning";
    stateIndicator.textContent = "Morning Theme Active";
  } else if (currentHour >= 11 && currentHour < 17) {
    phase = "afternoon";
    stateIndicator.textContent = "Afternoon Theme Active";
  } else if (currentHour >= 17 && currentHour < 20) {
    phase = "evening";
    stateIndicator.textContent = "Evening Theme Active";
  } else {
    phase = "night";
    stateIndicator.textContent = "Night Theme Active";
  }

  desktop.classList.add(`bg-${phase}`);
}

/* ==========================================
   5. WEATHER WIDGET ENGINE (Open-Meteo)
   ========================================== */
function initWeatherApp() {
  const weatherTray = document.getElementById("weather-tray");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherCity = document.getElementById("weather-city");
  const weatherIconSpan = document.getElementById("weather-icon-placeholder");

  // Default coordinate if geolocation fails/is denied (New York City)
  const defaultLocation = {
    lat: 40.7128,
    lon: -74.0060,
    name: "New York"
  };

  // Weather SVG Icons Map
  const weatherSVGs = {
    sunny: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    cloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 13a4 4 0 0 1-8 0"></path><line x1="12" y1="5" x2="12" y2="11"></line><path d="M20 16.58A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 4 15.25"></path></svg>`,
    snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 17.58A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>`,
    storm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 16.9A5 5 0 0 0 18 10h-1.26a8 8 0 1 0-11.62 8.58"></path><polyline points="13 11 9 17 12 17 11 23 16 15 13 15 14 11"></polyline></svg>`
  };

  const getConditionSVG = (code) => {
    // WMO Weather interpretation codes
    if (code === 0) return weatherSVGs.sunny;
    if (code >= 1 && code <= 3) return weatherSVGs.cloudy;
    if (code === 45 || code === 48) return weatherSVGs.cloudy; // Fog
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return weatherSVGs.rain;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return weatherSVGs.snow;
    if (code >= 95) return weatherSVGs.storm;
    return weatherSVGs.sunny; // Default
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
      if (!response.ok) throw new Error("API Network issue");
      const data = await response.json();
      
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;

      weatherTemp.textContent = `${temp}°C`;
      weatherCity.textContent = cityName;
      weatherIconSpan.innerHTML = getConditionSVG(code);
    } catch (err) {
      console.warn("Weather API call failed. Using placeholder data.", err);
      weatherTemp.textContent = "--°C";
      weatherCity.textContent = "Offline";
    }
  };

  const loadWeather = () => {
    weatherCity.textContent = "Locating...";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          fetchWeather(lat, lon, "Local");
        },
        (error) => {
          console.warn("Geolocation access denied or failed. Loading default (NY).", error);
          fetchWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation.name);
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation.name);
    }
  };

  // Click tray to manually refresh weather details
  weatherTray.addEventListener("click", loadWeather);
  loadWeather();
}

/* ==========================================
   6. TODO LIST APP ENGINE
   ========================================== */
function initTodoApp() {
  const todoInput = document.getElementById("todo-input");
  const starBtn = document.getElementById("todo-star-btn");
  const addBtn = document.getElementById("add-todo-btn");
  const activeList = document.getElementById("todo-list-active");
  const completedList = document.getElementById("todo-list-completed");
  
  let todos = JSON.parse(localStorage.getItem("productivity-todos")) || [];
  let isStarredMode = false;

  const saveTodos = () => {
    localStorage.setItem("productivity-todos", JSON.stringify(todos));
    updateGlobalStats();
  };

  starBtn.addEventListener("click", () => {
    isStarredMode = !isStarredMode;
    starBtn.classList.toggle("active", isStarredMode);
  });

  const renderTodos = () => {
    activeList.innerHTML = "";
    completedList.innerHTML = "";

    // Sort active todos: Starred/Important goes first
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.completed === b.completed) {
        if (a.important === b.important) return b.id - a.id; // Newest first
        return b.important ? 1 : -1;
      }
      return a.completed ? 1 : -1;
    });

    sortedTodos.forEach(todo => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""} ${todo.important ? "important" : ""}`;
      li.setAttribute("data-id", todo.id);

      li.innerHTML = `
        <div class="todo-item-left">
          <div class="todo-checkbox" role="checkbox" aria-checked="${todo.completed}" tabindex="0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="todo-text" title="${todo.text}">${todo.text}</span>
        </div>
        <div class="todo-controls">
          <button class="todo-item-btn star-btn ${todo.important ? "starred" : ""}" title="Toggle Importance">
            <svg viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
          <button class="todo-item-btn delete-btn" title="Delete Task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      `;

      if (todo.completed) {
        completedList.appendChild(li);
      } else {
        activeList.appendChild(li);
      }
    });
  };
 const addTask = () => {
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      important: isStarredMode
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    todoInput.value = "";
    isStarredMode = false;
    starBtn.classList.remove("active");
  };

