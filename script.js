const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");

// Track attendance
let count = parseInt(localStorage.getItem("attendanceCount")) || 0;
const maxCount = 50;

// Display saved attendance count
attendeeCount.textContent = count;

// Update progress bar on page load
progressBar.style.width = (count / maxCount) * 100 + "%";

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  if (!name || !team) {
    return;
  }

  console.log(name, teamName);

  // Increment attendance
  count++;
  attendeeCount.textContent = count;

  // Save attendance count
  localStorage.setItem("attendanceCount", count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";

  // Update selected team's counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Personalized greeting
  greeting.innerHTML = `🎉 <strong>Welcome, ${name} from ${teamName}!</strong>`;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  // Add attendee to list (if the HTML exists)
  if (attendeeList) {
    const listItem = document.createElement("li");
    listItem.textContent = `${name} - ${teamName}`;
    attendeeList.appendChild(listItem);
  }

  // Celebration message when attendance goal is reached
  if (count >= maxCount) {
    let water = parseInt(document.getElementById("waterCount").textContent);
    let zero = parseInt(document.getElementById("zeroCount").textContent);
    let power = parseInt(document.getElementById("powerCount").textContent);

    let winner = "";

    if (water >= zero && water >= power) {
      winner = "Team Water Wise";
    } else if (zero >= water && zero >= power) {
      winner = "Team Net Zero";
    } else {
      winner = "Team Renewables";
    }

    greeting.textContent = `🎉 Attendance Goal Reached! Winning Team: ${winner}`;
  }

  // Clear form
  form.reset();
});
