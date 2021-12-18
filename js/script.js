//IDs
const startBtn = document.getElementById("start-button");

//BUILDING CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//VARIABLE DECLARATION
let fallNotes =  []; //falling notes array
let drawKeyPads = [];
let frames = 0;
let score = 0;
let lives = 3;
let keyP = [] //keyPads
let livesLeft = []; //lives left in game
let randomNotesX = [33, 113, 193,485,565,645]
let song = [30]
let twinkleStar = 'AABBCCD'

let keypadKeys = [65, 83, 68, 74, 74, 76]
//AUDIOS

let twinkle = new Audio()
twinkle.src = "/sound/twinklez.m4a"

//STYLES

//ctx.strokeStyle = "Burlywood"

//IMG DECLARATION
let keyA = "/images/A.webp";
let keyS = "/images/S.webp";
let keyD = "/images/D.webp";

let keyJ = "/images/J.webp";
let keyK = "/images/K.webp";
let keyL = "/images/L.webp";

//CLASS DECLARATION (missing img and this.img for the draw image)
class Keypad {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = color;
    }
    drawKeys(){
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.color
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    top() {
        return this.y;
    }
}



class Notes {
    constructor(argX, argY, argWidth, argHeight, argColor) {
        this.x = argX;
        this.y = argY;
        this.width = argWidth;
        this.height = argHeight;
        this.color = argColor;
        this.speedY = -3;
      }
    
    move(){
        this.y -= this.speedY;
    }
    
    drawNotes(){
        this.move();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    notePos(){
        return this.y
    }
}

class Health {
    constructor(healthX, healthY, color){
        this.healthX = healthX;
        this.healthY = healthY;
        this.color = color;
        this.width = 35;
        this.height = 35;
    }

    drawLives(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.healthX, this.healthY, this.width, this.height)
    }
  
    
}


//ARRAY KEY PUSH to KEYPADS

keyP.push(
    new Keypad(20, canvas.height - 70, "white"),
    new Keypad(100, canvas.height - 70, "white"),
    new Keypad(180, canvas.height - 70, "white"),

    new Keypad(canvas.width - 70, canvas.height - 70, "white"),
    new Keypad(canvas.width - 150, canvas.height - 70, "white"),
    new Keypad(canvas.width - 230, canvas.height - 70, "white")
)

livesLeft.push(
    new Health(280, canvas.height - 70, "burlywood"),
    new Health(340, canvas.height - 70, "burlywood"),
    new Health(400, canvas.height - 70, "burlywood"),
)

//FUNCTIONS & stuff

let count = 0
function draw(){
    frames++
    //draw the keyPad
    keyP.forEach(k => {
        k.drawKeys()
    })
    
    song.forEach(songNote => {
        if (songNote === 30){
        if (frames % songNote === 0) { 
            fallNotes.push(new Notes(shuffleNote(randomNotesX), 0, 25, 25, "orange")) 
        }
        } else if (songNote === 120){
            if (frames % songNote === 0) { 
                fallNotes.push(new Notes(shuffleNote(randomNotesX), 0, 25, 25, "white")) 
            } 
        }
        
    })
   
    fallNotes.forEach(n => {
        n.drawNotes()
    });
    livesLeft.forEach(h => {
        h.drawLives()
    })
    if (frames > 800){
        clearInterval(myInterval)
    }
    fallNotes.forEach(noteScore => {
        if(noteScore.notePos() === 330) {
            playSong()
            console.log(noteScore)
            //clearInterval(myInterval)
        }
    })
}

let z = -1;

function playSong(){
    z++
    let keyNote = twinkleStar.charAt(z)
    twinkle.play()
    if (keyNote === "D") {
        //twinkle.pause()
        clearInterval(myInterval)
    } if (z > 9){
        
    }
}


function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
} 

function shuffleNote(randomNote){
    return randomNote[Math.floor(Math.random()*randomNote.length)]
}

function gameScore(){
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.fillText('SCORE', 300, 50);
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(score, 350, 100);
}

//check if its a clickable score
function clicked(){
    let point = fallNotes[0].y
    let kP = keyP[0].y
    console.log(`value of keyPad is: ${kP} and the value of note is: ${point}.`)

    fallNotes.forEach(noteScore => {
        if(noteScore.notePos() > 330 && noteScore.notePos() < 380) {
           score++
        } 
    })  

/*     fallNotes.forEach(missedNote => {
        if(missedNote.notePos() < 330 && missedNote.notePos() > 380){
            lifeLeft()
        }
    }) */
    
}

function unClicked(){
    keyP.push(new Keypad(20, canvas.height - 70, "white"))

}

function lifeLeft(){
    lives -= 1
   // fallNotes.shift()
    livesLeft.shift()
    //console.log(lives)
    if (lives === 0) {
        livesLeft.shift()
        alert("haha you lost")
        clearInterval(myInterval)
    }
}

function stop(){
    if (score > 10){
        clearInterval(myInterval)
    }
}

//EVENT LISTENERS
document.addEventListener("keydown", (e) => {
    switch(e.keyCode){
        case 65:
            keyP.push(new Keypad(20, canvas.height - 70, "red"))
            clicked()
        break;
        case 83:
            keyP.push(new Keypad(100, canvas.height - 70, "red"))
            clicked()
        break;
        case 68:
            keyP.push(new Keypad(180, canvas.height - 70, "red"))
            clicked()
        break;
        case 74:
            keyP.push(new Keypad(470, canvas.height - 70, "red"))
            clicked()
        break;
        case 75:
            keyP.push(new Keypad(550, canvas.height - 70, "red"))
            clicked()
        break;
        case 76:
            keyP.push(new Keypad(630, canvas.height - 70, "red"))
            clicked()
        break;
           
    }
})

document.addEventListener("keyup", (e) => {
    switch(e.keyCode){
        case 65:
            keyP.push(new Keypad(20, canvas.height - 70, "white"))
            unClicked()
        break;
        case 83:
            keyP.push(new Keypad(100, canvas.height - 70, "white"))
            unClicked()
        break;
        case 68:
            keyP.push(new Keypad(180, canvas.height - 70, "white"))
            unClicked()
        break;
        case 74:
            keyP.push(new Keypad(470, canvas.height - 70, "white"))
            unClicked()
        break;
        case 75:
            keyP.push(new Keypad(550, canvas.height - 70, "white"))
            unClicked()
        break;
        case 76:
            keyP.push(new Keypad(630, canvas.height - 70, "white"))
            unClicked()
        break;
          
    }
})

// LOAD START BUTTON (TEST)
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      document.getElementById("start-button").disabled = true;  
      startGame();
      myInterval = setInterval(startGame, 17);
    }; 
}

//START BUTTON (TEST)




function startGame(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    draw()
    
    gameScore()

   
    
}
