function sendToContent(msg) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

// Style buttons
document.getElementById("applyStyle").addEventListener("click", () => {
  sendToContent({
    type: "SET_STYLE",
    font: document.getElementById("fontSelect").value,
    letterSpacing: parseFloat(document.getElementById("letterSpacing").value),
    lineSpacing: parseFloat(document.getElementById("lineHeight").value)
  });
});

document.getElementById("resetStyle").addEventListener("click", () => {
  sendToContent({ type: "RESET_STYLE" });
});

// Voice list
const voiceSelect = document.getElementById("voiceSelect");
function populateVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = voices
    .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
    .join("");
}
speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

// TTS Controls
document.getElementById("speak").addEventListener("click", () => {
  sendToContent({
    type: "READ_ALOUD",
    rate: parseFloat(document.getElementById("rate").value),
    voice: voiceSelect.value
  });
});
document.getElementById("pause").addEventListener("click", () => sendToContent({ type: "PAUSE_TTS" }));
document.getElementById("resume").addEventListener("click", () => sendToContent({ type: "RESUME_TTS" }));
document.getElementById("stop").addEventListener("click", () => sendToContent({ type: "STOP_TTS" }));

document.getElementById("brownNoise").addEventListener("click", () => {
  sendToContent({ type: "PLAY_NOISE", noise: "brown" });
});
document.getElementById("whiteNoise").addEventListener("click", () => {
  sendToContent({ type: "PLAY_NOISE", noise: "white" });
});
document.getElementById("rainNoise").addEventListener("click", () => {
  sendToContent({ type: "PLAY_NOISE", noise: "rain" });
});
document.getElementById("stopNoise").addEventListener("click", () => {
  sendToContent({ type: "STOP_NOISE" });
});
