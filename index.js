let input;
let img;

function setup() {
    createCanvas(windowWidth, windowHeight)
    input = createFileInput(handleFile);
    input.position(0, 0);
}

function draw() {
    background(255);
    if (img) {
        let w, h 
        if(img.width > img.height) {
            w = width
            h = width * img. height / img.width
        } else {
            w = height * img.width / img.height
            h = height
        }
        image(img, 0, 0, w, h);
        //noLoop();
    }
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
        save(`out.png`);
    }
}
