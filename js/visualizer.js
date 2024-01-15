class Visualizer{
    static drawNetwork(ctx,network){
        const margin = 50;
        const left=margin;
        const top=margin;
        const width = ctx.canvas.width-margin*2;
        const height = ctx.canvas.height-margin*2;

        const levelHeight = height/(network.levels.length);

        for(let i=0;i<network.levels.length;i++){
            const levelTop = top+
                lerp(height-levelHeight,
                    0,
                    network.levels.length==1?0.5:(i)/(network.levels.length-1)
                );
            Visualizer.drawLevel(ctx,network.levels[i],
                left,levelTop,
                width,levelHeight,
                i==network.levels.length-1?["⬆","⬇","⬅","➡"]:[]);
        }

    }

    static drawLevel(ctx,level,left,top,width,height,outputLabels){
        const right = left+width;
        const bottom = top+height;

        const nodeRadius = 18;

        const {inputs,outputs} = level;

        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodes(inputs,i,left,right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodes(outputs,j,left,right),
                    top
                );
                ctx.lineWidth = 2;

                ctx.strokeStyle = getRGBA(level.weights[i][j])
                ctx.stroke();
            }
        }

        for(let i=0;i<level.inputs.length;i++){
            const x = Visualizer.#getNodes(inputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = "Black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = getRGBA(level.inputs[i]);
            ctx.fill();
        }
        for(let i=0;i<level.outputs.length;i++){
            const x = Visualizer.#getNodes(outputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = getRGBA(level.biases[i]);
            ctx.fill();
            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.strokeStyle = getRGBA(level.biases[i]);
            ctx.stroke();
            if(outputLabels[i]){
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.strokeStyle="white";
                ctx.font= (nodeRadius*1.5)+"px Arial";
                ctx.fillText(outputLabels[i],x,top+nodeRadius*0.1);
                ctx.lineWidth = 0.5;
                ctx.strokeText(outputLabels[i],x,top);
            }
        }
    }
    static #getNodes(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length==1?0.5:index/(nodes.length-1)
        );
    }
}