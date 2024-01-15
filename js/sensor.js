class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 200;
        this.rayAngle = Math.PI/2;
        // console.log(this.rayAngle);
        this.rays = [];
    }

    update(borders, traffic){
        this.#castRays(borders);
        this.readings = [];
        for(let i=0;i<this.rayCount;i++){
            this.readings.push(
                this.#getReading(this.rays[i],borders, traffic)
            );
        }
    }
    #getReading(ray, borders, traffic){
        let touches = [];

        
        borders.forEach(border => {
            for(let i=1;i<border.length;i++){
                const touch= getTouch(
                    ray[0],
                    ray[1],
                    border[i-1],
                    border[i]);

                if(touch){
                    touches.push(touch);
                }
            }
        });

        traffic.forEach(car => {
            for(let i=0;i<car.polygon.length-1;i++){
                const touch= getTouch(
                    ray[0],
                    ray[1],
                    car.polygon[i],
                    car.polygon[i+1]);

                if(touch){
                    touches.push(touch);
                }
                
        
            }
        });

        for(let i=0;i<traffic.length;i++){
            const poly= traffic[i].polygon;
            for(let j=0;j<poly.length-1;j++){
                const value = getTouch(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
            
        }

        if(touches.length == 0){
            return null;
        }
        else{
            const offset = touches.map(touch=>touch.offset);
            const minOffset = Math.min(...offset);
            return touches.find(touch=>touch.offset == minOffset);
        }
            
    }
    #castRays(borders){
        this.rays = [];
        // console.log(this.car.angle);
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(this.rayAngle/2,-this.rayAngle/2,i/(this.rayCount-1));
            
            const start = {
                x: this.car.x,
                y: this.car.y
            };
            const end = {
                x: this.car.x - Math.sin(this.car.angle + rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(this.car.angle + rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }
    
    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            // console.log(this.rays[i][1].x);
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y);
            ctx.lineTo(
                end.x,
                end.y);
            ctx.stroke();
        }
    }
}
