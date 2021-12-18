const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const obstacles = [] //creating a class due to it having multiple obstacles
let frames = 0


  // left canvas
  const aImg = new Image()
  aImg.src = "../images/A.webp"
  const sImg = new Image()
  sImg.src = "../images/S.webp"
  const dImg = new Image()
  dImg.src = "../images/D.webp"
  const heart = new Image()
  heart.src = "../images/heart.png"

  
  
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
      ctx.fillRect(this.x, this.y, this.width, -this.height)
        }
    top() {
            return this.y;
          }
    bottom() {
            return this.y + this.height;
    }
}


const letters = {
    aImg: aImg,
    sImg: sImg,
    dImg: dImg,
    jImg: jImg,
    kImg: kImg,
    lImg: lImg,
    heart: heart,
    x: 20,
    y: canvas.height - 70,
    size: 2,

    width: function () {
        return this.aImg.width / this.size && 
        this.sImg.width / this.size  &&
        this.dImg.width / this.size
      },

    height: function () {
        return this.aImg.height / this.size &&
        this.sImg.height / this.size &&
        this.dImg.height / this.size
      },

    draw: function(){
        ctx.clearRect(this.x, this.y,this.y, this.width(), this.height() )
        ctx.drawImage(this.aImg, this.x, this.y, this.width(), this.height())
        ctx.drawImage(this.sImg, this.x + 80, this.y, this.width(), this.height())
        ctx.drawImage(this.dImg, this.x + 160, this.y, this.width(), this.height())

       /*  let my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "red");
        my_gradient.addColorStop(1, "purple");   
        ctx.fillStyle = my_gradient */
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.x + 250, this.y, this.width() + 100, this.height())
        ctx.drawImage(this.heart, this.x + 255, this.y, this.width(), this.height())
        ctx.drawImage(this.heart, this.x + 302, this.y, this.width(), this.height())
        ctx.drawImage(this.heart, this.x + 349, this.y, this.width(), this.height())

        ctx.drawImage(this.jImg, this.x + 440, this.y, this.width(), this.height())
        ctx.drawImage(this.kImg, this.x + 520, this.y, this.width(), this.height())
        ctx.drawImage(this.lImg, this.x + 600, this.y, this.width(), this.height())


    },

    clicked: function(){
        ctx.lineWidth = 5
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.x, this.y, this.width(), this.height())
       
       // ctx.drawImage(this.img, this.x + 1, this.y - 1, this.width() - 3, this.height() - 3)
    },

    top: function() {
        return this.y;
      },

    bottom: function() {
        return this.y + this.height();
      },

    collision: function(obstacle) {
        return !(this.bottom() > obstacle.top())
    }
}


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
    if (frames % 50 === 0) {
        obstacles.push(new Block(115, 0, 30, 30, "yellow"))
        
    } 

    if (frames === 120) {
       
        obstacles.push(new Block(195, 0, 30, 30, "blue"))
    } 

    if (frames === 180) {
       
        obstacles.push(new Block(195, 0, 30, 30, "blue"))
    } 

    
    }

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
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            updateObstacles()
            letters.draw()
            checkForCollision()
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.fillText('SCORE', 300, 50);
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.fillText('0', 350, 100);
          },20)
          
      }
    
    function checkForCollision() {
        const collision = obstacles.some((obstacle) => {
            return letters.collision(obstacle);
          // console.log("collided")
        });
      
        if (collision) {
            
            console.log(collision);
           
        }
      }


document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 65:
            letters.clicked()
        break;

    }
})

document.addEventListener("keyup", e => {
    switch(e.keyCode){
        case 65:
            letters.draw()
        break;
        
    }
})