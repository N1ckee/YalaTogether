const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  const identifier = form.elements["identifier"].value.trim();
  const password = form.elements["password"].value;

  const button = form.querySelector(".login-btn");
  button.textContent = "Logging in...";
  button.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identifier, password })
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("Server returned invalid response.");
    }

    if (!response.ok) {
      throw new Error(data.error || "Invalid username or password");
    }

    localStorage.setItem("token", data.token);

    window.location.href = "/dashboard";
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    button.textContent = "Log In";
    button.disabled = false;
  }
});
