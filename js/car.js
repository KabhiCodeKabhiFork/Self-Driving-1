class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = -Math.PI/2;

        this.controls = new Controls();
    }

    update(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.backward){
            this.speed -= this.acceleration;
        }
        if(this.controls.left){
            this.angle += 0.99;
        }
        if(this.controls.right){
            this.angle -= 0.99;
        }
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){
            this.speed = this.maxSpeed/2;
        }
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        this.y += this.speed * Math.sin(this.angle)*this.speed;
        this.x -= this.speed * Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
             - this.width/2,
             - this.height/2,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.restore();
    }
}  // End of class Car