function handlegamerulesbox(){
    const gamebox=document.getElementsByClassName('custom-square-bullets')[0]
    gamebox.style.display='block';
}
function closepopup(){
    const closebutton=document.getElementsByClassName('custom-square-bullets')[0]
    closebutton.style.display='none';
}
window.onload = function () {
    // Initialize scores to zero each time the page is loaded
    let userScore = 0;  // Initialize user score to zero
    let computerScore = 0;  // Initialize computer score to zero

    // Select elements
    const con = document.querySelectorAll(".hand");
    const computer = document.querySelectorAll(".com");
    const user = document.querySelector(".user");
    const machine = document.querySelector(".machine");
    const winModal = document.querySelector(".win-modal");
    const loseModal = document.getElementById("lose-modal");
    const tieModal = document.getElementById("tie-modal");
    const winner = document.querySelector(".winner");
    const play = document.querySelectorAll(".play");
    const lines = document.querySelectorAll(".line");
    const replayButton = document.getElementById("replay-button"); // Replay button in tie modal

    // Update displayed scores
    const userScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    userScoreElement.innerText = userScore;
    computerScoreElement.innerText = computerScore;

    const choices = ["rock", "paper", "scissors"];

    con.forEach((element, index) => {
        element.addEventListener("click", () => {
            user.style.opacity = "1";
            machine.style.opacity = "0"; // Hide machine pick until computer picks

            // Hide triangle lines
            lines.forEach(line => line.style.display = "none");

            // Hide all hands first
            con.forEach(item => item.style.display = "none");

            // Show only clicked hand
            element.style.position = "absolute";
            element.style.left = "350px";
            element.style.top = "200px";
            element.style.opacity = "1";
            element.style.display = "flex";
            element.classList.add("show");

            // Generate computer random move
            let random = Math.floor(Math.random() * 3);

            // After small delay, show computer's choice
            setTimeout(() => {
                machine.style.opacity = "1";
                const selectedComputerHand = computer[random];
                selectedComputerHand.style.display = "flex";
                selectedComputerHand.style.opacity = "1";
                selectedComputerHand.style.position = "absolute";
                selectedComputerHand.style.left = "950px";
                selectedComputerHand.style.top = "200px";
                selectedComputerHand.classList.add("right");
            }, 500);

            // Check result after another delay
            setTimeout(() => {
                let result = "";

                if (random === index) {
                    tieModal.style.display = "grid"; // Tie
                    tieModal.style.opacity = "1";
                    winner.innerText = "TIE UP";
                    result = "draw";
                    
                    // Show Replay button when there's a tie
                    replayButton.addEventListener("click", () => {
                        // Reset scores and reload the game
                        userScore = 0;
                        computerScore = 0;
                        userScoreElement.innerText = userScore;
                        computerScoreElement.innerText = computerScore;
                        localStorage.setItem('userScore', userScore);
                        localStorage.setItem('computerScore', computerScore);

                        // Reload the page for a new round
                        window.location.reload();
                    });
                } else if (
                    (index === 0 && random === 2) ||
                    (index === 1 && random === 0) ||
                    (index === 2 && random === 1)
                ) {
                    winModal.style.display = "grid";
                    winModal.style.opacity = "1";
                    winner.innerText = "YOU WIN";
                    userScore++;
                    userScoreElement.innerText = userScore;
                    localStorage.setItem('userScore', userScore);
                    result = "player";
                } else {
                    loseModal.style.display = "grid";
                    loseModal.style.opacity = "1";
                    winner.innerText = "YOU LOST";
                    computerScore++;
                    computerScoreElement.innerText = computerScore;
                    localStorage.setItem('computerScore', computerScore);
                    result = "computer";
                }

                // Save the current game result and choices
                localStorage.setItem('playerChoice', choices[index]);
                localStorage.setItem('computerChoice', choices[random]);
                localStorage.setItem('result', result);

                // Redirect after 2.5 seconds
                setTimeout(() => {
                    window.location.href = "/result/result.html";
                }, 2500);

            }, 1500); // 1.5 sec delay to show computer's hand
        });
    });

    // Play Again button for normal rounds
    play.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.reload();
        });
    });
}
