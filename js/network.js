class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(
                new Level1(neuronCounts[i],neuronCounts[i+1]));
        }
    }
    static feedForward(givenInputs, network){
        let outputs= Level1.feedForward(
            givenInputs,
            network.levels[0]
            );
        for(let i=1;i<network.levels.length;i++){
            outputs = Level1.feedForward(
                outputs,
                network.levels[i]
            );
        }
        return outputs;
    }
}

class Level1{
    constructor(inputCount,outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }
        Level1.#randomise(this);
    }
    

    static #randomise(level){
        // console.log(level.inputs);
        for(let i=0;i<level.inputs.length;i++){
            // console.log("hello")
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j] = Math.random()*2-1;
                // console.log("Math.random()*2-1");
            }
            // console.log(level.weights[i]);
        }
        // console.log(level.weights);
        for(let i=0;i<level.biases.length;i++){
            level.biases[i] = Math.random()*2-1;
        }
        
    }

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
            
            // level.outputs[i] = Level1.sigmoid(sum);
        }
        return level.outputs;
    }  
}
