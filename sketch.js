var shark, sharkImg, sharkEat, sharkDead;
var seaImg, sea;
var gameState = PLAY;
var health, lifeTime;
var PLAY;
var END = 0;
var fishGroup, fish1, fish2, fish3, fish4;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var score, scoreSound;


function preload(){
  sharkImg = loadImage("shark.png");
  sharkEat = loadImage("sharkEat.png");
  seaImg = loadImage("sea.jpg");
  fish1 = loadImage("fish1.png");
  fish2 = loadImage("fish2.png");
  fish3 = loadImage("fish3.png");
  fish4 = loadImage("fish4.png");
  
  obstacle1 = loadImage("submarine.png");
  obstacle2 = loadImage("stingray.png");
  obstacle3 = loadImage("octopus2.png");
  obstacle4 = loadImage("snake1.png");
  
  sharkDead = loadImage("shark-1.png");

}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
   
  
  shark = createSprite(displayWidth-1000,displayHeight-900,10,20);
  shark.addImage(sharkImg);
  shark.scale = 0.35;

  
  health = 100;
  lifeTime = 0;
  score = 0;
  
  fishGroup = createGroup();
  obstacleGroup = createGroup();
  
  shark.setCollider("rectangle",20,10,700,280)
  
  camera.on();

}

function draw() {
  background(seaImg);
  drawSprites();
  textSize(25);
  fill("red");
  text("Health : " + health,shark.x-700,shark.y-300);
  
  textSize(25);
  fill("red");
  text("LifeTime : "+lifeTime,shark.x-700,shark.y-270);

  textSize(25);
  fill("red");
  text("Score : "+ score,shark.x-700,shark.y-240);

  textSize(25);
  fill("black");
  text("Note: Use the arrow keys to move around, use the right arrow key to move towards the right",shark.x-700,shark.y-400);

  if(camera.isActive()){
    camera.x = shark.x;
    camera.y = shark.y;
  }
  
  if(gameState === PLAY){
    console.log(shark.x, shark.y);

    
    
    lifeTime = lifeTime + Math.round(getFrameRate()/61)
    
    // making the health system.
     if(frameCount % 30 === 0){
       health = health - Math.round(random(1,5));
     }  
  

  
  if(keyDown(UP_ARROW) && shark.y > displayHeight-1100){
      shark.y = shark.y-(10 + lifeTime/10);
  }
  
  if(keyDown(DOWN_ARROW) && shark.y < displayHeight+800){
 shark.y = shark.y+(10 + lifeTime/10);
} 
console.log(displayHeight+200);
    
if(keyDown(LEFT_ARROW)){
  shark.x = shark.x - (10 + lifeTime/10);
}
    
if(keyDown(RIGHT_ARROW)){
  shark.x = shark.x + (10 + lifeTime/10);
}
    
    if(health <= 0){
      gameState = END;
    }
    
    //spawnFish();
    
   for(var j = 0; j < fishGroup.length; j++){
      if(fishGroup.get(j).isTouching(shark)){
        score = score + 1;
        health = health + Math.round(random(1,5));
        shark.addImage(sharkEat);
        shark.scale = 1;
        shark.setCollider("rectangle",-20,-30,50,170,50);
        //shark.debug = true;
        fishGroup.get(j).destroy();
      }
    }

 

  spawnFish();

    
    
    for(var i = 0; i < obstacleGroup.length; i++){
      if(obstacleGroup.get(i).isTouching(shark)){
        health = health - Math.round(random(1,5));
        shark.addImage(sharkImg);
        shark.scale = 0.35;
        shark.setCollider("rectangle",20,10,700,280);
        obstacleGroup.get(i).destroy();
      }
    }

  
 spawnObstacles();  
    
  }
else if(gameState === END){
  textSize(30);
  text("Press space to restart the game",shark.x,shark.y-50);
  
  health = 0;

  
  fishGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  
  
  shark.addImage(sharkDead);
  shark.scale = 1;
  
  if(keyWentDown("space")){
    reset();
  }
}
  
}

function reset(){
  gameState = PLAY;
  
  shark.x = displayWidth-1000;
  shark.y = displayHeight-650;

  obstacleGroup.destroyEach();
  fishGroup.destroyEach();
  shark.addImage(sharkImg);
  shark.scale = 0.35;
  lifeTime = 0;
  score=0;
  health = 100;
}

function spawnFish(){
  if(frameCount % 40 === 0){
    var fish = createSprite(random(displayWidth-100, displayWidth*10),random(displayHeight-700,displayHeight-70),10,10);

    
    var rand = Math.round(random(1,4));
    switch(rand){
        case 1: fish.addImage(fish1);
                break;
        case 2: fish.addImage(fish2);
                break;
        case 3: fish.addImage(fish4);
                fish.scale = 0.7;
                break;
        case 4: fish.addImage(fish3);
                fish.scale = 0.5;
                break;
        default:break;
    }
    
    fish.lifetime = 2000;
    
    fishGroup.add(fish);
    return fish;
  }
    
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(random(displayWidth-100,displayWidth*10),random(displayHeight-700,displayHeight-70),10,10);

    
    
    var randomise = Math.round(random(1,4));
    switch(randomise){
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.3;
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default:break;
    }
    obstacle.lifetime = 1000;
    
    obstacleGroup.add(obstacle);
    return obstacle;
  }
} 










