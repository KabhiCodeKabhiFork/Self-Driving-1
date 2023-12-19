myCanvas.height = window.innerHeight; //This is not a good practice to use myCanvas just like this because myCanvas is a global variable and if it is modified elsewhere it can change here too
myCanvas.width = 200;

const ctx = myCanvas.getContext('2d');
const car = new Car(100,400,30,50);

animate();

function animate(){//This function refreshes 60 times per second
     
    myCanvas.height = window.innerHeight; //This is not a good practice to use myCanvas just like this because myCanvas is a global variable and if it is modified elsewhere it can change here too
    car.update();
    car.draw(ctx);
    requestAnimationFrame(animate); //Calls the animate function again and again
}