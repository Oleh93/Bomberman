let size = 15;
let gameLost = false;
let gamePaused = false;

let gameWon = () => {
    return enemiesDead() && doorEntered()
};

const doorReadytoEnter = () => {
    return enemiesDead()
};

const enemiesDead = () => {
    let field = getField(size);
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].classList.contains("enemy")) {
                return false;
            }
        }
    }
    return true;
};

const doorEntered = () => {
    let field = getField(size);
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].classList.contains("bomberman") && field[i][j].id === "door") {
                return true;
            }
        }
    }
    return false;
};

let bombAvailable = () => {
    let field = getField(size);
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].id === "bomb" || field[i][j].id === "bomberman-bomb") {
                return false;
            }
        }
    }
    return true;
};

const startGame = () => {
        let enemiesInterval = setInterval(moveEnemies, 800);
        gamePaused = false;
        return enemiesInterval;
};

const stopGame = (enemiesInterval) => {
        clearInterval(enemiesInterval);
        gamePaused = true;
};

const getRandomInt = (max) => Math.floor(Math.random() * (Math.floor(max) + 1));

const generateField = (size) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let c = document.createElement("div");
            (i === 0 || j === 0 || i === size - 1 || j === size - 1 || (!(i % 2) && !((i + j) % 2))) ? c.className = "wall" :
                (getRandomInt(7) === 0) ? c.className = "brick" : c.className = "grass";
            document.getElementById("field").appendChild(c);
        }
    }
    for (let i = 0; i < 3; i++) {
        let d = document.getElementsByClassName("grass")[getRandomInt(document.getElementsByClassName("grass").length)].classList;
        d.remove("grass");
        d.add("enemy", "enemy-down");
    }

    let grassList = document.getElementsByClassName("grass")[getRandomInt(document.getElementsByClassName("grass").length)].classList;
    grassList.remove("grass");
    grassList.add("bomberman", "bomberman-down");

    document.getElementsByClassName("brick")[getRandomInt(document.getElementsByClassName("brick").length)].id = "door";
};

const getField = (size) => {
    let field = [];
    for (let i = 0; i < size; i++) {
        field.push([...document.getElementById("field").children].slice(i * size, i * size + size));
    }
    return field;
};

const getCoordinates = (block) => {
    let field = getField(size);
    for (let i = 0; i < field.length; i++) {
        if (field[i].includes(block)) {
            return [i, field[i].indexOf(block)]
        }
    }
};

const moveDown = (block) => {
    let coordinates = getCoordinates(block);
    let field = getField(size);
    let destinationBlock = field[coordinates[0] + 1][coordinates[1]];

    if ((destinationBlock.id === "door" && !doorReadytoEnter()) || destinationBlock.id === "bomb") {
        return null;
    }
    if (destinationBlock.className === "grass") {
        destinationBlock.classList.replace("grass", block.classList[0]);
        destinationBlock.classList.add(block.classList[0] + "-down");
        block.className = "grass";
        if (block.id === "bomberman-bomb") {
            block.id = "bomb"
        }

    }
    if ((destinationBlock.classList.contains("enemy") && block.classList.contains("bomberman"))
        || (destinationBlock.classList.contains("bomberman") && block.classList.contains("enemy"))) {
        gameLost = true;
    }
};

const moveUp = (block) => {
    let coordinates = getCoordinates(block);
    let field = getField(size);
    let destinationBlock = field[coordinates[0] - 1][coordinates[1]];

    if ((destinationBlock.id === "door" && !doorReadytoEnter()) || destinationBlock.id === "bomb") {
        return null;
    }
    if (destinationBlock.className === "grass") {
        destinationBlock.classList.replace("grass", block.classList[0]);
        destinationBlock.classList.add(block.classList[0] + "-up");
        block.className = "grass";
        if (block.id === "bomberman-bomb") {
            block.id = "bomb"
        }
    }
    if ((destinationBlock.classList.contains("enemy") && block.classList.contains("bomberman"))
        || (destinationBlock.classList.contains("bomberman") && block.classList.contains("enemy"))) {
        gameLost = true;
    }
};

const moveLeft = (block) => {
    let coordinates = getCoordinates(block);
    let field = getField(size);
    let destinationBlock = field[coordinates[0]][coordinates[1] - 1];

    if ((destinationBlock.id === "door" && !doorReadytoEnter()) || destinationBlock.id === "bomb") {
        return null;
    }
    if (destinationBlock.className === "grass") {
        destinationBlock.classList.replace("grass", block.classList[0]);
        destinationBlock.classList.add(block.classList[0] + "-left");
        block.className = "grass";
        if (block.id === "bomberman-bomb") {
            block.id = "bomb"
        }
    }
    if ((destinationBlock.classList.contains("enemy") && block.classList.contains("bomberman"))
        || (destinationBlock.classList.contains("bomberman") && block.classList.contains("enemy"))) {
        gameLost = true;
    }
};

const moveRight = (block) => {
    let coordinates = getCoordinates(block);
    let field = getField(size);
    let destinationBlock = field[coordinates[0]][coordinates[1] + 1];

    if ((destinationBlock.id === "door" && !doorReadytoEnter()) || destinationBlock.id === "bomb") {
        return null;
    }
    if (destinationBlock.className === "grass") {
        destinationBlock.classList.replace("grass", block.classList[0]);
        destinationBlock.classList.add(block.classList[0] + "-right");
        block.className = "grass";
        if (block.id === "bomberman-bomb") {
            block.id = "bomb"
        }
    }
    if ((destinationBlock.classList.contains("enemy") && block.classList.contains("bomberman"))
        || (destinationBlock.classList.contains("bomberman") && block.classList.contains("enemy"))) {
        gameLost = true;
    }
};

const moveEnemies = () => {
    let enemies = document.getElementsByClassName("enemy");
    for (let i = 0; i < enemies.length; i++) {
        let direction = getRandomInt(4);
        direction === 0 ? moveDown(enemies[i]) : direction === 1 ? moveUp(enemies[i]) : direction === 2 ? moveLeft(enemies[i]) : moveRight(enemies[i]);
    }
};

const setBomb = (block) => {
    const explodeBomb = (block) => {
        const destroyBlock = (b) => {
            b.classList.contains("bomberman") ? gameLost = true : {};
            (b.classList.contains("bomberman") || b.className === "brick" || b.classList.contains("enemy")) ? b.className = "grass" : {};
            b.id === "bomberman-bomb" ? b.id = "" : b.id === "bomb" ? b.id = "" : {};

        };

        let field = getField(size);
        let coordinates = getCoordinates(block);

        destroyBlock(field[coordinates[0]][coordinates[1]]);
        destroyBlock(field[coordinates[0] - 1][coordinates[1]]);
        destroyBlock(field[coordinates[0] + 1][coordinates[1]]);
        destroyBlock(field[coordinates[0]][coordinates[1] - 1]);
        destroyBlock(field[coordinates[0]][coordinates[1] + 1]);
    };

    if (bombAvailable() && block.id !== "door") {
        block.id = "bomberman-bomb";
        setTimeout(() => explodeBomb(block), 2000)
    }
};


window.onload = () => {
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

};
