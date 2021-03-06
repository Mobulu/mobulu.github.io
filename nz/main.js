/* Neuseelandreise Skript */
// einzeiliger Kommentar

let zoom = 11;
let coords = [
    ETAPPEN[15].lat,
    ETAPPEN[15].lng
];

let startLayer = L.tileLayer.provider("OpenStreetMap.Mapnik");

let map = L.map('map', {
    center: coords,
    zoom: zoom,
    layers: [
        startLayer
    ],
});

let layerControl = L.control.layers({
    "OpenStreetMap": startLayer,
    "Esri Topo Map": L.tileLayer.provider("Esri.WorldTopoMap"),
    "Esri Satellitenbild": L.tileLayer.provider("Esri.WorldImagery"),
    "Open Topo Map": L.tileLayer.provider("OpenTopoMap"),
    "Stamen Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
}).addTo(map);

for (let etappe of ETAPPEN) {
    let popup = `
      <h3>${etappe.titel} (Etappe ${etappe.nr})</h3>
      <ul>
      <li>geogr. Länge: ${etappe.lng}</li>
      <li>geogr. Breite: ${etappe.lat}</li>
      <li><a href="${etappe.wikipedia}">Link zur Wikipediaseite</a></li>
      <li><a href="https://${etappe.github}.github.io/nz/">Link zur Etappenseite</a></li>
  </ul>
  `;
    //console.log(etappe);

    let navClass = "etappenLink";
    let mrk = L.marker([etappe.lat, etappe.lng]).addTo(map).bindPopup(popup);
    if (etappe.nr == 16) {
        mrk.openPopup();
        navClass = "etappenLink etappeAktuell";
    }


    // Etappennavigation erweitern
    let link = `<a href="https://${etappe.github}.github.io/nz/"
     class="${navClass}" title="${etappe.titel}">${etappe.nr}</a>`;
    document.querySelector("#navigation").innerHTML += link;
}

// DOC Hütten anzeigen
for (let hut of HUTS) {
    let popup = `
    <h3>${hut.name}</h3>
    <h4>${hut.region}</h3>
    <hr>
    <p>${hut.info}</p>
    <img src="${hut.image}" alt="Vorschaubild">
    <hr>
    <a href="${hut.link}" target="Neuseeland">Link zur Hütte</a>
`;

    let statusColor;
    if (hut.open == true) {
        statusColor = "green";
    } else {
        statusColor = "red";
    }

    L.circleMarker([hut.lat, hut.lng], {
        color: statusColor
    }).addTo(map).bindPopup(popup);
}

L.control.scale({
    imperial: false,
}).addTo(map);

L.control.fullscreen().addTo(map);

let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("OpenStreetMap.Mapnik"), {
        toggleDisplay: true
    }
).addTo(map);