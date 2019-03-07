var ctx = document.getElementById("mwdevision").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: ["Männlich", "Weiblich"],
    datasets: [
      {
        label: "Sex",
        backgroundColor: [
          "#3c78d8", //Männlich
          "#a64d79" //Weiblich
        ],
        borderColor: [
          "#3c78d8", //Männlich
          "#a64d79" //Weiblich
        ],
        data: [
          62, //Männlich
          34 //Weiblich
        ]
      }
    ]
  },

  // Configuration options go here
  options: {}
});

ctx = document.getElementById("mwdevisioncountry").getContext("2d");
chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: ["Männlich", "Weiblich"],
    datasets: [
      {
        label: "Sex",
        backgroundColor: [
          "#3c78d8", //Männlich
          "#a64d79" //Weiblich
        ],
        borderColor: [
          "#3c78d8", //Männlich
          "#a64d79" //Weiblich
        ],
        data: [
          40854.2, //Männlich
          41939.5 //Weiblich
        ]
      }
    ]
  },

  // Configuration options go here
  options: {}
});

ctx = document.getElementById("mwvoices").getContext("2d");
chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: ["dafür", "dagegen"],
    datasets: [
      {
        backgroundColor: "#a64d79", 
        borderColor: "#a64d79", 
        label: "Weiblich",
        data: [16, 14]
      },
      {
        backgroundColor: "#3c78d8", 
        borderColor: "#3c78d8", 
        label: "Männlich",
        data: [45, 14]
      }
    ]
  },

  // Configuration options go here
  options: {}
});

ctx = document.getElementById("mwprediction").getContext("2d");
chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: ["dafür", "dagegen"],
    datasets: [
      {
        backgroundColor: "#a64d79", 
        borderColor: "#a64d79", 
        label: "Weiblich",
        data: [9, 24]
      },
      {
        backgroundColor: "#3c78d8", 
        borderColor: "#3c78d8",
        label: "Männlich",
        data: [34, 27]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
