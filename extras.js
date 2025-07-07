(function(){
  try {
    var sequence = [38,38,40,40,37,39,37,39,66,65];
    var input = [];

    function initMatrix() {
      var canvas = document.createElement('canvas');
      canvas.id = 'matrix-overlay';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '9999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);
      var ctx = canvas.getContext('2d');
      var width = canvas.width = window.innerWidth;
      var height = canvas.height = window.innerHeight;
      var columns = Math.floor(width / 20) + 1;
      var drops = Array(columns).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        drops.forEach(function(y, x) {
          var text = String.fromCharCode(0x30A0 + Math.random() * 96);
          ctx.fillText(text, x * 20, y * 20);
          if (y * 20 > height && Math.random() > 0.975) {
            drops[x] = 0;
          }
          drops[x]++;
        });
        requestAnimationFrame(draw);
      }
      draw();
    }

    window.addEventListener('keydown', function(e) {
      input.push(e.keyCode);
      if (input.toString().indexOf(sequence.toString()) >= 0) {
        input = [];
        initMatrix();
      }
      if (input.length > sequence.length) {
        input.shift();
      }
    });
  } catch (err) {
    // fail silently
  }
})();
