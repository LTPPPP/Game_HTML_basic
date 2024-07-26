document.addEventListener("DOMContentLoaded", function () {
    const cube = document.querySelector('.cube');
    let rotateX = 0;
    let rotateY = 0;

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            rotateX -= 90;
        } else if (event.key === 'ArrowDown') {
            rotateX += 90;
        } else if (event.key === 'ArrowLeft') {
            rotateY -= 90;
        } else if (event.key === 'ArrowRight') {
            rotateY += 90;
        }
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});
