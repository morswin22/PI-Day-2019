let blockImg;
let block1;
let block2;
let clack;

let count = 0;
let countP;

let massSlider;
let lastMass = 1;

let timeSteps = 100;

function preload() {
    blockImg = loadImage('assets/img/block.png');
    clack = loadSound('assets/sound/clack.wav');
}

function setup() {
    createCanvas(windowWidth, 200);
    block1 = new Block(100, 40, 0, 1, 0);
    block2 = new Block(300, 100, -1/timeSteps, 100, block1.w);
    countP = createP();
    massSlider = createSlider(0, 10, 1, 1);
    massSlider.changed(updateMass);
}

function updateMass() {
    if (massSlider.value() < 8 || confirm(`Calculating ${massSlider.value()+1} digits of PI may result in a major lag! Are you sure you want to continue?`)) {
        timeSteps = 2 * 10**(massSlider.value()-1);
        if (timeSteps < 100) timeSteps = 100;
        block1 = new Block(100, 40, 0, 1, 0);
        block2 = new Block(300, 100, -1/timeSteps, 100**massSlider.value(), block1.w);
        count = 0;
        lastMass = massSlider.value();
    } else {
        massSlider.value(lastMass);
    }
}

function draw() {
    background(200);

    let clackSound = false;

    for (let i = 0; i < timeSteps; i++) {
        if (block1.collide(block2)) {
            const v1 = block1.bounce(block2);
            const v2 = block2.bounce(block1);
            block1.v = v1;
            block2.v = v2;
            clackSound = true;
            count++;
        }
        if (block1.hitWall()) {
            block1.reverse();
            clackSound = true;
            count++;
        }
        block1.update();
        block2.update();
    }

    if (clackSound) clack.play();

    block1.render();
    block2.render();

    countP.html(`(${massSlider.value()+1}) ${count}`);
}