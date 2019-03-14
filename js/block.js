const BlockDensity = 1;

class Block {
    constructor(x, w, v, m, xconstraint) {
        this.x = x; // x pos
        this.y = height - w; // y pos
        this.w = w; // width
        this.v = v; // velocity
        this.m = m; // mass
        this.xConstraint = xconstraint;
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
        const x = constrain(this.x, this.xConstraint, width);
        image(blockImg, x, this.y, this.w, this.w);

        textAlign(CENTER, CENTER);
        text(`${this.m} kg`, this.x+this.w/2, this.y-20);
    }
}