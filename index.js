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
    let w = img.width;
    let h = img.height;
    pg = createGraphics(w, h);
    pg.pixelDensity(1);

    pg.image(img, 0, 0, w, h);

    pg.loadPixels();
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < 4 * w; i++) {
            //if (i % 4 == 3) continue;
            val = pg.pixels[j * w * 4 + i];
            f = map(i, 0, 4 * w, 0, 1);
            let p = random() > f * 0.2
            if(p) continue
            newX = Math.round(i + random(-f, f) * 5);
            newY = Math.round(j + random(-f, f) * 5);
            if (newX < w * 4 && newY < h) {
                pg.pixels[newY * w * 4 + newX] = 0;
            }
        }
    }
    pg.updatePixels();

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
