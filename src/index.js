import {generateField, size, gameLost, gamePaused,
    stopGame, startGame, moveDown, moveLeft, moveRight, moveUp, setBomb, gameWon, moveEnemies} from "./game";

document.getElementById("field").style.display = "none";
let startButton = document.getElementsByClassName("options__start-button")[0];

startButton.onclick = function () {
    document.getElementsByClassName("options")[0].style.display = "none";
    document.getElementById("field").style.display = "";

    generateField(size);

    let enemiesInterval = setInterval(moveEnemies, 800);

    document.addEventListener("keydown", (event) =>
        event.which === 39 && !gamePaused ? moveRight(document.getElementsByClassName("bomberman")[0]) :
            event.which === 37 && !gamePaused ? moveLeft(document.getElementsByClassName("bomberman")[0]) :
                event.which === 38 && !gamePaused ? moveUp(document.getElementsByClassName("bomberman")[0]) :
                    event.which === 40 && !gamePaused ? moveDown(document.getElementsByClassName("bomberman")[0]) :
                        event.which === 32 && !gamePaused ? setBomb(document.getElementsByClassName("bomberman")[0]) :
                            event.which === 80 && gamePaused ? enemiesInterval = startGame(): event.which === 80 && !gamePaused ? stopGame(enemiesInterval):
                                event.which === 82 ? window.location.reload() : {}
    );

    setInterval(function () {
        if (gameWon()) {
            window.location.reload();
            alert("You won!");
        }
        if (gameLost) {
            window.location.reload();
            alert("You lost!");
        }}, 100);
};
