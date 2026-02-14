window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Division Discovery',
    subtitle: 'Learn to share fairly, split into groups, and conquer remainders!',
    sections: [
        // ============================================================
        // SECTION 1: What Is Division?
        // ============================================================
        {
            id: 'ch04-sec01',
            title: 'What Is Division?',
            content: `
                <h2>What Is Division?</h2>

                <p>Imagine you have <strong>12 cookies</strong> and you want to share them equally among <strong>3 friends</strong>. How many cookies does each friend get? That is exactly what <strong>division</strong> is all about!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Division answers two different questions:</p>
                        <ul>
                            <li><strong>Sharing equally:</strong> "I have 12 cookies for 3 friends. How many does each friend get?" &rarr; <em>4 each!</em></li>
                            <li><strong>Grouping:</strong> "I have 12 cookies. I put 3 in each bag. How many bags do I fill?" &rarr; <em>4 bags!</em></li>
                        </ul>
                        <p>Both questions give the same answer: \\(12 \\div 3 = 4\\). That is the magic of division!</p>
                    </div>
                </div>

                <p>We write division using the <strong>\\(\\div\\)</strong> symbol. When we write \\(12 \\div 3 = 4\\), we are saying:</p>
                <ul>
                    <li>\\(12\\) is the <strong>dividend</strong> &mdash; the total amount we start with.</li>
                    <li>\\(3\\) is the <strong>divisor</strong> &mdash; the number of groups (or the size of each group).</li>
                    <li>\\(4\\) is the <strong>quotient</strong> &mdash; the answer!</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Sharing:</strong> You have 15 stickers and 5 friends. Each friend gets \\(15 \\div 5 = 3\\) stickers.</p>
                        <p><strong>Grouping:</strong> You have 20 marbles and want groups of 4. You make \\(20 \\div 4 = 5\\) groups.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-sharing"></div>

                <h3>Two Ways to Think About Division</h3>

                <p>Let's look at \\(12 \\div 3 = 4\\) both ways:</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p><strong>Way 1 &mdash; Fair Sharing:</strong> Deal 12 objects one-by-one into 3 groups. Each group ends up with 4. Think of dealing cards!</p>
                        <p><strong>Way 2 &mdash; Repeated Grouping:</strong> Start with 12 objects. Take away groups of 3. How many times can you do it? Four times! So there are 4 groups.</p>
                        <p>Either way, the answer is \\(12 \\div 3 = 4\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-grouping"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Division is like the opposite of multiplication. If you know that \\(3 \\times 4 = 12\\), then you also know that \\(12 \\div 3 = 4\\). We will explore this big idea more in Section 3!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>You can <strong>never divide by zero</strong>! Think about it: if you have 12 cookies and 0 friends to share with... there is nobody to give them to. The question does not make sense. So \\(12 \\div 0\\) is <em>undefined</em> &mdash; it has no answer.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch04-viz-sharing',
                    title: 'Fair Sharing: Dealing Objects Into Groups',
                    description: 'Watch 12 objects get dealt fairly into 3 groups. Each group gets 4!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 360, scale: 40});
                        viz.originX = 280;
                        viz.originY = 180;

                        let dividend = 12;
                        let divisor = 3;
                        let animStep = 0;
                        let isAnimating = false;

                        const dividendSlider = VizEngine.createSlider(controls, 'Total:', 4, 24, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            animStep = 0;
                            draw();
                        });
                        dividendSlider.step = 1;

                        const divisorSlider = VizEngine.createSlider(controls, 'Groups:', 2, 6, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            animStep = 0;
                            draw();
                        });
                        divisorSlider.step = 1;

                        const animBtn = VizEngine.createButton(controls, 'Deal!', () => {
                            if (isAnimating) return;
                            animStep = 0;
                            isAnimating = true;
                            animateDealing();
                        });

                        function animateDealing() {
                            if (animStep >= dividend) {
                                isAnimating = false;
                                draw();
                                return;
                            }
                            animStep++;
                            draw();
                            setTimeout(animateDealing, 250);
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const quotient = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + quotient + (remainder > 0 ? ' R' + remainder : ''), viz.width / 2, 12);

                            // Draw group containers
                            const groupColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink];
                            const groupWidth = Math.min(100, (viz.width - 40) / divisor);
                            const startX = (viz.width - divisor * groupWidth) / 2;

                            for (let g = 0; g < divisor; g++) {
                                const gx = startX + g * groupWidth + groupWidth / 2;
                                const color = groupColors[g % groupColors.length];

                                // Group label
                                ctx.fillStyle = color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Group ' + (g + 1), gx, 42);

                                // Draw container box
                                ctx.strokeStyle = color + '88';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                const boxW = groupWidth - 16;
                                const boxH = 220;
                                ctx.strokeRect(gx - boxW / 2, 58, boxW, boxH);
                                ctx.setLineDash([]);

                                // Draw objects inside this group
                                let count = 0;
                                for (let i = 0; i < animStep; i++) {
                                    if (i % divisor === g) {
                                        count++;
                                        const row = Math.floor((count - 1) / 3);
                                        const col = (count - 1) % 3;
                                        const ox = gx - 18 + col * 18;
                                        const oy = 75 + row * 22;

                                        ctx.fillStyle = color;
                                        ctx.beginPath();
                                        ctx.arc(ox, oy, 7, 0, Math.PI * 2);
                                        ctx.fill();

                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = '8px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(i + 1, ox, oy);
                                    }
                                }

                                // Count label at bottom
                                ctx.fillStyle = color;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(count + ' objects', gx, 286);
                            }

                            // Undistributed objects
                            if (animStep < dividend) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Waiting: ' + (dividend - animStep) + ' left', viz.width / 2, 320);
                            }

                            // Show remainder objects if any (after animation done)
                            if (animStep >= dividend && remainder > 0) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Remainder: ' + remainder + ' left over!', viz.width / 2, 320);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-grouping',
                    title: 'Grouping: How Many Equal Groups?',
                    description: 'See how objects are split into equal-sized groups. Drag the slider to change group size!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 320, scale: 40});
                        let total = 12;
                        let groupSize = 3;

                        VizEngine.createSlider(controls, 'Total:', 6, 24, total, 1, (v) => {
                            total = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Group size:', 2, 6, groupSize, 1, (v) => {
                            groupSize = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const numGroups = Math.floor(total / groupSize);
                            const leftover = total % groupSize;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(total + ' \u00F7 ' + groupSize + ' = ' + numGroups + (leftover > 0 ? ' R' + leftover : ''), viz.width / 2, 10);

                            const groupColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink, viz.colors.yellow, viz.colors.red];

                            // Draw grouped objects in rows
                            const objRadius = 10;
                            const objSpacing = 26;
                            const groupGap = 16;
                            const totalGroupWidth = numGroups * (groupSize * objSpacing + groupGap);
                            let drawX = Math.max(20, (viz.width - totalGroupWidth) / 2);
                            const drawY = 80;

                            for (let g = 0; g < numGroups; g++) {
                                const color = groupColors[g % groupColors.length];

                                // Draw bracket / ring around group
                                const bracketX = drawX - 4;
                                const bracketW = groupSize * objSpacing + 4;
                                ctx.strokeStyle = color + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(bracketX, drawY - 16, bracketW, 36, 8);
                                ctx.stroke();

                                // Draw objects
                                for (let i = 0; i < groupSize; i++) {
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(drawX + i * objSpacing + objRadius, drawY, objRadius, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Number inside
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(g * groupSize + i + 1, drawX + i * objSpacing + objRadius, drawY);
                                }

                                // Group label
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Group ' + (g + 1), bracketX + bracketW / 2, drawY + 24);

                                drawX += groupSize * objSpacing + groupGap;
                            }

                            // Draw leftover objects
                            if (leftover > 0) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Leftover', drawX + (leftover * objSpacing) / 2, drawY + 24);

                                for (let i = 0; i < leftover; i++) {
                                    ctx.fillStyle = viz.colors.yellow + '88';
                                    ctx.beginPath();
                                    ctx.arc(drawX + i * objSpacing + objRadius, drawY, objRadius, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([3, 3]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);

                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(numGroups * groupSize + i + 1, drawX + i * objSpacing + objRadius, drawY);
                                }
                            }

                            // Summary at bottom
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(numGroups + ' groups of ' + groupSize + (leftover > 0 ? ' with ' + leftover + ' left over' : ' \u2014 perfect!'), viz.width / 2, viz.height - 40);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You have 18 apples and want to share them equally among 6 baskets. How many apples go in each basket? Write the division sentence.',
                    hint: 'Think: 18 shared among 6 groups. How many in each group? What times 6 equals 18?',
                    solution: '\\(18 \\div 6 = 3\\). Each basket gets <strong>3 apples</strong>. You can check: \\(6 \\times 3 = 18\\). Correct!'
                },
                {
                    question: 'You have 20 stickers and put them in piles of 5. How many piles do you make? Is this sharing or grouping?',
                    hint: 'The pile size is given (5). You are figuring out how many piles. That is the grouping way of thinking about division.',
                    solution: '\\(20 \\div 5 = 4\\) piles. This is <strong>grouping</strong> because you know the group size (5) and are finding the number of groups (4).'
                },
                {
                    question: 'Why is \\(0 \\div 5\\) allowed (and equals 0), but \\(5 \\div 0\\) is not allowed?',
                    hint: '\\(0 \\div 5\\) asks: "How many in each group if I share 0 things among 5 friends?" \\(5 \\div 0\\) asks: "How many groups of 0 make 5?"',
                    solution: '\\(0 \\div 5 = 0\\) because sharing zero things among 5 friends gives each friend 0 things. But \\(5 \\div 0\\) is <strong>undefined</strong> because no number of groups of size 0 can ever add up to 5. You cannot divide by zero!'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Division on a Number Line
        // ============================================================
        {
            id: 'ch04-sec02',
            title: 'Division on a Number Line',
            content: `
                <h2>Division on a Number Line</h2>

                <p>Remember how we used a number line for addition (jumping forward) and subtraction (jumping backward)? Division also has a cool number line trick: we make <strong>equal jumps backward</strong> from the dividend all the way to 0!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>To solve \\(15 \\div 5\\) on a number line:</p>
                        <ol>
                            <li>Start at <strong>15</strong>.</li>
                            <li>Jump backward by <strong>5</strong> each time.</li>
                            <li>Count your jumps until you land on <strong>0</strong>.</li>
                        </ol>
                        <p>Jump 1: \\(15 \\to 10\\). Jump 2: \\(10 \\to 5\\). Jump 3: \\(5 \\to 0\\).</p>
                        <p>That is <strong>3 jumps</strong>, so \\(15 \\div 5 = 3\\)!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-numberline"></div>

                <p>This is called <strong>repeated subtraction</strong>. Division is really just subtracting the same number over and over until you reach zero (or can't subtract anymore).</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Let's solve \\(24 \\div 6\\) with backward jumps:</p>
                        <p>\\(24 \\to 18 \\to 12 \\to 6 \\to 0\\)</p>
                        <p>We made <strong>4 jumps</strong> of 6, so \\(24 \\div 6 = 4\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Use the number line to figure out \\(21 \\div 7\\).</p>
                        <p>Start at 21 and jump backward by 7 each time. How many jumps to reach 0?</p>
                        <p>\\(21 \\to 14 \\to 7 \\to 0\\) &mdash; that is <strong>3 jumps</strong>, so \\(21 \\div 7 = 3\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-repeated-sub"></div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>What happens if you don't land exactly on 0? For example, \\(14 \\div 4\\): you jump \\(14 \\to 10 \\to 6 \\to 2\\). After 3 jumps, you are at 2 &mdash; not 0! You can't jump by 4 again because 2 is smaller than 4. That leftover <strong>2</strong> is the <em>remainder</em>. We will learn all about remainders in Section 4!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Make sure each jump is the <em>same size</em>. If the divisor is 5, every jump must be exactly 5 &mdash; no bigger, no smaller!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch04-viz-numberline',
                    title: 'Division on the Number Line: Jumping Backward',
                    description: 'Watch equal backward jumps from the dividend to 0. Change the dividend and divisor to explore!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 280, scale: 20});
                        viz.originX = 30;
                        viz.originY = 150;

                        let dividend = 15;
                        let divisor = 5;
                        let animJump = -1;
                        let isAnimating = false;

                        VizEngine.createSlider(controls, 'Dividend:', 4, 30, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            animJump = -1;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Divisor:', 2, 10, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            animJump = -1;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Jump!', () => {
                            if (isAnimating) return;
                            animJump = 0;
                            isAnimating = true;
                            animateJumps();
                        });

                        const jumpColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink, viz.colors.yellow, viz.colors.red];

                        function animateJumps() {
                            const numJumps = Math.floor(dividend / divisor);
                            if (animJump >= numJumps) {
                                isAnimating = false;
                                draw();
                                return;
                            }
                            animJump++;
                            draw();
                            setTimeout(animateJumps, 500);
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Scale calculation for number line
                            const lineLeft = 40;
                            const lineRight = viz.width - 20;
                            const lineY = 170;
                            const lineLen = lineRight - lineLeft;
                            const numJumps = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;
                            const maxVal = dividend + 1;
                            const unitPx = lineLen / maxVal;

                            // Draw number line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lineLeft, lineY);
                            ctx.lineTo(lineRight, lineY);
                            ctx.stroke();

                            // Draw tick marks and labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            const step = dividend <= 15 ? 1 : (dividend <= 20 ? 2 : 5);
                            for (let n = 0; n <= dividend; n += step) {
                                const px = lineLeft + n * unitPx;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(px, lineY - 5);
                                ctx.lineTo(px, lineY + 5);
                                ctx.stroke();
                                ctx.fillText(n, px, lineY + 8);
                            }
                            // Always show dividend
                            if (dividend % step !== 0) {
                                const px = lineLeft + dividend * unitPx;
                                ctx.beginPath();
                                ctx.moveTo(px, lineY - 5);
                                ctx.lineTo(px, lineY + 5);
                                ctx.stroke();
                                ctx.fillText(dividend, px, lineY + 8);
                            }

                            // Highlight 0 and dividend
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(lineLeft, lineY, 5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(lineLeft + dividend * unitPx, lineY, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw jumps (arcs)
                            const showJumps = animJump >= 0 ? Math.min(animJump, numJumps) : 0;
                            for (let j = 0; j < showJumps; j++) {
                                const from = dividend - j * divisor;
                                const to = from - divisor;
                                const fromPx = lineLeft + from * unitPx;
                                const toPx = lineLeft + to * unitPx;
                                const midPx = (fromPx + toPx) / 2;
                                const arcHeight = 30 + (j % 2) * 12;
                                const color = jumpColors[j % jumpColors.length];

                                // Draw arc
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(fromPx, lineY - 6);
                                ctx.quadraticCurveTo(midPx, lineY - arcHeight - 6, toPx, lineY - 6);
                                ctx.stroke();

                                // Arrow tip
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(toPx, lineY - 6);
                                ctx.lineTo(toPx + 6, lineY - 14);
                                ctx.lineTo(toPx + 8, lineY - 4);
                                ctx.closePath();
                                ctx.fill();

                                // Jump label
                                ctx.fillStyle = color;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('-' + divisor, midPx, lineY - arcHeight - 8);

                                // Jump number
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('#' + (j + 1), midPx, lineY - arcHeight + 3);

                                // Landing point
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(toPx, lineY, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Title text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            if (animJump >= numJumps && animJump >= 0) {
                                ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + numJumps + (remainder > 0 ? ' R' + remainder : '') + '  (' + numJumps + ' jumps!)', viz.width / 2, 12);
                            } else {
                                ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ?   Press "Jump!" to find out!', viz.width / 2, 12);
                            }

                            // Remainder indicator
                            if (animJump >= numJumps && remainder > 0) {
                                const remStart = lineLeft;
                                const remEnd = lineLeft + remainder * unitPx;
                                ctx.fillStyle = viz.colors.yellow + '33';
                                ctx.fillRect(remStart, lineY - 3, remEnd - remStart, 6);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('remainder: ' + remainder, (remStart + remEnd) / 2, lineY + 28);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-repeated-sub',
                    title: 'Repeated Subtraction Tower',
                    description: 'Watch division unfold as repeated subtraction, step by step!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 300, scale: 40});
                        let dividend = 24;
                        let divisor = 6;

                        VizEngine.createSlider(controls, 'Start:', 6, 30, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Subtract:', 2, 10, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const numSteps = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Repeated Subtraction: ' + dividend + ' \u00F7 ' + divisor, viz.width / 2, 10);

                            // Draw subtraction steps
                            const startX = 80;
                            const stepHeight = Math.min(28, (viz.height - 80) / (numSteps + 2));
                            let curY = 45;

                            for (let i = 0; i <= numSteps; i++) {
                                const value = dividend - i * divisor;

                                // Value
                                ctx.fillStyle = i === 0 ? viz.colors.blue : viz.colors.teal;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'top';
                                ctx.fillText(value, startX, curY);

                                // Bar representation
                                const barMax = 350;
                                const barWidth = (value / dividend) * barMax;
                                const barColor = i === 0 ? viz.colors.blue : viz.colors.teal;
                                ctx.fillStyle = barColor + '55';
                                ctx.fillRect(startX + 15, curY + 2, barWidth, stepHeight - 8);
                                ctx.fillStyle = barColor;
                                ctx.fillRect(startX + 15, curY + 2, barWidth, 3);

                                // Minus sign and subtracted amount
                                if (i < numSteps) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('- ' + divisor, startX + barWidth + 25, curY + 2);

                                    // Step number
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.textAlign = 'right';
                                    ctx.fillText('step ' + (i + 1), viz.width - 30, curY + 2);
                                }

                                curY += stepHeight;
                            }

                            // Remainder line
                            if (remainder > 0) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(remainder, startX, curY);
                                ctx.textAlign = 'left';
                                ctx.fillText('\u2190 remainder', startX + 15, curY);
                            }

                            // Final answer
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('We subtracted ' + divisor + ' a total of ' + numSteps + ' times. So ' + dividend + ' \u00F7 ' + divisor + ' = ' + numSteps + (remainder > 0 ? ' R' + remainder : '') + '!', viz.width / 2, viz.height - 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the number line to solve \\(18 \\div 3\\). How many jumps of 3 does it take to get from 18 to 0?',
                    hint: 'Start at 18 and count: \\(18 \\to 15 \\to 12 \\to 9 \\to 6 \\to 3 \\to 0\\). Count those jumps!',
                    solution: '\\(18 \\to 15 \\to 12 \\to 9 \\to 6 \\to 3 \\to 0\\). That is <strong>6 jumps</strong>, so \\(18 \\div 3 = 6\\).'
                },
                {
                    question: 'Solve \\(28 \\div 7\\) using repeated subtraction. Write out each step.',
                    hint: 'Start at 28 and keep subtracting 7: \\(28 - 7 = 21\\), \\(21 - 7 = ?\\), and so on until you reach 0.',
                    solution: '\\(28 - 7 = 21\\), \\(21 - 7 = 14\\), \\(14 - 7 = 7\\), \\(7 - 7 = 0\\). That is <strong>4 steps</strong>, so \\(28 \\div 7 = 4\\).'
                },
                {
                    question: 'If you start at 17 and jump backward by 5 each time, where do you stop? What does this tell you about \\(17 \\div 5\\)?',
                    hint: 'Jump: \\(17 \\to 12 \\to 7 \\to 2\\). Can you jump by 5 again from 2? What is left over?',
                    solution: '\\(17 \\to 12 \\to 7 \\to 2\\). After 3 jumps we are at 2, which is less than 5, so we stop. \\(17 \\div 5 = 3\\) with a <strong>remainder of 2</strong>.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Division & Multiplication Are Partners
        // ============================================================
        {
            id: 'ch04-sec03',
            title: 'Division & Multiplication Are Partners',
            content: `
                <h2>Division & Multiplication Are Partners</h2>

                <p>Here is one of the most powerful ideas in arithmetic: <strong>division and multiplication are inverses</strong> &mdash; they undo each other! Just like addition and subtraction are partners, multiplication and division go hand in hand.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>If you know that \\(4 \\times 5 = 20\\), then you automatically know <strong>two</strong> division facts:</p>
                        <ul>
                            <li>\\(20 \\div 5 = 4\\)</li>
                            <li>\\(20 \\div 4 = 5\\)</li>
                        </ul>
                        <p>These three equations together are called a <strong>fact family</strong>. One multiplication fact gives you two division facts for free!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>The fact family for \\(3 \\times 7 = 21\\):</p>
                        <ul>
                            <li>\\(3 \\times 7 = 21\\)</li>
                            <li>\\(7 \\times 3 = 21\\)</li>
                            <li>\\(21 \\div 7 = 3\\)</li>
                            <li>\\(21 \\div 3 = 7\\)</li>
                        </ul>
                        <p>Four facts from the same three numbers: 3, 7, and 21!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-factfamily"></div>

                <h3>Using Multiplication to Check Division</h3>

                <p>Whenever you solve a division problem, you can <strong>check your answer with multiplication</strong>:</p>
                <p style="text-align:center; font-size:1.1rem;">If \\(\\text{dividend} \\div \\text{divisor} = \\text{quotient}\\), then \\(\\text{divisor} \\times \\text{quotient} = \\text{dividend}\\).</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>You think \\(56 \\div 8 = 7\\). Let's check: \\(8 \\times 7 = 56\\). Yes! It works!</p>
                        <p>You think \\(45 \\div 9 = 6\\). Let's check: \\(9 \\times 6 = 54\\). Hmm, that is 54, not 45. So the answer must be wrong! (The correct answer is \\(45 \\div 9 = 5\\) because \\(9 \\times 5 = 45\\).)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-inverse"></div>

                <div class="env-block intuition">
                    <div class="env-title">Cool Fact</div>
                    <div class="env-body">
                        <p>Knowing your multiplication tables is like having a secret decoder ring for division! If you memorize that \\(6 \\times 8 = 48\\), you instantly know \\(48 \\div 8 = 6\\) and \\(48 \\div 6 = 8\\). Each multiplication fact unlocks two division facts!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>What is the fact family for \\(5 \\times 5 = 25\\)? Since both factors are the same, the family is smaller: \\(5 \\times 5 = 25\\) and \\(25 \\div 5 = 5\\). That is it! When both factors are the same, we get fewer unique facts.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-array-link"></div>
            `,
            visualizations: [
                {
                    id: 'ch04-viz-factfamily',
                    title: 'Fact Family Triangle',
                    description: 'Pick three numbers that form a fact family and see all four related facts!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 340, scale: 40});
                        let a = 4;
                        let b = 5;

                        VizEngine.createSlider(controls, 'Factor A:', 1, 12, a, 1, (v) => {
                            a = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Factor B:', 1, 12, b, 1, (v) => {
                            b = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const product = a * b;

                            // Draw triangle
                            const cx = viz.width / 2;
                            const topY = 50;
                            const bottomY = 210;
                            const spread = 140;

                            // Triangle outline
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(cx, topY);
                            ctx.lineTo(cx - spread, bottomY);
                            ctx.lineTo(cx + spread, bottomY);
                            ctx.closePath();
                            ctx.stroke();

                            // Product at top
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(cx, topY, 28, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#0c0c20';
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(product, cx, topY);

                            // Factor A at bottom-left
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(cx - spread, bottomY, 28, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#0c0c20';
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillText(a, cx - spread, bottomY);

                            // Factor B at bottom-right
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(cx + spread, bottomY, 28, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#0c0c20';
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillText(b, cx + spread, bottomY);

                            // Edge labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // Left edge: multiply
                            ctx.fillStyle = viz.colors.green;
                            ctx.save();
                            ctx.translate(cx - spread / 2 - 25, (topY + bottomY) / 2);
                            ctx.rotate(-0.55);
                            ctx.fillText('\u00D7', 0, 0);
                            ctx.restore();

                            // Right edge: multiply
                            ctx.fillStyle = viz.colors.green;
                            ctx.save();
                            ctx.translate(cx + spread / 2 + 25, (topY + bottomY) / 2);
                            ctx.rotate(0.55);
                            ctx.fillText('\u00D7', 0, 0);
                            ctx.restore();

                            // Bottom edge: multiply
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u00D7', cx, bottomY + 18);

                            // Draw the four facts below
                            const factsY = 255;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // Multiplication facts
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(a + ' \u00D7 ' + b + ' = ' + product, cx - 130, factsY);
                            ctx.fillText(b + ' \u00D7 ' + a + ' = ' + product, cx + 130, factsY);

                            // Division facts
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText(product + ' \u00F7 ' + a + ' = ' + b, cx - 130, factsY + 28);
                            ctx.fillText(product + ' \u00F7 ' + b + ' = ' + a, cx + 130, factsY + 28);

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('FACT FAMILY', cx, factsY + 55);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-inverse',
                    title: 'Multiplication \u2194 Division: Inverse Operations',
                    description: 'See how multiplication and division undo each other with arrows!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 280, scale: 40});
                        let startVal = 6;
                        let multiplier = 4;

                        VizEngine.createSlider(controls, 'Start:', 1, 12, startVal, 1, (v) => {
                            startVal = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Multiply by:', 1, 12, multiplier, 1, (v) => {
                            multiplier = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const product = startVal * multiplier;

                            const leftX = 120;
                            const rightX = viz.width - 120;
                            const midY = viz.height / 2;

                            // Left circle (start value)
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(leftX, midY, 40, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(startVal, leftX, midY);

                            // Right circle (product)
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(rightX, midY, 40, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText(product, rightX, midY);

                            // Forward arrow (multiplication) - top
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(leftX + 45, midY - 20);
                            ctx.quadraticCurveTo((leftX + rightX) / 2, midY - 70, rightX - 45, midY - 20);
                            ctx.stroke();

                            // Arrow tip
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(rightX - 45, midY - 20);
                            ctx.lineTo(rightX - 55, midY - 32);
                            ctx.lineTo(rightX - 40, midY - 28);
                            ctx.closePath();
                            ctx.fill();

                            // Multiply label
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u00D7 ' + multiplier, (leftX + rightX) / 2, midY - 60);

                            // Backward arrow (division) - bottom
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(rightX - 45, midY + 20);
                            ctx.quadraticCurveTo((leftX + rightX) / 2, midY + 70, leftX + 45, midY + 20);
                            ctx.stroke();

                            // Arrow tip
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.moveTo(leftX + 45, midY + 20);
                            ctx.lineTo(leftX + 55, midY + 32);
                            ctx.lineTo(leftX + 40, midY + 28);
                            ctx.closePath();
                            ctx.fill();

                            // Divide label
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u00F7 ' + multiplier, (leftX + rightX) / 2, midY + 65);

                            // Equations at bottom
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(startVal + ' \u00D7 ' + multiplier + ' = ' + product, viz.width / 2 - 120, viz.height - 22);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText(product + ' \u00F7 ' + multiplier + ' = ' + startVal, viz.width / 2 + 120, viz.height - 22);

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('They undo each other!', viz.width / 2, viz.height - 6);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-array-link',
                    title: 'Array Model: See the Multiplication-Division Connection',
                    description: 'An array of dots shows how rows, columns, and total are linked by multiplication and division.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 320, scale: 40});
                        let rows = 4;
                        let cols = 5;

                        VizEngine.createSlider(controls, 'Rows:', 1, 8, rows, 1, (v) => {
                            rows = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Columns:', 1, 8, cols, 1, (v) => {
                            cols = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const total = rows * cols;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(rows + ' rows \u00D7 ' + cols + ' columns = ' + total + ' dots', viz.width / 2, 10);

                            // Draw array
                            const dotR = Math.min(12, Math.min((viz.width - 160) / (cols * 2.5), (viz.height - 140) / (rows * 2.5)));
                            const spacing = dotR * 2.5;
                            const arrayW = (cols - 1) * spacing;
                            const arrayH = (rows - 1) * spacing;
                            const startX = (viz.width - arrayW) / 2;
                            const startY = (viz.height - arrayH) / 2;

                            // Row bracket
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(startX - 20, startY - dotR);
                            ctx.lineTo(startX - 25, startY - dotR);
                            ctx.lineTo(startX - 25, startY + arrayH + dotR);
                            ctx.lineTo(startX - 20, startY + arrayH + dotR);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(rows + ' rows', startX - 32, startY + arrayH / 2);

                            // Column bracket
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(startX - dotR, startY - 20);
                            ctx.lineTo(startX - dotR, startY - 25);
                            ctx.lineTo(startX + arrayW + dotR, startY - 25);
                            ctx.lineTo(startX + arrayW + dotR, startY - 20);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText(cols + ' columns', startX + arrayW / 2, startY - 30);

                            // Draw dots
                            const rowColors = [viz.colors.teal, viz.colors.blue, viz.colors.green, viz.colors.purple, viz.colors.orange, viz.colors.pink, viz.colors.yellow, viz.colors.red];
                            for (let r = 0; r < rows; r++) {
                                for (let c = 0; c < cols; c++) {
                                    const dx = startX + c * spacing;
                                    const dy = startY + r * spacing;
                                    ctx.fillStyle = rowColors[r % rowColors.length];
                                    ctx.beginPath();
                                    ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Equations at bottom
                            const eqY = viz.height - 42;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(rows + ' \u00D7 ' + cols + ' = ' + total, viz.width / 2, eqY);

                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText(total + ' \u00F7 ' + rows + ' = ' + cols, viz.width / 4, eqY + 22);
                            ctx.fillText(total + ' \u00F7 ' + cols + ' = ' + rows, viz.width * 3 / 4, eqY + 22);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the complete fact family for \\(6 \\times 8 = 48\\).',
                    hint: 'A fact family has 2 multiplication facts and 2 division facts. The three numbers involved are 6, 8, and 48.',
                    solution: 'The fact family is: \\(6 \\times 8 = 48\\), \\(8 \\times 6 = 48\\), \\(48 \\div 8 = 6\\), \\(48 \\div 6 = 8\\).'
                },
                {
                    question: 'You solved \\(63 \\div 9 = 7\\). How can you check this answer using multiplication?',
                    hint: 'Multiply the divisor by the quotient. Does it give back the dividend?',
                    solution: 'Multiply: \\(9 \\times 7 = 63\\). Since this equals the dividend, the answer \\(63 \\div 9 = 7\\) is <strong>correct</strong>!'
                },
                {
                    question: 'Fill in the blank: If \\(\\_ \\times 9 = 72\\), then \\(72 \\div 9 = \\_\\).',
                    hint: 'What number times 9 equals 72? Think of your 9 times table.',
                    solution: '\\(8 \\times 9 = 72\\), so \\(72 \\div 9 = 8\\). The missing number is <strong>8</strong> in both blanks!'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Remainders
        // ============================================================
        {
            id: 'ch04-sec04',
            title: 'Remainders',
            content: `
                <h2>Remainders</h2>

                <p>Division does not always work out perfectly! Sometimes when you try to share things equally, there are <strong>leftovers</strong>. In math, we call the leftover amount the <strong>remainder</strong>.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Imagine you have <strong>13 cookies</strong> and want to share them among <strong>4 friends</strong>.</p>
                        <ul>
                            <li>Each friend gets 3 cookies (\\(4 \\times 3 = 12\\) cookies used).</li>
                            <li>But \\(13 - 12 = 1\\) cookie is left over!</li>
                        </ul>
                        <p>We write: \\(13 \\div 4 = 3\\) remainder \\(1\\), or \\(13 \\div 4 = 3 \\text{ R}1\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Problem:</strong> \\(17 \\div 5 = ?\\)</p>
                        <p>Think: What is the biggest number of 5s that fit into 17?</p>
                        <ul>
                            <li>\\(5 \\times 1 = 5\\) &mdash; fits!</li>
                            <li>\\(5 \\times 2 = 10\\) &mdash; fits!</li>
                            <li>\\(5 \\times 3 = 15\\) &mdash; fits!</li>
                            <li>\\(5 \\times 4 = 20\\) &mdash; too big!</li>
                        </ul>
                        <p>So the quotient is 3, and the remainder is \\(17 - 15 = 2\\).</p>
                        <p>Answer: \\(17 \\div 5 = 3 \\text{ R}2\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-remainder"></div>

                <h3>The Remainder Rule</h3>

                <p>Here is the key relationship: <strong>Dividend = Divisor \\(\\times\\) Quotient + Remainder</strong></p>

                <p>For our example: \\(13 = 4 \\times 3 + 1\\). Let's check: \\(12 + 1 = 13\\). It works!</p>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Check the answer for \\(23 \\div 6 = 3 \\text{ R}5\\):</p>
                        <p>Does \\(6 \\times 3 + 5 = 23\\)? &mdash; \\(18 + 5 = 23\\). Yes!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-remainder-check"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>The remainder must <strong>always be less than the divisor</strong>! If you get a remainder of 5 when dividing by 4, something is wrong &mdash; you could fit in one more group. For example, \\(13 \\div 4 \\neq 2 \\text{ R}5\\) because \\(5 \\geq 4\\). The correct answer is \\(3 \\text{ R}1\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>When the remainder is 0, division is <em>exact</em> &mdash; everything divides evenly! For example, \\(20 \\div 4 = 5 \\text{ R}0\\), which we just write as \\(20 \\div 4 = 5\\). We say "4 <strong>divides</strong> 20 evenly" or "20 is <strong>divisible by</strong> 4."</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch04-viz-remainder',
                    title: 'Sharing With Remainders',
                    description: 'Watch objects get distributed among groups. The leftovers are the remainder!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 340, scale: 40});
                        let total = 13;
                        let groups = 4;

                        VizEngine.createSlider(controls, 'Objects:', 5, 30, total, 1, (v) => {
                            total = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Groups:', 2, 7, groups, 1, (v) => {
                            groups = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const quotient = Math.floor(total / groups);
                            const remainder = total % groups;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(total + ' \u00F7 ' + groups + ' = ' + quotient + (remainder > 0 ? ' R' + remainder : ' (exact!)'), viz.width / 2, 8);

                            const groupColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.teal, viz.colors.pink, viz.colors.red];

                            // Draw groups as plates/circles
                            const plateR = Math.min(50, (viz.width - 80) / (groups + 1) / 2);
                            const plateSpacing = Math.min(110, (viz.width - 40) / (groups + (remainder > 0 ? 1 : 0)));
                            const totalPlatesWidth = (groups + (remainder > 0 ? 1 : 0)) * plateSpacing;
                            const plateStartX = (viz.width - totalPlatesWidth) / 2 + plateSpacing / 2;
                            const plateY = 140;

                            for (let g = 0; g < groups; g++) {
                                const px = plateStartX + g * plateSpacing;
                                const color = groupColors[g % groupColors.length];

                                // Plate (circle)
                                ctx.strokeStyle = color + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(px, plateY, plateR, 0, Math.PI * 2);
                                ctx.stroke();

                                // Draw objects on plate
                                for (let i = 0; i < quotient; i++) {
                                    const angle = (i / quotient) * Math.PI * 2 - Math.PI / 2;
                                    const objR = Math.min(10, plateR * 0.3);
                                    const dist = plateR * 0.55;
                                    const ox = px + Math.cos(angle) * dist;
                                    const oy = plateY + Math.sin(angle) * dist;

                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(ox, oy, objR, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Count label
                                ctx.fillStyle = color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(quotient, px, plateY + plateR + 8);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('Group ' + (g + 1), px, plateY + plateR + 24);
                            }

                            // Draw remainder
                            if (remainder > 0) {
                                const remX = plateStartX + groups * plateSpacing;
                                ctx.strokeStyle = viz.colors.yellow + '66';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.arc(remX, plateY, plateR, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                for (let i = 0; i < remainder; i++) {
                                    const angle = (i / Math.max(remainder, 1)) * Math.PI * 2 - Math.PI / 2;
                                    const objR = Math.min(10, plateR * 0.3);
                                    const dist = plateR * 0.55;
                                    const ox = remX + Math.cos(angle) * dist;
                                    const oy = plateY + Math.sin(angle) * dist;

                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.arc(ox, oy, objR, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(remainder, remX, plateY + plateR + 8);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('Left over!', remX, plateY + plateR + 24);
                            }

                            // Equation at bottom
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(total + ' = ' + groups + ' \u00D7 ' + quotient + ' + ' + remainder, viz.width / 2, viz.height - 50);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('dividend = divisor \u00D7 quotient + remainder', viz.width / 2, viz.height - 28);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-remainder-check',
                    title: 'Remainder Check Machine',
                    description: 'Enter a division problem and verify the remainder formula: Dividend = Divisor x Quotient + Remainder',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 260, scale: 40});
                        let dividend = 23;
                        let divisor = 6;

                        VizEngine.createSlider(controls, 'Dividend:', 1, 50, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Divisor:', 2, 12, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const quotient = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + quotient + ' R' + remainder, viz.width / 2, 15);

                            // Draw bar representation
                            const barY = 70;
                            const barH = 40;
                            const barLeft = 40;
                            const barRight = viz.width - 40;
                            const barWidth = barRight - barLeft;
                            const unitWidth = barWidth / dividend;

                            // Full dividend bar
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(barLeft, barY, barWidth, barH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barLeft, barY, barWidth, barH);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(dividend, barLeft + barWidth / 2, barY - 8);

                            // Groups of divisor
                            const groupedWidth = quotient * divisor * unitWidth;
                            for (let g = 0; g < quotient; g++) {
                                const gx = barLeft + g * divisor * unitWidth;
                                const gw = divisor * unitWidth;
                                const groupColors = [viz.colors.green, viz.colors.teal, viz.colors.purple, viz.colors.orange, viz.colors.pink, viz.colors.blue];
                                const color = groupColors[g % groupColors.length];
                                ctx.fillStyle = color + '44';
                                ctx.fillRect(gx, barY + barH + 10, gw, barH);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(gx, barY + barH + 10, gw, barH);
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(divisor, gx + gw / 2, barY + barH + 15 + barH / 2);
                            }

                            // Remainder bar
                            if (remainder > 0) {
                                const remX = barLeft + quotient * divisor * unitWidth;
                                const remW = remainder * unitWidth;
                                ctx.fillStyle = viz.colors.yellow + '44';
                                ctx.fillRect(remX, barY + barH + 10, remW, barH);
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.strokeRect(remX, barY + barH + 10, remW, barH);
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('R' + remainder, remX + remW / 2, barY + barH + 15 + barH / 2);
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(quotient + ' groups of ' + divisor, barLeft, barY + 2 * barH + 20);
                            if (remainder > 0) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.textAlign = 'right';
                                ctx.fillText('+ ' + remainder + ' left over', barRight, barY + 2 * barH + 20);
                            }

                            // Check equation
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            const checkVal = divisor * quotient + remainder;
                            const checkMark = checkVal === dividend ? ' \u2713' : ' \u2717';
                            ctx.fillText('Check: ' + divisor + ' \u00D7 ' + quotient + ' + ' + remainder + ' = ' + checkVal + checkMark, viz.width / 2, viz.height - 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Solve \\(25 \\div 7\\). What is the quotient and remainder?',
                    hint: 'What is the largest multiple of 7 that is less than or equal to 25? Try \\(7 \\times 3 = 21\\) and \\(7 \\times 4 = 28\\).',
                    solution: '\\(7 \\times 3 = 21\\) fits, but \\(7 \\times 4 = 28\\) is too big. So the quotient is 3, and the remainder is \\(25 - 21 = 4\\). Answer: \\(25 \\div 7 = 3 \\text{ R}4\\). Check: \\(7 \\times 3 + 4 = 21 + 4 = 25\\). Correct!'
                },
                {
                    question: 'Your friend says \\(29 \\div 6 = 3 \\text{ R}11\\). Is this correct? If not, what is the right answer?',
                    hint: 'Remember: the remainder must always be less than the divisor. Is 11 less than 6?',
                    solution: 'The remainder 11 is greater than the divisor 6, so this is <strong>wrong</strong>. We can fit more groups! \\(6 \\times 4 = 24\\), and \\(29 - 24 = 5\\). The correct answer is \\(29 \\div 6 = 4 \\text{ R}5\\). Check: \\(6 \\times 4 + 5 = 24 + 5 = 29\\).'
                },
                {
                    question: 'You have 30 pencils and want to put them in boxes of 8. How many full boxes do you fill, and how many pencils are left over?',
                    hint: 'This is \\(30 \\div 8\\). What is the biggest multiple of 8 that fits in 30?',
                    solution: '\\(8 \\times 3 = 24\\) fits, \\(8 \\times 4 = 32\\) is too big. So \\(30 \\div 8 = 3 \\text{ R}6\\). You fill <strong>3 full boxes</strong> with <strong>6 pencils left over</strong>.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Long Division Intro
        // ============================================================
        {
            id: 'ch04-sec05',
            title: 'Long Division Intro',
            content: `
                <h2>Long Division Intro</h2>

                <p>For bigger numbers, we use a step-by-step method called <strong>long division</strong>. It may look tricky at first, but once you learn the steps, you will see it is just a pattern you repeat!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Long division follows four steps that repeat. Remember them with this phrase:</p>
                        <p style="text-align:center; font-size:1.1rem; color:var(--accent-teal);">
                            <strong>Divide &rarr; Multiply &rarr; Subtract &rarr; Bring down</strong>
                        </p>
                        <p>Let's learn each step with the problem \\(96 \\div 4\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Let's solve \\(96 \\div 4\\) step by step:</p>
                        <p><strong>Step 1 &mdash; Divide:</strong> How many times does 4 go into the first digit, 9? \\(4 \\times 2 = 8\\), so 2 times. Write 2 above.</p>
                        <p><strong>Step 2 &mdash; Multiply:</strong> \\(2 \\times 4 = 8\\). Write 8 below the 9.</p>
                        <p><strong>Step 3 &mdash; Subtract:</strong> \\(9 - 8 = 1\\). Write 1 below.</p>
                        <p><strong>Step 4 &mdash; Bring down:</strong> Bring down the next digit (6) to get 16.</p>
                        <p><strong>Repeat Step 1 &mdash; Divide:</strong> How many times does 4 go into 16? \\(4 \\times 4 = 16\\), exactly! Write 4 above.</p>
                        <p><strong>Repeat Step 2 &mdash; Multiply:</strong> \\(4 \\times 4 = 16\\).</p>
                        <p><strong>Repeat Step 3 &mdash; Subtract:</strong> \\(16 - 16 = 0\\). No remainder!</p>
                        <p>Answer: \\(96 \\div 4 = 24\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-longdiv"></div>

                <div class="env-block example">
                    <div class="env-title">Try This!</div>
                    <div class="env-body">
                        <p>Let's try \\(75 \\div 3\\):</p>
                        <ol>
                            <li><strong>Divide:</strong> 3 into 7? Goes 2 times (\\(3 \\times 2 = 6\\)).</li>
                            <li><strong>Multiply:</strong> \\(2 \\times 3 = 6\\).</li>
                            <li><strong>Subtract:</strong> \\(7 - 6 = 1\\).</li>
                            <li><strong>Bring down:</strong> Bring down 5 to get 15.</li>
                            <li><strong>Divide:</strong> 3 into 15? Goes 5 times (\\(3 \\times 5 = 15\\)).</li>
                            <li><strong>Multiply:</strong> \\(5 \\times 3 = 15\\).</li>
                            <li><strong>Subtract:</strong> \\(15 - 15 = 0\\).</li>
                        </ol>
                        <p>Answer: \\(75 \\div 3 = 25\\). Check: \\(25 \\times 3 = 75\\). Correct!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-longdiv-practice"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Sometimes the divisor does not go into the first digit at all! For example, \\(54 \\div 6\\): 6 does not go into 5 (because \\(5 &lt; 6\\)). When this happens, look at the first <em>two</em> digits together: 6 into 54 is 9. So \\(54 \\div 6 = 9\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About It</div>
                    <div class="env-body">
                        <p>Long division works because we are dividing piece by piece, starting from the largest place value. When we divided 96 by 4, we first figured out how many 4s fit into the tens (2 tens = 20 fours), then how many fit into the leftover ones (4 ones = 4 fours). So \\(96 \\div 4 = 24\\) really means \\(96 = 4 \\times 20 + 4 \\times 4 = 4 \\times 24\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch04-viz-longdiv-why"></div>
            `,
            visualizations: [
                {
                    id: 'ch04-viz-longdiv',
                    title: 'Long Division Step by Step',
                    description: 'Watch long division unfold one step at a time. Press "Next Step" to advance!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 340, scale: 40});
                        let dividend = 96;
                        let divisor = 4;
                        let step = 0;

                        VizEngine.createSlider(controls, 'Dividend:', 10, 99, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            step = 0;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Divisor:', 2, 9, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            step = 0;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Next Step', () => {
                            step++;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reset', () => {
                            step = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            const d1 = Math.floor(dividend / 10);  // tens digit
                            const d0 = dividend % 10;               // ones digit

                            // Long division computation
                            const q1 = Math.floor(d1 / divisor);    // tens quotient
                            const r1 = d1 - q1 * divisor;           // tens remainder
                            const bringDown = r1 * 10 + d0;          // after bringing down
                            const q0 = Math.floor(bringDown / divisor); // ones quotient
                            const r0 = bringDown - q0 * divisor;     // final remainder
                            const quotient = q1 * 10 + q0;

                            // Layout
                            const baseX = 200;
                            const baseY = 60;
                            const digitW = 30;
                            const lineH = 32;

                            // Draw division bracket
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(baseX - 5, baseY - 5);
                            ctx.lineTo(baseX - 5, baseY + 22);
                            ctx.lineTo(baseX + digitW * 2 + 10, baseY + 22);
                            ctx.stroke();

                            // Divisor
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'top';
                            ctx.fillText(divisor, baseX - 15, baseY);

                            // Dividend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'center';
                            ctx.fillText(d1, baseX + digitW / 2, baseY);
                            ctx.fillText(d0, baseX + digitW + digitW / 2, baseY);

                            // Steps label
                            const stepNames = ['Start', 'Divide tens', 'Multiply', 'Subtract', 'Bring down', 'Divide ones', 'Multiply', 'Subtract', 'Done!'];
                            const stepColors = [viz.colors.white, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.orange, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.yellow];

                            const maxStep = 8;
                            const currentStep = Math.min(step, maxStep);

                            // Current step label
                            ctx.fillStyle = stepColors[currentStep];
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Step: ' + stepNames[currentStep], 340, baseY);

                            // Step descriptions on the right
                            const descX = 340;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            if (currentStep >= 1) {
                                // Quotient tens digit
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(q1, baseX + digitW / 2, baseY - lineH);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(divisor + ' into ' + d1 + ' = ' + q1, descX, baseY + 30);
                            }

                            if (currentStep >= 2) {
                                // Multiply result
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                const prod1 = q1 * divisor;
                                ctx.fillText(prod1, baseX + digitW / 2, baseY + lineH);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(q1 + ' \u00D7 ' + divisor + ' = ' + prod1, descX, baseY + 50);
                            }

                            if (currentStep >= 3) {
                                // Subtract line
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(baseX - 5, baseY + lineH + 25);
                                ctx.lineTo(baseX + digitW + 5, baseY + lineH + 25);
                                ctx.stroke();

                                // Remainder
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(r1, baseX + digitW / 2, baseY + lineH * 2);

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(d1 + ' - ' + (q1 * divisor) + ' = ' + r1, descX, baseY + 70);
                            }

                            if (currentStep >= 4) {
                                // Bring down arrow
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(baseX + digitW + digitW / 2, baseY + 22);
                                ctx.lineTo(baseX + digitW + digitW / 2, baseY + lineH * 2 + 4);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Arrow tip
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(baseX + digitW + digitW / 2, baseY + lineH * 2 + 4);
                                ctx.lineTo(baseX + digitW + digitW / 2 - 4, baseY + lineH * 2 - 4);
                                ctx.lineTo(baseX + digitW + digitW / 2 + 4, baseY + lineH * 2 - 4);
                                ctx.closePath();
                                ctx.fill();

                                // Brought down number
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(d0, baseX + digitW + digitW / 2, baseY + lineH * 2);

                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Bring down ' + d0 + ' \u2192 ' + bringDown, descX, baseY + 90);
                            }

                            if (currentStep >= 5) {
                                // Quotient ones digit
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(q0, baseX + digitW + digitW / 2, baseY - lineH);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(divisor + ' into ' + bringDown + ' = ' + q0, descX, baseY + 110);
                            }

                            if (currentStep >= 6) {
                                // Multiply
                                const prod2 = q0 * divisor;
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                const prod2Str = prod2 < 10 ? ' ' + prod2 : '' + prod2;
                                ctx.fillText(prod2, baseX + digitW, baseY + lineH * 3);

                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(q0 + ' \u00D7 ' + divisor + ' = ' + prod2, descX, baseY + 130);
                            }

                            if (currentStep >= 7) {
                                // Subtract line
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(baseX - 5, baseY + lineH * 3 + 25);
                                ctx.lineTo(baseX + digitW * 2 + 5, baseY + lineH * 3 + 25);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(r0, baseX + digitW, baseY + lineH * 4);

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(bringDown + ' - ' + (q0 * divisor) + ' = ' + r0, descX, baseY + 150);
                            }

                            if (currentStep >= 8) {
                                // Final answer highlight
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                const ansStr = dividend + ' \u00F7 ' + divisor + ' = ' + quotient + (r0 > 0 ? ' R' + r0 : '');
                                ctx.fillText(ansStr, viz.width / 2, viz.height - 30);

                                // Highlight quotient
                                ctx.strokeStyle = viz.colors.yellow + '88';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(baseX - 10, baseY - lineH - 8, digitW * 2 + 20, 32, 6);
                                ctx.stroke();
                            }

                            // Instructions
                            if (currentStep < maxStep) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Press "Next Step" to continue', viz.width / 2, viz.height - 10);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-longdiv-practice',
                    title: 'Long Division Practice',
                    description: 'Try different 2-digit by 1-digit problems and see the full solution!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 300, scale: 40});
                        let dividend = 75;
                        let divisor = 3;
                        let showAll = false;

                        VizEngine.createSlider(controls, 'Dividend:', 10, 99, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            showAll = false;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Divisor:', 2, 9, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            showAll = false;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Show Solution', () => {
                            showAll = true;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const quotient = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;

                            // Problem display
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Solve: ' + dividend + ' \u00F7 ' + divisor + ' = ?', viz.width / 2, 12);

                            if (!showAll) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Try it on paper first, then press "Show Solution"!', viz.width / 2, 50);

                                // Show tips
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Remember: Divide \u2192 Multiply \u2192 Subtract \u2192 Bring down', viz.width / 2, viz.height / 2);

                                return;
                            }

                            // Full solution display
                            const d1 = Math.floor(dividend / 10);
                            const d0 = dividend % 10;
                            const q1 = Math.floor(d1 / divisor);
                            const r1 = d1 - q1 * divisor;
                            const bringDown = r1 * 10 + d0;
                            const q0 = Math.floor(bringDown / divisor);
                            const r0 = bringDown - q0 * divisor;

                            // Show steps as text
                            const startY = 50;
                            const stepH = 26;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            const leftMargin = 60;

                            const steps = [];
                            if (q1 > 0) {
                                steps.push({text: 'Divide: ' + divisor + ' into ' + d1 + ' goes ' + q1 + ' time(s)', color: viz.colors.teal});
                                steps.push({text: 'Multiply: ' + q1 + ' \u00D7 ' + divisor + ' = ' + (q1 * divisor), color: viz.colors.green});
                                steps.push({text: 'Subtract: ' + d1 + ' - ' + (q1 * divisor) + ' = ' + r1, color: viz.colors.purple});
                                steps.push({text: 'Bring down ' + d0 + ' to get ' + bringDown, color: viz.colors.orange});
                                steps.push({text: 'Divide: ' + divisor + ' into ' + bringDown + ' goes ' + q0 + ' time(s)', color: viz.colors.teal});
                                steps.push({text: 'Multiply: ' + q0 + ' \u00D7 ' + divisor + ' = ' + (q0 * divisor), color: viz.colors.green});
                                steps.push({text: 'Subtract: ' + bringDown + ' - ' + (q0 * divisor) + ' = ' + r0, color: viz.colors.purple});
                            } else {
                                // Divisor doesn't go into first digit
                                steps.push({text: divisor + ' does not go into ' + d1 + ', so look at ' + dividend + ' together', color: viz.colors.orange});
                                steps.push({text: 'Divide: ' + divisor + ' into ' + dividend + ' goes ' + quotient + ' time(s)', color: viz.colors.teal});
                                steps.push({text: 'Multiply: ' + quotient + ' \u00D7 ' + divisor + ' = ' + (quotient * divisor), color: viz.colors.green});
                                steps.push({text: 'Subtract: ' + dividend + ' - ' + (quotient * divisor) + ' = ' + remainder, color: viz.colors.purple});
                            }

                            for (let i = 0; i < steps.length; i++) {
                                ctx.fillStyle = steps[i].color;
                                ctx.fillText((i + 1) + '. ' + steps[i].text, leftMargin, startY + i * stepH);
                            }

                            // Final answer
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Answer: ' + dividend + ' \u00F7 ' + divisor + ' = ' + quotient + (remainder > 0 ? ' R' + remainder : ''), viz.width / 2, viz.height - 44);

                            // Check
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Check: ' + divisor + ' \u00D7 ' + quotient + ' + ' + remainder + ' = ' + (divisor * quotient + remainder), viz.width / 2, viz.height - 20);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch04-viz-longdiv-why',
                    title: 'Why Long Division Works: Place Value Breakdown',
                    description: 'See how long division splits the dividend into tens and ones and divides each part separately.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 300, scale: 40});
                        let dividend = 96;
                        let divisor = 4;

                        VizEngine.createSlider(controls, 'Dividend:', 10, 99, dividend, 1, (v) => {
                            dividend = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Divisor:', 2, 9, divisor, 1, (v) => {
                            divisor = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            const tens = Math.floor(dividend / 10);
                            const ones = dividend % 10;
                            const quotient = Math.floor(dividend / divisor);
                            const remainder = dividend % divisor;

                            const q_tens = Math.floor(tens / divisor);
                            const r_tens = tens - q_tens * divisor;
                            const new_ones = r_tens * 10 + ones;
                            const q_ones = Math.floor(new_ones / divisor);
                            const r_final = new_ones - q_ones * divisor;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Why does ' + dividend + ' \u00F7 ' + divisor + ' = ' + quotient + (remainder > 0 ? ' R' + remainder : '') + '?', viz.width / 2, 10);

                            // Draw blocks
                            const barY = 50;
                            const barH = 35;
                            const barLeft = 50;
                            const barRight = viz.width - 50;
                            const totalWidth = barRight - barLeft;
                            const unitWidth = totalWidth / dividend;

                            // Full bar: tens portion
                            const tensWidth = tens * 10 * unitWidth;
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.fillRect(barLeft, barY, Math.min(tensWidth, totalWidth), barH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barLeft, barY, Math.min(tensWidth, totalWidth), barH);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(tens + ' tens = ' + (tens * 10), barLeft + Math.min(tensWidth, totalWidth) / 2, barY + barH / 2 + 1);

                            // Ones portion
                            const onesLeft = barLeft + tens * 10 * unitWidth;
                            const onesWidth = ones * unitWidth;
                            if (ones > 0 && onesLeft < barRight) {
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.fillRect(onesLeft, barY, onesWidth, barH);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(onesLeft, barY, onesWidth, barH);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                if (onesWidth > 30) {
                                    ctx.fillText(ones, onesLeft + onesWidth / 2, barY + barH / 2 + 1);
                                }
                            }

                            // Step 1: Divide tens
                            const step1Y = barY + barH + 20;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('1. Divide the tens: ' + tens + ' tens \u00F7 ' + divisor + ' = ' + q_tens + ' tens, leftover ' + r_tens + ' ten(s)', barLeft, step1Y);

                            // Step 2: Regroup
                            const step2Y = step1Y + 28;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('2. Regroup leftover: ' + r_tens + ' ten(s) + ' + ones + ' ones = ' + new_ones + ' ones', barLeft, step2Y);

                            // Step 3: Divide ones
                            const step3Y = step2Y + 28;
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('3. Divide the ones: ' + new_ones + ' ones \u00F7 ' + divisor + ' = ' + q_ones + ' ones, leftover ' + r_final, barLeft, step3Y);

                            // Step 4: Combine
                            const step4Y = step3Y + 28;
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('4. Combine: ' + q_tens + ' tens + ' + q_ones + ' ones = ' + quotient, barLeft, step4Y);

                            // Final
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(dividend + ' \u00F7 ' + divisor + ' = ' + quotient + (remainder > 0 ? ' R' + remainder : '') + '    \u2714', viz.width / 2, viz.height - 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use long division to solve \\(84 \\div 7\\).',
                    hint: 'Divide: 7 into 8 goes 1 time. Multiply: \\(1 \\times 7 = 7\\). Subtract: \\(8 - 7 = 1\\). Bring down 4 to get 14. Divide: 7 into 14 goes 2 times.',
                    solution: 'Step by step: 7 into 8 = 1, multiply \\(1 \\times 7 = 7\\), subtract \\(8 - 7 = 1\\), bring down 4 to get 14, divide 7 into 14 = 2, multiply \\(2 \\times 7 = 14\\), subtract \\(14 - 14 = 0\\). Answer: \\(84 \\div 7 = 12\\). Check: \\(12 \\times 7 = 84\\).'
                },
                {
                    question: 'Use long division to solve \\(57 \\div 4\\). What is the remainder?',
                    hint: '4 into 5 goes 1 time (\\(1 \\times 4 = 4\\), remainder 1). Bring down 7 to get 17. 4 into 17 goes 4 times (\\(4 \\times 4 = 16\\), remainder 1).',
                    solution: 'Step by step: 4 into 5 = 1, \\(1 \\times 4 = 4\\), \\(5 - 4 = 1\\), bring down 7 to get 17, 4 into 17 = 4, \\(4 \\times 4 = 16\\), \\(17 - 16 = 1\\). Answer: \\(57 \\div 4 = 14 \\text{ R}1\\). Check: \\(4 \\times 14 + 1 = 56 + 1 = 57\\).'
                },
                {
                    question: 'Solve \\(54 \\div 6\\). Be careful &mdash; this one starts differently!',
                    hint: '6 does not go into 5 (because \\(5 < 6\\)). So consider all of 54 at once. How many 6s fit into 54?',
                    solution: '6 does not go into 5, so we look at 54 as a whole. \\(6 \\times 9 = 54\\). So \\(54 \\div 6 = 9\\) with no remainder. Check: \\(9 \\times 6 = 54\\).'
                }
            ]
        }
    ]
});
