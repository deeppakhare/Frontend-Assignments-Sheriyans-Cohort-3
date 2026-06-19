# DOM Explorer - Interactive Task Manager

## Project Overview

This project is a simple Task Manager application built using HTML, CSS, and  JavaScript. The goal of this project is to understand how the DOM works and how JavaScript interacts with web pages without using any frameworks or libraries.

Users can add, edit, complete, search, and delete tasks dynamically. The project also demonstrates important DOM concepts such as Event Delegation, Event Bubbling, Event Capturing, Attributes vs Properties, and Browser Rendering Pipeline.

---

## Features

* Add New Tasks
* Edit Existing Tasks
* Delete Tasks
* Mark Tasks as Complete
* Search Tasks
* Clear All Tasks
* Task Counters
* Dark Mode / Light Mode Toggle
* Local Storage Integration
* Event Delegation
* Event Bubbling Demonstration
* Event Capturing Demonstration
* Attributes vs Properties Demonstration
* Browser Rendering Pipeline Visualization

---

## Technologies Used

* HTML5
* CSS3
* JavaScript

No frameworks or external libraries were used in this project.

---

# Browser Rendering Pipeline

Whenever a browser loads a webpage, it follows a series of steps before displaying the final result on the screen.

## 1. Parsing

The browser reads the HTML document line by line and starts understanding the structure of the page.

Example:

```html
<h1>Hello World</h1>
```

The browser identifies tags, text, and their relationships.

---

## 2. Tokenization

During parsing, the browser converts HTML code into smaller pieces called tokens.

Example:

```html
<h1>Hello</h1>
```

Becomes:

* Opening Tag Token
* Text Token
* Closing Tag Token

These tokens help the browser understand the content.

---

## 3. DOM Tree

After tokenization, the browser creates the DOM (Document Object Model).

The DOM Tree represents all HTML elements in a tree-like structure.

Example:

```text
Document
 |
 └── html
      |
      └── body
            |
            └── h1
```

JavaScript uses this DOM Tree to access and manipulate elements dynamically.

---

## 4. CSSOM Tree

The browser also reads CSS files and creates another structure called the CSSOM (CSS Object Model).

The CSSOM stores all style information.

Example:

```css
h1{
 color:red;
}
```

The browser understands which styles belong to which elements.

---

## 5. Render Tree

The browser combines:

* DOM Tree
* CSSOM Tree

to create the Render Tree.

The Render Tree contains only the elements that need to be displayed on the screen.

---

## 6. Painting

Finally, the browser paints pixels on the screen and displays the webpage to the user.

This is the final visual output that we see in the browser.

---

# Event Bubbling

Event Bubbling is the default event propagation mechanism in JavaScript.

When an event occurs on a child element, it first executes on the child and then moves upward through its parent elements.

Example:

```text
Child
Parent
Grandparent
```

In this project, clicking the Child Button demonstrates event bubbling through console logs.

---

# Event Capturing

Event Capturing works in the opposite direction of bubbling.

The event starts from the outermost parent and moves toward the target element.

Example:

```text
Grandparent
Parent
Child
```

In this project, capturing is demonstrated using the third parameter of addEventListener.

---

# Event Delegation

Event Delegation is a technique where a single event listener is attached to a parent element instead of multiple child elements.

Benefits:

* Better performance
* Less memory usage
* Easier management of dynamically created elements

In this project, all task actions such as:

* Edit
* Delete
* Complete

are handled using a single event listener attached to the task container.

---

# Attributes vs Properties

This project also demonstrates the difference between HTML Attributes and DOM Properties.

## Attribute

Attributes are defined inside HTML.

Example:

```html
<input value="Hello">
```

Using:

```javascript
input.getAttribute("value")
```

returns:

```text
Hello
```

---

## Property

Properties represent the current state of an element.

Using:

```javascript
input.value
```

returns the current value entered by the user.

If the user changes the text:

```text
Hello DOM
```

then:

```javascript
input.value
```

returns:

```text
Hello DOM
```

while:

```javascript
input.getAttribute("value")
```

still returns:

```text
Hello
```

---

# Learning Outcomes

Through this project, I learned:

* How browsers render web pages
* DOM Manipulation using JavaScript
* Dynamic element creation
* Event Handling
* Event Delegation
* Event Bubbling and Capturing
* Local Storage
* Attributes vs Properties
* Building interactive user interfaces using JavaScript

---

## Author

Deep Pakhare

Sheriyans Coding School - Cohort 3.0
