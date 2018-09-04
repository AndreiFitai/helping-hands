function startMap() {
  const berlin = {
    lat: 52.518528,
    lng: 13.404389
  };
  const map = new google.maps.Map(document.getElementById("map-main"), {
    zoom: 12,
    center: berlin
  });
  axios.get("/api").then(data => {
    setMarkers(data.data);
  });
  markers = [];

  function setMarkers(places) {
    places.forEach(function(place) {
      let marker;
      const center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name,
        icon: marker
      });
      markers.push(pin);
    });
  }
}

startMap();
