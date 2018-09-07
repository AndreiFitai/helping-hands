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
        color: "#56D4C9"
      },
      {
        lightness: "41"
      }
    ]
  }
];

function startMap(data) {
  const center = {
    lat: data.location.coordinates[1],
    lng: data.location.coordinates[0]
  };

  const map = new google.maps.Map(document.getElementById("map-single"), {
    zoom: 15,
    center: center,
    styles: mapStyle
  });

  const pin = new google.maps.Marker({
    position: center,
    map: map,
    title: data.title,
    icon: "/images/location-small.png"
  });

  // markers = [];
  // setMarkers(data);

  // function setMarkers(places) {
  //   places.forEach(function(place) {
  //     let marker = "../images/location-small.png";
  //     const center = {
  //       lat: place.location.coordinates[1],
  //       lng: place.location.coordinates[0]
  //     };
  //     const pin = new google.maps.Marker({
  //       position: center,
  //       map: map,
  //       title: place.name,
  //       icon: marker
  //     });
  //     markers.push(pin);
  //   });
  // }
}

// startMap();
