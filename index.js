const width = 28; // Number of grid squares
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let score = 0; 

// Store total number of square grids in a layout array: 28 * 28 = 784
// 0 represents pac-dots 
// 1 represents wall 
// 2 represents ghost-lair 
// 3 represents power-pellet 
// 4 represents empty 
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
];

// Create board 
function createBoard() {
    for(let i = 0; i < layout.length; i++) {
        // Create a square 
        const square = document.createElement('div');
        //console.log(square); // 784 squares created
        // put square in the grid
        grid.appendChild(square);
        // put square in squares array
        squares.push(square);
        //console.log(squares);

        // Adding layouts using if else statements
        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if(layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair') 
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else {
            squares[i].classList.add('empty')
        }
    }
    //console.log(squares);
}
createBoard();

// Starting position of pac-man
let pacmanCurrentIndex = 490;
// Add pacman in the squares grid 
squares[pacmanCurrentIndex].classList.add('pac-man');

// Moving pacman with keys and EventListeners
// http://keycode.info/
// left - 37
// up key - 38
// right - 39
// down key - 40
function control(e) {
    // Using if else statement
    // if(e.keyCode === 40) {
    //     console.log('pressed down');
    // } else if (e.keyCode === 39) {
    //     console.log('pressed right');
    // } else if (e.keyCode === 38) {
    //     console.log('pressed up');
    // } else if(e.keyCode === 37) {
    //     console.log('pressed left')
    // } else {
    //     console.log('pressed other key');
    // }

    squares[pacmanCurrentIndex].classList.remove('pac-man');
    // Using switch statement 

    switch (e.keyCode) {
        case 40:
            console.log('pressed down');
             if (
                //Avoiding the ghost-lair by using classList.contains() method:
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                // Avoiding walls by using classList.contains() method: 
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width // (490 + 28) < (28 * 28) => 518 < 784
                ) 
            pacmanCurrentIndex += width;
            break;
        case 39 : 
            console.log('pressed right');
            if (
                //Avoiding the ghost-lair by using classList.contains() method:
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                // Avoiding walls by using classList.contains() method: 
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    pacmanCurrentIndex % width < width - 1) // (490 % 28) < (28 - 1) => 17.5 < 27
                pacmanCurrentIndex += 1;
                // Implementing Pacmans shortcut using indexes
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364;
                }
            break;
        case 38:
            console.log('pressed up');
            if (
                //Avoiding the ghost-lair by using classList.contains() method:
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                // Avoiding walls by using classList.contains() method: 
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0 // 490 - 28 >= 0 => 462 >= 0
                ) 
            pacmanCurrentIndex -= width;
            break;
        case 37:
            console.log('pressed left');
            if (
                //Avoiding the ghost-lair by using classList.contains() method:
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                // Avoiding walls by using classList.contains() method: 
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0 // 490 % 28 !== 0 => 17.5 !== 0
                ) 
                pacmanCurrentIndex -= 1;
                // Implementing Pacmans shortcut using indexes
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391;
                }
            break;
        
    }
        squares[pacmanCurrentIndex].classList.add('pac-man');
        pacDotsEaten();
        powerPelletEaten();
        checkForWin();
        checkForGameOver();
        }
        document.addEventListener('keyup', control);

    // Eating Pacdots and displaying the score using innerHTML
    function pacDotsEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
            score++;
            scoreDisplay.innerHTML = score;
        }
    }

    // Eating power pellets using setTimeout() method:
    function powerPelletEaten() {
      //if square pacman is in contains a power pellet
     if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      // removing class of power-pellet from square
      squares[pacmanCurrentIndex].classList.remove('power-pellet');
      //add a score of 10
      score += 10;
     //change each of the four ghosts to isScared
      ghosts.forEach(ghost => ghost.isScared = true);
      // use setTimeout to unscare ghosts after 10 seconds
      setTimeout(unScareGhosts, 10000);
     }
    }

    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

// Making ghosts using classes and constructor method:
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        //storing other variables
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('chinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('rosy', 351, 300),
    new Ghost('romy', 379, 500)
];

// Drawing the ghosts using forEach() method: 
  ghosts.forEach(ghost => { 
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
  }); 

// Passing parameters into functions
  ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    console.log('Moved ghost');
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor((Math.random() * directions.length))];
    console.log(direction);

    // Moving ghosts at specific speed using setInterval() method:
    ghost.timerId = setInterval(function() {
        //if the next square does NOT contain a wall and does not contain a ghost
        if(
            !squares[ghost.currentIndex + direction].classList.contains('wall') && 
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
        //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
        //add direction to current index
        ghost.currentIndex += direction;
        //add ghost class 
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
        } else direction = directions[Math.floor((Math.random() * directions.length))];

        // if the ghost is currently scared
        if(ghost.isScared) {
          squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        // Eating scared ghosts: 
        //if the ghost is currently scared AND pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        //remove classnames - ghost.className, 'ghost', 'scared-ghost'
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        // change ghosts currentIndex back to its startIndex
        ghost.currentIndex = ghost.startIndex;
        //add a score of 100
        score += 100;
        //re-add classnames of ghost.className and 'ghost' to the ghosts new position
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    }
    checkForGameOver();

    }, ghost.speed);
}

// Check for game over
function checkForGameOver() {
 // if the square pacman contains a ghost AND the square does NOT contain a scared ghost
 if(squares[pacmanCurrentIndex].classList.contains('ghost') && 
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
     //for each ghost - we need to stop it moving
     ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove event listener from our control function
    document.removeEventListener('keyup', control);
    //tell user the game is over
    scoreDisplay.innerHTML = "You LOSE";
 }
}

// Check for win
function checkForWin() {
    if(score === 274) {
        // Stop each ghost
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
        // Remove the event listener for the control function 
      document.removeEventListener('keyup', control);
        //tell our user we won
        scoreDisplay.innerHTML = 'You WON!';
    }
}



