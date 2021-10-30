import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-hieroglyphics',
  templateUrl: './hieroglyphics.component.html',
  styleUrls: ['./hieroglyphics.component.css']
})
export class HieroglyphicsComponent implements OnInit {

  private p: any;
  private cDiv: HTMLElement | undefined;

  constructor() {
    const d = document.getElementById("canvas");
    if (d !== null) {
      this.cDiv = d;
    }
  }

  ngOnInit(): void {
    const sketch = (s: any) => {

      s.resolution = 30;
      s.originalRes = s.resolution;
      s.originalArea = 0;
      s.dots = null;

      s.setup = (width: number, height: number) => {
         s.createCanvas(this.cDiv?.offsetWidth, this.cDiv?.offsetHeight, 'p2d');
         s.originalArea = width * height;
         s.background(0);
         s.dots = s.createDots();
         s.frameRate(60);
      };

      s.draw = () => {
         s.background(0);
         if (s.frameCount % 20 == 0) {
          s.dots = s.createDots();
         }
         s.drawBoundaries();
      };

      s.createDots = () => {
        let dots = Array( Math.floor(s.width / s.resolution) );
        for (let i = 0; i < dots.length; i++) {
          dots[i] = Array( Math.floor(s.height / s.resolution) );
        }

        for (let i = 0; i < dots.length; i++) {
          for (let j = 0; j < dots[i].length; j++) {
            dots[i][j] = Math.random();
          }
         }

        return dots;
      };

      s.drawDots = () => {
        for (let i = 0; i < s.dots.length; i++) {
          for (let j = 0; j < s.dots[i].length; j++) {
              s.stroke(255 * s.dots[i][j]);
              s.point(i * s.resolution, j * s.resolution);
          }
        }
      };

      s.drawBoundaries = () => {
        for (let x = 1; x < s.dots.length - 1; x++) {
          for (let y = 1; y < s.dots[x].length - 1; y++) {
              s.drawBoundary(s.determineBoundary(x, y), x, y);
          }
        }
      };

      s.determineBoundary = (x: number, y: number) => {
        let result = 0;
        if (s.dots[x][y] < .5) result += 1 << 0;
        if (s.dots[x+1][y] < .5) result += 1 << 1;
        if (s.dots[x+1][y+1] < .5) result += 1 << 2;
        if (s.dots[x][y+1] < .5) result += 1 << 3;
        return result;
      };

      s.drawBoundary = (code: number, x: number, y: number) => {
        s.stroke(255, 0, 0);
        switch (code) {
            case 0: // 0000
                // . . Do nothing
                // . . 
                break;
            case 1: // 0001
                // + .
                // . .
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, x * s.resolution, y * s.resolution + .5 * s.resolution );
                break;
            case 2: // 0010
                // . +
                // . .
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 3: // 0011
                // + +
                // . .
                s.line(x * s.resolution, y * s.resolution + .5 * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 4: // 0100
                // . .
                // . +
                s.line(x * s.resolution + .5 * s.resolution, (y+1) * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 5: // 0101
                // + .
                // . +
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, x * s.resolution, y * s.resolution + .5 * s.resolution );
                s.line(x * s.resolution + .5 * s.resolution, (y+1) * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 6: // 0110
                // . +
                // . +
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, x * s.resolution + .5 * s.resolution, (y+1) * s.resolution);
                break;
            case 7: // 0111
                // + +
                // . +
                s.line(x * s.resolution, y * s.resolution + .5 * s.resolution, x * s.resolution + .5 * s.resolution, (y+1) * s.resolution);
                break;
            case 8: // 1000
                // . .
                // + .
                s.line(x * s.resolution, y * s.resolution + .5 * s.resolution, x * s.resolution + .5 * s.resolution, (y+1) * s.resolution);
                break;
            case 9: // 1001
                // + .
                // + .
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, x * s.resolution + .5 * s.resolution, (y+1) * s.resolution);
                break;
            case 10: // 1010
                // . +
                // + .
                s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                s.line(x * s.resolution, y * s.resolution + .5 * s.resolution, x * s.resolution + .5 * s.resolution, (y+1) * s.resolution);
                break;
            case 11: // 1011
                // + +
                // + .
                // s.line(x * s.resolution + .5 * s.resolution, (y+1) * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 12: // 1100
                // . .
                // + +
                // s.line(x * s.resolution, y * s.resolution + .5 * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 13: // 1101
                // + .
                // + +
                // s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, (x+1) * s.resolution, y * s.resolution + .5 * s.resolution);
                break;
            case 14: // 1110
                // . +
                // + +
                // s.line(x * s.resolution + .5 * s.resolution, y * s.resolution, x * s.resolution, y * s.resolution + .5 * s.resolution );
                break;
            case 15: // 1111 Do nothing
                // + +
                // + +
                break;
            }
      };


   }

   let canvas = new p5(sketch, this.cDiv);
  }
}
