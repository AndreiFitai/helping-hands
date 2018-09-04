var locationPicker = new locationPicker(
  "map",
  {
    setCurrentPosition: true // You can omit this, defaults to true
  },
  {
    zoom: 15 // You can set any google map options here, zoom defaults to 15
  }
);

// Get element references
var latitude = document.getElementById("loc-pick-lat");
var longitude = document.getElementById("loc-pick-lng");

const geocoder = new google.maps.Geocoder();

//Sets
document.getElementById("address").addEventListener("focusout", function() {
  geocodeAddress(geocoder, locationPicker.map);
  console.log(map);
});

function geocodeAddress(geocoder, map) {
  let address = document.getElementById("address").value;
  console.log(address);
  geocoder.geocode(
    {
      address: address
    },
    function(results, status) {
      if (status === "OK") {
        console.log(results[0].geometry.location);
        map.setCenter(results[0].geometry.location);
        latitude.value = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}

google.maps.event.addListener(locationPicker.map, "idle", function(event) {
  // Get current location and show it in HTML
  var location = locationPicker.getMarkerPosition();
  latitude.value = location.lat;
  longitude.value = location.lng;
});
