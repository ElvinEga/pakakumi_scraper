import { values } from './entries.js';

const entries = values;

const entriesAverage = entries => entries.reduce((acc, entry) => acc + entry,0) / entries.length;

const occurrence = (entries, value) => {
    const occ = entries.filter(number => number <= value);
    console.log(occ.length)
    return (occ.length * 100 / entries.length).toFixed(2) + '%';
}

const simulateBet = (bet, threshold) => {
    let info = {
        total: bet,
        wins: 0,
        losses: 0,
    }         

    const WAIT_THRESHOLD = 1.4;
    const WAIT_ROUNDS = 2;
    let wait = 0;        

    entries.forEach(entry => {  
        console.log(info);    
        
        if(wait > 0){
            wait--;            
        }  
        else if(entry > threshold){
            info.wins = info.wins + 1;
            info.total = info.total + (bet * (threshold - 1));
            wait = Math.floor(Math.random() * 6) + 1;
        }
        else {            
            info.losses = info.losses + 1;
            info.total = info.total - bet;
            /*if(entry <= WAIT_THRESHOLD){
                wait = WAIT_ROUNDS;
            }*/
            wait = Math.floor(Math.random() * 40) + 10;
        }      
                  
    })
    return info;
}

console.log(simulateBet(10, 1.4));


