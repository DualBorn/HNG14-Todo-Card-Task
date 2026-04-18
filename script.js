// Keep the card state in one place so the view stays easy to sync.
const DESCRIPTION_COLLAPSE_LENGTH = 160;
const TIME_REFRESH_MS = 30 * 1000;

function createInitialState() {
  return {
    title: "Ship the interactive Stage 1a Todo Card upgrade",
    description:
      "Finalize the Stage 1a upgrade by adding editable content, synced status controls, smarter time handling, and accessible expand or collapse behavior without losing the clean look and exact testing hooks from Stage 0. Make sure the card still feels polished on small screens, handles long content gracefully, and stays fully usable from the keyboard.",
    priority: "High",
    status: "In Progress",
    dueDate: new Date(Date.now() + ((2 * 24 + 6) * 60 + 45) * 60 * 1000),
    tags: ["work", "urgent", "design"],
    isEditing: false,
    isExpanded: false,
  };
}

const state = createInitialState();
let timeIntervalId = null;

const refs = {
  todoCard: document.querySelector('[data-testid="test-todo-card"]'),
  viewSection: document.querySelector('[data-view-section]'),
  priorityIndicator: document.querySelector('[data-testid="test-todo-priority-indicator"]'),
  title: document.querySelector('[data-testid="test-todo-title"]'),
  description: document.querySelector('[data-testid="test-todo-description"]'),
  collapsibleSection: document.querySelector('[data-testid="test-todo-collapsible-section"]'),
  priority: document.querySelector('[data-testid="test-todo-priority"]'),
  dueDate: document.querySelector('[data-testid="test-todo-due-date"]'),
  timeRemaining: document.querySelector('[data-testid="test-todo-time-remaining"]'),
  overdueIndicator: document.querySelector('[data-testid="test-todo-overdue-indicator"]'),
  status: document.querySelector('[data-testid="test-todo-status"]'),
  completeToggle: document.querySelector('[data-testid="test-todo-complete-toggle"]'),
  statusControl: document.querySelector('[data-testid="test-todo-status-control"]'),
  expandToggle: document.querySelector('[data-testid="test-todo-expand-toggle"]'),
  editButton: document.querySelector('[data-testid="test-todo-edit-button"]'),
  deleteButton: document.querySelector('[data-testid="test-todo-delete-button"]'),
  editForm: document.querySelector('[data-testid="test-todo-edit-form"]'),
  editTitleInput: document.querySelector('[data-testid="test-todo-edit-title-input"]'),
  editDescriptionInput: document.querySelector('[data-testid="test-todo-edit-description-input"]'),
  editPrioritySelect: document.querySelector('[data-testid="test-todo-edit-priority-select"]'),
  editDueDateInput: document.querySelector('[data-testid="test-todo-edit-due-date-input"]'),
  saveButton: document.querySelector('[data-testid="test-todo-save-button"]'),
  cancelButton: document.querySelector('[data-testid="test-todo-cancel-button"]'),
};

function isDone() {
  return state.status === "Done";
}

function isOverdue(referenceDate = new Date()) {
  return !isDone() && state.dueDate.getTime() < referenceDate.getTime();
}

function descriptionNeedsCollapse() {
  return state.description.trim().length > DESCRIPTION_COLLAPSE_LENGTH;
}

function pluralize(value, unit) {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

// Formats the local datetime value so the edit form opens with a valid input value.
function formatDateTimeInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDueDate(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return `Due ${formatter.format(date)}`;
}

// Uses day, hour, or minute granularity depending on how close the due date is.
function getTimeRemainingMessage(referenceDate = new Date()) {
  if (isDone()) {
    return "Completed";
  }

  const difference = state.dueDate.getTime() - referenceDate.getTime();
  const absoluteDifference = Math.abs(difference);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absoluteDifference < minute) {
    return "Due now!";
  }

  let value = 0;
  let unit = "minute";

  if (absoluteDifference >= day) {
    value = Math.ceil(absoluteDifference / day);
    unit = "day";
  } else if (absoluteDifference >= hour) {
    value = Math.ceil(absoluteDifference / hour);
    unit = "hour";
  } else {
    value = Math.ceil(absoluteDifference / minute);
  }

  const formattedDuration = pluralize(value, unit);
  return difference > 0 ? `Due in ${formattedDuration}` : `Overdue by ${formattedDuration}`;
}

function populateEditForm() {
  refs.editTitleInput.value = state.title;
  refs.editDescriptionInput.value = state.description;
  refs.editPrioritySelect.value = state.priority;
  refs.editDueDateInput.value = formatDateTimeInputValue(state.dueDate);
}

function renderCardMeta() {
  refs.title.textContent = state.title;
  refs.description.textContent = state.description;

  refs.priority.textContent = state.priority;
  refs.priority.dataset.priority = state.priority;
  refs.priority.setAttribute("aria-label", `Priority: ${state.priority}`);

  refs.status.textContent = state.status;
  refs.status.dataset.status = state.status;
  refs.status.setAttribute("aria-label", `Status: ${state.status}`);

  refs.statusControl.value = state.status;
  refs.completeToggle.checked = isDone();
  refs.dueDate.dateTime = state.dueDate.toISOString();
  refs.dueDate.textContent = formatDueDate(state.dueDate);

  refs.todoCard.dataset.priority = state.priority.toLowerCase();
  refs.todoCard.dataset.status = state.status.toLowerCase().replace(/\s+/g, "-");
  refs.todoCard.dataset.editing = state.isEditing ? "true" : "false";
  refs.todoCard.classList.toggle("is-done", isDone());
  refs.todoCard.classList.toggle("is-overdue", isOverdue());
}

function renderCollapseState() {
  const canCollapse = descriptionNeedsCollapse();
  const isCollapsed = canCollapse && !state.isExpanded;

  refs.collapsibleSection.classList.toggle("is-collapsed", isCollapsed);
  refs.expandToggle.hidden = !canCollapse;
  refs.expandToggle.textContent = state.isExpanded ? "Show less" : "Show more";
  refs.expandToggle.setAttribute("aria-expanded", state.isExpanded ? "true" : "false");
}

function renderTimeState() {
  const overdue = isOverdue();
  const message = getTimeRemainingMessage();

  refs.timeRemaining.dateTime = state.dueDate.toISOString();
  refs.timeRemaining.textContent = message;

  refs.overdueIndicator.hidden = !overdue;
  refs.overdueIndicator.textContent = overdue ? "Overdue" : "";
}

function renderModeState() {
  refs.viewSection.hidden = state.isEditing;
  refs.editForm.hidden = !state.isEditing;
}

function stopTimeUpdates() {
  if (timeIntervalId !== null) {
    window.clearInterval(timeIntervalId);
    timeIntervalId = null;
  }
}

function syncTimeUpdates() {
  if (isDone()) {
    stopTimeUpdates();
    return;
  }

  if (timeIntervalId === null) {
    timeIntervalId = window.setInterval(() => {
      renderTimeState();
      refs.todoCard.classList.toggle("is-overdue", isOverdue());
    }, TIME_REFRESH_MS);
  }
}

function render() {
  renderCardMeta();
  renderCollapseState();
  renderTimeState();
  renderModeState();
  syncTimeUpdates();
}

function openEditMode() {
  state.isEditing = true;
  populateEditForm();
  render();
  refs.editTitleInput.focus();
}

function closeEditMode() {
  state.isEditing = false;
  render();
  refs.editButton.focus();
}

// Checkbox and status control both update the same status source of truth.
function setStatus(nextStatus) {
  state.status = nextStatus;
  render();
}

function handleCheckboxChange() {
  if (refs.completeToggle.checked) {
    setStatus("Done");
    return;
  }

  setStatus("Pending");
}

function handleStatusChange() {
  setStatus(refs.statusControl.value);
}

function handleExpandToggle() {
  if (!descriptionNeedsCollapse()) {
    return;
  }

  state.isExpanded = !state.isExpanded;
  renderCollapseState();
}

function handleEditSubmit(event) {
  event.preventDefault();

  const nextTitle = refs.editTitleInput.value.trim();
  const nextDescription = refs.editDescriptionInput.value.trim();
  const nextDueDateValue = refs.editDueDateInput.value;
  const nextDueDate = nextDueDateValue ? new Date(nextDueDateValue) : new Date(state.dueDate);

  state.title = nextTitle || state.title;
  state.description = nextDescription || state.description;
  state.priority = refs.editPrioritySelect.value;
  state.dueDate = Number.isNaN(nextDueDate.getTime()) ? state.dueDate : nextDueDate;
  state.isExpanded = false;
  closeEditMode();
}

function handleDeleteClick() {
  window.alert("Delete clicked");
}

refs.completeToggle.addEventListener("change", handleCheckboxChange);
refs.statusControl.addEventListener("change", handleStatusChange);
refs.expandToggle.addEventListener("click", handleExpandToggle);
refs.editButton.addEventListener("click", openEditMode);
refs.deleteButton.addEventListener("click", handleDeleteClick);
refs.editForm.addEventListener("submit", handleEditSubmit);
refs.cancelButton.addEventListener("click", closeEditMode);

render();
