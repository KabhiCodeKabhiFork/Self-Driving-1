myCanvas.height = window.innerHeight; //This is not a good practice to use myCanvas just like this because myCanvas is a global variable and if it is modified elsewhere it can change here too
myCanvas.width = 200;

const ctx = myCanvas.getContext('2d');
const road = new Road(myCanvas.width/2,myCanvas.width*0.9);//Adding a new road object
const car = new Car(100,400,50,30); //Adding a new car object

animate();

function animate(){//This function refreshes 60 times per second
     
    myCanvas.height = window.innerHeight; //This is not a good practice to use myCanvas just like this because myCanvas is a global variable and if it is modified elsewhere it can change here too
    car.update();
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate); //Calls the animate function again and again
}