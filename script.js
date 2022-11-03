let boardArray = [];
const tiles = document.querySelectorAll(".tile");
const resetButton = document.querySelector(".reset");
const winResult = document.querySelector(".win");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");

// gameboard module populates the pieces on the gameboard
const gameboard = (() => {
    const renderBoard = () => {
        for(let i = 0; i < 9; i++){
            tiles[i].textContent = boardArray[i];
        };
        gameFlow.checkWin();
    };

    const reset = () => {
        boardArray = [];
        renderBoard();
    };

    return {renderBoard, reset};
})();

// factory function creates player objects
const Player = (marker) => {
    const addMarker = (i) => {
        boardArray[i] = marker;
        gameboard.renderBoard();
    }
    return {addMarker};
};

const player1 = Player("X");
const player2 = Player("O");

// object that controls the flow of the game itself
const gameFlow = (() => {
    let done = false;
    let move = 1;
    p1.style.backgroundColor = "#33E9FF";
    // gives click behavior to each tile
    for(let i = 0; i < 9; i++){
        tiles[i].addEventListener('click', () => {
            // prevents a tile from being clicked if a piece is already placed there
            if(tiles[i].textContent != '' || done){
                return;
            }
            // switches turns between players
            if(move == 1){
                player1.addMarker(i);
                p1.style.backgroundColor = "white";
                p2.style.backgroundColor = "#33E9FF";
                move = 2;
            } else {
                player2.addMarker(i);
                p2.style.backgroundColor = "white";
                p1.style.backgroundColor = "#33E9FF";
                move = 1;
            }
        });
    };

    const checkWin = () => {
        // win condition
        if((boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && boardArray[0] == "X") ||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && boardArray[3] == "X") ||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && boardArray[6] == "X") ||
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && boardArray[0] == "X") ||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && boardArray[1] == "X") ||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && boardArray[2] == "X") ||
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && boardArray[0] == "X") ||
        (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && boardArray[6] == "X")){
            done = true;
            winResult.textContent = "Player 1 wins!"
            resetButton.textContent = "New Game"
        } else if((boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && boardArray[0] == "O") ||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && boardArray[3] == "O") ||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && boardArray[6] == "O") ||
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && boardArray[0] == "O") ||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && boardArray[1] == "O") ||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && boardArray[2] == "O") ||
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && boardArray[0] == "O") ||
        (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && boardArray[6] == "O")){
            done = true;
            winResult.textContent = "Player 2 wins!"
            resetButton.textContent = "New Game"
        } else if(boardArray.length == 9 && !boardArray.includes(undefined)){
            done = true;
            winResult.textContent = "It's a draw!"
            resetButton.textContent = "New Game"
        }
    };

    resetButton.addEventListener('click', () => {
        resetButton.textContent = "Reset"
        gameboard.reset();
        done = false;
        move = 1;
        winResult.textContent = '';
    });

    return{checkWin};
})();