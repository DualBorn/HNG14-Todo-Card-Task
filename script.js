// Keep the demo due date relative to "now" so the time hint stays realistic.
const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

const todoCard = document.querySelector('[data-testid="test-todo-card"]');
const dueDateElement = document.querySelector('[data-testid="test-todo-due-date"]');
const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
const statusElement = document.querySelector('[data-testid="test-todo-status"]');
const completeToggle = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

function pluralize(value, unit) {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

// Turns the date difference into the kind of friendly message the task asks for.
function formatTimeRemaining(targetDate, now) {
  const difference = targetDate.getTime() - now.getTime();
  const absDifference = Math.abs(difference);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absDifference < minute) {
    return "Due now!";
  }

  if (difference > 0) {
    if (difference < 36 * hour) {
      return difference < day ? "Due today" : "Due tomorrow";
    }

    const daysRemaining = Math.round(difference / day);
    return `Due in ${pluralize(daysRemaining, "day")}`;
  }

  if (absDifference < day) {
    const overdueHours = Math.max(1, Math.round(absDifference / hour));
    return `Overdue by ${pluralize(overdueHours, "hour")}`;
  }

  const overdueDays = Math.max(1, Math.round(absDifference / day));
  return `Overdue by ${pluralize(overdueDays, "day")}`;
}

// Shows the full due date in a readable format and keeps the machine-friendly datetime value.
function updateDueDateDisplay() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  dueDateElement.dateTime = dueDate.toISOString();
  dueDateElement.textContent = `Due ${formatter.format(dueDate)}`;
}

// Refreshes just the time hint without touching the rest of the card.
function updateTimeRemaining() {
  timeRemainingElement.dateTime = dueDate.toISOString();
  timeRemainingElement.textContent = formatTimeRemaining(dueDate, new Date());
}

// Keeps the visual state in sync with the checkbox state.
function updateCompletionState() {
  const isComplete = completeToggle.checked;
  const nextStatus = isComplete ? "Done" : "In Progress";

  todoCard.classList.toggle("is-complete", isComplete);
  statusElement.textContent = nextStatus;
  statusElement.setAttribute("aria-label", `Status: ${nextStatus}`);
}

updateDueDateDisplay();
updateTimeRemaining();
updateCompletionState();

// A real checkbox already handles keyboard input, so we only react to state changes.
completeToggle.addEventListener("change", updateCompletionState);

editButton.addEventListener("click", () => {
  console.log("edit clicked");
});

deleteButton.addEventListener("click", () => {
  window.alert("Delete clicked");
});

window.setInterval(updateTimeRemaining, 60 * 1000);
