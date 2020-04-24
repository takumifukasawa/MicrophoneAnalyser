declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export type AnalyserOptions = {
  fftSize: number;
  minDecibels: number;
  maxDecibels: number;
  smoothTimeConstant: number;
};

export class MicrophoneAnalyser {
  public stream: MediaStream;
  public analyser: AnalyserNode;
  public bufferLength: number;
  public dataArray: Uint8Array;

  constructor() {
    this.stream = null;
  }

  public async getMedia() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async connectContext(
    context: AudioContext,
    analyserOptions: AnalyserOptions
  ) {
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = analyserOptions.fftSize;
    this.analyser.minDecibels = analyserOptions.minDecibels;
    this.analyser.maxDecibels = analyserOptions.maxDecibels;
    this.analyser.smoothingTimeConstant = analyserOptions.smoothTimeConstant;

    const source: MediaStreamAudioSourceNode = context.createMediaStreamSource(
      this.stream
    );
    source.connect(this.analyser);
    this.analyser.connect(context.destination);

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  update() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }
}
