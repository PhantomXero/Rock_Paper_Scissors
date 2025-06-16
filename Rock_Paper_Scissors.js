// Getting user input in Node.js
const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and return a promise
const ask = (question) => {
    return new Promise(resolve => input.question(question, answer => resolve(answer)));
}

async function main() {
    // Initialize user and computer win counters
    let userWins = 0;
    let computerWins = 0;

    // keep round state
    let round = 1;
    
    // Welcome message and game instructions
    console.log("========================================");
    console.log("      Welcome to Rock, Paper, Scissors! ");
    console.log("========================================");
    console.log(" You will play against the computer.");
    console.log("----------------------------------------");

    // Prompt user for name
    let name = await ask(" Please enter your name: ");

    // Game instructions
    console.log("----------------------------------------");
    console.log(" The first to win 3 rounds wins the game.");
    console.log("----------------------------------------");
    console.log(" Pick a number to choose your move:");
    console.log("");
    
    while (true) {
        // Display current score and round
        console.log("============================================================");
        console.log(` \t\t${name} ${userWins} | Round ${round} | Computer ${computerWins}`);
        console.log("============================================================");

        // Ask user for their choice
        let answer = await ask("1. Rock 2. Paper 3. Scissors: ");

        // Parsing user input to type int
        let choice = parseInt(answer);

        // Generate computer's choice
        let computerChoice = Math.floor(Math.random() * 3) + 1;

        // Validate user input
        if (choice < 1 || choice > 3) {
            console.log("Invalid choice. Please choose 1, 2, or 3.");
            continue;
        }
        
        // Game logic to determine the winner of the round
        if (choice === computerChoice) {
            console.log("It's a tie!");
            continue;
        } else if (choice === 1 && computerChoice === 3) {
            console.log("You win this row! Rock crushes Scissors.");
            userWins++;
        } else if (choice === 2 && computerChoice === 1) {
            console.log("You win this row! Paper covers Rock.");
            userWins++;
        } else if (choice === 3 && computerChoice === 2) {
            console.log("You win this row! Scissors cut Paper.");
            userWins++;
        } else if (computerChoice === 1 && choice === 3) {
            console.log("You lose this row! Rock crushes Scissors.");
            computerWins++;
        } else if (computerChoice === 2 && choice === 1) {
            console.log("You lose this row! Paper covers Rock.");
            computerWins++;
        } else {
            console.log("You lose this row! Scissors cut Paper.");
            computerWins++;
        }

        // Gameover conditions
        if (userWins == 3) {
            // Close the input stream
            input.close();

            // Display final results
            console.log("========================================");
            console.log(`${name}'s wins: ${userWins} | Computer wins: ${computerWins}`);
            console.log(`Congratulations ${name}! You win the game!`);
            console.log("========================================");
            
            break;
        }
        if (computerWins == 3) {
            // Close the input stream 
            input.close();

            // Display final results
            console.log("========================================");
            console.log(`Your wins: ${userWins} | Computer wins: ${computerWins}`);
            console.log("Computer Wins! Better luck next time.");
            console.log("========================================");
            break;
        }

        // Increment round number
        round++;
    }
}

main()