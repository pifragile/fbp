let input;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    input = createFileInput(handleFile);
    input.position(0, 0);
    //img = loadImage('candy_1.jpg')
    pixelDensity(1);
}

function draw() {
    background(255);
    if (img && img.width > 0) {
        console.log(img);
        let w, h;
        if (img.width > img.height && height > width) {
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
    let s = 0.1;
    let numIters = 1;
    for (let _x = 0; _x < numIters; _x++) {
        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w * 4; i += 4) {
                let pix = j * w * 4 + i;

                f = map(i, 0, 4 * w, 0, 1);
                let p = random() > f * 2;
                if (p) continue;
                f2 = f ** 2;
                newX = i + 4 * Math.round(random(-f2, f2) * w * s);
                newY = Math.round(j + random(-f2, f2) * h * s);
                if (newX < w * 4 && newY < h) {
                    for (let k = 0; k < 4; k++) {
                        pg.pixels[newY * w * 4 + newX + k] = pg.pixels[pix + k];
                    }
                }
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
