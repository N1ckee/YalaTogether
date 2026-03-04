 var map = L.map('map').setView([62.0, 15.0], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var selectedRole = null;
  var userMarker;

  var driverIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  var passengerIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  var driverBtn = document.getElementById('driverBtn');
  var passengerBtn = document.getElementById('passengerBtn');

  driverBtn.onclick = function() {
    selectedRole = 'Driver';
    driverBtn.classList.add('active');
    passengerBtn.classList.remove('active');
  };

  passengerBtn.onclick = function() {
    selectedRole = 'Passenger';
    passengerBtn.classList.add('active');
    driverBtn.classList.remove('active');
  };

  map.on('click', function(e) {
    if (!selectedRole) {
      alert('Please select Driver or Passenger first');
      return;
    }

    if (userMarker) {
      map.removeLayer(userMarker);
    }

    var icon = selectedRole === 'Driver' ? driverIcon : passengerIcon;

    userMarker = L.marker(e.latlng, { icon: icon })
      .addTo(map)
      .bindPopup(selectedRole + ' location')
      .openPopup();
  });
const rideImages = [
"images/yalla6.jpeg",
"images/yalla7.png",
"images/yallachild.jpeg",
"images/yalla4.png"
];

let currentRide = 0;

function changeRide(i){
const img = document.getElementById("rideImage");

img.style.opacity = 0;

setTimeout(()=>{
img.src = rideImages[i];
img.style.opacity = 1;
},200);
}

setInterval(()=>{
currentRide++;
if(currentRide >= rideImages.length){
currentRide = 0;
}
document.getElementById("rideImage").src = rideImages[currentRide];
},3000);
