const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

let role = "";
let username = "";

try {
  const payload = JSON.parse(atob(token.split(".")[1]));
  role = payload.role;
  username = payload.username;
} catch (err) {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.getElementById("welcomeText").textContent =
  "Welcome " + username + " (" + role + ")";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

const map = L.map("map").setView([59.3293, 18.0686], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let startMarker = null;
let endMarker = null;
let routeLine = null;

map.on("click", function (e) {
  if (!startMarker) {
    startMarker = L.marker(e.latlng, { draggable: true }).addTo(map);
  } else if (!endMarker) {
    endMarker = L.marker(e.latlng, { draggable: true }).addTo(map);
    drawRoute();
  }
});

function drawRoute() {
  if (routeLine) {
    map.removeLayer(routeLine);
  }

  const latlngs = [
    startMarker.getLatLng(),
    endMarker.getLatLng()
  ];

  routeLine = L.polyline(latlngs, { color: "blue" }).addTo(map);
}

document.getElementById("useLocationBtn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {
    const userLatLng = [
      position.coords.latitude,
      position.coords.longitude
    ];

    map.setView(userLatLng, 13);

    if (startMarker) {
      map.removeLayer(startMarker);
    }

    startMarker = L.marker(userLatLng, { draggable: true }).addTo(map);
  });
});
