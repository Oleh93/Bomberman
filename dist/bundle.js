/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let size = 15;\nlet gameLost = false;\nlet gamePaused = false;\n\nlet gameWon = () => {\n    return enemiesDead() && doorEntered()\n};\n\nconst doorReadytoEnter = () => {\n    return enemiesDead()\n};\n\nconst enemiesDead = () => {\n    let field = getField(size);\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field.length; j++) {\n            if (field[i][j].classList.contains(\"enemy\")) {\n                return false;\n            }\n        }\n    }\n    return true;\n};\n\nconst doorEntered = () => {\n    let field = getField(size);\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field.length; j++) {\n            if (field[i][j].classList.contains(\"bomberman\") && field[i][j].id === \"door\") {\n                return true;\n            }\n        }\n    }\n    return false;\n};\n\nlet bombAvailable = () => {\n    let field = getField(size);\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field.length; j++) {\n            if (field[i][j].id === \"bomb\" || field[i][j].id === \"bomberman-bomb\") {\n                return false;\n            }\n        }\n    }\n    return true;\n};\n\nconst startGame = () => {\n        let enemiesInterval = setInterval(moveEnemies, 800);\n        gamePaused = false;\n        return enemiesInterval;\n};\n\nconst stopGame = (enemiesInterval) => {\n        clearInterval(enemiesInterval);\n        gamePaused = true;\n};\n\nconst getRandomInt = (max) => Math.floor(Math.random() * (Math.floor(max) + 1));\n\nconst generateField = (size) => {\n    for (let i = 0; i < size; i++) {\n        for (let j = 0; j < size; j++) {\n            let c = document.createElement(\"div\");\n            (i === 0 || j === 0 || i === size - 1 || j === size - 1 || (!(i % 2) && !((i + j) % 2))) ? c.className = \"wall\" :\n                (getRandomInt(7) === 0) ? c.className = \"brick\" : c.className = \"grass\";\n            document.getElementById(\"field\").appendChild(c);\n        }\n    }\n    for (let i = 0; i < 3; i++) {\n        let d = document.getElementsByClassName(\"grass\")[getRandomInt(document.getElementsByClassName(\"grass\").length)].classList;\n        d.remove(\"grass\");\n        d.add(\"enemy\", \"enemy-down\");\n    }\n\n    let grassList = document.getElementsByClassName(\"grass\")[getRandomInt(document.getElementsByClassName(\"grass\").length)].classList;\n    grassList.remove(\"grass\");\n    grassList.add(\"bomberman\", \"bomberman-down\");\n\n    document.getElementsByClassName(\"brick\")[getRandomInt(document.getElementsByClassName(\"brick\").length)].id = \"door\";\n};\n\nconst getField = (size) => {\n    let field = [];\n    for (let i = 0; i < size; i++) {\n        field.push([...document.getElementById(\"field\").children].slice(i * size, i * size + size));\n    }\n    return field;\n};\n\nconst getCoordinates = (block) => {\n    let field = getField(size);\n    for (let i = 0; i < field.length; i++) {\n        if (field[i].includes(block)) {\n            return [i, field[i].indexOf(block)]\n        }\n    }\n};\n\nconst moveDown = (block) => {\n    let coordinates = getCoordinates(block);\n    let field = getField(size);\n    let destinationBlock = field[coordinates[0] + 1][coordinates[1]];\n\n    if ((destinationBlock.id === \"door\" && !doorReadytoEnter()) || destinationBlock.id === \"bomb\") {\n        return null;\n    }\n    if (destinationBlock.className === \"grass\") {\n        destinationBlock.classList.replace(\"grass\", block.classList[0]);\n        destinationBlock.classList.add(block.classList[0] + \"-down\");\n        block.className = \"grass\";\n        if (block.id === \"bomberman-bomb\") {\n            block.id = \"bomb\"\n        }\n\n    }\n    if ((destinationBlock.classList.contains(\"enemy\") && block.classList.contains(\"bomberman\"))\n        || (destinationBlock.classList.contains(\"bomberman\") && block.classList.contains(\"enemy\"))) {\n        gameLost = true;\n    }\n};\n\nconst moveUp = (block) => {\n    let coordinates = getCoordinates(block);\n    let field = getField(size);\n    let destinationBlock = field[coordinates[0] - 1][coordinates[1]];\n\n    if ((destinationBlock.id === \"door\" && !doorReadytoEnter()) || destinationBlock.id === \"bomb\") {\n        return null;\n    }\n    if (destinationBlock.className === \"grass\") {\n        destinationBlock.classList.replace(\"grass\", block.classList[0]);\n        destinationBlock.classList.add(block.classList[0] + \"-up\");\n        block.className = \"grass\";\n        if (block.id === \"bomberman-bomb\") {\n            block.id = \"bomb\"\n        }\n    }\n    if ((destinationBlock.classList.contains(\"enemy\") && block.classList.contains(\"bomberman\"))\n        || (destinationBlock.classList.contains(\"bomberman\") && block.classList.contains(\"enemy\"))) {\n        gameLost = true;\n    }\n};\n\nconst moveLeft = (block) => {\n    let coordinates = getCoordinates(block);\n    let field = getField(size);\n    let destinationBlock = field[coordinates[0]][coordinates[1] - 1];\n\n    if ((destinationBlock.id === \"door\" && !doorReadytoEnter()) || destinationBlock.id === \"bomb\") {\n        return null;\n    }\n    if (destinationBlock.className === \"grass\") {\n        destinationBlock.classList.replace(\"grass\", block.classList[0]);\n        destinationBlock.classList.add(block.classList[0] + \"-left\");\n        block.className = \"grass\";\n        if (block.id === \"bomberman-bomb\") {\n            block.id = \"bomb\"\n        }\n    }\n    if ((destinationBlock.classList.contains(\"enemy\") && block.classList.contains(\"bomberman\"))\n        || (destinationBlock.classList.contains(\"bomberman\") && block.classList.contains(\"enemy\"))) {\n        gameLost = true;\n    }\n};\n\nconst moveRight = (block) => {\n    let coordinates = getCoordinates(block);\n    let field = getField(size);\n    let destinationBlock = field[coordinates[0]][coordinates[1] + 1];\n\n    if ((destinationBlock.id === \"door\" && !doorReadytoEnter()) || destinationBlock.id === \"bomb\") {\n        return null;\n    }\n    if (destinationBlock.className === \"grass\") {\n        destinationBlock.classList.replace(\"grass\", block.classList[0]);\n        destinationBlock.classList.add(block.classList[0] + \"-right\");\n        block.className = \"grass\";\n        if (block.id === \"bomberman-bomb\") {\n            block.id = \"bomb\"\n        }\n    }\n    if ((destinationBlock.classList.contains(\"enemy\") && block.classList.contains(\"bomberman\"))\n        || (destinationBlock.classList.contains(\"bomberman\") && block.classList.contains(\"enemy\"))) {\n        gameLost = true;\n    }\n};\n\nconst moveEnemies = () => {\n    let enemies = document.getElementsByClassName(\"enemy\");\n    for (let i = 0; i < enemies.length; i++) {\n        let direction = getRandomInt(4);\n        direction === 0 ? moveDown(enemies[i]) : direction === 1 ? moveUp(enemies[i]) : direction === 2 ? moveLeft(enemies[i]) : moveRight(enemies[i]);\n    }\n};\n\nconst setBomb = (block) => {\n    const explodeBomb = (block) => {\n        const destroyBlock = (b) => {\n            b.classList.contains(\"bomberman\") ? gameLost = true : {};\n            (b.classList.contains(\"bomberman\") || b.className === \"brick\" || b.classList.contains(\"enemy\")) ? b.className = \"grass\" : {};\n            b.id === \"bomberman-bomb\" ? b.id = \"\" : b.id === \"bomb\" ? b.id = \"\" : {};\n\n        };\n\n        let field = getField(size);\n        let coordinates = getCoordinates(block);\n\n        destroyBlock(field[coordinates[0]][coordinates[1]]);\n        destroyBlock(field[coordinates[0] - 1][coordinates[1]]);\n        destroyBlock(field[coordinates[0] + 1][coordinates[1]]);\n        destroyBlock(field[coordinates[0]][coordinates[1] - 1]);\n        destroyBlock(field[coordinates[0]][coordinates[1] + 1]);\n    };\n\n    if (bombAvailable() && block.id !== \"door\") {\n        block.id = \"bomberman-bomb\";\n        setTimeout(() => explodeBomb(block), 2000)\n    }\n};\n\n\nwindow.onload = () => {\n    document.getElementById(\"field\").style.display = \"none\";\n    let startButton = document.getElementsByClassName(\"options__start-button\")[0];\n\n    startButton.onclick = () => {\n        document.getElementsByClassName(\"options\")[0].style.display = \"none\";\n        document.getElementById(\"field\").style.display = \"\";\n\n        generateField(size);\n\n        let enemiesInterval = setInterval(moveEnemies, 800);\n\n        document.addEventListener(\"keydown\", (event) =>\n            event.which === 39 && !gamePaused ? moveRight(document.getElementsByClassName(\"bomberman\")[0]) :\n                event.which === 37 && !gamePaused ? moveLeft(document.getElementsByClassName(\"bomberman\")[0]) :\n                    event.which === 38 && !gamePaused ? moveUp(document.getElementsByClassName(\"bomberman\")[0]) :\n                        event.which === 40 && !gamePaused ? moveDown(document.getElementsByClassName(\"bomberman\")[0]) :\n                            event.which === 32 && !gamePaused ? setBomb(document.getElementsByClassName(\"bomberman\")[0]) :\n                                event.which === 80 && gamePaused ? enemiesInterval = startGame(): event.which === 80 && !gamePaused ? stopGame(enemiesInterval):\n                                    event.which === 82 ? window.location.reload() : {}\n                                );\n\n        setInterval( () => {\n            if (gameWon()) {\n                window.location.reload();\n                alert(\"You won!\");\n            }\n            if (gameLost) {\n                window.location.reload();\n                alert(\"You lost!\");\n            }}, 100);\n    };\n\n};\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_game__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\ndocument.getElementById(\"field\").style.display = \"none\";\r\nlet startButton = document.getElementsByClassName(\"options__start-button\")[0];\r\n\r\nstartButton.onclick = () => {\r\n    document.getElementsByClassName(\"options\")[0].style.display = \"none\";\r\n    document.getElementById(\"field\").style.display = \"\";\r\n\r\n    Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"generateField\"])(_game__WEBPACK_IMPORTED_MODULE_0__[\"size\"]);\r\n\r\n    let enemiesInterval = setInterval(_game__WEBPACK_IMPORTED_MODULE_0__[\"moveEnemies\"], 800);\r\n\r\n    document.addEventListener(\"keydown\", (event) =>\r\n        event.which === 39 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"moveRight\"])(document.getElementsByClassName(\"bomberman\")[0]) :\r\n            event.which === 37 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"moveLeft\"])(document.getElementsByClassName(\"bomberman\")[0]) :\r\n                event.which === 38 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"moveUp\"])(document.getElementsByClassName(\"bomberman\")[0]) :\r\n                    event.which === 40 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"moveDown\"])(document.getElementsByClassName(\"bomberman\")[0]) :\r\n                        event.which === 32 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"setBomb\"])(document.getElementsByClassName(\"bomberman\")[0]) :\r\n                            event.which === 80 && _game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? enemiesInterval = Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"startGame\"])(): event.which === 80 && !_game__WEBPACK_IMPORTED_MODULE_0__[\"gamePaused\"] ? Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"stopGame\"])(enemiesInterval):\r\n                                event.which === 82 ? window.location.reload() : {}\r\n    );\r\n\r\n    setInterval( () => {\r\n        if (Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"gameWon\"])()) {\r\n            window.location.reload();\r\n            alert(\"You won!\");\r\n        }\r\n        if (_game__WEBPACK_IMPORTED_MODULE_0__[\"gameLost\"]) {\r\n            window.location.reload();\r\n            alert(\"You lost!\");\r\n        }}, 100);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/olehmykytyn/WebstormProjects/Bomberman/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });