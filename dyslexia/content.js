
function ensureGoogleFonts() {
  if (!document.getElementById("gf-link")) {
    const link = document.createElement("link");
    link.id = "gf-link";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Coming+Soon&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap";
    document.head.appendChild(link);
  }
}

// Apply global style overrides
function injectGlobalFont(fontFamily, letterSpacing, lineHeight) {
  ensureGoogleFonts();
  const old = document.getElementById("readease-style");
  if (old) old.remove();

  const style = document.createElement("style");
  style.id = "readease-style";
  style.textContent = `
    html, body, body * {
      font-family: ${fontFamily} !important;
      letter-spacing: ${letterSpacing}em !important;
      line-height: ${lineHeight} !important;
    }
  `;
  document.head.appendChild(style);
}

let utter = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SET_STYLE") {
    injectGlobalFont(msg.font || "'Open Sans', sans-serif", msg.letterSpacing || 0, msg.lineSpacing || 1.4);
  }

  if (msg.type === "RESET_STYLE") {
    document.getElementById("readease-style")?.remove();
  }

  // Text-to-speech
  if (msg.type === "READ_ALOUD") {
    speechSynthesis.cancel();
    const text = window.getSelection().toString().trim() || document.body.innerText;
    utter = new SpeechSynthesisUtterance(text.slice(0, 5000));
    utter.rate = msg.rate || 1;

    const voices = speechSynthesis.getVoices();
    if (msg.voice) {
      const chosen = voices.find(v => v.name === msg.voice);
      if (chosen) utter.voice = chosen;
    }
    speechSynthesis.speak(utter);
  }

  if (msg.type === "PAUSE_TTS") speechSynthesis.pause();
  if (msg.type === "RESUME_TTS") speechSynthesis.resume();
  if (msg.type === "STOP_TTS") speechSynthesis.cancel();
});

let noiseAudio = null;

function playNoise(kind) {
  if (noiseAudio) {
    noiseAudio.pause();
    noiseAudio = null;
  }
  const src = chrome.runtime.getURL(`sounds/${kind}.mp3`);
  noiseAudio = new Audio(src);
  noiseAudio.loop = true;      
  noiseAudio.volume = 0.4;  
  noiseAudio.play();
}

function stopNoise() {
  if (noiseAudio) {
    noiseAudio.pause();
    noiseAudio = null;
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  
  if (msg.type === "PLAY_NOISE") playNoise(msg.noise);
  if (msg.type === "STOP_NOISE") stopNoise();

});
