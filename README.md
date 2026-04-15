# HNG14 Frontend Stage 0 - Testable Todo Item Card

This project is a clean, responsive, and accessible Todo Item Card built for the HNG14 Frontend Wizards Stage 0 task.

It focuses on the three things the task emphasized most:

- Testability
- Accessibility
- Responsiveness

## Overview

The app is a small static web project built with plain HTML, CSS, and JavaScript.

It includes one Todo card with:

- exact `data-testid` values for automated checks
- semantic HTML elements
- keyboard-friendly controls
- a live time-remaining hint
- responsive layout behavior from mobile to desktop

## What Was Built

The Todo card includes all required task elements:

- root card container
- task title
- task description
- priority badge
- due date
- time remaining text
- status indicator
- completion checkbox
- tags list
- edit button
- delete button

## Features

- Uses an `<article>` as the card container
- Uses `<h2>`, `<p>`, `<time>`, `<label>`, `<button>`, and `<ul role="list">` for semantic structure
- Includes a real checkbox for completion
- Updates the task status to `Done` when the checkbox is checked
- Applies strike-through styling to the title when completed
- Calculates a friendly time message such as:
  - `Due in 3 days`
  - `Due tomorrow`
  - `Due now!`
  - `Overdue by 2 hours`
- Refreshes the time-remaining hint every 60 seconds
- Includes visible focus styles for keyboard users
- Wraps tags cleanly and avoids horizontal overflow

## Accessibility Notes

This project was built with accessibility in mind:

- the checkbox has a visible label
- buttons use real `<button>` elements with visible text
- the changing time hint uses `aria-live="polite"`
- focus styles are visible on interactive elements
- color choices were made to keep contrast clear and readable

## Responsive Behavior

The layout is mobile-first and adapts across screen sizes:

- mobile: stacked layout with full-width feel
- tablet/desktop: centered card with a comfortable max width
- tags wrap properly without breaking the layout
- long text is handled without horizontal scrolling

## Required `data-testid` Hooks

The following required selectors are included exactly as specified:

- `test-todo-card`
- `test-todo-title`
- `test-todo-description`
- `test-todo-priority`
- `test-todo-due-date`
- `test-todo-time-remaining`
- `test-todo-status`
- `test-todo-complete-toggle`
- `test-todo-tags`
- `test-todo-edit-button`
- `test-todo-delete-button`

Optional tag hooks also included:

- `test-todo-tag-work`
- `test-todo-tag-urgent`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks or external libraries were used.

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

## How To Run Locally

Since this is a static project, you can run it very simply:

1. Open the project folder.
2. Open `index.html` in your browser.

You can also use the VS Code Live Server extension if you want a smoother local preview.

## Behavior Summary

- The due date is generated relative to the current time.
- The due date is displayed in a readable format.
- The remaining time updates automatically every 60 seconds.
- Clicking the checkbox marks the task as completed.
- Clicking `Edit` logs `edit clicked` to the console.
- Clicking `Delete` shows a simple alert.

## Goal Of The Project

The goal was to build a submission-ready Todo card that is easy to test, easy to use, and visually clean without adding unnecessary complexity.
