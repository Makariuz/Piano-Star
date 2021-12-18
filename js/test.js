//IDs
const startBtn = document.getElementById("start-button");

//BUILDING CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//VARIABLE DECLARATION
let notes =  []; //falling notes array
let drawKeyPads = [];
let frames = 0;
let score = 0;
let lives = 3;



//IMG DECLARATION
let keyA = "https://e1.pngegg.com/pngimages/568/796/png-clipart-keyboard-buttons-w-computer-keyboard-key-thumbnail.png";

//CLASS DECLARATION
class Keypad {
    constructor(img, x, y){
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = 50;
        this.height = 50;
    }
    drawKeys(){
        let keyImg = new Image();
        keyImg.src = this.img;
        ctx.drawImage(keyImg, this.x, this.y, this.width, this.height);
    }
}


//ARRAY KEY PUSH (Test)
//let 

let keyP = []

keyP.push(
  new Keypad(keyA, 20, canvas.height -70),
  new Keypad(keyA, 200, canvas.height -70),
  new Keypad(keyA, 300, canvas.height -70)
)



function draw(){
  keyP.forEach(k => {
    k.drawKeys()
    //console.log(k)
    console.log(keyP)
  })
    ctx.fillRect(155, canvas.height - 70, 50, 50)
}



// LOAD START BUTTON (TEST)
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      document.getElementById("start-button").disabled = true;  
      startGame();
    };
}

//START BUTTON (TEST)

function startGame(){
    console.log("test")
  //const keyP = new Keypad(20, 100, keyS)
  //keyP.drawKeys()
   draw()
  
}
