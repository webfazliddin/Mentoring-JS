const speechSynthesis = window.speechSynthesis;

// Check for browser support
if (speechSynthesis) {
  console.log("Speech Synthesis Supported");

  micBtn.addEventListener("click", speak);

  function speak(e) {
    e.preventDefault();
    const inputValue = input.value;
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = inputValue;
    speech.volume = "1";
    speech.rate = "1";
    speech.pitch = "1";
    speech.voice = speechSynthesis.speak(speech);
  }
} else {
  console.log("Speech Synthesis Not Supported");
  speechBtnDiv.style.visibility = "hidden";
}
