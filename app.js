var quiz = [
  {
    question: "What Does CSS Stands For ?",
    answer: "Cast Cading Style Sheet",
    options: [
      "Cast Cading Style Sheet",
      "Cast Codeing Sell Sheet",
      "Cast Cading Sell Sheet",
      "Code Cading Style Sheet",
    ],
  },

  {
    question: "JS Stands For??",
    answer: "Java Script",
    options: ["Java Sheet", "JSON Script", "Java Script", "JSON Sheet"],
  },

  {
    question: "What  Does HTML Stands For ??",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Makeup Language",
      "Hyper Text Made Language",
      "No of the above",
    ],
  },

  {
    question: "What  Does DOM Stands For ??",
    answer: "Document Object Model",
    options: [
      "Document Object Model",
      "Document Object Mass",
      "Dos Object Model",
      "No of the above",
    ],
  },

  {
    question: "Java Script is ............ Language ??",
    answer: "Case Sensitive",
    options: [
      "Case Sensitive",
      "Non Case Sensitive",
      "Camel Sensitive",
      "No of the above",
    ],
  },
];

var noOfQuestion = 0;
var score = 0;
var optionPara = document.getElementsByClassName("options");
var selected = document.getElementsByClassName("selected");
var input;

function question(e) {
  var allQustions = quiz.length;
  var display = `Question ${noOfQuestion + 1} of ${allQustions}`;
  document.getElementById("allQuestion").innerHTML = display;

  var questiondiv = document.getElementById("question");
  questiondiv.innerHTML = quiz[e].question;
  for (var i = 0; i < optionPara.length; i++) {
    optionPara[i].innerHTML = quiz[e].options[i];
  }
}

// console.log(score);
var flag = true;

document.getElementById("nextbtn").addEventListener("click", button);
function button() {
  if (selected.length == 1) {
    document.getElementById("timer").innerText = 0;
  }
  var btnvalue = document.getElementById("nextbtn").value;
  if (btnvalue == "Next Question") {
    nextQuestion();
  }

  if (noOfQuestion + 1 == quiz.length) {
    document.getElementById("nextbtn").value = "Submit Quiz";
    document.getElementById("nextbtn").classList.add("submit");
    var submit = document.getElementsByClassName("submit");
    submit[0].addEventListener("click", function () {
      if (flag == true) {
        flag = false;
        selected = document.getElementsByClassName("selected");
        input = selected[0].innerHTML;
        // console.log(input);
        // console.log(quiz[noOfQuestion].answer);
        if (input == quiz[noOfQuestion].answer) {
          score += 10;
          // console.log(score);
        }
        sessionStorage.setItem("User Score", score);

        location.href = "result.html";
      }
    });
  }
}

function nextQuestion() {
  selected = document.getElementsByClassName("selected");
  input = selected[0].innerHTML;
  // console.log(input);
  // console.log(quiz[noOfQuestion].answer);
  if (input == quiz[noOfQuestion].answer) {
    score += 10;
    // console.log(score);
  }
  noOfQuestion++;
  question(noOfQuestion);
  removeSelected();
}

function select(e) {
  removeSelected();
  e.classList.add("selected");
}

function removeSelected() {
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.remove("selected");
  }
}

setInterval(function () {
  var count = document.getElementById("timer").innerText;
  var num = Number(count++);
  if (num <= 9) {
    document.getElementById("timer").innerText = `0${count++}`;
  } else {
    var time = (document.getElementById("timer").innerText = count++);
  }

  if (time >= 30) {
    if (selected.length == 0 && noOfQuestion + 1 == quiz.length) {
      sessionStorage.setItem("User Score", score);
      location.href = "result.html";
    } else if (selected.length == 1 && noOfQuestion + 1 == quiz.length) {
      // console.log("why");
      selected = document.getElementsByClassName("selected");
      input = selected[0].innerHTML;
      if (input == quiz[noOfQuestion].answer) {
        score += 10;
        // console.log(score);
      }

      sessionStorage.setItem("User Score", score);

      location.href = "result.html";
    } else if (selected.length == 0) {
      noOfQuestion++;
      question(noOfQuestion);
      removeSelected();
    } else {
      button();
    }
    document.getElementById("timer").innerText = 0;
  }
}, 1000);
