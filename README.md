# HNG14 Frontend Stage 1a - Advanced Todo Card

This project is the Stage 1a upgrade of the HNG14 Frontend Wizards Todo Card task.

It builds directly on the Stage 0 submission and keeps the project intentionally small: one Todo Card, not a full Todo app.

## Overview

The card was upgraded from a static, testable card into a more interactive and stateful component using plain HTML, CSS, and JavaScript.

The focus for this stage is still the same core quality bar:

- Testability
- Accessibility
- Responsiveness

But Stage 1a also adds:

- editable content
- status transitions
- priority changes
- expand and collapse behavior
- richer time handling
- cleaner state synchronization

## What Changed From Stage 0

Stage 0 delivered a clean static Todo Card with exact testing hooks and basic completion behavior.

Stage 1a extends that foundation with:

- an edit mode with save and cancel actions
- a dedicated status control
- synced checkbox and status logic
- a visual priority indicator
- a collapsible description section
- an overdue indicator
- more detailed time remaining messages
- a completed state that replaces the time message with `Completed`

## Stage 1a Features

### Edit Mode

The card now supports inline editing.

Added test hooks:

- `test-todo-edit-form`
- `test-todo-edit-title-input`
- `test-todo-edit-description-input`
- `test-todo-edit-priority-select`
- `test-todo-edit-due-date-input`
- `test-todo-save-button`
- `test-todo-cancel-button`

Behavior:

- clicking `Edit` opens the form
- `Save` updates the visible card
- `Cancel` closes the form without changing the current values
- focus returns to the Edit button when the form closes

### Status Control

Added test hook:

- `test-todo-status-control`

Allowed statuses:

- `Pending`
- `In Progress`
- `Done`

Behavior:

- checking the checkbox sets the status to `Done`
- setting status to `Done` checks the checkbox
- unchecking after `Done` resets status to `Pending`

### Priority Indicator

Added test hook:

- `test-todo-priority-indicator`

The card now shows a clear visual priority accent that changes for:

- `Low`
- `Medium`
- `High`

### Expand / Collapse

Added test hooks:

- `test-todo-expand-toggle`
- `test-todo-collapsible-section`

Behavior:

- long descriptions start collapsed
- the toggle reveals or hides the full content
- the toggle uses `aria-expanded` and `aria-controls`

### Time Management

Added test hook:

- `test-todo-overdue-indicator`

Behavior:

- time updates every 30 seconds
- time shows day, hour, or minute-level detail
- overdue state is visually highlighted
- if the task is marked `Done`, the time display changes to `Completed`

## Accessibility Notes

This project keeps the Stage 0 accessibility base and expands it for Stage 1a:

- edit fields use proper `<label for="">`
- the status dropdown has a visible accessible label
- the expand toggle uses `aria-expanded` and `aria-controls`
- the time text uses `aria-live="polite"`
- focus styles remain visible for all interactive elements
- keyboard access was preserved for the main control flow

## Responsive Behavior

The card remains mobile-first and responsive.

It has been adjusted to handle:

- 320px mobile screens
- tablet layouts
- wider desktop layouts
- long titles
- long descriptions
- wrapped tags
- stacked edit form fields on smaller screens

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

1. Open the project folder.
2. Open `index.html` in your browser.

You can also use Live Server in VS Code if you want live refresh while testing interactions.

## Design Decisions

A few deliberate choices were made for this stage:

- the project still uses a single-page static setup for simplicity
- state is managed in plain JavaScript through a single shared state object
- rendering is split into small helper functions to keep the code modular and readable
- the card keeps all Stage 0 test hooks while layering in the new Stage 1a hooks

## Known Limitations

- this is still one standalone card, not a multi-item Todo app
- edit mode returns focus cleanly, but focus trapping inside the form was not added
- delete remains a demo action using an alert, as allowed by the task

## Goal Of The Project

The goal of this Stage 1a update was to keep the clean Stage 0 foundation while making the Todo Card more interactive, stateful, accessible, and realistic without turning it into a full application.
