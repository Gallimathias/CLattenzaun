var ctx = document.getElementById("predictionparliament").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: ["Dafür", "Dagegen", "Enthalten"],
    datasets: [
      {
        label: "Prediction",
        backgroundColor: ["#cc0000", "#6aa84f", "#b7b7b7"],
        borderColor: ["#cc0000", "#6aa84f", "#b7b7b7"],
        data: [43, 51, 2]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
