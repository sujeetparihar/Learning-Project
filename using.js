
      let audioContext;
      let oscillator;
      let gainNode;
      let sirenInterval;
      let isSirenOn = false;

      function startSiren() {
        if (isSirenOn) return;
        isSirenOn = true;

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();

        let frequency = 600;
        let direction = 1;

        sirenInterval = setInterval(() => {
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          frequency += direction * 50;
          if (frequency > 1200 || frequency < 600) direction *= -1;
        }, 100);
      }

      function stopSiren() {
        if (!isSirenOn) return;
        isSirenOn = false;

        clearInterval(sirenInterval);
        oscillator.stop();
        audioContext.close();
      }
    </script>
  </body>
</html>
