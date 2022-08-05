let input;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    input = createFileInput(handleFile);
    input.position(0, 0);
    pixelDensity(1);
}

function draw() {
    background(255);
    if (img && img.width > 0) {
        console.log(img);
        let w, h;
        if (img.width > img.height) {
            w = width;
            h = (width * img.height) / img.width;
        } else {
            w = (height * img.width) / img.height;
            h = height;
        }
        pg = processImage();
        image(pg, 0, 0, w, h);
        noLoop();
    }
}

function processImage() {
    pg = createGraphics(img.width, img.height);
    pg.pixelDensity(1);

    pg.image(img, 0, 0, img.width, img.height);
    return pg;
}
function handleFile(file) {
    print(file);
    if (file.type === "image") {
        img = createImg(file.data, "");
        img.hide();
    } else {
        img = null;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        pg.save(`out.png`);
    }
}
