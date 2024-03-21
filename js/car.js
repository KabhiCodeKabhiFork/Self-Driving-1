class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.contolType = controlType;
        if(controlType != "DUMMY"){
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount,6,3,5]);
        }
        // this.sensor = new Sensor(this);
        this.useBrain = controlType == "AI";
        this.damaged = false;

        this.angle = 0;

        this.controls = new Controls(controlType);
    }
    update(borders, traffic){
        if(!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(borders,traffic);
        }
        
        if(this.contolType != "DUMMY"){
            this.sensor.update(borders,traffic);

            //Higher the value of the reading, the closer the object is
            const offsets = this.sensor.readings.map(reading=>reading==null?0:1-reading.offset);
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            // console.log(offsets);
            
            if(this.useBrain){
                // console.log(outputs);
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.backward = outputs[3];
                this.speed += outputs[4]*this.acceleration;
            }
        }
    }
    #assessDamage(borders, traffic){
        for(let i=0;i<borders.length;i++){
            if(polygonTouch([...this.polygon,this.polygon[0]],
                borders[i] )){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            const poly= traffic[i].polygon;
            if(polygonTouch([...this.polygon,this.polygon[0]],
                [...poly,poly[0]])){
                return true;
            }
        }
        return false;
    }
    #createPolygon(){
        const points = [];
        const radius = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width,this.height);
        points.push({
            x: this.x - Math.sin(this.angle-alpha)*radius,
            y: this.y - Math.cos(this.angle-alpha)*radius
        });
        points.push({
            x: this.x - Math.sin(this.angle+alpha)*radius,
            y: this.y - Math.cos(this.angle+alpha)*radius
        });
        points.push({
            x: this.x - Math.sin(Math.PI+this.angle-alpha)*radius,
            y: this.y - Math.cos(Math.PI+this.angle-alpha)*radius
        });
        points.push({
            x: this.x - Math.sin(Math.PI+this.angle+alpha)*radius,
            y: this.y - Math.cos(Math.PI+this.angle+alpha)*radius
        });
        return points;
    }

    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.backward){
            this.speed -= this.acceleration;
        }
        if(this.controls.left){
            this.angle += 0.05;
        }
        if(this.controls.right){
            this.angle -= 0.05;
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

        this.y -= Math.cos(this.angle)*this.speed;
        this.x -= Math.sin(this.angle)*this.speed;
    }

    draw(ctx,drawSensors=false){
        if(this.damaged){
            ctx.fillStyle = "red";
        }
        else{
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        // console.log(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        // console.log(this.polygon);
        ctx.fill();
        if(this.sensor && drawSensors){
            this.sensor.draw(ctx);
        }
         
    }
}  // End of class Car