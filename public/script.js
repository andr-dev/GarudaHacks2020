//////////////////////
// GLOBAL VARIABLES //
//////////////////////

var recording = false;
var recognition = null;
var currentTranscript = "";

////////////////
// MAIN LOGIC //
////////////////

if (location.hostname.match("teams.microsoft")) {
  console.log("GarudaHacks2020 enabled!");
  setup();
} else {
  console.log(
    "GarudaHacks2020 disabled! Reason: Not on microsoft.teams domain."
  );
}

function setup() {
  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.continuous = true;

  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.hasOwnProperty("get")) {
      if (req.get == "isRecording") {
        sendResponse({ answer: recording });
      }
    } else if (req.hasOwnProperty("post")) {
      if (req.post == "startRecording") {
        startRecording();
      } else if (req.post == "stopRecording") {
        stopRecording();
      }
    }
  });
}

function startRecording() {
  console.log("GarudaHacks2020: Starting recording . . .");

  recognition.start();

  recognition.onresult = function (event) {
    console.log(
      "transcript: ",
      event.results[event.results.length - 1][0].transcript
    );
    currentTranscript += event.results[event.results.length - 1][0].transcript;
  }.bind(this);

  recording = true;

  console.log("GarudaHacks2020: Recording started!");
}

function stopRecording() {
  console.log("GarudaHacks2020: Stopping recording . . .");

  recognition.stop();
  recording = false;

  console.log("final transcript: ", currentTranscript);

  console.log("GarudaHacks2020: Recording stopped!");
}
