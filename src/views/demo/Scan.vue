<template>
  <div>
    <div>二维码扫描例子</div>
    <div class="btn-scan" @click="startScan">扫描1</div>
    <canvas ref="canvas" class="canvas"></canvas>
    <video ref="video" class="video"></video>
    <div>{{ loadingMessage }}</div>
    <div>{{ outputData }}</div>
  </div>
</template>

<script>
import jsQR from 'jsqr';

/**
 * 问题1:Android Chrome 游览器: "TypeError: Cannot read property 'getUserMedia' of undefined"
 * 原因: https 问题，网页地址需要使用 https (钉钉内部游览器可以绕过这个)
 * 问题2: 钉钉游览器后置模式打不开
 */

export default {
  data() {
    return {
      loadingMessage: '',
      outputData: 'out:',
      scan: true,
    };
  },
  mounted() {},
  methods: {
    startScan() {
      console.log('startScan');

      // 后置: environment， 前置: user
      let option = { audio: false, video: { facingMode: 'user' } };
      option = {
        audio: false,
        video: { facingMode: { exact: 'environment' } },
      };
      navigator.mediaDevices
        .getUserMedia(option)
        .then(stream => {
          //将视频流实时播放在video
          this.$refs.video.srcObject = stream;
          this.$refs.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
          this.$refs.video.play();
          setTimeout(() => {
            this.tick();
          }, 300);
        })
        .catch(err => {
          alert(err);
          console.log(err.name + ': ' + err.message);
        });
    },
    tick() {
      console.log('tick');
      this.loadingMessage = '⌛ Loading video...';
      const video = this.$refs.video;
      const canvasElement = this.$refs.canvas;
      const canvas = canvasElement.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA && this.scan) {
        this.loadingMessage = '';
        canvasElement.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        var imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code) {
          console.log(code);
          // 获取到二维码数据
          this.drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            '#FF3B58'
          );
          this.drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            '#FF3B58'
          );
          this.drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            '#FF3B58'
          );
          this.drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            '#FF3B58'
          );
          // 获取到的数据
          this.outputData = code.data;
        } else {
          // 没有获取到二维码数据
          setTimeout(() => {
            this.tick();
          }, 300);
        }
      }
    },
    drawLine(begin, end, color) {
      const canvasElement = this.$refs.canvas;
      const canvas = canvasElement.getContext('2d');
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    },
  },
};
</script>

<style lang="less" scoped>
.canvas {
  width: 100px;
  height: 100px;
  background-color: #cccccc;
}
.video {
  width: 400px;
  height: 400px;
  background-color: green;
}
.btn-scan {
  width: 100px;
  background-color: #cccccc;
}
</style>