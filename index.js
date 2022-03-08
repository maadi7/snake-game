const eat = new Audio('./eat.mp3.mp3');
const gameover = new Audio('./gameover.mp3.wav');
let snakearr = [
    {x:1, y:2}
];
let velocity = {x: 0, y:0};
let food = {x:8, y:13};
let lastPaintTime = 0;
let speed = 15;
let point = 0;
let box = document.getElementById('box');
let score = document.getElementById('sc');

// Rendering.....
function main(ctime){ 
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    } 
    lastPaintTime = ctime; 
    gameEngine();        
}

function isCollide(array){
    for (let i= 1; i < array.length; i++) {
        if(snakearr[0].x === array[i].x && snakearr[0].y === array[i].y){
            //console.log("1");
            return true;
        }
    }
    if(snakearr[0].x > 40 || snakearr[0].x <= 0 || snakearr[0].y <= 0 || snakearr[0].y > 40){
        console.log("2");
        return true;
    }
    //console.log("3");
    return false;
    
}



//game function
function gameEngine() {
 // updating snake and food

 if(isCollide(snakearr)){
    console.log("4");
    snakearr = [
        {x:1, y:2}
     ];
    velocity = {x: 0, y:0};
    food = {x:8, y:13};
    point = 0;
    score.innerHTML = "Point: " + point;
    gameover.play();
   }
   
   
  if(snakearr[0].x === food.x && snakearr[0].y === food.y){
    eat.play();  
    point = point + 1;
    score.innerHTML = "Point: " + point;
    snakearr.unshift({x:velocity.x + snakearr[0].x, y:velocity.y + snakearr[0].y });
    let a = 2;
    let b = 39;
    food = {x: Math.round(a +(b-a)*Math.random()), y: Math.round(a +(b-a)*Math.random())};
  }
 // Moving snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
     snakearr[i+1] = {...snakearr[i]};
   }

 snakearr[0].x += velocity.x;
 snakearr[0].y += velocity.y;

    
    // display of food and snake and snake body

    box.innerHTML = "";
    snakearr.forEach((e,index) => {
       //console.log(e);
        headelement = document.createElement('div');
        headelement.style.gridRowStart = e.y;
        headelement.style.gridColumnStart = e.x;
        
        if(index === 0){
            headelement.classList.add('head');
        }
        else{
            headelement.classList.add('body');
        }
       
        //console.log(headelement);
        box.appendChild(headelement);
        
    });

    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    box.appendChild(foodelement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
   // console.log("fwf00");
    velocity = {x: 0, y: 1};
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            velocity.x = 0;
            velocity.y = -1;
            break;
        case "ArrowDown":
            console.log("arrod");
            velocity.x = 0;
            velocity.y = 1;
            break;   
        case "ArrowRight":
            console.log("arrowr");
            velocity.x = 1;
            velocity.y = 0;
            break;
                     
        case "ArrowLeft":
            console.log("arrowl");
            velocity.x = -1;
            velocity.y = 0;
            break;

        default:
            break;
                 
    }
                
});
            