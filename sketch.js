
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "kill";

var bg, bgImg

var monster_1Group
var monster_1, monster_1Img, splatImg
var monster_2Group
var monster_2, monster_2Img, orbImg

var hero, heroImg

var bulletGroup
var bullet,bulletImg

var life
//var full_life,fifth_life,fourth_life,third_life,second_life,no_life
var full_lifeImg,fifth_lifeImg,fourth_lifeImg,third_lifeImg,second_lifeImg,no_lifeImg

var score = 0;

function preload(){
	bgImg = loadImage("/assets/forest.png");
	monster_1Img = loadImage("/assets/monster_1.png");
	monster_2Img = loadImage("/assets/monster_2.png");
	splatImg = loadImage("/assets/splat.png")
	orbImg = loadImage("/assets/orb.png")

	heroImg = loadImage("/assets/Hero.png")

	bulletImg = loadImage("/assets/bullet.png")

	full_lifeImg = loadImage("/assets/full_life.png")
	fifth_lifeImg = loadImage("/assets/5:6_life.png")
	fourth_lifeImg = loadImage("/assets/4:6_life.png")
	third_lifeImg = loadImage("/assets/3:6_life.png")
	second_lifeImg = loadImage("/assets/2:6_life.png")
	no_lifeImg = loadImage("/assets/no_life.png")
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	bg = createSprite(displayWidth/2,displayHeight/2-40,20,2)
	bg.scale = 2.1;
	bg.addImage(bgImg);

	life = createSprite(displayWidth-1300,40,20,20);
	life.addImage(full_lifeImg);
	life.scale = 0.25;

	hero = createSprite(displayWidth-1150,displayHeight-300,50,50);
	hero.addImage(heroImg);
	hero.scale = 0.4;
	hero.debug = true;
    hero.setCollider("rectangle",0,0,260,260);



	monster_1Group = new Group();
	monster_2Group = new Group();

	bulletGroup = new Group();


	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(190);
  textSize(50);
  fill("white");
  text("score: ",+score,displayWidth-200,displayHeight/2-220);
  //text.depth = bg.depth+2;

if(gameState == "kill"){
if(keyDown("UP_ARROW")){
	hero.y = hero.y - 20;
}
if(keyDown("DOWN_ARROW")){
	hero.y = hero.y + 20;
}
if(keyDown("RIGHT_ARROW")){
	hero.x = hero.x + 20;
}
if(keyDown("LEFT_ARROW")){
	hero.x = hero.x - 20;
}


if(keyWentDown("SPACE")){
	bullet = createSprite(hero.x+65,hero.y-32,20,10);
	bullet.addImage(bulletImg);
	bullet.scale = 0.2;
	bullet.velocityX = 20;
	bulletGroup.add(bullet);
	//bullet = bullet-1;


	//hero.depth = bullet.depth;
	//hero.depth = hero.depth+2;

	//hero.addImage(heroImg);
}
if(keyWentUp("SPACE")){
	hero.addImage(heroImg);
}


if(monster_1Group.isTouching(bulletGroup)){
	for(m=0;m<monster_1Group.length;m++){
		if(monster_1Group[m].isTouching(bulletGroup)){
			monster_1Group[m].addImage(splatImg);
			//setTimeout(monster_1Group[m].destroy(),2000);
			monster_1Group[m].destroy();
			bulletGroup.destroyEach();

			score = score+2;
			console.log("score"+score);
		}
	}
}
if(monster_2Group.isTouching(bulletGroup)){
	for(i=0;i<monster_2Group.length;i++){
		if(monster_2Group[i].isTouching(bulletGroup)){
			monster_2Group[i].addImage(orbImg);
			monster_2Group[i].destroy();
			bulletGroup.destroyEach();

			score = score+5;
		}
	}
}
if(monster_1Group.isTouching(hero)){
	for(var i=0; i<monster_1Group.length; i++){
		if(monster_1Group[i].isTouching(hero)){
			monster_1Group[i].destroy();
			life.addImage(fifth_lifeImg);
		}
		//if(monster_1Group[i].isTouching(hero)){
			//monster_1Group[i].destroy();
			//life.addImage(fourth_lifeImg);
		//}
	}
}
if(monster_2Group.isTouching(hero)){
	for(var i=0; i<monster_2Group.length; i++){
		if(monster_2Group[i].isTouching(hero)){
			monster_2Group[i].destroy();
			life.addImage(third_lifeImg);
		}
	}
}
}



	monsters();

  drawSprites();
}

function monsters(){
	if(frameCount%50 == 0){
        monster_1 = createSprite(random(900,1500),random(300,700),40,40);
        monster_1.addImage(monster_1Img);
        monster_1.scale = 0.40;
        monster_1.velocityX = -5;
        monster_1Group.add(monster_1);
        monster_1.lifetime = 400;

        monster_1.debug = true;
        monster_1.setCollider("rectangle",0,0,160,140);
    }
	if(frameCount%150 == 0){
        monster_2 = createSprite(random(900,1500),random(300,700),20,20);
        monster_2.addImage(monster_2Img);
        monster_2.scale = 0.15;
        monster_2.velocityX = -10;
        monster_2Group.add(monster_2);
        monster_2.lifetime = 400;

        monster_2.debug = true;
        monster_2.setCollider("rectangle",0,0,100,80);
	}
}