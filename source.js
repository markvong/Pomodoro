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

- need time formatter
*/
// DOM elements
const timerText     = document.querySelector('.timer-text');
const startButton   = document.querySelector('#start-btn');
const pauseButton   = document.querySelector('#pause-btn');
const stopButton    = document.querySelector('#stop-btn');

// Session elements
const sessionLabel  = document.querySelector('#session-label');
// Short break elements
const breakLabel  = document.querySelector('#break-label');
// Long break elements
const longBreakLabel  = document.querySelector('#lng-break-label');

const decrementButtons = Array.from(document.querySelectorAll('.dcr-btn'));
const incrementButtons = Array.from(document.querySelectorAll('.incr-btn'));


// Interval ID to store the session state
var intervalID = '';
var currTime = 10;

// Default timer settings
const defaultSettings = {
    session : 25,
    shortBreak : 5,
    longBreak : 30
};

// User defined timer settings, affected by user-input
var configSettings = {
    session : 25,
    shortBreak : 5,
    longBreak : 30
};

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);

incrementButtons.forEach( (button) => {
    button.addEventListener('click', function() {
        if (button.id.includes('session')) {
            configSettings.session += 1;
            if (configSettings.session > 40) configSettings.session = 40;
        }
        else if (button.id.includes('lbreak')) {
            configSettings.longBreak += 1;
            if (configSettings.longBreak > 60) configSettings.longBreak = 60;
        }
        else if (button.id.includes('sbreak')) {
            configSettings.shortBreak += 1;
            if (configSettings.shortBreak > 10) configSettings.shortBreak = 10;
        }
        updateConfigUI();
    });
});

decrementButtons.forEach( (button) => {
    button.addEventListener('click', function() {
        if (button.id.includes('session')) {
            configSettings.session -= 1;
            if (configSettings.session <= 1) configSettings.session = 1;
        }
        else if (button.id.includes('lbreak')) {
            configSettings.longBreak -= 1;
            if (configSettings.longBreak <= 1) configSettings.longBreak = 1;
        }
        else if (button.id.includes('sbreak')) {
            configSettings.shortBreak -= 1;
            if (configSettings.shortBreak <= 1) configSettings.shortBreak = 1;
        }
        updateConfigUI();
    });
});

initializeAll();

// Button listeners
function incrementButton(event) {
    console.log(event.id);
}

// Update config UI
function updateConfigUI() {
    sessionLabel.textContent = configSettings.session.toString();
    breakLabel.textContent = configSettings.shortBreak.toString();
    longBreakLabel.textContent = configSettings.longBreak.toString();
}

// Initialize
function initializeAll() {
    sessionLabel.textContent    = defaultSettings['session'].toString();
    breakLabel.textContent      = defaultSettings['shortBreak'].toString();
    longBreakLabel.textContent  = defaultSettings['longBreak'].toString();
    timerText.textContent       = defaultSettings['session'].toString();
}

// Timer functions
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
    } else {
        timerText.textContent = currTime.toString();     
    }
    console.log(currTime--);
}

// on setting updates, convert minutes to seconds, store in config settings as seconds
// debug
// startTimer();
