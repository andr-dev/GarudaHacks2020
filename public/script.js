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
  console.log("Scribr enabled!");
  setupDB();
  setup();
} else {
  console.log("Scribr disabled! Reason: Not on microsoft.teams domain.");
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
      } else if (req.get == "transcript") {
        sendResponse({ answer: currentTranscript });
      }
    } else if (req.hasOwnProperty("post")) {
      if (req.post == "startRecording") {
        startRecording();
      } else if (req.post == "stopRecording") {
        stopRecording();
      } else if (req.post == "startBackgroundWorker") {
        startBackgroundWorker();
        sendResponse({ answer: "success" });
      }
    }
  });
}

function startRecording() {
  console.log("Scribr: Starting recording . . .");

  currentTranscript = "";

  recognition.start();

  recognition.onresult = function (event) {
    currentTranscript += event.results[event.results.length - 1][0].transcript;
  }.bind(this);

  recording = true;

  console.log("Scribr: Recording started!");
}

function stopRecording() {
  console.log("Scribr: Stopping recording . . .");

  recognition.stop();
  recording = false;

  console.log("final transcript: ", currentTranscript);

  console.log("Scribr: Recording stopped!");
}

function setupDB() {
  console.log("Scribr: Setting up DB");
  chrome.storage.sync.get(["settings"], function (result) {
    if (result.hasOwnProperty("settings")) {
      console.log("Scribr: Found User Settings");
    } else {
      console.log("Scribr: No User Settings Found");
      initializeUserSettings();
    }
  });

  chrome.storage.sync.set(
    {
      transcripts: [
        {
          id: "id",
          loaded: true,
          title: "title",
          transcript: "transcript",
          summary: ["s1", "s2", "s3", "s4"],
        },
      ],
    },
    function () {
      console.log("Scribr: Initialized DB");
    }
  );
}

function initializeUserSettings() {
  console.log("Scribr: Initializing User Settings");
  chrome.storage.sync.set(
    {
      settings: {
        startRecordingAutomatically: true,
        generateSummaryAfterRecording: true,
        serviceMicrosoftTeams: true,
        serviceGoogleHangouts: false,
        inputVolume: 11,
        inputMic: true,
      },
    },
    function () {
      console.log("Scribr: Initialized User Settings");
    }
  );
}

function startBackgroundWorker() {
  console.log("Scribr: Starting Background Worker");
  setTimeout(checkWebHookAPI, 10000);
  console.log("Scribr: Background Worker Running");
}

function checkWebHookAPI() {
  // var xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState == XMLHttpRequest.DONE) {
  //     console.log("finished api request");
  //     console.log(xhr.responseText);
  //   }
  // };
  // xhr.open(
  //   "GET",
  //   "https://cors-anywhere.herokuapp.com/https://api.pipedream.com/v1/sources/dc_6RugBR/event_summaries?expand=event",
  //   true
  // );
  // // xhr.setRequestHeader("Origin", "https://localhost:3000");
  // xhr.setRequestHeader(
  //   "Authorization",
  //   "Bearer fbdc49f688b320e0e15fd7c5cc0c76ce"
  // );
  // // xhr.setRequestHeader("Content-Type", "text/plain");
  // xhr.send();
  // setTimeout(checkWebHookAPI, 10000);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", "Bearer fbdc49f688b320e0e15fd7c5cc0c76ce");
  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };
  // fetch(
  //   "https://cors-anywhere.herokuapp.com/https://api.pipedream.com/v1/sources/dc_6RugBR/event_summaries?expand=event",
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
}
