const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const obstacles = [] //creating a class due to it having multiple obstacles
let frames = 0
const arrKeys = []
const clickedKeys = []



  // left canvas
  const aImg = new Image()
  aImg.src = "../images/A.webp"
  const sImg = new Image()
  sImg.src = "../images/S.webp"
  const dImg = new Image()
  dImg.src = "../images/D.webp"

  
  
  // right canvas
  const jImg = new Image()
  jImg.src = "../images/J.webp"
  const kImg = new Image()
  kImg.src = "../images/K.webp"
  const lImg = new Image()
  lImg.src = "../images/L.webp"
  

class Block {
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
  
    draw(){
      this.move();
      ctx.fillStyle = this.color;
      //ctx.fillColor = "red";
      //ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillRect(this.x, this.y, this.width, -this.height)
      //ctx.fillRect(0,10,30,100);
        }
    
    bottom() {
            return this.y + this.height;
    }
}


class Letters{
    constructor(img, xPosition, yPosition, letterWidth, letterHeight){
        this.img = img;
        this.x = xPosition;
        this.y = yPosition;
        this.width = letterWidth;
        this.height = letterHeight;
    }

    draw(){
        ctx.clearRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    clicked(){
        ctx.clearRect(this.x, this.y -70, this.width + 1, this.height + 1);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    top() {
        return this.y;
      }

    bottom() {
        return this.y + this.height();
      }

    collision(obstacle) {
        return !(this.bottom() < obstacle.top())
    }
}


arrKeys.push(
    new Letters(aImg, 20,  canvas.height -70, 50 ,50),
    new Letters(sImg, 80,  canvas.height - 70, 50,50),
    new Letters(dImg, 140, canvas.height - 70, 50,50),
    new Letters(lImg, canvas.width - 60, canvas.height - 70, 50,50),
    new Letters(kImg, canvas.width - 120, canvas.height - 70, 50,50),
    new Letters(jImg, canvas.width - 180, canvas.height - 70, 50,50)
    )
clickedKeys.push(
    new Letters(aImg,20, canvas.height, 50 ,50), 
    new Letters(sImg, 80, canvas.height, 50,50),
    new Letters(dImg, 140, canvas.height, 50,50)   
)

//const test = new Letters(aImg, 21, canvas.height - 60, 49,49);



//function to load each key
function imgDraw(){
    arrKeys.forEach(k => {
         k.draw()
     })
 }

/* function clicked(){
    clickedKeys.forEach(cK => {
         cK.draw()
     })
} */


  function updateObstacles(){
    obstacles.forEach(obstacle => {
      obstacle.draw()
    });
    frames++;
    
    //tempo
    if (frames % 40 === 0){ 
        obstacles.push(new Block(35, 0, 30, 30, "red"))
        //console.log(frames)
       
    } 
   /*  if (frames === frames2) {
        obstacles.push(new Block(70, 0, 30, 30, "yellow"))
        
    } */
    }



/* 
aImg.addEventListener('load', e => {
    ctx.drawImage(aImg, 20, canvas.height - 70, 50,50);
    ctx.drawImage(sImg, 80, canvas.height - 70, 50,50);
    ctx.drawImage(dImg, 140, canvas.height - 70, 50,50);

   
  });
jImg.addEventListener('load', e => {
    ctx.drawImage(lImg, canvas.width - 60, canvas.height - 70, 50,50);
    ctx.drawImage(kImg, canvas.width - 120, canvas.height - 70, 50,50);
    ctx.drawImage(jImg, canvas.width - 180, canvas.height - 70, 50,50);  

   
  });
 

  document.addEventListener("keydown", (event) => {
    

    switch (event.keyCode) {
      case 65:
          ctx.clearRect(20, canvas.height - 70, 50, 50)
          ctx.drawImage(aImg, 21, canvas.height - 60, 49,49);
        break;
      case 83:
            ctx.clearRect(80, canvas.height - 70, 50, 50)
            ctx.drawImage(sImg, 81, canvas.height - 60, 49,49);
        break;
      case 68:
        ctx.clearRect(140, canvas.height - 70, 50, 50)
        ctx.drawImage(dImg, 141, canvas.height - 60, 49,49);
        break;
      case 74:
        ctx.clearRect(canvas.width - 60, canvas.height - 70, 50, 50)
        ctx.drawImage(jImg, canvas.width - 61, canvas.height - 60, 49,49);
        console.log("74")
        break;
      case 75:
        ctx.clearRect(canvas.width - 120, canvas.height - 70, 50, 50)
        ctx.drawImage(kImg, canvas.width - 121, canvas.height - 60, 49,49);
        break;
      case 76:
        ctx.clearRect(canvas.width - 180, canvas.height - 70, 50, 50)
        ctx.drawImage(lImg, canvas.width - 181, canvas.height - 60, 49,49);
        break;
    }
  });

  document.addEventListener("keyup", (event) => {

    switch (event.keyCode){
        case 65:
            ctx.clearRect(21, canvas.height - 60, 49, 49)
            ctx.drawImage(aImg, 20, canvas.height - 70, 50,50);
        break;
        case 83:
            ctx.clearRect(81, canvas.height - 60, 49, 49)
            ctx.drawImage(sImg, 80, canvas.height - 70, 50,50);
            break;
          case 68:
            ctx.clearRect(141, canvas.height - 60, 49, 49)
            ctx.drawImage(dImg, 140, canvas.height - 70, 50,50);
            break;
          case 74:
            ctx.clearRect(canvas.width - 61, canvas.height - 60, 49, 49)
            ctx.drawImage(lImg, canvas.width - 60, canvas.height - 70, 50,50);
            break;
          case 75:
            ctx.clearRect(canvas.width - 121, canvas.height - 60, 49, 49)
            ctx.drawImage(kImg, canvas.width - 120, canvas.height - 70, 50,50);
            break;
          case 76:
            ctx.clearRect(canvas.width - 181, canvas.height - 60, 49, 49)
            ctx.drawImage(jImg, canvas.width - 180, canvas.height - 70, 50,50);  
            break;
    }
  })
  
 */
  
  
  function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  } 

  window.onload = function() {
    
    document.getElementById("start-button").onclick = function() {
      document.getElementById("start-button").disabled = true;  
      startGame();
    };
  
  };

function startGame(){
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // this 
 // and the below, the image does not repeat itself
        updateObstacles()
        imgDraw()
        collision()
      },20)
      
  }


function checkForCollision() {
    const collision = obstacles.some((obstacle) => {
        console.log(collision);
    });
  
    if (collision) {
        console.log(collision);
    }
  }


  window.addEventListener("keydown", (event) => {
    

    switch (event.keyCode) {
      case 65:
          ctx.clearRect(20, canvas.height - 70, 50, 50)
          ctx.drawImage(aImg, 21, canvas.height - 60, 49,49);
        break;
      case 83:
            ctx.clearRect(80, canvas.height - 70, 50, 50)
            ctx.drawImage(sImg, 81, canvas.height - 60, 49,49);
        break;
      case 68:
        ctx.clearRect(140, canvas.height - 70, 50, 50)
        ctx.drawImage(dImg, 141, canvas.height - 60, 49,49);
        break;
      case 74:
        ctx.clearRect(canvas.width - 60, canvas.height - 70, 50, 50)
        ctx.drawImage(lImg, canvas.width - 61, canvas.height - 60, 49,49);
        console.log(event.keyCode)
        break;
      case 75:
        ctx.clearRect(canvas.width - 120, canvas.height - 70, 50, 50)
        ctx.drawImage(kImg, canvas.width - 121, canvas.height - 60, 49,49);
        console.log(event.keyCode)
        break;
      case 76:
        ctx.clearRect(canvas.width - 180, canvas.height - 70, 50, 50)
        ctx.drawImage(jImg, canvas.width - 181, canvas.height - 60, 49,49);
        console.log(event.keyCode)
        break;
    }
  });

  window.addEventListener("keyup", (event) => {

    switch (event.keyCode){
        case 65:
            ctx.clearRect(21, canvas.height - 60, 49, 49)
            ctx.drawImage(aImg, 20, canvas.height - 70, 50,50);
        break;
        case 83:
            ctx.clearRect(81, canvas.height - 60, 49, 49)
            ctx.drawImage(sImg, 80, canvas.height - 70, 50,50);
            break;
          case 68:
            ctx.clearRect(141, canvas.height - 60, 49, 49)
            ctx.drawImage(dImg, 140, canvas.height - 70, 50,50);
            break;
          case 74:
            ctx.clearRect(canvas.width - 61, canvas.height - 60, 49, 49)
            ctx.drawImage(lImg, canvas.width - 60, canvas.height - 70, 50,50);
            break;
          case 75:
            ctx.clearRect(canvas.width - 121, canvas.height - 60, 49, 49)
            ctx.drawImage(kImg, canvas.width - 120, canvas.height - 70, 50,50);
            break;
          case 76:
            ctx.clearRect(canvas.width - 181, canvas.height - 60, 49, 49)
            ctx.drawImage(jImg, canvas.width - 180, canvas.height - 70, 50,50);  
            break;
    }
  })