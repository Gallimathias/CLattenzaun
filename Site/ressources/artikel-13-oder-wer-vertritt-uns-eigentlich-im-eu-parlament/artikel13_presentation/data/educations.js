var ctx = document.getElementById("education").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: [
      "Unbekannt",
      "Abitur",
      "Hauptschule / Volksschule",
      "Mittlere Reife",
      "Hochschule"
    ],
    datasets: [
      {
        label: "Education",
        backgroundColor: [
          "#ff6d00", //Unbekannt
          "#4285f4", //Abitur
          "#db4437", //Hauptschule
          "#f4b400", //Mittlere Reife
          "#0f9d58" //Hochschule
        ],
        borderColor: [
          "#ff6d00", //Unbekannt
          "#4285f4", //Abitur
          "#db4437", //Hauptschule
          "#f4b400", //Mittlere Reife
          "#0f9d58" //Hochschule
        ],
        data: [
          5, //Unbekannt
          77, //Abitur
          1, //Hauptschule
          6, //Mittlere Reife
          6 //Hochschule
        ]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
