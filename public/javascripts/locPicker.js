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

google.maps.event.addListener(locationPicker.map, "idle", function(event) {
  // Get current location and show it in HTML
  var location = locationPicker.getMarkerPosition();
  latitude.value = location.lat;
  longitude.value = location.lng;
});
