const profileState = {
  currentTime: Date.now(),
};

const refs = {
  currentTime: document.querySelector('[data-testid="test-user-time"]'),
};

function formatEpochMilliseconds(value) {
  return String(value);
}

function renderCurrentTime() {
  refs.currentTime.textContent = formatEpochMilliseconds(profileState.currentTime);
}

function updateCurrentTime() {
  profileState.currentTime = Date.now();
  renderCurrentTime();
}

renderCurrentTime();
window.setInterval(updateCurrentTime, 1000);
