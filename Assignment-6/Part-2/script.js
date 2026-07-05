const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const taskContainer = document.getElementById("taskContainer");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const searchInput = document.getElementById("searchInput");
const clearAllBtn = document.getElementById("clearAllBtn");

const themeToggle = document.getElementById("themeToggle");

const demoInput = document.getElementById("demoInput");
const checkDifferenceBtn = document.getElementById("checkDifferenceBtn");
const differenceOutput = document.getElementById("differenceOutput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounts() {

    totalCount.textContent = tasks.length;

    const completed = tasks.filter(task => task.status === "completed").length;

    completedCount.textContent = completed;

    pendingCount.textContent = tasks.length - completed;
}

function renderTasks() {

    taskContainer.innerHTML = "";

    tasks.forEach(task => {

        const card = document.createElement("div");
        card.classList.add("task-card");

        card.setAttribute("data-id", task.id);
        card.setAttribute("data-status", task.status);
        card.setAttribute("data-category", task.category);

        if (task.status === "completed") {
            card.classList.add("completed");
        }

        const content = document.createElement("div");
        content.classList.add("task-content");

        const title = document.createElement("h3");
        title.textContent = task.title;

        const category = document.createElement("p");
        category.textContent = task.category;

        content.append(title);
        content.append(category);

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("complete-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        actions.append(editBtn);
        actions.append(completeBtn);
        actions.append(deleteBtn);

        card.append(content);
        card.append(actions);

        taskContainer.prepend(card);
    });

    updateCounts();
}

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = taskInput.value.trim();

    if (!title) return;

    const task = {
        id: Date.now(),
        title,
        category: categorySelect.value,
        status: "pending"
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskForm.reset();
});

taskContainer.addEventListener("click", function (e) {

    const card = e.target.closest(".task-card");

    if (!card) return;

    const id = Number(card.dataset.id);

    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        renderTasks();
    }

    if (e.target.classList.contains("complete-btn")) {

        tasks = tasks.map(task => {

            if (task.id === id) {

                task.status =
                    task.status === "completed"
                        ? "pending"
                        : "completed";
            }

            return task;
        });

        saveTasks();
        renderTasks();
    }

    if (e.target.classList.contains("edit-btn")) {

        const task = tasks.find(task => task.id === id);

        const newTitle = prompt(
            "Edit Task",
            task.title
        );

        if (newTitle) {

            task.title = newTitle;

            saveTasks();
            renderTasks();
        }
    }
});

searchInput.addEventListener("input", function () {

    const value = searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(".task-card");

    cards.forEach(card => {

        const title =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        if (title.includes(value)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

clearAllBtn.addEventListener("click", function () {

    tasks = [];

    saveTasks();
    renderTasks();
});

themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.body.dataset.theme;

    if (currentTheme === "light") {

        document.body.dataset.theme = "dark";

        themeToggle.textContent =
            "Light Mode";

    } else {

        document.body.dataset.theme = "light";

        themeToggle.textContent =
            "Dark Mode";
    }
});

checkDifferenceBtn.addEventListener(
    "click",
    function () {

        differenceOutput.innerHTML = `
            <p>
                Property Value:
                ${demoInput.value}
            </p>

            <p>
                Attribute Value:
                ${demoInput.getAttribute("value")}
            </p>
        `;
    }
);

const grandparent =
    document.getElementById("grandparent");

const parent =
    document.getElementById("parent");

const childBtn =
    document.getElementById("childBtn");

grandparent.addEventListener(
    "click",
    () => {
        console.log("Grandparent Bubbling");
    }
);

parent.addEventListener(
    "click",
    () => {
        console.log("Parent Bubbling");
    }
);

childBtn.addEventListener(
    "click",
    () => {
        console.log("Child Bubbling");
    }
);

grandparent.addEventListener(
    "click",
    () => {
        console.log("Grandparent Capturing");
    },
    true
);

parent.addEventListener(
    "click",
    () => {
        console.log("Parent Capturing");
    },
    true
);

childBtn.addEventListener(
    "click",
    () => {
        console.log("Child Capturing");
    },
    true
);

renderTasks();
