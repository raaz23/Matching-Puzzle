let colors = ["#FEA47F", "#FC427B", "#1B9CFC", "#B33771", "#FD7272"];
let score = 0;
let negScore = 0;
let allAns = document.querySelectorAll(".options .ans");
let allChoices = document.querySelectorAll(".choices");
let scoreText = document.querySelector("p");
let cNum = 0;
let timeLeft = 30;
let timerInterval;
let body = document.querySelector("body");

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft >= 0) {
            scoreText.innerText = `TIME LEFT : ${timeLeft} sec /  SCORE : ${score - negScore} `;
        } else {
            SC();
            for (let choice of allChoices) {
                choice.draggable = false;
                choice.style.display="none";  
            }
            for (let x of allAns) 
            x.style.display="none";
            clearInterval(timerInterval);
            return;
        }
    }, 1000); 
}

function SC() {
    let FinalSCore = document.createElement("div");
    FinalSCore.classList.add("finalScore");
    FinalSCore.innerHTML = `FinalScore : ${score - negScore}`;
    body.append(FinalSCore);
}

for (let i = 0; i < allAns.length; i++) {
    allAns[i].style.background = colors[i];
    allAns[i].addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    allAns[i].addEventListener("drop", function (e) {
        let data = e.dataTransfer.getData("text").split("/");
        if (data[1] === "none") return;
        if (data[1] == e.target.style.background) {
            score++;
        } else {
            negScore++;
        }
        scoreText.innerText = `SCORE : ${score - negScore}`;
        document.getElementById(data[0]).style.background = "none";
        document.getElementById(data[0]).draggable = false;

        if (negScore + score == cNum) {
            alert(`FINAL SCORE : ${score - negScore}`);
            history.go();
        }
    });
}

for (let j = 0; j < allChoices.length; j++) {
    if (Math.random() > 0.5) {
        allChoices[j].style.background = colors[Math.floor(Math.random() * 5)];
        allChoices[j].draggable = true;
        cNum++;

        allChoices[j].addEventListener("dragstart", function (e) {
            let id = uid();
            e.target.id = id;
            e.dataTransfer.setData("text", id + "/" + e.target.style.background);
        });
    }
}

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
startTimer();
