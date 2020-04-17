// Constants
const SESSION = "Session";
const SBREAK = "Sbreak";
const LBREAK = "Lbreak";

var CURRENT_INTERVAL = "";
var NUM_INTERVALS = 0;

const MAX_SESSION = 2400; 
const MAX_SBREAK = 600;
const MAX_LBREAK = 3600;

const MIN_SESSION = 60;
const MIN_SBREAK = 300;
const MIN_LBREAK = 300;

const DEFAULT_SESSION = 1500;
const DEFAULT_SBREAK = 300;
const DEFAULT_LBREAK = 1800;

var CONFIG_SESSION = DEFAULT_SESSION;
var CONFIG_SBREAK = DEFAULT_SBREAK;
var CONFIG_LBREAK = DEFAULT_LBREAK;

// DOM elements
const timerText     = document.querySelector('.timer-text');
const startButton   = document.querySelector('#start-btn');
const pauseButton   = document.querySelector('#pause-btn');
const stopButton    = document.querySelector('#stop-btn');
const resetButton   = document.querySelector('.reset-btn');

// Session elements
const sessionLabel  = document.querySelector('#session-label');
const breakLabel  = document.querySelector('#break-label');
const longBreakLabel  = document.querySelector('#lng-break-label');
const decrementButtons = Array.from(document.querySelectorAll('.dcr-btn'));
const incrementButtons = Array.from(document.querySelectorAll('.incr-btn'));

// Interval ID to store the session state
var intervalID = '';
var currTime = 0;

// Default timer settings
const defaultSettings = {
    session : 1500,
    shortBreak : 300,
    longBreak : 1800
};
// User defined timer settings, affected by user-input
var configSettings = {
    session : 1500,
    shortBreak : 300,
    longBreak : 1800
};

// Button listeners
function incrementButton(event) {
    console.log(event.id);
}

// Update config UI
function updateConfig() {
    sessionLabel.textContent =  formatTime(CONFIG_SESSION);
    breakLabel.textContent      = formatTime(CONFIG_SBREAK);
    longBreakLabel.textContent  = formatTime(CONFIG_LBREAK);
}

// Update the timer text to reflect the current interval
function resetTimerText(interval) {
    clearInterval(intervalID);
    currTime = interval; 
    timerText.textContent = formatTime(interval);
}

// Initialize
function initializeAll() {
    sessionLabel.textContent    = formatTime(DEFAULT_SESSION);
    breakLabel.textContent      = formatTime(DEFAULT_SBREAK);
    longBreakLabel.textContent  = formatTime(DEFAULT_LBREAK);
    timerText.textContent       = formatTime(DEFAULT_SESSION);
    currTime            = DEFAULT_SESSION;
    CURRENT_INTERVAL    = SESSION;
    NUM_INTERVALS       = 1;
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

function stopTimer() {
    clearInterval(intervalID);
    switch(CURRENT_INTERVAL) {
        case SESSION:
            resetTimerText(CONFIG_SESSION);
            break;
        case SBREAK:
            resetTimerText(CONFIG_SBREAK);
            break;
        case LBREAK:
            resetTimerText(CONFIG_LBREAK);
    }
    updateConfig();
}

function updateTimer() {

    timerText.textContent = formatTime(currTime);

    if(currTime <= 0) {
        clearInterval(intervalID);
        // On any interval end, play a sound
        if(CURRENT_INTERVAL === SESSION) {
            if(NUM_INTERVALS >= 4) {
                CURRENT_INTERVAL = LBREAK;
                currTime = CONFIG_LBREAK;
            }
            else {
                NUM_INTERVALS += 1;
                CURRENT_INTERVAL = SBREAK;
                currTime = CONFIG_SBREAK;
            }
        }
        else if(CURRENT_INTERVAL === SBREAK) {
            CURRENT_INTERVAL = SESSION;
            currTime = CONFIG_SESSION;
        }
        else if(CURRENT_INTERVAL === LBREAK) {
            CURRENT_INTERVAL = SESSION;
            NUM_INTERVALS = 1;
            currTime = CONFIG_SESSION;
            // Display message to show user finished task/reached long break
        }
        
        return;
    }
    
    currTime--;
}

// Convert seconds into minutes + seconds formatted string "mm:ss" 
function formatTime(seconds) {
    var m = Math.floor(seconds/60);
    var s = seconds%60;
    return m.toString().padStart(2, '0') + ":" + s.toString().padStart(2,'0');
}  

// Reset settings to default
function resetSettings() {
    initializeAll();

    CONFIG_SESSION  = DEFAULT_SESSION;
    CONFIG_SBREAK   = DEFAULT_SBREAK;
    CONFIG_LBREAK   = DEFAULT_LBREAK;

    clearInterval(intervalID);
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetSettings);

incrementButtons.forEach( (button) => {
    button.addEventListener('click', function() {
        if (button.id.includes('session')) {
            CONFIG_SESSION += 60;
            if (CONFIG_SESSION > MAX_SESSION) CONFIG_SESSION = MAX_SESSION;
            if (CURRENT_INTERVAL === SESSION) resetTimerText(CONFIG_SESSION);
            
        }
        else if (button.id.includes('lbreak')) {
            CONFIG_LBREAK += 60;
            if (CONFIG_LBREAK > MAX_LBREAK) CONFIG_LBREAK = MAX_LBREAK;
            if (CURRENT_INTERVAL === LBREAK) resetTimerText(CONFIG_LBREAK);
            
        }
        else if (button.id.includes('sbreak')) {
            CONFIG_SBREAK += 60;
            if (CONFIG_SBREAK > MAX_SBREAK) CONFIG_SBREAK = MAX_SBREAK;
            if (CURRENT_INTERVAL === SBREAK) resetTimerText(CONFIG_SBREAK);
        }
       
        updateConfig();
    });
});

decrementButtons.forEach( (button) => {
    button.addEventListener('click', function() {
        if (button.id.includes('session')) {
            CONFIG_SESSION -= 60;
            if (CONFIG_SESSION <= MIN_SESSION) CONFIG_SESSION = MIN_SESSION;
            if (CURRENT_INTERVAL === SESSION) resetTimerText(CONFIG_SESSION);
        }
        else if (button.id.includes('lbreak')) {
            CONFIG_LBREAK -= 60;
            if (CONFIG_LBREAK <= MIN_LBREAK) CONFIG_LBREAK = MIN_LBREAK;
            if (CURRENT_INTERVAL === LBREAK) resetTimerText(CONFIG_LBREAK);
        }
        else if (button.id.includes('sbreak')) {
            CONFIG_SBREAK -= 60;
            if (CONFIG_SBREAK <= MIN_SBREAK) CONFIG_SBREAK = MIN_SBREAK;
            if (CURRENT_INTERVAL === SBREAK) resetTimerText(CONFIG_SBREAK);
        }
        
        updateConfig();
    });
});

initializeAll();
