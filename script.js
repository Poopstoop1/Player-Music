const capaMusica = document.getElementById("capa-musica");
const nomeMusica = document.getElementById("nome-musica");
const artistaMusica = document.getElementById("artista-musica");

const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const buttonPlay = document.querySelector("#play");
const buttonPause = document.querySelector("#pause");
const buttonNext = document.querySelector("#next");
const buttonPrevious = document.querySelector("#previous");

const musicas = [
  {
    nome: "Pra onde eu irei?",
    artista: "Morada",
    capaPath: "assets/fundo-musica.png",
    musicaPath: "assets/Pra-onde-eu-irei.mp3",
  },
  {
    nome: "Cheio de Sal",
    artista: "MC Gorila",
    capaPath: "assets/MC-gorila.jpg",
    musicaPath: "assets/Cheio-de-sal.mp3",
  },
  {
    nome: "Bodies",
    artista: "Drowning pool",
    capaPath: "assets/drowning-pool.jpg",
    musicaPath: "assets/Bodies.mp3",
  },
];

let music;
let indexMusicaAtual = 0;
setMusic(indexMusicaAtual);
let interval;

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, "0")}:${seg
    .toString()
    .padStart(2, "0")}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

music.addEventListener("loadedmetadata", function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});

function play() {
  buttonPlay.classList.toggle("hide");
  buttonPause.classList.toggle("hide");
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.toggle("hide");
  buttonPause.classList.toggle("hide");
  music.pause();
}

function setMusic(index) {
  if (index < 0) {
    indexMusicaAtualaAtual = --musicas.length;
  }
  if (index >= musicas.length) {
    indexMusicaAtual = 0;
  }

  artistaMusica.innerHTML = musicas[indexMusicaAtual].artista;
  nomeMusica.innerHTML = musicas[indexMusicaAtual].nome;
  capaMusica.setAttribute("src", musicas[indexMusicaAtual].capaPath);

  music = new Audio(musicas[indexMusicaAtual].musicaPath);
}

buttonPlay.addEventListener("click", play);
buttonPause.addEventListener("click", pause);

buttonNext.addEventListener("click", () => {
  pause();
  setMusic(++indexMusicaAtual);
  play();
});
buttonPrevious.addEventListener("click", () => {
  pause();
  setMusic(--indexMusicaAtual);
  play();
});
