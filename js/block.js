const BlockDensity = 1;

class Block {
    constructor(x, w, v, m) {
        this.x = x; // x pos
        this.y = height - w; // y pos
        this.w = w; // width
        this.v = v; // velocity
        this.m = m; // mass
    }

    hitWall() {
        return this.x <= 0
    }

    reverse() {
        this.v *= -1;
    }

    collide(other) {
        return !(this.x + this.w < other.x || this.x > other.x + other.w)
    }

    bounce(other) {
        let sumM = this.m + other.m;
        return ((this.m-other.m)/sumM * this.v) + ((2 * other.m/sumM) * other.v);
    }

    update() {
        this.x += this.v;
    }

    render() {
        image(blockImg, this.x, this.y, this.w, this.w);
    }
}