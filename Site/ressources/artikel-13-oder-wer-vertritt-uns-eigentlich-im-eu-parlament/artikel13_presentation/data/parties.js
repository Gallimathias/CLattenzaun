var ctx = document.getElementById("votes").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: ["Abwesend", "Dafür", "Dagegen", "Enthalten"],
    datasets: [
      {
        label: "Votes",
        backgroundColor: ["#4a86e8", "#cc0000", "#6aa84f", "#b7b7b7"],
        borderColor: ["#4a86e8", "#cc0000", "#6aa84f", "#b7b7b7"],
        data: [4, 61, 28, 3]
      }
    ]
  },

  // Configuration options go here
  options: {}
});

ctx = document.getElementById("voices").getContext("2d");
const voices = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: [
      "AFD",
      "CDU",
      "CSU",
      "Die blaue Partei",
      "FDP",
      "FW",
      "Grüne",
      "Linke",
      "LKR",
      "NPD",
      "ÖDP",
      "Parteilos",
      "Die PARTEI",
      "Piraten",
      "SPD"
    ],
    datasets: [
      {
        label: "Voices",
        backgroundColor: [
          "#4285f4", //AFD
          "#000000", //CDU
          "#00ffff", //CSU
          "#0000ff", //Die blaue Partei
          "#ffff00", //FDP
          "#b45f06", //FW
          "#38761d", //Grün
          "#9900ff", //Linke
          "#f1c232", //LKR
          "#8b4513", //NPD
          "#e69138", //ÖDP
          "#cccccc", //Parteilos
          "#980000", //Die PARTEI
          "#ff9900", //Piraten
          "#ff0000" //SPD
        ],
        borderColor: [
          "#4285f4", //AFD
          "#000000", //CDU
          "#00ffff", //CSU
          "#0000ff", //Die blaue Partei
          "#ffff00", //FDP
          "#b45f06", //FW
          "#38761d", //Grün
          "#9900ff", //Linke
          "#f1c232", //LKR
          "#8b4513", //NPD
          "#e69138", //ÖDP
          "#cccccc", //Parteilos
          "#980000", //Die PARTEI
          "#ff9900", //Piraten
          "#ff0000" //SPD
        ],
        data: [
          1, //AFD
          29, //CDU
          5, //CSU
          1, //Die blaue Partei
          3, //FDP
          2, //FW
          11, //Grün
          7, //Linke
          5, //LKR
          1, //NPD
          1, //ÖDP
          1, //Parteilos
          1, //Die PARTEI
          1, //Piraten
          27 //SPD
        ]
      }
    ]
  },

  // Configuration options go here
  options: {}
});

const partievoices = {
  label: "Votes in Partie",
  backgroundColor: ["#cc0000", "#6aa84f"],
  borderColor: ["#cc0000", "#6aa84f"],
  data: [50, 50]
};

ctx = document.getElementById("voices-partie").getContext("2d");
const parties = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: ["Dafür", "Dagegen"],
    datasets: [partievoices]
  },

  // Configuration options go here
  options: {}
});

document.getElementById("voices").onclick = function(evt) {
  var activePoints = voices.getElementsAtEvent(evt);
  var firstPoint = activePoints[0];
  var label = voices.data.labels[firstPoint._index];
  var value =
    voices.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];

  document.getElementById("partie-name").innerText = label;

  if(label == "Die blaue Partei")
    label = "DBP";

  parties.data.datasets[0].data[0] = partieData[label].pro;
  parties.data.datasets[0].data[1] = partieData[label].cont;
  parties.update();

  if (!document.querySelector("dialog").hasAttribute("open")) toggleDialog();
};

function toggleDialog() {
  var dialog = document.querySelector("dialog"),
    closeButton = document.getElementById("close-dialog");
  if (!dialog.hasAttribute("open")) {
    // show the dialog
    dialog.setAttribute("open", "open");
    // after displaying the dialog, focus the closeButton inside it
    closeButton.focus();
    closeButton.addEventListener("click", toggleDialog);
    // EventListener für ESC-Taste
    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 27) {
          toggleDialog();
        }
      },
      true
    );
    // only hide the background *after* you've moved focus out of the content that will be "hidden"
    var div = document.createElement("div");
    div.id = "backdrop";
    document.body.appendChild(div);
  } else {
    dialog.removeAttribute("open");
    var div = document.querySelector("#backdrop");
    div.parentNode.removeChild(div);
  }
}

const partieData = {
  AFD: {
    pro: 0,
    cont: 1
  },
  CDU: {
    pro: 28,
    cont: 0
  },
  CSU: {
    pro: 5,
    cont: 0
  },
  FDP: {
    pro: 1,
    cont: 1
  },
  FW: {
    pro: 2,
    cont: 0
  },
  Grüne: {
    pro: 6,
    cont: 5
  },
  Linke: {
    pro: 0,
    cont: 6
  },
  LKR: {
    pro: 3,
    cont: 2
  },
  NPD: {
    pro: 0,
    cont: 1
  },
  ÖDP: {
    pro: 0,
    cont: 1
  },
  Parteilos: {
    pro: 0,
    cont: 1
  },
  PARTEI: {
    pro: 0,
    cont: 1
  },
  Piraten: {
    pro: 0,
    cont: 1
  },
  SPD: {
    pro: 16,
    cont: 7
  },
  DBP: {
    pro: 0,
    cont: 1
  }
};
