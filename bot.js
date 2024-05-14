"use strict";
//   North = 0, East = 1, South = 2, West = 3
const directions = ['North', 'East', 'South', 'West'];
const alphabet = {
    right: 'R',
    left: 'L',
    walk: 'W',
    back: 'B'
};
function execute(command) {
    //default ค่าตำแหน่งเริ่มต้นของ bot
    let state = {
        x: 0,
        y: 0,
        direction: 'North'
    };
    console.log('init state', state);
    console.log("Executing command:", command);
    //set regex
    const commandRegex = /([RL]|W\d+)/g;
    // ทำการ match ตัว command(string)  กับ commandRegex
    const commands = command.match(commandRegex);
    // ได้ array commands มา
    console.log('commands after match', commands);
    if (commands) {
        commands.forEach(cmd => {
            console.log('cmd string', cmd);
            state = findDirection(cmd, state);
            console.log('state after find direction', state);
        });
    }
    return state;
}
function findDirection(command, state) {
    console.log("Executing single command:", command);
    if (command === alphabet.right) {
        console.log("Turning right...");
        state.direction = turnRight(state.direction);
    }
    else if (command === alphabet.left) {
        console.log("Turning left...");
        state.direction = turnLeft(state.direction);
    }
    else if (command.startsWith(alphabet.walk)) {
        console.log("Walking straight...");
        const distance = parseInt(command.substring(1), 10);
        state = walkStraight(distance, state);
    }
    // } else if (command.startsWith(alphabet.back)) {
    //     console.log("Walking back...");
    //     console.log('command back',command)
    //     const distance = parseInt(command.substring(1), 10);
    //     console.log('distance back',distance)
    //     state = walkBack(distance, state);
    // } 
    return state;
}
function turnRight(currentDirection) {
    console.log('currentDirection right', currentDirection);
    // ทำการเช็ค currentDirection ที่ส่งมาเช็คกับ directions ว่าถ้าตรงกันมันอยู่ตำแหน่งที่เท่าไหร่ของ directions
    const currentIndex = directions.indexOf(currentDirection);
    // currentIndex ตือตำแหน่ง index ปัจจุบัน
    console.log('currentIndex right', currentIndex);
    // หมุนตามเข็มนาฬิกา default คือ north ถ้าหมุนขวาคือ + 1 ที่ mod 4 เพราะไม่ให้ index มันเกิน direction
    const newIndex = (currentIndex + 1) % 4;
    console.log('newIndex right', newIndex);
    // newDirection เพื่อหาตำแหน่งใหม่ที่จะไป
    const newDirection = directions[newIndex];
    console.log('newDirection', newDirection);
    console.log(`Current Direction: ${currentDirection}, New Direction: ${newDirection}`);
    return newDirection;
}
function turnLeft(currentDirection) {
    console.log('currentDirection left', currentDirection);
    const currentIndex = directions.indexOf(currentDirection);
    console.log('currentIndex left', currentIndex);
    const newIndex = (currentIndex + 3) % 4;
    console.log('newIndex left', newIndex);
    const newDirection = directions[newIndex];
    console.log('newDirection', newDirection);
    console.log(`Current Direction: ${currentDirection}, New Direction: ${newDirection}`);
    return newDirection;
}
function walkStraight(distance, state) {
    let { x, y, direction } = state;
    console.log('x', x);
    console.log('y', y);
    console.log('distance', distance);
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
    console.log(`Walking ${distance} steps to the ${direction}. New position: X=${x}, Y=${y}`);
    return { x, y, direction };
}
// function walkBack(distance: number, state: BotState): BotState {
//     let { x, y, direction } = state;
//     // สลับทิศทางเพื่อเดินถอยหลัง
//     switch (direction) {
//         case 'North':
//             y -= distance; // เดินถอยหลังในแนวแกน Y -
//             break;
//         case 'East':
//             x -= distance; // เดินถอยหลังในแนวแกน X -
//             break;
//         case 'South':
//             y += distance; // เดินถอยหลังในแนวแกน Y +
//             break;
//         case 'West':
//             x += distance; // เดินถอยหลังในแนวแกน X +
//             break;
//     }
//     console.log(`Walking back ${distance} steps. New position: X=${x}, Y=${y}`);
//     return { x, y, direction };
// }
const inputCommand = process.argv[2];
const result = execute(inputCommand);
console.log(`X: ${result.x} Y: ${result.y} Direction: ${result.direction}`);
