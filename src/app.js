'use strict';

import { GlowParticle } from './glowparticle.js';

const COLORS = [
    { r: 24, g: 223, b: 160 },
    { r: 43, g: 80, b: 210 },
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
];

const debounce = (func, delay) => {
    let debounceTimer;
    return () => {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

window.requestAnimationFrame = (function () {
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
    constructor() {
        this.canvas = jsIntroCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.pixelRation = window.devicePixelRatio > 1 ? 2 : 1;
        this.totalParticles = 20;
        this.particles = [];
        this.maxRadius = window.innerWidth * 0.4;
        this.minRadius = window.innerHeight * 0.4;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
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
                COLORS[curColor],
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }

            this.particles[i] = item;
        }
    }
}

window.onload = () => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    new Gradients();
};
