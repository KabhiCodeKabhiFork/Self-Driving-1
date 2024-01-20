class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(
                new Level(neuronCounts[i],neuronCounts[i+1]));
        }
    }
    static feedForward(givenInputs, network){
        let outputs= Level.feedForward(
            givenInputs,
            network.levels[0]
            );
        for(let i=1;i<network.levels.length;i++){
            outputs = Level.feedForward(
                outputs,
                network.levels[i]
            );
        }
        return outputs;
    }
    
    static mutate(network,amount=0.3 ){
        network.levels.forEach(level=>{
            for(let i=0;i<level.biases.length;i++){
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                );
                // level.biases[i] = Math.min(1,Math.max(-1,level.biases[i]));
            }
            for(let j=0;j<level.weights.length;j++){
                for(let k=0;k<level.weights[j].length;k++){
                    level.weights[j][k] = lerp(
                        level.weights[j][k],
                        Math.random()*2-1,
                        amount
                    );
                }
            }
        });
    }
}

class Level{
    constructor(inputCount,outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }
        Level.#randomise(this);
    }
    

    static #randomise(level){
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j] = Math.random()*2-1;
            }
        }
        // console.log(level.weights);
        for(let i=0;i<level.biases.length;i++){
            level.biases[i] = Math.random()*2-1;
        }
        
    }
    // static sigmoid(level){
    //     for(let i=0;i<level.outputs.length;i++){
    //         level.outputs[i] = 1/(1+Math.exp(-level.outputs[i]));
    //     }
    // }

    static feedForward(givenInputs, level){
        level.inputs = [...givenInputs];

        for(let i=0;i<level.outputs.length;i++){
            let sum = 0;
            for(let j=0;j<level.inputs.length;j++){
                sum += level.inputs[j]*level.weights[j][i];
            }
            if(sum>level.biases[i]){
                level.outputs[i] = 1;
            }
            else{
                level.outputs[i] = 0;
            }
        }
        // for(let i=0;i<level.outputs.length;i++){
        //     level.outputs[i] = 1/(1+Math.exp(-level.outputs[i]));
        // }

        return level.outputs;
    }  
}
