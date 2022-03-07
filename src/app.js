'use strict';

import { GlowParticle } from './glowparticle.js';

const hexToRgb = (hexArray) => {
    return hexArray.map((res) => {
        let entry = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
            res.trim(),
        );
        return entry
            ? {
                  r: parseInt(entry[1], 16),
                  g: parseInt(entry[2], 16),
                  b: parseInt(entry[3], 16),
              }
            : null;
    });
};

const debounce = (func, delay) => {
    let debounceTimer;
    return () => {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

window.requestAnimationFrame = (() => {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (f) {
            window.setTimeout(f, 1e3 / 60);
        }
    );
})();

// const backgroundImage = new Image();
// backgroundImage.src = './images/bg1.png';

class Gradients {
    constructor(elm) {
        this.canvas = elm;
        console.log(elm.dataset);
        const tempColors = [
            ...elm.dataset.colors.split(','),
            ...Array(3).fill(elm.dataset.bgcolor),
        ];
        this.colors = hexToRgb(tempColors);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRation = window.devicePixelRatio > 1 ? 2 : 1;
        this.totalParticles = parseInt(elm.dataset.particles) || 20;
        this.particles = [];
        this.maxRadius = window.innerWidth * 0.4;
        this.minRadius = window.innerHeight * 0.4;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.ctx.scale(this.pixelRatio, this.pixelRation);
        this.createParticles();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        // this.ctx.drawImage(backgroundImage, 0, 0);
        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
        setTimeout(() => {
            window.requestAnimationFrame(this.animate.bind(this));
        }, 110);
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];
        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) +
                    this.minRadius,
                this.colors[curColor],
            );

            if (++curColor >= this.colors.length) {
                curColor = 0;
            }

            this.particles[i] = item;
        }
    }
}

window.onload = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const allGradientCanvases =
        document.getElementsByClassName('gradient-canvas');
    let gradients = [];
    for (let i = 0; i < allGradientCanvases.length; i++) {
        gradients.push(new Gradients(allGradientCanvases[i]));
    }
};
