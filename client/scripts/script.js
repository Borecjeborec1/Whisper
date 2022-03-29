const textarea = document.querySelector("#txt");
textarea.value = ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque tempora praesentium sint aspernatur,
repudiandae iste minima repellendus velit autem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
itaque repellendus quod architecto soluta vel exercitationem cumque? Quam tenetur quo ab autem ex eligendi odit,
magni qui ipsam. Fugiat, quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempore
quisquam nostrum accusantium officia. Odio libero numquam provident facilis esse voluptatum quidem cum voluptas
delectus. Tempore dolore molestias consectetur expedita.
Laborum quia repellendus nobis obcaecati dolores maiores,
dolorum voluptate. Beatae, velit.`


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
    speech.text = textarea.value;
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