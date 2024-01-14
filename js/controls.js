class Controls{
    constructor(type){
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        switch(type){
            case 'KEYS':
                this.#addListeners();
                break;
            case 'DUMMY':
                this.forward = true;
                break;
        }
        // this.#addListeners(); // This is a private method
    }

    #addListeners(){
      document.onkeydown = (e) => {
        switch(e.key){
            case 'ArrowUp':
                this.forward = true;
                break;
            case 'ArrowDown':
                this.backward = true;
                break;
            case 'ArrowLeft':
                this.left = true;
                break;
            case 'ArrowRight':
                this.right = true;
                break;
        }
        // console.table(this)   
        //This will provide a table in the console allowing you to see if the keys are being pressed
      }   
      document.onkeyup = (e) => {
        switch(e.key){
            case 'ArrowUp':
                this.forward = false;
                break;
            case 'ArrowDown':
                this.backward = false;
                break;
            case 'ArrowLeft':
                this.left = false;
                break;
            case 'ArrowRight':
                this.right = false;
                break;
        }
    }
    }
}