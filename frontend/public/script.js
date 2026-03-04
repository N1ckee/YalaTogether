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
"images/yalla7.jpeg",
"images/yallachild.jpeg",
"images/yalla4.png"
];

let index = 0;

function changeRide(i){

index = i;

const img = document.getElementById("rideImage");

img.classList.add("slider-fade");

setTimeout(()=>{
img.src = rideImages[index];
img.classList.remove("slider-fade");
},200);

document.querySelectorAll(".why-item").forEach(item=>{
item.classList.remove("active");
});

document.querySelectorAll(".why-item")[i].classList.add("active");

}

setInterval(()=>{

index++;

if(index >= rideImages.length){
index = 0;
}

changeRide(index);

},4000);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
          
            observer.unobserve(entry.target); 
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // يجعل العنصر يظهر قبل أن يصل لمنتصف الشاشة بقليل
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
