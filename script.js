let noPressCount = 0;

const decisionScreen = document.getElementById('decision-screen');
const yesScreen = document.getElementById('yes-screen');
const noScreen = document.getElementById('no-screen');

// Event listener for the initial Yes button
decisionScreen.querySelector('#yes-button').addEventListener('click', function() {
    decisionScreen.classList.add('hidden');
    yesScreen.classList.remove('hidden');
    startFireworks();
    startConfetti();
});

// Event listener for the initial No button
decisionScreen.querySelector('#no-button').addEventListener('click', function() {
    noPressCount++;
    decisionScreen.classList.add('hidden');
    noScreen.classList.remove('hidden');
});

// Event listener for the Yes button in the No screen
noScreen.querySelector('#yes-button').addEventListener('click', function() {
    noScreen.classList.add('hidden');
    yesScreen.classList.remove('hidden');
    startFireworks();
    startConfetti();
});

// Event listener for the No button in the No screen
noScreen.querySelector('#no-button').addEventListener('click', function() {
    noPressCount++;
    const question = noScreen.querySelector('p');
    question.textContent = `Are you really${' really'.repeat(noPressCount)} sure that you will not join me for Valentine's Day?`;
});

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticle(x, y, color) {
        return {
            x,
            y,
            color,
            radius: Math.random() * 3 + 1,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            alpha: 1,
        };
    }

    function drawParticle(particle) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.fill();
    }

    function updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.alpha -= 0.01;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                drawParticle(particle);
                updateParticle(particle);
            }
        });
        requestAnimationFrame(animate);
    }

    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
        for (let i = 0; i < 20; i++) {
            particles.push(createParticle(x, y, color));
        }
    }, 500);

    animate();
}

function startConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        confetti.style.top = `${Math.random() * window.innerHeight}px`;
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        confettiContainer.appendChild(confetti);
    }
}

const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(100vh);
    }
}
`;
document.head.appendChild(style);