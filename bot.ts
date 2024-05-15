type Direction = 'North' | 'East' | 'South' | 'West';
const directions: Direction[] = ['North', 'East', 'South', 'West'];


interface BotState {
    x: number;
    y: number;
    direction: Direction;
}

const alphabet = {
  right:'R',
  left:'L',
  walk:'W',
  back:'B'
}

function execute(command: string): BotState {
    let state: BotState = {
        x: 0,
        y: 0,
        direction: 'North'
    };
    const commandRegex = /([RL]|W\d+)/g;
    const commands = command.match(commandRegex);

    if (commands) {
        commands.forEach(cmd => {
            state = findDirection(cmd, state);
        });
    }

    return state;
}

function findDirection(command: string, state: BotState): BotState {
    if (command === alphabet.right) {
        state.direction = turnRight(state.direction);
    } else if (command === alphabet.left) {
        state.direction = turnLeft(state.direction);
    } else if (command.startsWith(alphabet.walk)) {
        const distance = parseInt(command.substring(1), 10);
        state = walkStraight(distance, state);
    }
    return state;
}

function turnRight(currentDirection: Direction): Direction {
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = (currentIndex + 1) % 4
    const newDirection = directions[newIndex];
    return newDirection;
}

function turnLeft(currentDirection: Direction): Direction {
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = (currentIndex + 3) % 4
    const newDirection = directions[newIndex];
    return newDirection;
}

function walkStraight(distance: number, state: BotState): BotState {
    let { x, y, direction } = state;
    switch (direction) {
        case 'North':
            y += distance;
            break;
        case 'East':
            x += distance;
            break;
        case 'South':
            y -= distance;
            break;
        case 'West':
            x -= distance;
            break;
    }
    return { x, y, direction };
}



const inputCommand = process.argv[2];

const result = execute(inputCommand);
console.log(`X: ${result.x} Y: ${result.y} Direction: ${result.direction}`);
