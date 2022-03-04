import { GlowParticle } from './glowparticle.js';

const COLORS = [
    { r: 24, g: 223, b: 160 },
    { r: 43, g: 80, b: 210 },
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
];

// const backgroundImage = new Image();
// backgroundImage.src = './images/bg1.png';

class App {
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
        }, 10);
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
    new App();
};
