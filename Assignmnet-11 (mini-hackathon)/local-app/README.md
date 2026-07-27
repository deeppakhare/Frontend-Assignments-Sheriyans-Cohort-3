# Book Library Management System

A simple and clean Book Library Management web app built with **React**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**. Data is saved locally using the browser's `localStorage`, so your books stay even after refreshing the page.

---

## What This Project Does

This app helps you manage a small personal library. You can:

- Add new books with title, author, genre, and year
- Edit existing book details
- Delete books you no longer need
- Search books by title or author
- Issue a book (mark as "issued")
- Return a book (mark as "available")
- See live stats: Total, Available, and Issued books
- All changes are automatically saved to `localStorage`

---

## Tech Stack

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| React             | UI library for building the frontend |
| Vite              | Fast development server and bundler  |
| Redux Toolkit     | State management for app data        |
| React Redux       | Connects Redux store with React      |
| Tailwind CSS      | Utility-first styling                |
| localStorage      | Saves books in the browser           |

---

## Project Folder Structure

```
local-app/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md               # Project documentation (this file)
└── src/
    ├── main.jsx            # React app entry point
    ├── App.jsx             # Main page (stats, search, form, list)
    ├── index.css           # Global styles + Tailwind
    ├── components/
    │   ├── BookForm.jsx    # Add / edit book form
    │   └── BookList.jsx    # Display list of books
    └── redux/
        ├── store.js        # Redux store setup
        └── booksSlice.js   # Book data logic and localStorage
```

---

## How to Run This Project Locally

### Step 1: Install Node.js

Make sure you have **Node.js** installed on your computer.
Download from: https://nodejs.org

### Step 2: Open the Project Folder

Open a terminal (Command Prompt / Terminal) and go inside the `local-app` folder:

```sh
cd local-app
```

### Step 3: Install Dependencies

```sh
npm install
```

This will install React, Vite, Redux Toolkit, Tailwind CSS, and all other required packages.

### Step 4: Start the Development Server

```sh
npm run dev
```

After a few seconds, you will see a link like:

```
http://localhost:5173
```

Open-mode

```sh
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

### Preview Production Build

```sh
npm run preview
```

This serves the built files locally so you can test before deploying.

---

## How It Works

### State Management with Redux Toolkit

All the book data is stored in a **Redux store**. The store has one slice called `books` that contains:

- `list`: array of all books
- `search`: current search text

Actions like `addBook`, `updateBook`, `deleteBook`, `toggleStatus`, and `setSearch` update the state.

### localStorage Persistence

Every time a book is added, edited, deleted, issued, or returned, the updated list is saved to `localStorage` under the key `books`.

When the app loads, it reads from `localStorage`. If no data is found, it shows three default starter books.

### Issue / Return Feature

Each book has a status:

- `available` — the book is in the library
- `issued` — the book has been given to someone

Clicking the **Issue** button changes status to `issued`.  
Clicking the **Return** button changes it back to `available`.


## Key Concepts Used

- **React Functional Components** with hooks (`useState`, `useEffect`)
- **Redux Toolkit** `createSlice` and `configureStore`
- **React Redux** `Provider`, `useDispatch`, `useSelector`
- **localStorage** read/write for data persistence
- **Tailwind CSS** for layout and styling
- **Vite** for fast development and build


## Links

Live:- [Live](https://mini-hackathon-azure.vercel.app/)

Github :- [Github](https://github.com/deeppakhare/Frontend-Assignments-Sheriyans-Cohort-3/tree/261aa4ea4daebded289d21a0a23950f686aa7b3b/Assignmnet-11%20(mini-hackathon)/local-app)

Documentaion :- [Document]()

## Author

This project was created for mini hackathon project to learn **Redux Toolkit**.

---

## License

This project is free to use for learning and personal purposes.
