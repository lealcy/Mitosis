"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font="25px Arial";
let cells = [];
let drawCount = 0;
let minSize = 20;
let maxSize = 30;
let growFactor = 0.5;
let maxCells = 128;

function setup() {
    	cells.push(new Cell());
}

function draw() {
    let h = window.requestAnimationFrame(draw);
    drawCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /*if (cells.length > maxCells) {
        cells.splice(rand(0, cells.length - 1), 1);
    }*/

    cells.forEach(function(element, index) {
        if (drawCount % 5 === 0) {
            element.update(index);
        }
        element.draw();
    });
    ctx.fillStyle = "black";
    ctx.fillText(`N. of cells: ${cells.length}.`, 5, 20);
}

class Cell {
    constructor(x, y, r, c) {
        this.x = x || rand(0, canvas.width);
        this.y = y || rand(0, canvas.height);
        this.r = r || minSize;
        this.c = c || new Color(0, 200, 0, 0.7);
    }

    mitosis() {
        if (cells.length < maxCells) {
            for (let i = 0; i < 2; i++) {
                let newX = this.x + rand(-maxSize, maxSize);
                let newY = this.y + rand(-maxSize, maxSize);
                let r = this.c.r + rand(-20, 20);
                let g = this.c.g + rand(-20, 20);
                let b = this.c.b + rand(-20, 20);
                let newC = new Color(r, g, b, 0.7);
                cells.push(new Cell(newX, newY, minSize, newC));
            }
        }
    }

    update(index) {
        this.x = constrain(rand(this.x - 20, this.x + 20), 0, canvas.width);
        this.y = constrain(rand(this.y - 20, this.y + 20), 0, canvas.height);
        this.r = constrain(this.r + growFactor, minSize, maxSize);
        if (this.r >= maxSize) {
            cells.splice(index, 1);
            this.mitosis();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.c.toString();
        ctx.fill();
    }

}

class Color {
    constructor(r, g, b ,a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1.0;
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

function color(r, g, b, a) {
    a = a || 1.0;
    
}

function constrain(n, min, max)
{
    if (n < min) {
        n = min;
    } else if (n > max) {
        n = max;
    }
    return n;
}

setup();
draw();