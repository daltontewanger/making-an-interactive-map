/*
 create a leaflet map
 get the user's location DONE
 category is selected (event listener)
 - make a fetch request to FSQ API
 - use the place search method
 - specific lat/long, sort, and category
    - populate our list
    - map the locations on the map
*/
let selectEl = document.querySelector("select");
let listEl = document.querySelector("ul");

let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.getCurrentPosition(
  (position) => {
    let {coords: {latitude, longitude}} = position
    console.log("It Works:", [latitude, longitude]);
    map.setView([latitude, longitude])
    //position  = {coords: {latitude, longitdue, accuracy}}
  },
  (error) => {
    console.log(error);
  }
);

document.querySelector("button").addEventListener("click", (event) => {
  const categoryID = selectEl.value;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3y7gA+8o98X0fp3BT9a43pp44Riqkb0E4urrRskU0llM=",
    },
  };

  fetch(
    `https://api.foursquare.com/v3/places/search?categories=${categoryID}&sort=DISTANCE&limit=5`,
    options
  )
    .then((response) => response.json())
    .then(({ results }) => {
      listEl.innerHTML = "";
      for (let i = 0; i < results.length; i++) {
        results[i];
        const listItem = document.createElement("li");
        listItem.textContent = results[i].name;
        listEl.append(listItem);
      }
    })
    .catch((err) => console.error(err));
});

// instructor API key for forsqaure API
// fsq3y7gA+8o98X0fp3BT9a43pp44Riqkb0E4urrRskU0llM=
