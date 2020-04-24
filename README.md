# MicrophoneAnalyser

Lightweight wrapper of audio visualizer with microphone by typescript.

I refer these for visualization.

- https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
- https://github.com/mdn/voice-change-o-matic

## Demo

https://takumifukasawa.github.io/MicrophoneAnalyser/

![sample](https://user-images.githubusercontent.com/947953/80232517-feb5e400-868f-11ea-8f5f-b8c219eaa09b.png)

## Usage

```
// install
$ npm i

// dev
$ npm run dev

// build
$ npm run build
```

## Example

```typescript

// import modules.
import { AnalyserOptions, MicrophoneAnalyser } from "./MicrophoneAnalyser";

...

// create instance.
const microphoneAnalyser: MicrophoneAnalyser = new MicrophoneAnalyser();

...

// setup contexts.
// We should create audio context when user action.
audioContext = new (window.AudioContext || window.webkitAudioContext)();
await microphoneAnalyser.getMedia(); // open media
const analyserOptions: AnalyserOptions = {
  fftSize: 256,
  minDecibels: -90,
  maxDecibels: -10,
  smoothTimeConstant: 0.85,
};
microphoneAnalyser.connectContext(audioContext, analyserOptions); // connect stream with context

...

const tick = () => {
  // update audio data
  microphoneAnalyser.update();

  ...

  // access bufferlength
  console.log(microphoneAnalyser.bufferLength);

  // access microphone data
  for(let i = 0; i < microphoneAnalyser.bufferLength; i++) {
    ...
    // access data element
    const data = microphoneAnalyser.dataArray[i];
    ...
  }

  ...

  requestAnimationFrame(tick);
}

```
