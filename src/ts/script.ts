// declare global {
//   interface Window {
//     webkitAudioContext: typeof AudioContext;
//   }
// }

import { AnalyserOptions, MicrophoneAnalyser } from "./MicrophoneAnalyser";

const audioElem: HTMLMediaElement = document.querySelector(".js-audio");
const startButton: HTMLElement = document.querySelector(".js-start-button");

const microphoneAnalyser: MicrophoneAnalyser = new MicrophoneAnalyser();

let audioContext: AudioContext;

const canvas: HTMLCanvasElement = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

const tick = () => {
  microphoneAnalyser.update();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // visualize ref:
  // https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
  // https://github.com/mdn/voice-change-o-matic

  let x = 0;

  const barWidth = (canvasWidth / microphoneAnalyser.bufferLength) * 2.5;
  let barHeight;

  for (let i = 0; i < microphoneAnalyser.bufferLength; i++) {
    barHeight = microphoneAnalyser.dataArray[i];
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
    x += barWidth + 1;
  }

  requestAnimationFrame(tick);
};

startButton.addEventListener("click", async () => {
  console.log("clicked");
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  await microphoneAnalyser.getMedia();
  const analyserOptions: AnalyserOptions = {
    fftSize: 256,
    minDecibels: -90,
    maxDecibels: -10,
    smoothTimeConstant: 0.85,
  };
  console.log(audioContext);
  microphoneAnalyser.connectContext(audioContext, analyserOptions);
  requestAnimationFrame(tick);
  console.log("begin loop");
});
