//deck array holds all the cards for use later
let cards = document.getElementsByClassName("card");
let deck = [...cards];
//Restart button
let restartButton = document.querySelector(".restart");
// deck of all cards in game
const wholeDeck = document.getElementById("card-deck");
// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");
// declare variables for star icons
const star = document.querySelectorAll(".fa-star");
// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");
//stars list array
let starsList = [];
starsList = document.getElementsByClassName("fa-star");
// get modal from dom
let modal = document.getElementsByClassName("modal");
//time variables
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

//timer function
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + " " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

//moves function
function moveCounter() {

    moves = moves + 1

    counter.innerHTML = moves;

    if (moves == 1) {

        second = 0;

        minute = 0;

        hour = 0;

        startTimer();

    }

}

// array for opened cards
var openedCards = [];
//Setup game with my function calls
initialize();
cardClicked();

//Restart Button and page refresh Event Listeners.
function initialize() {
    window.onbeforeunload = prepareDeck();
    console.log("Thunderbirds are go!");
    modal = document.getElementsByClassName("modal");
    modal[0].classList.remove("show");
}

//Function with Event listener to show cards on click aswell as add game logic for matching.
function cardClicked() {

    for (var i = 0; i < deck.length; i++) {

        var onClick = deck[i].children;
        deck[i].addEventListener("click", displayCard, false);
        deck[i].addEventListener("click", gameLogic, false);

    }

};

//show classes added
function displayCard() {
    this.classList.add("open");
    this.classList.add("show");

}

//add in game logic, type comparisons to match identical cards
function gameLogic() {
    this.classList.add('disabled');
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        starRating();
        if (openedCards[0].type === openedCards[1].type) {
            match();
            hazzah();
        }
        else {
            noMatch();
        }
    }
};

//give match class to identical cards
function match() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

//temporarily give show/open classes to non-identical cards before removing them
function noMatch() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    freeze();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    }, 1300);
}

//disable cards when matching
function freeze() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//Shuffle Deck, hide card faces.
function prepareDeck() {
    var theCards = document.querySelector(".deck");
    var shuffledCards = shuffle(deck);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (item) {
            theCards.appendChild(item);
        });
    }
    //Hide cards
    for (var i = 0; i < deck.length; i++) {
        document.getElementsByClassName("card")[i].classList.remove("show");
        document.getElementsByClassName("card")[i].classList.remove("open");
        document.getElementsByClassName("card")[i].classList.remove("match");
    }

    //reset moves
    moves = 0;
    counter.innerHTML = moves;
    //reset star rating
    for (var i = 0; i < starsList.length; i++) {
        star[i].classList.add("fa-star");
    }
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

//Set star rating with conditional statements
function starRating() {
    if (moves >= 16) {
        for (i = 0; i < starsList.length; i++) {
            star[0].classList.remove("fa-star");
        }
    }
    if (moves >= 20) {
        for (i = 0; i < starsList.length; i++) {
            star[1].classList.remove("fa-star");
        }
    }
    if (moves >= 24) {
        for (i = 0; i < starsList.length; i++) {
            star[2].classList.remove("fa-star");
        }
    }
    if (moves >= 30) {
        for (i = 0; i < starsList.length; i++) {
            star[3].classList.remove("fa-star");
        }
    }
}
//Refresh timer stats function
function timer() {
    var timer = document.getElementsByClassName("timer");
    timer.innerHTML = "The time is " + Date();
}
//Shuffle array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//Modal HTML creation
hazzah();
function setNumStars(numberOfStars) {
    var starsList = document.querySelector('.starsList');
    starsList.innerHTML = '';
    for (let i = 0; i < numberOfStars; i++) {
        let li = document.createElement('li');
        li.className = 'summary-star'
        let i = document.createElement('i');
        i.className = 'fa fa-star';
        li.appendChild(i);
        starsList.appendChild(li);
        if (moves >= 15) {
            numberOfStars = 4;
        }
        if (moves >= 20) {
            numberOfStars = 3;
        }
        if (moves >= 25) {
            numberOfStars = 2;
        }
        if (moves >= 30) {
            numberOfStars = 1;
        }
    }
}
//End game function
function hazzah() {
    let modal = document.getElementsByClassName("modal");
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal[0].classList.add("show");
        document.getElementById("totalTime").innerHTML = "Final Time: " + finalTime;
        document.getElementById("lastMove").innerHTML = "Moves: " + moves;
        setNumStars(5);
    }
}
