let blockImg;
let block1;
let block2;
let clack;

let count = 0;
let countP;

let massSlider;

function preload() {
    blockImg = loadImage('assets/img/block.png');
    clack = loadSound('assets/sound/clack.wav');
}

function setup() {
    createCanvas(windowWidth, 200);
    block1 = new Block(100, 20, 0, 1);
    block2 = new Block(200, 100, -1, 100);
    countP = createP();
    massSlider = createSlider(0, 10, 1, 1);
    massSlider.changed(updateMass);
}

function updateMass() {
    block1 = new Block(100, 20, 0, 1);
    block2 = new Block(200, 100, -1, 100**massSlider.value());
    count = 0;
}

function draw() {
    background(200);
    if (block1.collide(block2)) {
        const v1 = block1.bounce(block2);
        const v2 = block2.bounce(block1);
        block1.v = v1;
        block2.v = v2;
        clack.play();
        count++;
    }
    if (block1.hitWall()) {
        block1.reverse();
        clack.play();
        count++;
    }
    block1.update();
    block2.update();
    block1.render();
    block2.render();

    countP.html(count);
}