var score = 0;
var knife, knifeImg;
var fruits, fruitGroup;
var background, backgroundImg;
var bomb, bombGroup;
var watermelonImg, appleImg, mangoImg, bananaImg, orangeImg, pomegranetImg, pineappleImg, bombImg;
var gamestate = "play";
var gameOver, gameOverImg;
var timer = 120;
var gameoverSound, fruitcutSound;

function preload() {
        watermelonImg = loadImage("./assets/watermelon.png");
        appleImg = loadImage("./assets/apple.png");
        bananaImg = loadImage("./assets/banana.png");
        pomegranetImg = loadImage("./assets/pomegranet.png");
        orangeImg = loadImage("./assets/orange.png");
        pineappleImg = loadImage("./assets/pineapple.png");
        mangoImg = loadImage("./assets/mango.png");
        knifeImg = loadImage("./assets/knife.png");
        backgroundImg = loadImage("./assets/background.jpg");
        bombImg = loadImage("./assets/bomb.png");
        gameOverImg = loadImage("./assets/gameover.png");
        gameoverSound = loadSound("./assets/gameover.wav");
        fruitcutSound = loadSound("./assets/fruitcut.mp3");


}

function setup() {
        createCanvas(400, 675);
        

        knife = createSprite(200, 200);
        knife.addImage(knifeImg);
        knife.scale = 0.5;


        fruitGroup = createGroup();
        bombGroup = createGroup();

}

function draw() {
        background(backgroundImg);

        textSize(20);
        fill("white")
        text("Score " + score, 35, 35); 


        if (gamestate === "play") {
        spawnFruits();
        spawnBomb();

        knife.y = mouseY;
        knife.x = mouseX; 

        textSize(35);
        fill("red");
        text(timer, 160 ,50);

        if (knife.isTouching(bombGroup) || timer === 0) {
                gamestate = "end";
                gameoverSound.play();
        }


        }

        if (gamestate === "end") {
                fruitGroup.destroyEach();
                bombGroup.destroyEach();
                knife.destroy();

                var gameOver = createSprite(200,310);
                gameOver.addImage(gameOverImg);


        }

        console.log(gamestate);

        if (frameCount % 30 === 1) {
                timer = timer-1        
        }

        console.log();

        drawSprites();

}

function spawnFruits() {
        if (frameCount % 40 === 0) {
                var fruits = createSprite(Math.round(random(1, 675)), Math.round(random(1, 25)));
                fruits.velocityY = 2;
                fruitGroup.add(fruits)

                //generate random obstacles
                var rand = Math.round(random(1, 7));
                switch (rand) {
                        case 1: fruits.addImage(watermelonImg);
                                fruits.scale = 0.3;
                                break;
                        case 2: fruits.addImage(appleImg);
                                fruits.scale = 0.2;
                                break;
                        case 3: fruits.addImage(bananaImg);
                                fruits.scale = 0.2;
                                break;
                        case 4: fruits.addImage(pomegranetImg);
                                fruits.scale = 0.25;
                                break;
                        case 5: fruits.addImage(orangeImg);
                                fruits.scale = 0.2;
                                break;
                        case 6: fruits.addImage(pineappleImg);
                                fruits.scale = 0.35;
                                break;
                        case 7: fruits.addImage(mangoImg);
                                fruits.scale = 0.2;
                                break;
                        default: break;
                }
        }
}

function spawnBomb() {
        if (frameCount % 120 === 0) {
                var bomb = createSprite(Math.round(random(1, 675)), Math.round(random(1, 25)));
                bomb.velocityY = 2;
                bomb.scale = 0.5;
                bomb.addImage(bombImg);
                bombGroup.add(bomb);
        }
}

function mouseClicked() {
        for (var i = 0; i<fruitGroup.length; i++) {
                fruitGroup.get(i).destroy();
                if (fruitGroup.get(i).destroy) {
                        score = score + 1;
                }
        }
        
}