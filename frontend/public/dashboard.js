const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

try {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload.role;
  const username = payload.username;

  document.getElementById("welcomeText").textContent =
    "Welcome " + username + " (" + role + ")";

  const contentArea = document.getElementById("contentArea");

  if (role === "driver") {
    contentArea.innerHTML = "<p>You can create a ride.</p>";
  } else {
    contentArea.innerHTML = "<p>You can search for available rides.</p>";
  }

} catch (err) {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
});
