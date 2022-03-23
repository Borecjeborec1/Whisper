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

let id = setInterval(() => {
  if (voices.length) return clearInterval(id);
  voices = speechSynthesis.getVoices();
  for (let voice of voices) {
    let option = document.createElement("option");
    option.value = voice.name;
    option.innerText = voice.name;
    vSelect.appendChild(option);
  }
}, 500)