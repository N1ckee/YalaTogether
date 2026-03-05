/*document.addEventListener("DOMContentLoaded", function() {

    var mapElement = document.getElementById('map');
    if (mapElement) {
        var map = L.map('map').setView([62.0, 15.0], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        var selectedRole = null;
        var userMarker;

        var driverIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        var passengerIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/2830/2830312.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        var driverBtn = document.getElementById('driverBtn');
        var passengerBtn = document.getElementById('passengerBtn');

        if (driverBtn && passengerBtn) {
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
        }

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
    }*/
    

   const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});
    
  const imgElement = document.getElementById("rideImage");

if (imgElement) {

const rideImages = [
"images/yalla6.jpeg",
"images/yalla7.jpeg",
"images/yallachild.jpeg",
"images/yalla4.png"
];

let index = 0;

window.changeRide = function(i){

index = i;

imgElement.style.opacity = 0;

setTimeout(()=>{
imgElement.src = rideImages[index];
imgElement.style.opacity = 1;
},200);

const items = document.querySelectorAll(".why-item");

items.forEach(item=>{
item.classList.remove("active");
});

items[i].classList.add("active");

}

}
