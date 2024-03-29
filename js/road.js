class Road{
    constructor(x,width,laneCount=3 ){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x-width/2;
        this.right = x+width/2; 

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x:this.left,y:this.top};
        const topRight = {x:this.right,y:this.top}; 
        const botomLeft = {x:this.left,y:this.bottom};
        const bottomRight = {x:this.right,y:this.bottom};
        this.borders=[
            [topLeft],
            [topRight]
        ];
        for(let y=-1100;y<=0;y++){
            const x = Math.sin(y/90)*60;
            this.borders[0].push({x:x+this.left,y:y});
            this.borders[1].push({x:x+this.right,y:y});
        }
        this.borders[0].push(botomLeft);
        this.borders[1].push(bottomRight);
    }

    getLaneCentre(lane){
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 + Math.min(lane, this.laneCount-1)*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // console.log("hello");
        // ctx.setLineDash([20,20 ]);
        // for(let i=1;i<this.laneCount;i++){
        //     const x = lerp(this.left,this.right,i/this.laneCount);
        //     ctx.beginPath();
        //     ctx.moveTo(x,this.top);
        //     ctx.lineTo(x,this.bottom);
        //     ctx.stroke();
        // }
        ctx.setLineDash([ ]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            for(let i=2;i<border.length;i++){
                ctx.lineTo(border[i].x,border[i].y);
            }
            ctx.stroke();
        }); 

    }
}

