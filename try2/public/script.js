window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("recieved add listenere command");
  var recognition = new SpeechRecognition();
  recognition.start();
  recognition.continuous = false;
  recognition.onresult = function (event) {
    console.log(event.results[0][0].transcript);
    if (event.results[0].isFinal) {
      console.log("here is the final guy");
      console.log(event.results[0][0].transcript);
    }
  };
});
