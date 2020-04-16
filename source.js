/*

given a length (in seconds: e.g. 25*60)
some sort of while loop based on the length
- function that after a time delay of 1 second
    - updates w/e DOM element (probalby the timer)
    - decrements the length?

grab length
convert length to seconds
- 

- on while loop end
    - start into the next thing
    - play a sound 
    - start break (same thing as the other previous while loop)

- on both work+break timers
    -play a new sound
    - update which session #

*/

// Interval ID to store the session state
var intervalID = '';

var currTime = 10;

// Default timer settings
const defaultSettings = {
    session : 25,
    shortBreak : 5,
    longBreak : 30
};

// User defined timer settings
var configSettings = {
    session : 0,
    shortBreak : 0,
    longBreak : 0
};

// Start the timer countdown from configured setting
function startTimer() {
    // DOM element inner html
    
    intervalID = setInterval(updateTimer, 1000);
    
}

function pauseTimer() {
    clearInterval(intervalID);
}

function resetTimer() {

}

function updateTimer() {
    if(currTime <= 0) {
        clearInterval(intervalID);
    } 
    console.log(currTime--);

}

// on setting updates, convert minutes to seconds, store in config settings as seconds
startTimer();
