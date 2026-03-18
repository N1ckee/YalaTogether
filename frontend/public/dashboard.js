const token = localStorage.getItem("token");
let allRides = [];
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

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

let startMarker = null;
let endMarker = null;
let routeLine = null;

map.on("click", function (e) {
  if (!startMarker) {
    startMarker = L.marker(e.latlng, { icon: greenIcon, draggable: true }).addTo(map);
  } else if (!endMarker) {
    endMarker = L.marker(e.latlng, { icon: redIcon, draggable: true }).addTo(map);
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

  routeLine = L.polyline(latlngs, {
    color: "#2563eb",
    weight: 5
  }).addTo(map);

  const distance = calculateDistance(
    latlngs[0].lat,
    latlngs[0].lng,
    latlngs[1].lat,
    latlngs[1].lng
  );

  document.getElementById("distanceInfo").textContent =
    "Distance: " + distance.toFixed(2) + " km";
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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

    startMarker = L.marker(userLatLng, {
      icon: greenIcon,
      draggable: true
    }).addTo(map);
  });
});
// 🚗 عرض الرحلات من الباك اند
const ridesContainer = document.getElementById("contentArea");

async function loadRides() {
  try {
    const response = await fetch("/api/rides");

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to load rides");
    }

    allRides = data;        
    displayRides(allRides);

  } catch (err) {
    console.error(err);
    ridesContainer.innerHTML = "<p>❌ Failed to load rides</p>";
  }
}

function displayRides(rides) {
  ridesContainer.innerHTML = "";

  rides.forEach(ride => {
    const div = document.createElement("div");
    div.classList.add("ride-card");

    div.innerHTML = `
      <h3>${ride.from} → ${ride.to}</h3>
      <p>Driver: ${ride.driver}</p>
      <p>Car: ${ride.car}</p>
      <p>Seats left: ${ride.seats}</p>
      <button class="book-btn">Book</button>
    `;

    ridesContainer.appendChild(div);
  });
}

// 📌 حجز رحلة
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("book-btn")) {
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      alert("✅ Ride booked!");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
});

// 🚀 تشغيل تحميل الرحلات
loadRides();
document.getElementById("fromInput").addEventListener("input", filterRides);
document.getElementById("toInput").addEventListener("input", filterRides);

function filterRides() {
  const fromValue = document.getElementById("fromInput").value.toLowerCase();
  const toValue = document.getElementById("toInput").value.toLowerCase();

  const filtered = allRides.filter(ride => {
    return (
      ride.from.toLowerCase().includes(fromValue) &&
      ride.to.toLowerCase().includes(toValue)
    );
  });

  displayRides(filtered);
}
