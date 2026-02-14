// ============================================================
// Chapter 2: Subtraction Stories — Extra Visualizations
// Ages 7-12: Colorful, Interactive, Fun
// ============================================================

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch02'] = window.EXTRA_VIZ['ch02'] || {};

// ---------------------------------------------------------
// Section 1: "What Is Subtraction?" — Interactive Cookie Jar
// ---------------------------------------------------------
window.EXTRA_VIZ['ch02']['ch02-sec01'] = [
  {
    id: 'ch02-extra-viz-1',
    title: 'Cookie Jar: Eat the Cookies!',
    description: 'Start with some cookies and click them to eat! Watch the count go down.',
    setup: function(container, controls) {
      var viz = new VizEngine(container, { width: 560, height: 400, scale: 40 });
      var ctx = viz.ctx;

      // State
      var totalCookies = 10;
      var cookies = []; // array of {x, y, alive, fadeOut, fadeT}
      var eatenCount = 0;
      var crumbs = []; // particle effects {x, y, vx, vy, life, color}

      // Slider for total cookies
      var sliderLabel = document.createElement('span');
      sliderLabel.className = 'viz-slider-label';
      sliderLabel.textContent = 'Total Cookies: ' + totalCookies;
      sliderLabel.style.fontWeight = 'bold';
      sliderLabel.style.fontSize = '15px';
      controls.appendChild(sliderLabel);

      var slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'viz-slider';
      slider.min = 1; slider.max = 20; slider.value = totalCookies; slider.step = 1;
      slider.addEventListener('input', function() {
        totalCookies = parseInt(slider.value);
        sliderLabel.textContent = 'Total Cookies: ' + totalCookies;
        resetCookies();
      });
      controls.appendChild(slider);

      // Reset button
      var resetBtn = document.createElement('button');
      resetBtn.textContent = 'Reset Jar';
      resetBtn.style.cssText = 'padding:6px 16px;border:none;border-radius:8px;background:#3fb950;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;margin-left:10px;';
      resetBtn.addEventListener('click', function() { resetCookies(); });
      controls.appendChild(resetBtn);

      function resetCookies() {
        cookies = [];
        eatenCount = 0;
        crumbs = [];
        // Lay out cookies in a grid pattern inside the jar area
        var cols = Math.min(totalCookies, 5);
        var rows = Math.ceil(totalCookies / cols);
        var startX = 280 - (cols - 1) * 32;
        var startY = 150 - (rows - 1) * 28;
        for (var i = 0; i < totalCookies; i++) {
          var col = i % cols;
          var row = Math.floor(i / cols);
          cookies.push({
            x: startX + col * 64,
            y: startY + row * 56,
            alive: true,
            fadeOut: false,
            fadeT: 0,
            wobble: Math.random() * Math.PI * 2
          });
        }
      }

      function drawCookie(px, py, size, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        // Cookie body (golden circle)
        ctx.fillStyle = '#D2891B';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
        // Darker edge
        ctx.strokeStyle = '#A0600A';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Chocolate chips
        ctx.fillStyle = '#4A2800';
        var chipAngles = [0.5, 1.8, 3.2, 4.5, 5.8];
        for (var c = 0; c < chipAngles.length; c++) {
          var cr = size * 0.5;
          var cx = px + Math.cos(chipAngles[c]) * cr;
          var cy = py + Math.sin(chipAngles[c]) * cr;
          ctx.beginPath();
          ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      function drawJar() {
        // Jar body (rounded rectangle)
        ctx.save();
        ctx.strokeStyle = '#8bcaff';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgba(88, 166, 255, 0.08)';
        roundRect(ctx, 100, 60, 360, 280, 30);
        ctx.fill();
        ctx.stroke();
        // Jar lid
        ctx.fillStyle = '#bc8cff';
        ctx.strokeStyle = '#8a5ccf';
        ctx.lineWidth = 2;
        roundRect(ctx, 120, 30, 320, 40, 10);
        ctx.fill();
        ctx.stroke();
        // Jar label
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 16px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('COOKIE JAR', 280, 50);
        ctx.restore();
      }

      function roundRect(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r);
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h);
        c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
      }

      // Click handler
      viz.canvas.addEventListener('click', function(e) {
        var rect = viz.canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;
        for (var i = cookies.length - 1; i >= 0; i--) {
          var ck = cookies[i];
          if (!ck.alive || ck.fadeOut) continue;
          var dx = mx - ck.x, dy = my - ck.y;
          if (dx * dx + dy * dy < 24 * 24) {
            ck.fadeOut = true;
            ck.fadeT = 1.0;
            eatenCount++;
            // Spawn crumbs
            for (var p = 0; p < 8; p++) {
              var angle = Math.random() * Math.PI * 2;
              var speed = 1 + Math.random() * 3;
              crumbs.push({
                x: ck.x, y: ck.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1.0,
                color: Math.random() > 0.5 ? '#D2891B' : '#4A2800'
              });
            }
            break;
          }
        }
      });

      // Cursor style
      viz.canvas.addEventListener('mousemove', function(e) {
        var rect = viz.canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;
        var hovering = false;
        for (var i = 0; i < cookies.length; i++) {
          var ck = cookies[i];
          if (!ck.alive || ck.fadeOut) continue;
          var dx = mx - ck.x, dy = my - ck.y;
          if (dx * dx + dy * dy < 24 * 24) { hovering = true; break; }
        }
        viz.canvas.style.cursor = hovering ? 'pointer' : 'default';
      });

      resetCookies();

      viz.animate(function(t) {
        viz.clear();
        drawJar();

        // Update and draw crumbs
        for (var p = crumbs.length - 1; p >= 0; p--) {
          var cr = crumbs[p];
          cr.x += cr.vx;
          cr.y += cr.vy;
          cr.vy += 0.15;
          cr.life -= 0.02;
          if (cr.life <= 0) { crumbs.splice(p, 1); continue; }
          ctx.globalAlpha = cr.life;
          ctx.fillStyle = cr.color;
          ctx.beginPath();
          ctx.arc(cr.x, cr.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Draw cookies
        for (var i = 0; i < cookies.length; i++) {
          var ck = cookies[i];
          if (!ck.alive) continue;
          if (ck.fadeOut) {
            ck.fadeT -= 0.04;
            if (ck.fadeT <= 0) { ck.alive = false; continue; }
            var wobble = Math.sin(t * 0.01 + ck.wobble) * 3;
            drawCookie(ck.x + wobble, ck.y, 20 * ck.fadeT, ck.fadeT);
          } else {
            var bob = Math.sin(t * 0.003 + ck.wobble) * 2;
            drawCookie(ck.x, ck.y + bob, 20, 1.0);
          }
        }

        // Display counts at the bottom
        ctx.fillStyle = '#0c0c20';
        ctx.fillRect(0, 345, viz.width, 55);

        var remaining = totalCookies - eatenCount;
        ctx.font = 'bold 22px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#58a6ff';
        ctx.fillText('Started: ' + totalCookies, 140, 370);
        ctx.fillStyle = '#f85149';
        ctx.fillText('Eaten: ' + eatenCount, 280, 370);
        ctx.fillStyle = '#3fb950';
        ctx.fillText('Left: ' + remaining, 420, 370);

        // Equation
        if (eatenCount > 0) {
          ctx.font = 'bold 18px -apple-system, sans-serif';
          ctx.fillStyle = '#f0883e';
          ctx.fillText(totalCookies + ' - ' + eatenCount + ' = ' + remaining, 280, 395);
        }

        // Prompt text if no cookies eaten yet
        if (eatenCount === 0) {
          ctx.font = '14px -apple-system, sans-serif';
          ctx.fillStyle = '#d29922';
          ctx.fillText('Click a cookie to eat it!', 280, 395);
        }
      });

      return viz;
    }
  }
];


// ---------------------------------------------------------
// Section 2: "Number Line Subtraction" — Backward Jumps
// ---------------------------------------------------------
window.EXTRA_VIZ['ch02']['ch02-sec02'] = [
  {
    id: 'ch02-extra-viz-2',
    title: 'Number Line Hop Back!',
    description: 'Watch the bunny hop backward on the number line to subtract!',
    setup: function(container, controls) {
      var viz = new VizEngine(container, { width: 560, height: 400, scale: 25, originX: 20, originY: 250 });
      var ctx = viz.ctx;

      var startVal = 12;
      var subtractVal = 5;
      var animProgress = 0;      // 0 to subtractVal (how many hops completed)
      var animating = false;
      var hopPhase = 0;           // 0-1 for current hop animation

      // Start slider
      var startLabel = document.createElement('span');
      startLabel.className = 'viz-slider-label';
      startLabel.textContent = 'Start at: ' + startVal;
      startLabel.style.fontWeight = 'bold';
      startLabel.style.fontSize = '14px';
      controls.appendChild(startLabel);

      var startSlider = document.createElement('input');
      startSlider.type = 'range'; startSlider.className = 'viz-slider';
      startSlider.min = 0; startSlider.max = 20; startSlider.value = startVal; startSlider.step = 1;
      startSlider.addEventListener('input', function() {
        startVal = parseInt(startSlider.value);
        startLabel.textContent = 'Start at: ' + startVal;
        resetAnim();
      });
      controls.appendChild(startSlider);

      // Subtract slider
      var subLabel = document.createElement('span');
      subLabel.className = 'viz-slider-label';
      subLabel.textContent = 'Subtract: ' + subtractVal;
      subLabel.style.fontWeight = 'bold';
      subLabel.style.fontSize = '14px';
      subLabel.style.marginLeft = '12px';
      controls.appendChild(subLabel);

      var subSlider = document.createElement('input');
      subSlider.type = 'range'; subSlider.className = 'viz-slider';
      subSlider.min = 0; subSlider.max = 20; subSlider.value = subtractVal; subSlider.step = 1;
      subSlider.addEventListener('input', function() {
        subtractVal = parseInt(subSlider.value);
        subLabel.textContent = 'Subtract: ' + subtractVal;
        resetAnim();
      });
      controls.appendChild(subSlider);

      // Go button
      var goBtn = document.createElement('button');
      goBtn.textContent = 'Hop!';
      goBtn.style.cssText = 'padding:8px 20px;border:none;border-radius:8px;background:#f0883e;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;margin-left:12px;';
      goBtn.addEventListener('click', function() {
        resetAnim();
        if (subtractVal > 0 && subtractVal <= startVal) {
          animating = true;
        }
      });
      controls.appendChild(goBtn);

      function resetAnim() {
        animating = false;
        animProgress = 0;
        hopPhase = 0;
      }

      function drawBunny(px, py, size) {
        // Body
        ctx.fillStyle = '#f778ba';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
        // Ears
        ctx.fillStyle = '#f778ba';
        ctx.beginPath();
        ctx.ellipse(px - size * 0.4, py - size * 1.3, size * 0.25, size * 0.6, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(px + size * 0.4, py - size * 1.3, size * 0.25, size * 0.6, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Inner ears
        ctx.fillStyle = '#ffb3d9';
        ctx.beginPath();
        ctx.ellipse(px - size * 0.4, py - size * 1.3, size * 0.12, size * 0.4, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(px + size * 0.4, py - size * 1.3, size * 0.12, size * 0.4, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#222';
        ctx.beginPath(); ctx.arc(px - size * 0.3, py - size * 0.15, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(px + size * 0.3, py - size * 0.15, 2.5, 0, Math.PI * 2); ctx.fill();
        // Nose
        ctx.fillStyle = '#f85149';
        ctx.beginPath(); ctx.arc(px, py + size * 0.1, 2, 0, Math.PI * 2); ctx.fill();
      }

      viz.animate(function(t) {
        viz.clear();

        // Draw number line
        var lineY = 250;
        ctx.strokeStyle = '#4a4a7a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(10, lineY);
        ctx.lineTo(550, lineY);
        ctx.stroke();

        // Tick marks and numbers
        for (var n = 0; n <= 20; n++) {
          var tx = 20 + n * 25;
          ctx.strokeStyle = '#6a6a9a';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(tx, lineY - 8); ctx.lineTo(tx, lineY + 8); ctx.stroke();
          ctx.fillStyle = '#c9d1d9';
          ctx.font = 'bold 13px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.fillText(n, tx, lineY + 12);
        }

        // Highlight start point
        var startPx = 20 + startVal * 25;
        ctx.fillStyle = '#58a6ff';
        ctx.beginPath(); ctx.arc(startPx, lineY, 8, 0, Math.PI * 2); ctx.fill();

        // Animate hops
        if (animating) {
          hopPhase += 0.03;
          if (hopPhase >= 1) {
            hopPhase = 0;
            animProgress++;
            if (animProgress >= subtractVal) {
              animating = false;
              animProgress = subtractVal;
            }
          }
        }

        // Draw completed hop arcs
        var completedHops = Math.min(Math.floor(animProgress), subtractVal);
        for (var h = 0; h < completedHops; h++) {
          var hopStart = startVal - h;
          var hopEnd = startVal - h - 1;
          var hsx = 20 + hopStart * 25;
          var hex = 20 + hopEnd * 25;
          // Draw arc
          ctx.strokeStyle = '#f0883e';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          var midX = (hsx + hex) / 2;
          var arcH = 40 + h * 3;
          ctx.moveTo(hsx, lineY);
          ctx.quadraticCurveTo(midX, lineY - arcH, hex, lineY);
          ctx.stroke();
          // Arrow head
          ctx.fillStyle = '#f0883e';
          ctx.beginPath();
          ctx.moveTo(hex, lineY);
          ctx.lineTo(hex + 6, lineY - 8);
          ctx.lineTo(hex + 2, lineY);
          ctx.closePath();
          ctx.fill();
          // Hop number
          ctx.fillStyle = '#d29922';
          ctx.font = 'bold 11px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('-1', midX, lineY - arcH - 5);
        }

        // Draw current hop in progress
        if (animating && completedHops < subtractVal) {
          var curStart = startVal - completedHops;
          var curEnd = curStart - 1;
          var csx = 20 + curStart * 25;
          var cex = 20 + curEnd * 25;
          var prog = hopPhase;

          // Partial arc
          ctx.strokeStyle = '#f0883e';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          var arcMid = (csx + cex) / 2;
          var curArcH = 40 + completedHops * 3;
          // Draw the partial arc using small segments
          for (var s = 0; s <= prog * 20; s++) {
            var tt = s / 20;
            var ax = (1 - tt) * (1 - tt) * csx + 2 * (1 - tt) * tt * arcMid + tt * tt * cex;
            var ay = (1 - tt) * (1 - tt) * lineY + 2 * (1 - tt) * tt * (lineY - curArcH) + tt * tt * lineY;
            if (s === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
          }
          ctx.stroke();
        }

        // Bunny position
        var bunnyPos;
        if (animating && completedHops < subtractVal) {
          var bStart = startVal - completedHops;
          var bsx = 20 + bStart * 25;
          var bex = 20 + (bStart - 1) * 25;
          var bMid = (bsx + bex) / 2;
          var bArcH = 40 + completedHops * 3;
          var bprog = hopPhase;
          var bx = (1 - bprog) * (1 - bprog) * bsx + 2 * (1 - bprog) * bprog * bMid + bprog * bprog * bex;
          var by = (1 - bprog) * (1 - bprog) * lineY + 2 * (1 - bprog) * bprog * (lineY - bArcH) + bprog * bprog * lineY;
          bunnyPos = { x: bx, y: by };
        } else {
          var landed = startVal - completedHops;
          bunnyPos = { x: 20 + landed * 25, y: lineY };
        }

        drawBunny(bunnyPos.x, bunnyPos.y - 20, 12);

        // Highlight result point
        if (!animating && completedHops > 0) {
          var result = startVal - subtractVal;
          var resPx = 20 + result * 25;
          ctx.fillStyle = '#3fb950';
          ctx.beginPath(); ctx.arc(resPx, lineY, 8, 0, Math.PI * 2); ctx.fill();
        }

        // Title and equation at top
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 24px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('Number Line Hop Back!', 280, 15);

        var result = startVal - subtractVal;
        if (result < 0) {
          ctx.fillStyle = '#f85149';
          ctx.font = 'bold 20px -apple-system, sans-serif';
          ctx.fillText('Cannot subtract ' + subtractVal + ' from ' + startVal + '!', 280, 55);
        } else {
          ctx.fillStyle = '#58a6ff';
          ctx.font = 'bold 22px -apple-system, sans-serif';
          ctx.fillText(startVal + ' - ' + subtractVal + ' = ', 240, 55);
          if (!animating && completedHops === subtractVal) {
            ctx.fillStyle = '#3fb950';
            ctx.fillText(result, 340, 55);
          } else {
            ctx.fillStyle = '#d29922';
            ctx.fillText('?', 340, 55);
          }
        }

        // Hop counter
        if (subtractVal > 0 && result >= 0) {
          ctx.fillStyle = '#bc8cff';
          ctx.font = '14px -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Hops: ' + completedHops + ' / ' + subtractVal, 280, 90);
        }
      });

      return viz;
    }
  }
];


// ---------------------------------------------------------
// Section 3: "Strategies" — Think Addition Trainer
// ---------------------------------------------------------
window.EXTRA_VIZ['ch02']['ch02-sec03'] = [
  {
    id: 'ch02-extra-viz-3',
    title: 'Think Addition! Subtraction Trainer',
    description: 'Turn subtraction into addition — find the missing number!',
    setup: function(container, controls) {
      var viz = new VizEngine(container, { width: 560, height: 400, scale: 25, originX: 20, originY: 300 });
      var ctx = viz.ctx;

      var minuend = 15;
      var subtrahend = 8;
      var answer = minuend - subtrahend;
      var showAnswer = false;
      var revealProgress = 0;
      var sparkles = [];

      function generateProblem() {
        minuend = 5 + Math.floor(Math.random() * 16); // 5-20
        subtrahend = 1 + Math.floor(Math.random() * (minuend - 1)); // 1 to minuend-1
        answer = minuend - subtrahend;
        showAnswer = false;
        revealProgress = 0;
        sparkles = [];
      }

      // New Problem button
      var newBtn = document.createElement('button');
      newBtn.textContent = 'New Problem';
      newBtn.style.cssText = 'padding:8px 20px;border:none;border-radius:8px;background:#58a6ff;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;margin-right:12px;';
      newBtn.addEventListener('click', function() { generateProblem(); });
      controls.appendChild(newBtn);

      // Show Answer button
      var showBtn = document.createElement('button');
      showBtn.textContent = 'Show Answer';
      showBtn.style.cssText = 'padding:8px 20px;border:none;border-radius:8px;background:#3fb950;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;';
      showBtn.addEventListener('click', function() {
        showAnswer = true;
        revealProgress = 0;
        // Sparkles
        for (var s = 0; s < 20; s++) {
          sparkles.push({
            x: 280 + (Math.random() - 0.5) * 200,
            y: 100 + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * 3,
            vy: -1 - Math.random() * 2,
            life: 1,
            color: ['#f0883e', '#3fb950', '#58a6ff', '#f778ba', '#d29922'][Math.floor(Math.random() * 5)]
          });
        }
      });
      controls.appendChild(showBtn);

      viz.animate(function(t) {
        viz.clear();

        // Title
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 22px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('Think Addition!', 280, 12);

        // Subtraction problem display
        ctx.fillStyle = '#f85149';
        ctx.font = 'bold 32px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(minuend + ' - ' + subtrahend + ' = ?', 280, 50);

        // Reframed as addition
        ctx.fillStyle = '#d29922';
        ctx.font = 'bold 20px -apple-system, sans-serif';
        ctx.fillText('Think: ' + subtrahend + ' + ? = ' + minuend, 280, 95);

        // Number line
        var lineY = 280;
        var lineLeft = 30;
        var lineRight = 530;
        var maxNum = Math.max(minuend + 2, 21);
        var step = (lineRight - lineLeft) / maxNum;

        // Number line base
        ctx.strokeStyle = '#4a4a7a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lineLeft, lineY);
        ctx.lineTo(lineRight, lineY);
        ctx.stroke();

        // Tick marks
        for (var n = 0; n <= Math.min(maxNum, 22); n++) {
          var tx = lineLeft + n * step;
          if (tx > lineRight) break;
          ctx.strokeStyle = '#6a6a9a';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(tx, lineY - 6); ctx.lineTo(tx, lineY + 6); ctx.stroke();
          ctx.fillStyle = '#8b949e';
          ctx.font = '11px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.fillText(n, tx, lineY + 10);
        }

        // Known part: 0 to subtrahend (orange)
        var zeroX = lineLeft;
        var subX = lineLeft + subtrahend * step;
        var minX = lineLeft + minuend * step;

        // Colored bar for subtrahend (known part)
        ctx.fillStyle = 'rgba(240, 136, 62, 0.3)';
        ctx.fillRect(zeroX, lineY - 20, subX - zeroX, 15);
        ctx.strokeStyle = '#f0883e';
        ctx.lineWidth = 2;
        ctx.strokeRect(zeroX, lineY - 20, subX - zeroX, 15);
        ctx.fillStyle = '#f0883e';
        ctx.font = 'bold 13px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(subtrahend, (zeroX + subX) / 2, lineY - 22);

        // Gap: subtrahend to minuend (green — the missing part!)
        ctx.fillStyle = 'rgba(63, 185, 80, 0.3)';
        ctx.fillRect(subX, lineY - 20, minX - subX, 15);
        ctx.strokeStyle = '#3fb950';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(subX, lineY - 20, minX - subX, 15);
        ctx.setLineDash([]);

        // Question mark or answer in the gap
        if (showAnswer) {
          revealProgress = Math.min(revealProgress + 0.03, 1);
          ctx.globalAlpha = revealProgress;
          ctx.fillStyle = '#3fb950';
          ctx.font = 'bold 16px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          ctx.fillText(answer, (subX + minX) / 2, lineY - 22);
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = '#3fb950';
          ctx.font = 'bold 16px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          var pulse = 0.7 + 0.3 * Math.sin(t * 0.005);
          ctx.globalAlpha = pulse;
          ctx.fillText('?', (subX + minX) / 2, lineY - 22);
          ctx.globalAlpha = 1;
        }

        // Dots at key positions
        // Start (0)
        ctx.fillStyle = '#8b949e';
        ctx.beginPath(); ctx.arc(zeroX, lineY, 5, 0, Math.PI * 2); ctx.fill();
        // subtrahend
        ctx.fillStyle = '#f0883e';
        ctx.beginPath(); ctx.arc(subX, lineY, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f0883e';
        ctx.font = 'bold 14px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(subtrahend, subX, lineY - 30);
        // minuend
        ctx.fillStyle = '#58a6ff';
        ctx.beginPath(); ctx.arc(minX, lineY, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#58a6ff';
        ctx.fillText(minuend, minX, lineY - 30);

        // Legend at bottom
        ctx.font = '14px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        // Orange legend
        ctx.fillStyle = '#f0883e';
        ctx.fillRect(100, 340, 16, 16);
        ctx.fillStyle = '#f0883e';
        ctx.textBaseline = 'middle';
        ctx.fillText('Known part (' + subtrahend + ')', 122, 348);
        // Green legend
        ctx.fillStyle = '#3fb950';
        ctx.fillRect(300, 340, 16, 16);
        ctx.fillStyle = '#3fb950';
        ctx.fillText('Missing part (' + (showAnswer ? answer : '?') + ')', 322, 348);

        // Show answer equation
        if (showAnswer && revealProgress >= 1) {
          ctx.fillStyle = '#bc8cff';
          ctx.font = 'bold 18px -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(subtrahend + ' + ' + answer + ' = ' + minuend + '   so   ' + minuend + ' - ' + subtrahend + ' = ' + answer, 280, 380);
        }

        // Sparkles
        for (var sp = sparkles.length - 1; sp >= 0; sp--) {
          var sk = sparkles[sp];
          sk.x += sk.vx; sk.y += sk.vy;
          sk.vy += 0.05;
          sk.life -= 0.015;
          if (sk.life <= 0) { sparkles.splice(sp, 1); continue; }
          ctx.globalAlpha = sk.life;
          ctx.fillStyle = sk.color;
          var starSize = 4 * sk.life;
          ctx.beginPath();
          ctx.arc(sk.x, sk.y, starSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Instructional hints
        ctx.fillStyle = '#6a6a9a';
        ctx.font = '13px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('How many do you add to ' + subtrahend + ' to get ' + minuend + '?', 280, 140);

        // Draw a hopping arrow from subtrahend to minuend
        var arcCenterX = (subX + minX) / 2;
        var arcTop = lineY - 70;
        ctx.strokeStyle = '#3fb95088';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(subX, lineY - 25);
        ctx.quadraticCurveTo(arcCenterX, arcTop, minX, lineY - 25);
        ctx.stroke();
        ctx.setLineDash([]);
        // Arrowhead
        ctx.fillStyle = '#3fb95088';
        ctx.beginPath();
        ctx.moveTo(minX, lineY - 25);
        ctx.lineTo(minX - 8, lineY - 33);
        ctx.lineTo(minX - 3, lineY - 25);
        ctx.closePath();
        ctx.fill();
      });

      return viz;
    }
  }
];


// ---------------------------------------------------------
// Section 4: "Borrowing" — Animated Regrouping with Blocks
// ---------------------------------------------------------
window.EXTRA_VIZ['ch02']['ch02-sec04'] = [
  {
    id: 'ch02-extra-viz-4',
    title: 'Borrowing: Break a Ten!',
    description: 'Watch place value blocks show how borrowing works step by step.',
    setup: function(container, controls) {
      var viz = new VizEngine(container, { width: 560, height: 400, scale: 40 });
      var ctx = viz.ctx;

      // Problem state
      var topTens = 4, topOnes = 2;   // 42
      var botTens = 1, botOnes = 7;   // -17
      var step = 0;
      // Steps:
      // 0: Show the problem and blocks
      // 1: Highlight "can't subtract ones" (2 < 7)
      // 2: Animate borrowing — one tens rod breaks into 10 ones
      // 3: Now subtract ones: 12 - 7 = 5
      // 4: Subtract tens: 3 - 1 = 2
      // 5: Show final answer: 25
      var maxStep = 5;
      var borrowAnimT = 0;  // 0-1 for borrowing animation

      function generateProblem() {
        // Ensure borrowing is needed: top ones < bot ones
        topTens = 2 + Math.floor(Math.random() * 7); // 2-8
        topOnes = Math.floor(Math.random() * 5);       // 0-4
        botTens = Math.floor(Math.random() * topTens); // 0 to topTens-1
        botOnes = topOnes + 1 + Math.floor(Math.random() * (9 - topOnes)); // topOnes+1 to 9
        if (botOnes > 9) botOnes = 9;
        step = 0;
        borrowAnimT = 0;
      }

      // Next Step button
      var nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next Step';
      nextBtn.style.cssText = 'padding:8px 20px;border:none;border-radius:8px;background:#bc8cff;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;margin-right:10px;';
      nextBtn.addEventListener('click', function() {
        if (step < maxStep) {
          step++;
          if (step === 2) borrowAnimT = 0;
        }
      });
      controls.appendChild(nextBtn);

      // New Problem button
      var newProbBtn = document.createElement('button');
      newProbBtn.textContent = 'New Problem';
      newProbBtn.style.cssText = 'padding:8px 20px;border:none;border-radius:8px;background:#58a6ff;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;margin-right:10px;';
      newProbBtn.addEventListener('click', function() { generateProblem(); });
      controls.appendChild(newProbBtn);

      // Step label
      var stepLabel = document.createElement('span');
      stepLabel.className = 'viz-slider-label';
      stepLabel.style.fontWeight = 'bold';
      stepLabel.style.fontSize = '14px';
      stepLabel.style.marginLeft = '10px';
      controls.appendChild(stepLabel);

      function drawTensRod(px, py, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha !== undefined ? alpha : 1;
        ctx.fillStyle = color || '#58a6ff';
        ctx.strokeStyle = '#2a5a8f';
        ctx.lineWidth = 1.5;
        // Tall narrow rod
        roundRectPath(ctx, px, py, 16, 90, 4);
        ctx.fill(); ctx.stroke();
        // Segment lines
        ctx.strokeStyle = '#2a5a8f44';
        for (var s = 1; s < 10; s++) {
          ctx.beginPath();
          ctx.moveTo(px, py + s * 9);
          ctx.lineTo(px + 16, py + s * 9);
          ctx.stroke();
        }
        ctx.restore();
      }

      function drawOnesCube(px, py, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha !== undefined ? alpha : 1;
        ctx.fillStyle = color || '#3fb950';
        ctx.strokeStyle = '#1a7a30';
        ctx.lineWidth = 1.5;
        roundRectPath(ctx, px, py, 14, 14, 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();
      }

      function roundRectPath(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r);
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h);
        c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
      }

      var topNum = topTens * 10 + topOnes;
      var botNum = botTens * 10 + botOnes;

      viz.animate(function(t) {
        viz.clear();
        topNum = topTens * 10 + topOnes;
        botNum = botTens * 10 + botOnes;

        stepLabel.textContent = 'Step ' + step + ' / ' + maxStep;

        // Title
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 20px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('Borrowing (Regrouping)', 280, 8);

        // Written problem (vertical format) on left side
        var probX = 60, probY = 55;
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'right';

        // If borrowing happened (step >= 2), show crossed out and new numbers
        if (step >= 2) {
          // Cross out old tens digit, show new
          ctx.fillStyle = '#f8514966';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(topTens, probX - 15, probY);
          ctx.strokeStyle = '#f85149';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(probX - 32, probY + 12); ctx.lineTo(probX - 12, probY + 12); ctx.stroke();
          ctx.fillStyle = '#f85149';
          ctx.font = 'bold 18px monospace';
          ctx.fillText('' + (topTens - 1), probX - 6, probY - 10);
          // Cross out old ones digit, show new
          ctx.fillStyle = '#f8514966';
          ctx.font = 'bold 28px monospace';
          ctx.fillText(topOnes, probX + 15, probY);
          ctx.beginPath(); ctx.moveTo(probX + 0, probY + 12); ctx.lineTo(probX + 18, probY + 12); ctx.stroke();
          ctx.fillStyle = '#3fb950';
          ctx.font = 'bold 18px monospace';
          ctx.fillText('' + (topOnes + 10), probX + 28, probY - 10);
        } else {
          ctx.fillStyle = '#58a6ff';
          ctx.fillText('' + topNum, probX + 15, probY);
        }

        // Bottom number and minus sign
        ctx.fillStyle = '#f0883e';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('' + botNum, probX + 15, probY + 38);
        ctx.textAlign = 'left';
        ctx.fillText('-', probX - 40, probY + 38);

        // Line
        ctx.strokeStyle = '#c9d1d9';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(probX - 40, probY + 66); ctx.lineTo(probX + 25, probY + 66); ctx.stroke();

        // Answer
        if (step >= 5) {
          ctx.fillStyle = '#3fb950';
          ctx.font = 'bold 32px monospace';
          ctx.textAlign = 'right';
          ctx.fillText('' + (topNum - botNum), probX + 15, probY + 72);
        }

        // === BLOCKS AREA ===
        var blocksX = 140;
        var blocksY = 50;

        // Labels
        ctx.fillStyle = '#bc8cff';
        ctx.font = 'bold 14px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TENS', blocksX + 60, blocksY);
        ctx.fillText('ONES', blocksX + 250, blocksY);
        // Divider
        ctx.strokeStyle = '#4a4a7a';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(blocksX + 155, blocksY + 10); ctx.lineTo(blocksX + 155, blocksY + 210); ctx.stroke();
        ctx.setLineDash([]);

        // Draw top number blocks
        var dispTopTens = topTens;
        var dispTopOnes = topOnes;
        var borrowDone = step >= 3;

        if (step >= 2) {
          borrowAnimT = Math.min(borrowAnimT + 0.02, 1);
        }

        if (borrowDone) {
          dispTopTens = topTens - 1;
          dispTopOnes = topOnes + 10;
        }

        // Tens rods (top)
        for (var tr = 0; tr < topTens; tr++) {
          if (step >= 2 && tr === topTens - 1) {
            // This rod is being broken
            if (borrowAnimT < 1) {
              // Fading out rod
              drawTensRod(blocksX + tr * 22, blocksY + 15, '#58a6ff', 1 - borrowAnimT);
              // Appearing cubes
              for (var bc = 0; bc < 10; bc++) {
                var targetX = blocksX + 170 + (topOnes + bc) * 18;
                var targetY = blocksY + 25;
                var srcX = blocksX + tr * 22 + 1;
                var srcY = blocksY + 15 + bc * 9;
                var curX = srcX + (targetX - srcX) * borrowAnimT;
                var curY = srcY + (targetY - srcY) * borrowAnimT;
                drawOnesCube(curX, curY, '#d29922', borrowAnimT);
              }
            } else {
              // Don't draw this rod; cubes are in ones column
            }
          } else if (step >= 2 && tr >= topTens - 1) {
            // skip — already handled
          } else {
            drawTensRod(blocksX + tr * 22, blocksY + 15, '#58a6ff');
          }
        }

        // Original ones cubes (top)
        for (var oc = 0; oc < topOnes; oc++) {
          drawOnesCube(blocksX + 170 + oc * 18, blocksY + 25, '#3fb950');
        }

        // Borrowed ones cubes (after animation done)
        if (borrowDone) {
          for (var bc2 = 0; bc2 < 10; bc2++) {
            drawOnesCube(blocksX + 170 + (topOnes + bc2) * 18, blocksY + 25, '#d29922');
          }
        }

        // Bottom number blocks (what we subtract)
        var botBlockY = blocksY + 130;
        ctx.fillStyle = '#f0883e';
        ctx.font = 'bold 12px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Subtract:', blocksX, botBlockY - 5);

        // Bot tens rods
        for (var bt = 0; bt < botTens; bt++) {
          drawTensRod(blocksX + bt * 22, botBlockY + 5, '#f0883e88');
        }
        // Bot ones cubes
        for (var bo = 0; bo < botOnes; bo++) {
          drawOnesCube(blocksX + 170 + bo * 18, botBlockY + 10, '#f0883e88');
        }

        // Step-by-step highlights and crosses
        if (step >= 3) {
          // Cross out subtracted ones
          ctx.strokeStyle = '#f85149';
          ctx.lineWidth = 2;
          for (var co = 0; co < botOnes; co++) {
            var coX = blocksX + 170 + co * 18;
            ctx.beginPath(); ctx.moveTo(coX, blocksY + 25); ctx.lineTo(coX + 14, blocksY + 39); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(coX + 14, blocksY + 25); ctx.lineTo(coX, blocksY + 39); ctx.stroke();
          }
        }
        if (step >= 4) {
          // Cross out subtracted tens
          ctx.strokeStyle = '#f85149';
          ctx.lineWidth = 2;
          for (var ct = 0; ct < botTens; ct++) {
            var ctX = blocksX + ct * 22;
            ctx.beginPath(); ctx.moveTo(ctX, blocksY + 15); ctx.lineTo(ctX + 16, blocksY + 105); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(ctX + 16, blocksY + 15); ctx.lineTo(ctX, blocksY + 105); ctx.stroke();
          }
        }

        // Explanation text
        var msgY = 330;
        ctx.font = 'bold 15px -apple-system, sans-serif';
        ctx.textAlign = 'center';

        var msgs = [
          { text: 'Here is ' + topNum + ' shown with tens rods and ones cubes.', color: '#58a6ff' },
          { text: 'We need to subtract ' + botOnes + ' ones, but we only have ' + topOnes + '! Not enough!', color: '#f85149' },
          { text: 'Borrow! Break 1 tens rod into 10 ones cubes. Now we have ' + (topOnes + 10) + ' ones!', color: '#d29922' },
          { text: 'Subtract ones: ' + (topOnes + 10) + ' - ' + botOnes + ' = ' + (topOnes + 10 - botOnes) + ' ones left.', color: '#3fb950' },
          { text: 'Subtract tens: ' + (topTens - 1) + ' - ' + botTens + ' = ' + (topTens - 1 - botTens) + ' tens left.', color: '#3fb950' },
          { text: 'Answer: ' + topNum + ' - ' + botNum + ' = ' + (topNum - botNum) + '!', color: '#f0883e' }
        ];

        var msg = msgs[step];
        ctx.fillStyle = msg.color;
        ctx.fillText(msg.text, 280, msgY);

        // Result blocks (step 5)
        if (step >= 5) {
          var resTens = topTens - 1 - botTens;
          var resOnes = topOnes + 10 - botOnes;
          ctx.fillStyle = '#3fb950';
          ctx.font = 'bold 14px -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Result:', 280, 355);

          var resBlockX = 200;
          for (var rt = 0; rt < resTens; rt++) {
            drawTensRod(resBlockX + rt * 22, 365, '#3fb950');
          }
          for (var ro = 0; ro < resOnes; ro++) {
            drawOnesCube(resBlockX + resTens * 22 + 30 + ro * 18, 375, '#3fb950');
          }
        }

        // Step 1: flashing highlight on ones column
        if (step === 1) {
          var flash = 0.3 + 0.3 * Math.sin(t * 0.008);
          ctx.fillStyle = 'rgba(248, 81, 73, ' + flash + ')';
          ctx.fillRect(blocksX + 160, blocksY + 15, 200, 30);
        }
      });

      return viz;
    }
  }
];


// ---------------------------------------------------------
// Section 5: "Fact Families" — Interactive Fact Family House
// ---------------------------------------------------------
window.EXTRA_VIZ['ch02']['ch02-sec05'] = [
  {
    id: 'ch02-extra-viz-5',
    title: 'Fact Family House',
    description: 'Pick two numbers and see all four fact family equations in a colorful house!',
    setup: function(container, controls) {
      var viz = new VizEngine(container, { width: 560, height: 400, scale: 40 });
      var ctx = viz.ctx;

      var numA = 3;
      var numB = 5;
      var pulseT = 0;

      // Slider A
      var labelA = document.createElement('span');
      labelA.className = 'viz-slider-label';
      labelA.textContent = 'Number A: ' + numA;
      labelA.style.fontWeight = 'bold';
      labelA.style.fontSize = '14px';
      labelA.style.color = '#f0883e';
      controls.appendChild(labelA);

      var sliderA = document.createElement('input');
      sliderA.type = 'range'; sliderA.className = 'viz-slider';
      sliderA.min = 1; sliderA.max = 10; sliderA.value = numA; sliderA.step = 1;
      sliderA.addEventListener('input', function() {
        numA = parseInt(sliderA.value);
        labelA.textContent = 'Number A: ' + numA;
      });
      controls.appendChild(sliderA);

      // Slider B
      var labelB = document.createElement('span');
      labelB.className = 'viz-slider-label';
      labelB.textContent = 'Number B: ' + numB;
      labelB.style.fontWeight = 'bold';
      labelB.style.fontSize = '14px';
      labelB.style.color = '#58a6ff';
      labelB.style.marginLeft = '15px';
      controls.appendChild(labelB);

      var sliderB = document.createElement('input');
      sliderB.type = 'range'; sliderB.className = 'viz-slider';
      sliderB.min = 1; sliderB.max = 10; sliderB.value = numB; sliderB.step = 1;
      sliderB.addEventListener('input', function() {
        numB = parseInt(sliderB.value);
        labelB.textContent = 'Number B: ' + numB;
      });
      controls.appendChild(sliderB);

      function drawHouse(cx, cy, w, h, roofH) {
        // House body
        var bodyLeft = cx - w / 2;
        var bodyRight = cx + w / 2;
        var bodyTop = cy;
        var bodyBottom = cy + h;

        // Wall gradient
        var wallGrad = ctx.createLinearGradient(bodyLeft, bodyTop, bodyLeft, bodyBottom);
        wallGrad.addColorStop(0, '#2a2a5a');
        wallGrad.addColorStop(1, '#1a1a3a');
        ctx.fillStyle = wallGrad;
        ctx.fillRect(bodyLeft, bodyTop, w, h);
        ctx.strokeStyle = '#bc8cff';
        ctx.lineWidth = 3;
        ctx.strokeRect(bodyLeft, bodyTop, w, h);

        // Roof
        ctx.fillStyle = '#f85149';
        ctx.beginPath();
        ctx.moveTo(bodyLeft - 20, bodyTop);
        ctx.lineTo(cx, bodyTop - roofH);
        ctx.lineTo(bodyRight + 20, bodyTop);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#c93a33';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Chimney
        ctx.fillStyle = '#8a5ccf';
        ctx.fillRect(cx + w / 4, bodyTop - roofH + 20, 25, roofH - 25);
        ctx.strokeStyle = '#6a3caf';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx + w / 4, bodyTop - roofH + 20, 25, roofH - 25);

        // Door
        var doorW = 50, doorH = 70;
        ctx.fillStyle = '#8B4513';
        roundRectFill(ctx, cx - doorW / 2, bodyBottom - doorH, doorW, doorH, 5);
        ctx.strokeStyle = '#5c2d00';
        ctx.lineWidth = 2;
        roundRectStroke(ctx, cx - doorW / 2, bodyBottom - doorH, doorW, doorH, 5);
        // Doorknob
        ctx.fillStyle = '#d29922';
        ctx.beginPath(); ctx.arc(cx + 15, bodyBottom - doorH / 2, 4, 0, Math.PI * 2); ctx.fill();

        // Windows
        drawWindow(bodyLeft + 25, bodyTop + 25, 40, 35);
        drawWindow(bodyRight - 65, bodyTop + 25, 40, 35);
      }

      function drawWindow(x, y, w, h) {
        ctx.fillStyle = '#58a6ff33';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#d29922';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
        // Cross bar
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h);
        ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2);
        ctx.stroke();
      }

      function roundRectFill(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h);
        c.lineTo(x, y + h);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
        c.fill();
      }

      function roundRectStroke(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h);
        c.lineTo(x, y + h);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
        c.stroke();
      }

      function drawStar(cx, cy, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
          var angle = -Math.PI / 2 + i * Math.PI * 2 / 5;
          var outerX = cx + Math.cos(angle) * r;
          var outerY = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(outerX, outerY); else ctx.lineTo(outerX, outerY);
          var innerAngle = angle + Math.PI / 5;
          var innerX = cx + Math.cos(innerAngle) * r * 0.4;
          var innerY = cy + Math.sin(innerAngle) * r * 0.4;
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
      }

      viz.animate(function(t) {
        viz.clear();
        pulseT = t;
        var sum = numA + numB;

        // Starry sky background
        ctx.fillStyle = '#0c0c20';
        ctx.fillRect(0, 0, 560, 400);
        // A few twinkling stars
        var starPositions = [
          [40, 30], [120, 15], [200, 40], [350, 20], [450, 35], [520, 15],
          [80, 60], [300, 50], [490, 55]
        ];
        for (var si = 0; si < starPositions.length; si++) {
          var twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.003 + si * 1.3));
          ctx.globalAlpha = twinkle;
          drawStar(starPositions[si][0], starPositions[si][1], 3 + (si % 3), '#f0f6fc');
          ctx.globalAlpha = 1;
        }

        // Ground
        ctx.fillStyle = '#1a4a1a';
        ctx.fillRect(0, 350, 560, 50);
        // Grass tufts
        ctx.strokeStyle = '#2a7a2a';
        ctx.lineWidth = 1.5;
        for (var g = 0; g < 40; g++) {
          var gx = g * 14 + 5;
          var gh = 5 + Math.sin(g * 0.7) * 3;
          ctx.beginPath(); ctx.moveTo(gx, 350); ctx.lineTo(gx + 3, 350 - gh); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(gx + 7, 350); ctx.lineTo(gx + 4, 350 - gh - 2); ctx.stroke();
        }

        // Draw the house
        var houseCX = 280;
        var houseTop = 150;
        var houseW = 280;
        var houseH = 200;
        var roofH = 90;
        drawHouse(houseCX, houseTop, houseW, houseH, roofH);

        // Sum on the roof (inside a circle)
        var roofCY = houseTop - roofH / 2 - 5;
        var pulse = 1 + 0.08 * Math.sin(t * 0.005);
        ctx.fillStyle = '#d29922';
        ctx.beginPath(); ctx.arc(houseCX, roofCY, 28 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0c0c20';
        ctx.font = 'bold 28px -apple-system, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(sum, houseCX, roofCY);

        // The two "family members" on the roof eaves
        // Number A on left eave
        ctx.fillStyle = '#f0883e';
        ctx.beginPath(); ctx.arc(houseCX - 70, houseTop + 5, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px -apple-system, sans-serif';
        ctx.fillText(numA, houseCX - 70, houseTop + 7);

        // Number B on right eave
        ctx.fillStyle = '#58a6ff';
        ctx.beginPath(); ctx.arc(houseCX + 70, houseTop + 5, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(numB, houseCX + 70, houseTop + 7);

        // Four facts inside the house
        var factsX = houseCX;
        var factsStartY = houseTop + 55;
        var factSpacing = 35;

        var facts = [
          { text: numA + ' + ' + numB + ' = ' + sum, color: '#3fb950' },
          { text: numB + ' + ' + numA + ' = ' + sum, color: '#3fb9a0' },
          { text: sum + ' - ' + numA + ' = ' + numB, color: '#f778ba' },
          { text: sum + ' - ' + numB + ' = ' + numA, color: '#bc8cff' }
        ];

        for (var f = 0; f < 4; f++) {
          var fy = factsStartY + f * factSpacing;
          // Background pill
          var pillW = 180, pillH = 26;
          ctx.fillStyle = facts[f].color + '22';
          roundRectFill(ctx, factsX - pillW / 2, fy - pillH / 2, pillW, pillH, 13);
          ctx.strokeStyle = facts[f].color + '66';
          ctx.lineWidth = 1.5;
          roundRectStroke(ctx, factsX - pillW / 2, fy - pillH / 2, pillW, pillH, 13);

          // Fact text
          ctx.fillStyle = facts[f].color;
          ctx.font = 'bold 18px -apple-system, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(facts[f].text, factsX, fy);
        }

        // Label
        ctx.fillStyle = '#f0f6fc';
        ctx.font = 'bold 16px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FACT FAMILY HOUSE', houseCX, 378);

        // Decorative label below
        ctx.fillStyle = '#8b949e';
        ctx.font = '13px -apple-system, sans-serif';
        ctx.fillText('Every family has 2 addition facts and 2 subtraction facts!', houseCX, 396);

        // Colored number labels at bottom corners
        ctx.fillStyle = '#f0883e';
        ctx.font = 'bold 14px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('A = ' + numA, 15, 390);
        ctx.fillStyle = '#58a6ff';
        ctx.textAlign = 'right';
        ctx.fillText('B = ' + numB, 545, 390);
      });

      return viz;
    }
  }
];
