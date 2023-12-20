class Road{
    constructor(x,width,laneCount=5){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x-width/2;
        this.right = x+width/2; 

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    getLaneCentre(lane){
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 + lane*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i=0;i<=this.laneCount;i++){
            const x = lerp(this.left,this.right,i/this.laneCount);
            if(i>0 && i<this.laneCount){
                ctx.setLineDash([20,20]);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "yellow";
            }
            else{
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.strokeStyle = "white";
            }
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
        // ctx.beginPath();
        // ctx.moveTo(this.right,this.top);
        // ctx.lineTo(this.right,this.bottom);
        // ctx.stroke();

    }
}

