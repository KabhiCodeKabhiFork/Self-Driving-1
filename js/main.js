carCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
carCanvas.width = 200;
networkCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
networkCanvas.width = 300;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');
const road = new Road(carCanvas.width/2,carCanvas.width*0.7);//Adding a new road object
N =100;
const cars = generateCars(N); //Adding a new car object
console.log(cars[0].brain);
const traffic= [
    new Car(100,-100,30,50,"DUMMY",2)
]
// const car = new Car(100,100,30,50,"KEYS");
// const bestCar = car;
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        // if(i>0){
            //     NeuralNetwork.mutate(cars[i].brain,0.07);
            // }
            // console.log(cars[i].brain);
        }
    }
    console.log(cars[0].brain);

animate();

function animate(){//This function refreshes 60 times per second
    for(let i=0;i<traffic.length;i++){
        traffic[i].update([],[]);
    }
    // car.update(road.borders,traffic);
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    const bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight; 
    
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha = 0.3;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    // car.draw(carCtx);
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx,true);
    road.draw(carCtx);
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate); //Calls the animate function again and again
}

function generateCars(N){
    const cars = [];
    for(let i=0;i<N;i++){
        cars.push(new Car(100,100,30,50,"AI"));
    }
    return cars;
}

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
    console.log(bestCar.brain);
    console.log(localStorage.getItem("bestBrain"));
}

function discard(){
    localStorage.removeItem("bestBrain");
}