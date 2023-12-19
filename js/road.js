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
    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i=0;i<=this.laneCount;i++){
            const x = lerp(this.left,this.right,i/this.laneCount);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(this.right,this.top);
        ctx.lineTo(this.right,this.bottom);
        ctx.stroke();

    }
}
function lerp (start, end, amt){
    return (1-amt)*start+amt*end;
}