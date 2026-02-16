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
