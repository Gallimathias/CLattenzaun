var ctx = document.getElementById("jobview").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: [
      "Agrar",
      "Erziehung",
      "Geisteswissenschaftlich",
      "Gesundheitswesen",
      "Handel",
      "Handwerk",
      "Kunst",
      "öffentlicher Dienst",
      "Informatik",
      "Ingenieur",
      "Journalist",
      "Jurist",
      "Naturwissenschaftlich",
      "Sprache",
      "Studiert",
      "Wirtschaft",
      "Wissenschaftlich"
    ],
    datasets: [
      {
        label: "Jobs",
        backgroundColor: "#db4437", //Unbekannt
        borderColor: "#db4437", //Unbekannt
        data: [
          5, //Agrar
          8, //Erziehung
          5, //Geisteswissenschaftlich
          1, //Gesundheitswesen
          10, //Handel
          6, //Handwerk
          1, //Kunst
          4, //öffentlicher Dienst
          1, //Informatik
          4, //Ingenieur
          3, //Journalist
          13, //Jurist
          3, //Naturwissenschaftlich
          4, //Sprache
          14, //Studiert
          8, //Wirtschaft
          2 //Wissenschaftlich
        ]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
