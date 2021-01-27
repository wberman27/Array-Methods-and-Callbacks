import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter((item) => item.Year === 2014 && item.Stage === "Final");
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log(finals2014[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log(finals2014[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log(finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log(finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
//console.log(finals2014[0]["Win conditions"].split("win")[0]); // old
if(finals2014[0]["Home Team Goals"] > finals2014[0]["Away Team Goals"]){
    console.log(finals2014[0]["Home Team Name"]);
}else{
    console.log(finals2014[0]["Away Team Name"]);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

// const finals = []; //old
// function getFinals(data){
//     for(let i=0; i<data.length; i++){
//         if(data[i]["Stage"] === "Final" && finals.includes(data[i]) === false){ //this conditional required for some odd reason
//             finals.push(data[i]);
//         }
//     } return finals;
// }
// console.log(getFinals(fifaData));
function getFinals(data){
    let finals = [];
    data.forEach(function(item){
        if(item['Stage'] === 'Final'){
            finals.push(item);
        }   
    }); return finals;
}
console.log(getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

// const years = []; // old
// function getYears(array, CB){
//     for(let i=0; i<CB.length; i++){
//         if(years.includes(CB[i]['Year']) === false){ //this conditional required for some odd reason
//         array.push(CB[i]['Year']);
//         }
//     }return years;
// }
// console.log(getYears(years, getFinals(fifaData)));
let years = [];
function getYears(array, CB){
    const getFinals = CB(array);
    getFinals.forEach(function(item){
        return years.push(item.Year); 
    }); return years;
}
console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

// const winners = []; //I would use .filter here
// function getWinners(array, CB1) {
//     for(let i=0; i<CB1.length; i++){
//         if(CB1[i]["Home Team Goals"] > CB1[i]["Away Team Goals"]){
//                 winners.push(CB1[i]["Home Team Name"]);
//         }
//             else {
//                     winners.push(CB1[i]["Away Team Name"]);
//                 }
                  
//     }return winners; //this still copies the names so array ends up being twice as large...
// };
// console.log(getWinners(winners, getFinals(fifaData)));
let winners = [];
function getWinners(array, CB){
    const getFinals = CB(array);
    getFinals.forEach(function(item){
        if(item["Home Team Goals"] > item["Away Team Goals"]){
            return winners.push(item["Home Team Name"]);
        }
        else {
            return winners.push(item["Away Team Name"]);
            }
    }); return winners;
}
console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

// const hist = []; //old
// function getWinnersByYear(array, CB1, CB2) {
//     for(let i=0; i < CB1.length; i++){
//         array.push(`In ${CB1[i]}, ${CB2[i]} won the world cup!`)
//     }return hist;
// };

function getWinnersByYear(array, CB1, CB2){
    const getYears = CB1(array, getFinals);
    const getWinners = CB2(array, getFinals);
    return getYears.map(function(item1, i){
        return `In ${item1}, ${getWinners[i]} won the world cup!`;
    });
} 
console.log(getWinnersByYear(fifaData, getYears, getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(array, CB){
    const getFinals = CB(array);
    const goals = getFinals.reduce(function(total,item){
    return total + item["Home Team Goals"] + item["Away Team Goals"];
    },0);
    return Math.round((goals / getFinals.length) * 100) / 100;
}
console.log(getAverageGoals(fifaData, getFinals));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
