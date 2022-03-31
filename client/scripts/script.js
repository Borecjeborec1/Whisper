const textarea = document.querySelector("#txt");


const vSelect = document.querySelector("#voicesSelect");

let voices = []
let speech = new SpeechSynthesisUtterance();

let id = setInterval(() => {
  if (voices.length) return clearInterval(id);
  voices = window.speechSynthesis.getVoices();
  for (let voice of voices) {
    let option = document.createElement("option");
    option.value = voice.name;
    option.innerText = voice.name;
    vSelect.appendChild(option);
  }
}, 500)

const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("fa-play")) {
    playBtn.className = playBtn.className.replace("fa-play", "fa-pause");
    if (playBtn.className.includes("start"))
      return window.speechSynthesis.resume();
    let words = textarea.innerText.split(" ");
    speech.text = textarea.innerText;
    textarea.innerText = ""
    for (let i = 0; i < words.length; i++) {
      if (words[i])
        textarea.innerHTML += (` <span data-id=${i}> ${words[i]} </span> `)
    }
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = voices.find(voice => voice.name === vSelect.value);
    window.speechSynthesis.speak(speech);
  } else {
    window.speechSynthesis.pause();
    playBtn.className = playBtn.className.replace("fa-pause", "fa-play start");
  }

})

const stopBtn = document.querySelector(".fa-stop");
stopBtn.addEventListener("click", () => {
  wordIndex = 0
  window.speechSynthesis.cancel();
  playBtn.className = playBtn.className.replace("fa-pause", "fa-play").replace("start", "");
})


const downloadBtn = document.querySelector(".fa-download");
downloadBtn.addEventListener("click", () => {
  let text = textarea.value;
  let filename = prompt("Enter file name", "my-file");
  let link = document.createElement("a");
  link.href = `data:audio/mp3,${encodeURIComponent(text)}`;
  link.download = `${filename}.mp3`;
  link.click();
})

let wordIndex = 0

speech.onboundary = function (event) {
  if (event.name !== "word") return
  let spanLast = document.querySelector(`[data-id="${wordIndex - 1}"]`)
  if (spanLast)
    spanLast.classList.remove("highlight")

  let span = document.querySelector(`[data-id="${wordIndex}"]`)
  if (span)
    span.classList.add("highlight")
  wordIndex++
};