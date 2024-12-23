const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
pen.fillStyle = 'yellow';



const cs = 100;
const W = 1800;
const H = 1000;
let food = null;
let score =0;


const snake = {
    
    init_len: 5,
    direction: 'right',
    cells: [],
    
    createSnake: function () {
        
        for (let i = 0; i < this.init_len; i++){
            this.cells.push({
                x: i,
                y: 0
            });
        }
    
    },
    drawSnake: function () {
        
        for (let i = 0;i < this.cells.length; i++) {
            const cell=this.cells[i]
            if(i === this.cells.length-1){
                pen.fillStyle='red';
            }
            else{
                pen.fillStyle='yellow';
            }
            pen.fillRect(cell.x*cs, cell.y*cs, cs-1, cs-1);
        }

    },
    updateSnake: function () {
        

        // getting the value of head of snake i.e last cell in array
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;

        // Collision of head of snake with food
        if (headX === food.x && headY === food.y) {
            food = getRandomFood();
            console.log('food eaten');
            score++;
        } 
        else {
            // remove first cell
            this.cells.shift();
        }

        //GameOver!
        // if(headX*cs<=0 || headX*cs>=W-cs || headY*cs<=0 || headY*cs>=H-cs){
        //     GameOver();
        // }
        
        let nextX;
        let nextY;

        
        if (this.direction === 'down') {
            nextX = headX;
            nextY = headY + 1;
            
            if(nextY * cs > H-cs){
                GameOver();
            }

        }
        else if (this.direction === 'up') {
            nextX = headX;
            nextY = headY - 1;

            if(nextY*cs < 0){
                GameOver();
            }
        }
        else if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = headY;

            if(nextX * cs < 0){
                GameOver();
            }
        }
        else if (this.direction === 'right') {
            nextX = headX + 1;
            nextY = headY;

            if(nextX*cs > W-cs){
                GameOver();
            }
        }

        // push the new cell after the head inside the cells array
        this.cells.push({
            x: nextX,
            y: nextY
        });


    }
}


function init() {
    snake.createSnake();

    food=getRandomFood();


    function keyPressed(e) {
        
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }
        else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        }

        console.log(snake.direction);
    }



    document.addEventListener('keydown', keyPressed);

}

function update() {
   
    snake.updateSnake();
}

function draw() {
   
    pen.clearRect(0, 0, W, H);
    pen.font = '40px sans-serif';
    pen.fillText(`Score : ${score}`, 100, 50);
    // console.log('Draw food');
    pen.fillStyle = 'red';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}

function gameLoop() {
    draw();
    update();
}


function getRandomFood() {
    const foodX = Math.floor(Math.random() * (W-cs)/ cs);
    const foodY = Math.floor(Math.random() * (H-cs)/ cs);

    food = {
        x: foodX,
        y: foodY
    };
    // console.log(`Food generated at: (${food.x}, ${food.y})`);
    return food;
}




init();

const id= setInterval(gameLoop, 100);
function GameOver(){
    
    clearInterval(id);
}