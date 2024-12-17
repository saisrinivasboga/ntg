const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const colors = ['#ff6f61', '#f3c623', '#00c9b1', '#7a5cff', '#ff4081'];
const balloons = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createFirework(x, y) {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x,
            y,
            angle: random(0, Math.PI * 2),
            speed: random(2, 5),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: random(1, 3),
            life: 100
        });
    }
    fireworks.push(particles);
}

function createBalloon() {
    const balloon = {
        x: random(100, canvas.width - 100),
        y: canvas.height + 100,
        size: random(40, 80),
        speed: random(1, 3),
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    balloons.push(balloon);
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const particles = fireworks[i];
        for (let j = particles.length - 1; j >= 0; j--) {
            const p = particles[j];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life -= 2;

            if (p.life <= 0) {
                particles.splice(j, 1);
            }
        }
        if (particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }
}

function updateBalloons() {
    for (let i = 0; i < balloons.length; i++) {
        const balloon = balloons[i];
        balloon.y -= balloon.speed;
        if (balloon.y + balloon.size < 0) {
            balloons.splice(i, 1);
            i--;
        }
    }
}

function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particles of fireworks) {
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }
}

function drawBalloons() {
    for (const balloon of balloons) {
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();
    }
}

function animate() {
    drawFireworks();
    drawBalloons();
    updateFireworks();
    updateBalloons();
    requestAnimationFrame(animate);
}

// Trigger fireworks on click
canvas.addEventListener('click', function(event) {
    createFirework(event.clientX, event.clientY);
});

// Create balloons periodically
setInterval(createBalloon, 1000);

animate();
