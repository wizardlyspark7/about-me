const ball = document.createElement('div');
document.body.appendChild(ball);

let modulo = 60;
let counter = 0;

function moveBall() {
    counter++;
    if (counter % modulo === 0)
    {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
    }
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
    ball.style.position = `absolute`;
    ball.style.width = `50px`;
    ball.style.height = `50px`;
    ball.style.backgroundColor = `red`;
    ball.style.borderRadius = `50%`;

    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);
