var mapStyle = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        saturation: "-38"
      },
      {
        weight: "1.32"
      },
      {
        color: "#fbe9c9"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#333bbf"
      },
      {
        lightness: "41"
      }
    ]
  }
];

var locationPicker = new locationPicker(
  "map",
  {
    setCurrentPosition: true // You can omit this, defaults to true
  },
  {
    zoom: 12, // You can set any google map options here, zoom defaults to 15
    styles: mapStyle
  }
);

// Get element references
var latitude = document.getElementById("loc-pick-lat");
var longitude = document.getElementById("loc-pick-lng");

var geocoder = new google.maps.Geocoder();

//Sets
document.getElementById("address").addEventListener("focusout", function() {
  geocodeAddress(geocoder, locationPicker.map);
  console.log(map);
});

function geocodeAddress(geocoder, map) {
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  console.log(exactLoc);
  geocoder.geocode(
    {
      address: address + ", " + city
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
