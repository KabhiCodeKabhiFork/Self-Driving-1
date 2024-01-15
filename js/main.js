carCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
carCanvas.width = 200;
networkCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
networkCanvas.width = 300;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');
const road = new Road(carCanvas.width/2,carCanvas.width*0.7);//Adding a new road object
const car = new Car(100,100,30,50,"AI"); //Adding a new car object
const traffic= [
    new Car(100,-100,30,50,"DUMMY",2)
]

animate();

function animate(){//This function refreshes 60 times per second
    for(let i=0;i<traffic.length;i++){
        traffic[i].update([],[]);
    }
    car.update(road.borders,traffic);

    carCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
    networkCanvas.height = window.innerHeight; //This is not a good practice to use carCanvas just like this because carCanvas is a global variable and if it is modified elsewhere it can change here too
    
    carCtx.translate(0,-car.y+carCanvas.height*0.7);
    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    car.draw(carCtx);

    Visualizer.drawNetwork(networkCtx,car.brain);

    requestAnimationFrame(animate); //Calls the animate function again and again
}