// variables
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var words = [{word: "snake", hint: "It's a reptile"},
                {word: "monkey", hint: "It's a mammal"},
                {word: "beetle", hint: "It's an insect"}];
                
// listeners
window.onload = startGame();

$(".replayBtn").on("click", function(){
    location.reload();
});

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

$(".hintButton").click(function(){
    $("#word").append("<br />");
    $("#word").append("<span class='hint'> Hint: " + selectedHint + "</span>");
    remainingGuesses -= 1;
    $(".hintButton").hide();
    updateMan();
});

// functions  
function startGame() {
    createLetters();
    pickWord();
    initBoard();
    updateBoard();
}

// create letters inside the letters div
function createLetters() {
    for(var letter of alphabet) {
        $("#letters").append("<button class = 'btn btn-success letter' id='" + letter + "'>" + letter + "</button>");
    }
}

// fill board with underscores
function initBoard() {
    for (var letter in selectedWord) {
        board.push("_");
    }
}

function pickWord() {
    var randomInt = Math.floor(Math.random() *  words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateWord(positions, letter) {
    for (var pos of positions)
        board[pos] = letter;

    updateBoard();
}

function updateBoard() {
    $("#word").empty();
    
    for (var i = 0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    
    // $("#word").append("<br />");
    // $("#word").append("<span class='hint'> Hint: " + selectedHint + "</span>");
}

// checks if the selected letter exists in the selectedWord
function checkLetter(letter) {
    var positions = new Array();
    
    // puts all the positions the letter exists in an array
    for (var i = 0; i < selectedWord.length; i++) {
        console.log(selectedWord);
        if(letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    
    if (positions.length > 0) {
        updateWord(positions, letter);
        
        // checks to see if this is a winning guess
        if(!board.includes('_'))
            endGame(true);

    }
    else {
        remainingGuesses -= 1;
        updateMan();
    }
    
    if(remainingGuesses <= 0)
        endGame(false);
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}
    
function endGame(win) {
    $("#letters").hide();
    
    if (win)
        $('#won').show();
    
    else
        $('#lost').show();
}    

function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}