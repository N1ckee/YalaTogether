const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Invalid username or password");
    }

    localStorage.setItem("token", data.token);

    const payload = JSON.parse(atob(data.token.split(".")[1]));
    localStorage.setItem("role", payload.role);

    window.location.href = "dashboard.html";

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});
