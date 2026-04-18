# HNG14 Frontend Tasks Repo

This repository contains the HNG Frontend Wizards task submissions built with plain HTML, CSS, and vanilla JavaScript.

## Included Tasks

### Stage 1A - Advanced Todo Card

This task builds on the original Stage 0 Todo Card and remains at the repo root.

Files:

```text
index.html
styles.css
script.js
```

What it includes:

- editable Todo content
- synced checkbox and status control
- priority and overdue visual states
- collapsible description behavior
- time updates and completed state handling

### Stage 1B - Testable Profile Card

This task is implemented as a separate static page inside the `stage-1b/` folder.

Files:

```text
stage-1b/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── profile-avatar.svg
```

What it includes:

- semantic profile card structure
- avatar with meaningful alt text
- current epoch time in milliseconds
- social links that open safely in a new tab
- distinct hobbies and dislikes lists
- responsive mobile, tablet, and desktop layout
- visible focus styles and accessible markup

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── stage-1b/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
        └── profile-avatar.svg
```

## How To Run Locally

### Stage 1A

1. Open the project folder.
2. Open `index.html` in your browser.

### Stage 1B

1. Open the `stage-1b` folder.
2. Open `stage-1b/index.html` in your browser.

You can also use a local static server or VS Code Live Server for both pages.

## Notes

- Both tasks were built without frameworks or external UI libraries.
- The repo keeps Stage 1A and Stage 1B separate so each submission page remains clear and easy to test.
- Stage 1B updates the displayed epoch time every second using `Date.now()`.
