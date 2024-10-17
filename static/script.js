const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const minute = document.querySelector('.minute');
const hour = document.querySelector('.hour');
const themeToggle = document.querySelector('.theme-toggle');
const timezoneSelect = document.querySelector('.timezone-select');

let currentTimezone = '{{ selected_timezone }}'; // Get the currently selected timezone
let interval;

// Create spikes
for (let s = 0; s < 60; s++) {
    let mSpikeEl = document.createElement('i');
    let sSpikeEl = document.createElement('i');
    mSpikeEl.className = 'spike';
    sSpikeEl.className = 'spike';
    mSpikeEl.style = `--rotate:${6 * s}deg`;
    sSpikeEl.style = `--rotate:${6 * s}deg`;
    mSpikeEl.setAttribute('data-i', s);
    sSpikeEl.setAttribute('data-i', s);

    seconds.append(sSpikeEl);
    minutes.append(mSpikeEl);
}

function updateClock() {
    const now = new Date();
    const options = { timeZone: currentTimezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(now);

    // Extract hour, minute, and second from the formatted parts
    const hourValue = parts.find(part => part.type === 'hour').value;
    const minuteValue = parts.find(part => part.type === 'minute').value;
    const secondValue = parts.find(part => part.type === 'second').value;

    hour.textContent = hourValue;
    minute.textContent = minuteValue;

    minutes.style = `--dRotate:${6 * minuteValue}deg`;
    seconds.style = `--dRotate:${6 * secondValue}deg`;
}

function startClock() {
    updateClock(); // Initial update
    interval = setInterval(updateClock, 1000); // Update every second
}

startClock(); // Start the clock

// Update timezone when the form is submitted
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    currentTimezone = timezoneSelect.value; // Update the current timezone
    startClock(); // Restart the clock
    // Submit the form to update the time on the server
    event.target.submit();
});

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelector('.clock').classList.toggle('dark');
    themeToggle.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});


const themeToggleButton = document.getElementById('theme-toggle-button');

themeToggleButton.addEventListener('click', () => {
document.body.classList.toggle('dark'); // Toggle dark class on body
});


function animateClockHands() {
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

setInterval(() => {
let currentTime = new Date();
let hours = currentTime.getHours() % 12; // Convert to 12-hour format
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();

let hourRotation = (hours + minutes / 60) * 30; // 360/12 = 30 degrees per hour
let minuteRotation = (minutes + seconds / 60) * 6; // 360/60 = 6 degrees per minute
let secondRotation = seconds * 6; // 360/60 = 6 degrees per second

hourHand.style.transform = `rotate(${hourRotation}deg)`;
minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
secondHand.style.transform = `rotate(${secondRotation}deg)`;

// To-fro effect
hourHand.style.animation = "tofro 1s ease-in-out infinite";
minuteHand.style.animation = "tofro 1s ease-in-out infinite";
secondHand.style.animation = "tofro 1s ease-in-out infinite";
}, 1000); // Update every second
}

document.addEventListener("DOMContentLoaded", animateClockHands);


function formatDateTime(timezone) {
const now = new Date();
const options = {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric',
hour: '2-digit',
minute: '2-digit',
second: '2-digit',
timeZone: timezone,
timeZoneName: 'short'
};
return now.toLocaleString('en-US', options);
}

// Update date and timezone display
function updateDateAndTimezone() {
const selectedTimezone = document.getElementById('timezone-select').value;
const dateElement = document.getElementById('current-date');
const timezoneElement = document.getElementById('current-timezone');

const formattedDate = formatDateTime(selectedTimezone);
dateElement.textContent = formattedDate;
timezoneElement.textContent = `Timezone: ${selectedTimezone}`;
}

// Event listener for timezone change
document.getElementById('timezone-select').addEventListener('change', (event) => {
updateDateAndTimezone();
});

// Initial call to display the default timezone and date
updateDateAndTimezone();
