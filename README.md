# Dyslexia Helper – Browser Extension

### Built for CodeRush 2025

A lightweight, privacy-friendly browser extension that makes reading the web easier for people with dyslexia (and anyone who loves cleaner pages).  
It lets you adjust text spacing, switch to dyslexia-friendly fonts, play calming focus sounds, and convert any selected text to natural-sounding speech.


## 📸 Screenshot

<img width="2097" height="1163" alt="Screenshot 2025-09-06 223747" src="https://github.com/user-attachments/assets/01933657-5206-41ec-be46-0ad87d14369a" />


---

## 🏗️ How It Works

1. **Content Script + CSS:** injects custom styles (spacing, fonts) into every page.
2. **Web Audio API:** plays locally stored or generated **brown / white / rain** noise.
3. **Web Speech API:** powers **text-to-speech** with adjustable voices & speed.
4. **Manifest v3:** keeps the extension lightweight, secure, and Chrome/Edge-compatible.

---

## 🚀 Installation (Developer Mode)

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/dyslexia-helper.git
   cd dyslexia-helper
Open your browser’s Extensions page

Chrome/Edge: chrome://extensions

Enable Developer Mode → click Load unpacked

Select the project folder. The extension will appear in your toolbar.
