let highestZIndex = 100;

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
  
  updateDynamicBackground();
  setInterval(updateDynamicBackground, 60000);
});

function initWindows() {
  const windowContainer = document.getElementById("window-container");
  const desktop = document.getElementById("desktop");
  const taskbarTabs = document.getElementById("taskbar-tabs");
  const windows = document.querySelectorAll(".window");
  
  const centerWindow = (win) => {
    if (win.classList.contains("maximized")) return;
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight - 48;
    const winWidth = Math.min(parseInt(window.getComputedStyle(win).width), desktopWidth - 20);
    const winHeight = Math.min(parseInt(window.getComputedStyle(win).height), desktopHeight - 20);
    
    win.style.left = `${(desktopWidth - winWidth) / 2}px`;
    win.style.top = `${(desktopHeight - winHeight) / 2}px`;
  };

  const focusWindow = (win) => {
    highestZIndex += 1;
    win.style.zIndex = highestZIndex;
    windows.forEach(w => w.classList.remove("active-window"));
    win.classList.add("active-window");
    
    const appName = win.getAttribute("data-app");
    document.querySelectorAll(".taskbar-tab").forEach(tab => {
      if (tab.getAttribute("data-app") === appName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  };

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

  function createTaskbarTab(win) {
    const appName = win.getAttribute("data-app");
    const appTitle = win.querySelector(".window-header-title span").textContent;
    const appIconSVG = win.querySelector(".window-app-icon").outerHTML;
    
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
        win.classList.add("hidden");
        tab.classList.remove("active");
      } else {
        focusWindow(win);
      }
    });

    taskbarTabs.appendChild(tab);
  }

  function removeTaskbarTab(appName) {
    const tab = document.querySelector(`.taskbar-tab[data-app="${appName}"]`);
    if (tab) tab.remove();
  }

  windows.forEach(win => {
    const header = win.querySelector(".window-header");
    const minimizeBtn = win.querySelector(".win-btn.minimize");
    const maximizeBtn = win.querySelector(".win-btn.maximize");
    const closeBtn = win.querySelector(".win-btn.close");
    const appName = win.getAttribute("data-app");

    win.addEventListener("mousedown", () => focusWindow(win));
    win.addEventListener("touchstart", () => focusWindow(win), { passive: true });

    minimizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.add("hidden");
      const tab = document.querySelector(`.taskbar-tab[data-app="${appName}"]`);
      if (tab) tab.classList.remove("active");
    });

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

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.add("hidden");
      win.classList.remove("maximized");
      removeTaskbarTab(appName);
    });

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const dragStart = (e) => {
      if (win.classList.contains("maximized")) return;
      
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
      if (e.cancelable) e.preventDefault();

      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

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

  window.addEventListener("resize", () => {
    windows.forEach(win => {
      if (!win.classList.contains("hidden") && !win.classList.contains("maximized")) {
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

function initClock() {
  const clockTime = document.getElementById("clock-time");
  const clockDate = document.getElementById("clock-date");
  const widgetTime = document.getElementById("widget-time-display");
  const widgetDate = document.getElementById("widget-date-display");
  const widgetGreeting = document.getElementById("widget-greeting");

  const updateClock = () => {
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = now.toLocaleDateString("en-US", options);

    clockTime.textContent = formattedTime;
    clockDate.textContent = formattedDate;

    if (widgetTime) widgetTime.textContent = formattedTime;
    if (widgetDate) widgetDate.textContent = formattedDate;
    
    if (widgetGreeting) {
      const currentHour = now.getHours();
      let greeting = "Good Day";
      if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good Afternoon";
      } else if (currentHour >= 17 && currentHour < 21) {
        greeting = "Good Evening";
      } else {
        greeting = "Good Night";
      }
      widgetGreeting.textContent = greeting;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

function initTheme() {
  const lightBtn = document.getElementById("theme-light-btn");
  const darkBtn = document.getElementById("theme-dark-btn");
  
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

  const savedTheme = localStorage.getItem("productivity-theme") || "dark";
  setTheme(savedTheme);

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

  document.addEventListener("click", (e) => {
    if (!startMenu.classList.contains("hidden") && !startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.add("hidden");
      startBtn.setAttribute("aria-expanded", "false");
    }
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all daily tasks, goals, planner and configurations?")) {
      localStorage.clear();
      window.location.reload();
    }
  });
}

function updateDynamicBackground() {
  const desktop = document.getElementById("desktop");
  const stateIndicator = document.getElementById("bg-state-text");
  const currentHour = new Date().getHours();
  
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

function initWeatherApp() {
  const weatherTray = document.getElementById("weather-tray");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherCity = document.getElementById("weather-city");
  const weatherIconSpan = document.getElementById("weather-icon-placeholder");

  const widgetTemp = document.getElementById("widget-weather-temp");
  const widgetDesc = document.getElementById("widget-weather-desc");
  const widgetCity = document.getElementById("widget-weather-city");
  const widgetHumidity = document.getElementById("widget-weather-humidity");
  const widgetWind = document.getElementById("widget-weather-wind");
  const widgetIcon = document.getElementById("widget-weather-icon");

  const defaultLocation = {
    lat: 40.7128,
    lon: -74.0060,
    name: "New York"
  };

  const weatherSVGs = {
    sunny: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    cloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 13a4 4 0 0 1-8 0"></path><line x1="12" y1="5" x2="12" y2="11"></line><path d="M20 16.58A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 4 15.25"></path></svg>`,
    snow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 17.58A5 5 0 0 0 18 10h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>`,
    storm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 16.9A5 5 0 0 0 18 10h-1.26a8 8 0 1 0-11.62 8.58"></path><polyline points="13 11 9 17 12 17 11 23 16 15 13 15 14 11"></polyline></svg>`
  };

  const getConditionSVG = (code) => {
    if (code === 0) return weatherSVGs.sunny;
    if (code >= 1 && code <= 3) return weatherSVGs.cloudy;
    if (code === 45 || code === 48) return weatherSVGs.cloudy;
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return weatherSVGs.rain;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return weatherSVGs.snow;
    if (code >= 95) return weatherSVGs.storm;
    return weatherSVGs.sunny;
  };

  const getConditionText = (code) => {
    if (code === 0) return "Sunny";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code === 45 || code === 48) return "Foggy";
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return "Rainy";
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "Snowy";
    if (code >= 95) return "Thunderstorm";
    return "Sunny";
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
      if (!response.ok) throw new Error("API Network issue");
      const data = await response.json();
      
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      const humidity = data.current.relative_humidity_2m;
      const wind = Math.round(data.current.wind_speed_10m);
      const conditionSVG = getConditionSVG(code);
      const conditionText = getConditionText(code);

      weatherTemp.textContent = `${temp}°C`;
      weatherCity.textContent = cityName;
      weatherIconSpan.innerHTML = conditionSVG;

      if (widgetTemp) widgetTemp.textContent = `${temp}°C`;
      if (widgetDesc) widgetDesc.textContent = conditionText;
      if (widgetCity) widgetCity.textContent = cityName;
      if (widgetHumidity) widgetHumidity.textContent = `Humidity: ${humidity}%`;
      if (widgetWind) widgetWind.textContent = `Wind: ${wind} km/h`;
      if (widgetIcon) widgetIcon.innerHTML = conditionSVG;
    } catch (err) {
      console.warn("Weather API call failed. Using placeholder data.", err);
      weatherTemp.textContent = "--°C";
      weatherCity.textContent = "Offline";

      if (widgetTemp) widgetTemp.textContent = "--°C";
      if (widgetDesc) widgetDesc.textContent = "Offline";
      if (widgetCity) widgetCity.textContent = "Offline";
      if (widgetHumidity) widgetHumidity.textContent = "Humidity: --%";
      if (widgetWind) widgetWind.textContent = "Wind: -- km/h";
    }
  };

  const loadWeather = () => {
    weatherCity.textContent = "Locating...";
    if (widgetCity) widgetCity.textContent = "Locating...";
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

  weatherTray.addEventListener("click", loadWeather);
  
  const widgetWeatherCard = document.getElementById("widget-weather-card");
  if (widgetWeatherCard) {
    widgetWeatherCard.addEventListener("click", loadWeather);
    widgetWeatherCard.style.cursor = "pointer";
    widgetWeatherCard.title = "Click to refresh weather info";
  }

  loadWeather();
}

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

    const sortedTodos = [...todos].sort((a, b) => {
      if (a.completed === b.completed) {
        if (a.important === b.important) return b.id - a.id;
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

  addBtn.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  const handleListAction = (e) => {
    const item = e.target.closest(".todo-item");
    if (!item) return;
    const id = parseInt(item.getAttribute("data-id"));
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    if (e.target.closest(".todo-checkbox")) {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    }
    else if (e.target.closest(".star-btn")) {
      todo.important = !todo.important;
      saveTodos();
      renderTodos();
    }
    else if (e.target.closest(".delete-btn")) {
      todos = todos.filter(t => t.id !== id);
      saveTodos();
      renderTodos();
    }
  };

  activeList.addEventListener("click", handleListAction);
  completedList.addEventListener("click", handleListAction);

  renderTodos();
}

function initPlannerApp() {
  const plannerSlots = document.getElementById("planner-slots");
  let plannerData = JSON.parse(localStorage.getItem("productivity-planner")) || {};
  
  const hours = [
    { label: "8:00 AM", val: 8 },
    { label: "9:00 AM", val: 9 },
    { label: "10:00 AM", val: 10 },
    { label: "11:00 AM", val: 11 },
    { label: "12:00 PM", val: 12 },
    { label: "1:00 PM", val: 13 },
    { label: "2:00 PM", val: 14 },
    { label: "3:00 PM", val: 15 },
    { label: "4:00 PM", val: 16 },
    { label: "5:00 PM", val: 17 },
    { label: "6:00 PM", val: 18 },
    { label: "7:00 PM", val: 19 },
    { label: "8:00 PM", val: 20 },
    { label: "9:00 PM", val: 21 }
  ];

  let saveTimeout;
  const debouncedSave = (hourVal, text) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      plannerData[hourVal] = text;
      localStorage.setItem("productivity-planner", JSON.stringify(plannerData));
      updateGlobalStats();
    }, 400);
  };

  const renderSlots = () => {
    const currentHour = new Date().getHours();
    plannerSlots.innerHTML = "";

    hours.forEach(hour => {
      const savedText = plannerData[hour.val] || "";
      const isCurrent = hour.val === currentHour;

      const row = document.createElement("div");
      row.className = `planner-row ${isCurrent ? "current-hour" : ""}`;
      row.setAttribute("data-hour", hour.val);

      row.innerHTML = `
        <div class="planner-time">${hour.label}</div>
        <input type="text" class="planner-input" value="${savedText}" placeholder="Click to add a plan..." aria-label="Plan details for ${hour.label}">
        <button class="planner-clear-btn" title="Clear slot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;

      const input = row.querySelector(".planner-input");
      input.addEventListener("input", (e) => {
        debouncedSave(hour.val, e.target.value);
      });

      input.addEventListener("blur", (e) => {
        clearTimeout(saveTimeout);
        plannerData[hour.val] = e.target.value;
        localStorage.setItem("productivity-planner", JSON.stringify(plannerData));
        updateGlobalStats();
      });

      const clearBtn = row.querySelector(".planner-clear-btn");
      clearBtn.addEventListener("click", () => {
        input.value = "";
        plannerData[hour.val] = "";
        localStorage.setItem("productivity-planner", JSON.stringify(plannerData));
        updateGlobalStats();
      });

      plannerSlots.appendChild(row);
    });
  };

  renderSlots();
}

function initQuoteApp() {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("new-quote-btn");
  const spinIcon = newQuoteBtn ? newQuoteBtn.querySelector("svg") : null;

  const widgetQuoteText = document.getElementById("widget-quote-text");
  const widgetQuoteAuthor = document.getElementById("widget-quote-author");
  const widgetRefreshBtn = document.getElementById("widget-quote-refresh");

  const displayQuote = (quote, author) => {
    if (quoteText) quoteText.textContent = quote;
    if (quoteAuthor) quoteAuthor.textContent = `— ${author || "Unknown"}`;
    if (widgetQuoteText) widgetQuoteText.textContent = quote;
    if (widgetQuoteAuthor) widgetQuoteAuthor.textContent = `— ${author || "Unknown"}`;
  };

  const getNewQuote = async () => {
    if (spinIcon) spinIcon.classList.add("spinning");
    const widgetIcon = widgetRefreshBtn ? widgetRefreshBtn.querySelector("i") : null;
    if (widgetIcon) {
      widgetIcon.style.transform = "rotate(360deg)";
      widgetIcon.style.transition = "transform 0.5s ease";
    }

    if (newQuoteBtn) newQuoteBtn.disabled = true;
    if (widgetRefreshBtn) widgetRefreshBtn.disabled = true;
    
    if (quoteText) quoteText.style.opacity = 0.5;
    if (widgetQuoteText) widgetQuoteText.style.opacity = 0.5;

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("CORS or API offline");
      const data = await response.json();
      displayQuote(data.quote, data.author);
    } catch (e) {
      console.warn("Quote API request failed. Loading random local quote.");
      const randIndex = Math.floor(Math.random() * fallbackQuotes.length);
      const chosen = fallbackQuotes[randIndex];
      displayQuote(chosen.quote, chosen.author);
    } finally {
      setTimeout(() => {
        if (spinIcon) spinIcon.classList.remove("spinning");
        if (widgetIcon) {
          widgetIcon.style.transform = "none";
          widgetIcon.style.transition = "none";
        }
        if (newQuoteBtn) newQuoteBtn.disabled = false;
        if (widgetRefreshBtn) widgetRefreshBtn.disabled = false;
        
        if (quoteText) quoteText.style.opacity = 1;
        if (widgetQuoteText) widgetQuoteText.style.opacity = 1;
      }, 500);
    }
  };

  if (newQuoteBtn) newQuoteBtn.addEventListener("click", getNewQuote);
  if (widgetRefreshBtn) widgetRefreshBtn.addEventListener("click", getNewQuote);
  getNewQuote();
}

function initPomodoroApp() {
  const pomodoroDisplay = document.getElementById("pomodoro-display");
  const sessionTypeBadge = document.getElementById("pomodoro-session-type");
  const progressCircle = document.getElementById("pomodoro-progress");
  
  const startBtn = document.getElementById("pomodoro-start");
  const pauseBtn = document.getElementById("pomodoro-pause");
  const resetBtn = document.getElementById("pomodoro-reset");
  const modeButtons = document.querySelectorAll(".mode-btn");

  let timerInterval = null;
  let defaultDuration = 1500;
  let remainingSeconds = defaultDuration;
  let currentSessionType = "work";

  const playAlarmSound = () => {
    const bellEl = document.getElementById("pomodoro-bell");
    if (bellEl) {
      bellEl.play().catch(() => {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscNode = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscNode.type = "sine";
          oscNode.frequency.setValueAtTime(880, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
          
          oscNode.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscNode.start();
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
          oscNode.stop(audioCtx.currentTime + 1.2);
        } catch (e) {
          console.warn("Audio Context synth blocked.", e);
        }
      });
    }
  };

  const totalCircumference = 2 * Math.PI * 90;
  progressCircle.style.strokeDasharray = `${totalCircumference}`;
  
  const updateProgressCircle = () => {
    const fraction = remainingSeconds / defaultDuration;
    const offset = totalCircumference * (1 - fraction);
    progressCircle.style.strokeDashoffset = `${offset}`;
  };

  const formatDisplayTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const updateDisplay = () => {
    pomodoroDisplay.textContent = formatDisplayTime(remainingSeconds);
    updateProgressCircle();
  };

  const tick = () => {
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      
      playAlarmSound();
      
      startBtn.disabled = false;
      pauseBtn.disabled = true;

      alert(`${currentSessionType.toUpperCase()} Session completed!`);
      
      if (currentSessionType === "work") {
        switchSession("short", 300);
      } else {
        switchSession("work", 1500);
      }
      return;
    }

    remainingSeconds--;
    updateDisplay();
  };

  const switchSession = (type, duration) => {
    clearInterval(timerInterval);
    timerInterval = null;

    currentSessionType = type;
    defaultDuration = duration;
    remainingSeconds = duration;

    if (type === "work") {
      sessionTypeBadge.textContent = "Work Session";
      sessionTypeBadge.style.color = "var(--accent-color)";
      sessionTypeBadge.style.background = "var(--accent-light)";
    } else {
      sessionTypeBadge.textContent = type === "short" ? "Short Break" : "Long Break";
      sessionTypeBadge.style.color = "#107c41";
      sessionTypeBadge.style.background = "rgba(16, 124, 65, 0.12)";
    }

    modeButtons.forEach(btn => {
      const activeType = btn.getAttribute("data-type");
      if (activeType === type) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateDisplay();
  };

  startBtn.addEventListener("click", () => {
    if (timerInterval) return;
    timerInterval = setInterval(tick, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = defaultDuration;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateDisplay();
  });

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const secs = parseInt(btn.getAttribute("data-duration"));
      const type = btn.getAttribute("data-type");
      switchSession(type, secs);
    });
  });

  updateDisplay();
}

function initGoalsApp() {
  const goalsInput = document.getElementById("goals-input");
  const addBtn = document.getElementById("add-goal-btn");
  const goalsList = document.getElementById("goals-list");
  const goalsRatioText = document.getElementById("goals-ratio");
  const goalsProgressBar = document.getElementById("goals-progress-bar");

  let goals = JSON.parse(localStorage.getItem("productivity-goals")) || [];

  const updateProgress = () => {
    const total = goals.length;
    const completed = goals.filter(g => g.completed).length;
    
    goalsRatioText.textContent = `${completed} of ${total} completed`;

    const percent = total > 0 ? (completed / total) * 100 : 0;
    goalsProgressBar.style.width = `${percent}%`;

    updateGlobalStats();
  };

  const saveGoals = () => {
    localStorage.setItem("productivity-goals", JSON.stringify(goals));
    updateProgress();
  };

  const renderGoals = () => {
    goalsList.innerHTML = "";

    goals.forEach(goal => {
      const li = document.createElement("li");
      li.className = `todo-item ${goal.completed ? "completed" : ""}`;
      li.setAttribute("data-id", goal.id);

      li.innerHTML = `
        <div class="todo-item-left">
          <div class="todo-checkbox" role="checkbox" aria-checked="${goal.completed}" tabindex="0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="todo-text" title="${goal.text}">${goal.text}</span>
        </div>
        <div class="todo-controls">
          <button class="todo-item-btn delete-btn" title="Delete Goal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      `;

      goalsList.appendChild(li);
    });
  };

  const addGoal = () => {
    const text = goalsInput.value.trim();
    if (!text) return;

    const newGoal = {
      id: Date.now(),
      text: text,
      completed: false
    };

    goals.push(newGoal);
    saveGoals();
    renderGoals();
    goalsInput.value = "";
  };

  addBtn.addEventListener("click", addGoal);
  goalsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addGoal();
  });

  goalsList.addEventListener("click", (e) => {
    const item = e.target.closest(".todo-item");
    if (!item) return;
    const id = parseInt(item.getAttribute("data-id"));
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    if (e.target.closest(".todo-checkbox")) {
      goal.completed = !goal.completed;
      saveGoals();
      renderGoals();
    } else if (e.target.closest(".delete-btn")) {
      goals = goals.filter(g => g.id !== id);
      saveGoals();
      renderGoals();
    }
  });

  renderGoals();
  updateProgress();
}

function updateGlobalStats() {
  const todos = JSON.parse(localStorage.getItem("productivity-todos")) || [];
  const activeTodosCount = todos.filter(t => !t.completed).length;
  const statTodosNum = document.getElementById("stat-todos-num");
  if (statTodosNum) statTodosNum.textContent = activeTodosCount;

  const goals = JSON.parse(localStorage.getItem("productivity-goals")) || [];
  const completedGoals = goals.filter(g => g.completed).length;
  const statGoalsRatio = document.getElementById("stat-goals-ratio");
  
  if (statGoalsRatio) {
    const goalsPercent = goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;
    statGoalsRatio.textContent = `${goalsPercent}%`;
  }


}
