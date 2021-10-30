resolution = 50;
originalRes = resolution;
originalArea = 0;
dots = null;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  originalArea = width * height;
  background(0);
  dots = createDots();
//   drawDots();
//   frameRate(60);
}

function draw() {
  background(0);
//   if (frameCount % 60 == 0) {
//       createDots();
//   }
//   drawDots();
  drawBoundaries();
}

function createDots() {
    dots = Array( floor(width / resolution) );
    for (i = 0; i < dots.length; i++) {
        dots[i] = Array( floor(height / resolution) );
    }

    for (i = 0; i < dots.length; i++) {
        for (j = 0; j < dots[i].length; j++) {
            dots[i][j] = random();
        }
    }

    return dots;
}

function drawDots() {
    for (i = 0; i < dots.length; i++) {
        for (j = 0; j < dots[i].length; j++) {
            stroke(255 * dots[i][j]);
            point(i * resolution, j * resolution);
        }
    }
}

function drawBoundaries() {
    for (x = 1; x < dots.length - 1; x++) {
        for (y = 1; y < dots[x].length - 1; y++) {
            drawBoundary(determineBoundary(x, y), x, y);
        }
    }
}

function determineBoundary(x, y) {
    result = 0;
    if (dots[x][y] < .5) result += 1 << 0;
    if (dots[x+1][y] < .5) result += 1 << 1;
    if (dots[x+1][y+1] < .5) result += 1 << 2;
    if (dots[x][y+1] < .5) result += 1 << 3;
    return result;
}

function drawBoundary(code, x, y) {
    // stroke(255 * random(), 0, 0);
    stroke(255, 0, 0);
    switch (code) {
        case 0: // 0000
            // . . Do nothing
            // . . 
            break;
        case 1: // 0001
            // + .
            // . .
            line(x * resolution + .5 * resolution, y * resolution, x * resolution, y * resolution + .5 * resolution );
            break;
        case 2: // 0010
            // . +
            // . .
            line(x * resolution + .5 * resolution, y * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 3: // 0011
            // + +
            // . .
            line(x * resolution, y * resolution + .5 * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 4: // 0100
            // . .
            // . +
            line(x * resolution + .5 * resolution, (y+1) * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 5: // 0101
            // + .
            // . +
            line(x * resolution + .5 * resolution, y * resolution, x * resolution, y * resolution + .5 * resolution );
            line(x * resolution + .5 * resolution, (y+1) * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 6: // 0110
            // . +
            // . +
            line(x * resolution + .5 * resolution, y * resolution, x * resolution + .5 * resolution, (y+1) * resolution);
            break;
        case 7: // 0111
            // + +
            // . +
            line(x * resolution, y * resolution + .5 * resolution, x * resolution + .5 * resolution, (y+1) * resolution);
            break;
        case 8: // 1000
            // . .
            // + .
            line(x * resolution, y * resolution + .5 * resolution, x * resolution + .5 * resolution, (y+1) * resolution);
            break;
        case 9: // 1001
            // + .
            // + .
            line(x * resolution + .5 * resolution, y * resolution, x * resolution + .5 * resolution, (y+1) * resolution);
            break;
        case 10: // 1010
            // . +
            // + .
            line(x * resolution + .5 * resolution, y * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            line(x * resolution, y * resolution + .5 * resolution, x * resolution + .5 * resolution, (y+1) * resolution);
            break;
        case 11: // 1011
            // + +
            // + .
            // line(x * resolution + .5 * resolution, (y+1) * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 12: // 1100
            // . .
            // + +
            // line(x * resolution, y * resolution + .5 * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 13: // 1101
            // + .
            // + +
            // line(x * resolution + .5 * resolution, y * resolution, (x+1) * resolution, y * resolution + .5 * resolution);
            break;
        case 14: // 1110
            // . +
            // + +
            // line(x * resolution + .5 * resolution, y * resolution, x * resolution, y * resolution + .5 * resolution );
            break;
        case 15: // 1111 Do nothing
            // + +
            // + +
            break;
        }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resolution = originalRes * ( (width * height) / originalArea );
}
