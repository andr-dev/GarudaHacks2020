[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<br />

<p align="center">
  <a href="https://github.com/andr-dev/Scribr/">
    <img src="https://github.com/andr-dev/Scribr/raw/master/public/logo512.png" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">Scribr</h1>
</p>

> A chrome extension that allows teachers to record lectures and save them as a text transcript

> Features a summary function which summarizes the lecture text into several key points!

> Submitted to [GarudaHacks2020][devpost-url]

## Table of Contents

- [Demo](#demo)
- [About the Project](#about-the-project)
- [How it works](#how-it-works)
- [Installation](#installation)
- [Contributing](#contributing)
- [Contact](#contact)
- [Credits](#credits)

## Demo

![Screenshot #1](https://github.com/andr-dev/Scribr/raw/master/demo/screenshot1.png)
![Screenshot #2](https://github.com/andr-dev/Scribr/raw/master/demo/screenshot2.png)
![Screenshot #3](https://github.com/andr-dev/Scribr/raw/master/demo/screenshot3.png)
![Screenshot #4](https://github.com/andr-dev/Scribr/raw/master/demo/screenshot4.png)

## About the Project

This project 🛠️ was made for GarudaHack2020. It is a chrome-extension with a react front-end and a background script which is injected into all teams.microsoft and hangouts.google domains. The code was written by Andre Benedito and Souradeep Saha. The logo was created by Samir Haque. The [website][website-url] was created by Souradeep Saha and Goziem Abuah.

The front-end was designed using the Semantic-UI framework and features a settings menu, which stores user data using the chrome.storage API, and a Notes page 📃, which dynamically renders saved notes. Each note also has its own view and edit button which allows you to see the full note and change its properties respectively.

## How it works

This is just a technical overview of how the chrome extension works. If you have any questions, take a look at the [contact section](#contact) to reach out!

Once the extension is installed and the user is on Microsoft Teams or Google Hangouts, they can 📞 call 📞someone and begin the recording using the Manual Record -> Start Recoding button. This sends a message to a background script, which is injected into the page 📃 on load, to create a Speech Recognition object from the Web Speech API and start recording through the microphone 🎤. This audio is automatically converted into text by the API.

When the user clicks the button again, which should now be labeled "Recording in progress ..." to stop 🛑 the recording, it sends another request to the background script to stop recording and send back the text 💬 created from the speech-to-text engine.

One issue with the Web Speech API speech-to-text is that it does not ❌ have any punctuation marks ❗ since it does not listen for intonation or pauses, only individual words. To solve this issue, the unpuncuated text is sent to the DeepAffects API which features a Smart Punctuation API which re-puncuates blobs of text using a machine learning algorithm. The resulting puncuated text is then sent to a PipeDream WebHook.

Once the data is processed and the user navigates back to the Notes page 📃 or clicks the refresh 🔃 button at the top of the Notes page 📃, a request to collect new data from the PipeDream WebHookAPI is created and if there is a new transcript available, it stores it to the chrome storage API. The text is then summarized using a open-source javascript NLP called [JS Summarize][js-summarize-url] 😃 and stored using the chrome.storage API. This is then dynamically rendered on the Notes page 📃.

## Installation

Since Chrome no longer allows packed extensions which are not on the Chrome Web Store, the extension must be added as a developer. I will look to upload this extension so this method will soon be deprecated.

1. Enable chrome developer mode
2. Download the latest .zip from the releases page found at https://github.com/andr-dev/Scribr/releases
3. Unzip the file and place the folder somewhere it won't be deleted
4. Go to chrome://extensions/ and enable the "Developer Mode" toggle in the top right corner
5. Click the "Load unpacked" button and select the folder where you unziped the files.
6. You should now see Scribr installed!

## Contributing

> If you would like to contribute to this project, follow these steps.

### Step 1

- **Option 1**

  - 🍴 Fork 🍴 this repo!

- **Option 2**
  - 👯 Clone 👯 this repo to your local machine using `https://github.com/andr-dev/Scribr`

### Step 2

- 🔨 **Hack Away At It!** 🔨

- Note: To build the project, use the provided [build.sh][buildfile-url] file. If you just run `yarn build`, it will cause errors because of the way I created the react project.

### Step 3

- Create a new pull request 🔁 using <a href="https://github.com/andr-dev/Scribr/compare/" target="_blank">`https://github.com/andr-dev/Scribr/compare/`</a>.

## Contact

If you have any questions or would like to contact me directly, reach out at [abene1asus@gmail.com](mailto:abene1asus@gmail.com).

## Credits

- Samir Haque for making the logo
- [@wkallhof][wkallhof-url] for creating [JS Summarize][js-summarize-url]

[contributors-shield]: https://img.shields.io/github/contributors/andr-dev/Scribr.svg?style=flat-square
[contributors-url]: https://github.com/andr-dev/Scribr/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/andr-dev/Scribr.svg?style=flat-square
[forks-url]: https://github.com/andr-dev/Scribr/network/members
[stars-shield]: https://img.shields.io/github/stars/andr-dev/Scribr.svg?style=flat-square
[stars-url]: https://github.com/andr-dev/Scribr/stargazers
[issues-shield]: https://img.shields.io/github/issues/andr-dev/Scribr.svg?style=flat-square
[issues-url]: https://github.com/andr-dev/Scribr/issues
[license-shield]: https://img.shields.io/github/license/andr-dev/Scribr.svg?style=flat-square
[license-url]: https://github.com/andr-dev/Scribr/blob/master/LICENSE.txt
[devpost-url]: https://devpost.com/software/scribr-7t9gpu/
[website-url]: https://souradeepsaha.github.io/scribr.github.io/
[js-summarize-url]: https://github.com/wkallhof/js-summarize
[wkallhof-url]: https://github.com/wkallhof/
[buildfile-url]: https://github.com/andr-dev/Scribr/blob/master/build.sh
