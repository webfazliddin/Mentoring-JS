const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Check for browser support
if (speechRecognition) {
  console.log("Speech Recognition Supported");

  const recognition = new speechRecognition();

  micBtn.addEventListener("click", micBtnClicked);
  function micBtnClicked(e) {
    e.preventDefault();
    if (micBtn.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  //   Start Speech Recognition
  recognition.addEventListener("start", () => {
    micBtn.classList.remove("fa-microphone");
    micBtn.classList.add("fa-microphone-slash");
    instruction.textContent = "Recording... Press Ctrl + m to stop.";
    searchInput.focus();
    console.log("Speech Recognition Enabled");
  });

  //   Stop Speech Recognition
  recognition.addEventListener("end", () => {
    micBtn.classList.remove("fa-microphone-slash");
    micBtn.classList.add("fa-microphone");
    instruction.textContent = "Press Ctrl + x or Click the Mic icon to start";
    searchInput.focus();
    console.log("Speech Recognition Disabled");
  });

  //   Get Result of speech Recognition
  recognition.continuous = true;
  // let content = "";
  recognition.addEventListener("result", (e) => {
    console.log(e);
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === "stop recording") {
      recognition.stop();
    } else if (!searchInput.value) {
      searchInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() === "search") {
        searchForm.submit();
      } else if (transcript.toLowerCase().trim() === "reset form") {
        searchInput.value = "";
      } else {
        searchInput.value = transcript;
      }
    }
  });

  // Add keyboard Event Listener
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "x") {
      // e.shiftKey
      recognition.start();
    }
    if (e.ctrlKey && e.key === "m") {
      // e.shiftKey
      recognition.stop();
    }
  });
} else {
  console.log("Speech Recognition Not Supported");
  speechBtnDiv.style.visibility = "hidden";
}
