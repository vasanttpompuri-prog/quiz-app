const questions = [
  {
    text: "日本で面積が最も大きい都道府県はどれですか？",
    choices: ["岩手県", "北海道", "長野県", "新潟県"],
    correct: 1,
  },
  {
    text: "元素記号「Au」が表す元素は何ですか？",
    choices: ["銀", "鉄", "金", "銅"],
    correct: 2,
  },
  {
    text: "世界で最も長い川はどれですか？",
    choices: ["アマゾン川", "ミシシッピ川", "長江（揚子江）", "ナイル川"],
    correct: 3,
  },
  {
    text: "日本国憲法が施行されたのは何年ですか？",
    choices: ["1945年", "1947年", "1950年", "1952年"],
    correct: 1,
  },
  {
    text: "光の速さに最も近いものはどれですか？",
    choices: [
      "約30万km/秒",
      "約3万km/秒",
      "約300万km/秒",
      "約3,000km/秒",
    ],
    correct: 0,
  },
  {
    text: "太陽系で最も大きい惑星はどれですか？",
    choices: ["土星", "天王星", "木星", "海王星"],
    correct: 2,
  },
  {
    text: "「モナ・リザ」を描いた芸術家は誰ですか？",
    choices: ["ミケランジェロ", "レオナルド・ダ・ヴィンチ", "ラファエロ", "ボッティチェリ"],
    correct: 1,
  },
  {
    text: "日本の国鳥はどれですか？",
    choices: ["ツル", "トキ", "ウグイス", "キジ"],
    correct: 3,
  },
  {
    text: "人体で最も大きい臓器はどれですか？",
    choices: ["肝臓", "肺", "皮膚", "腸"],
    correct: 2,
  },
  {
    text: "1気圧のもとで水が沸騰する温度は何度ですか？",
    choices: ["80℃", "90℃", "95℃", "100℃"],
    correct: 3,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultScore = document.getElementById("result-score");
const resultMessage = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");

function showQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.style.display = "none";

  const q = questions[currentIndex];
  const total = questions.length;

  progressFill.style.width = `${(currentIndex / total) * 100}%`;
  progressText.textContent = `問題 ${currentIndex + 1} / ${total}`;
  questionText.textContent = q.text;

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add("correct");
    } else if (i === selectedIndex) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedbackEl.textContent = "✓ 正解です！";
    feedbackEl.className = "feedback correct";
  } else {
    feedbackEl.textContent = `✗ 不正解。正解は「${q.choices[q.correct]}」でした。`;
    feedbackEl.className = "feedback incorrect";
  }

  const isLast = currentIndex === questions.length - 1;
  nextBtn.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextBtn.style.display = "block";
}

function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  const total = questions.length;
  resultScore.textContent = `${total}問中 ${score}問 正解`;

  if (score === total) {
    resultMessage.textContent = "満点です！素晴らしい！";
  } else if (score >= total * 0.8) {
    resultMessage.textContent = "よくできました！";
  } else if (score >= total * 0.6) {
    resultMessage.textContent = "もう少しで合格ラインです。";
  } else {
    resultMessage.textContent = "もう一度チャレンジしてみましょう！";
  }
}

function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";
  showQuestion();
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    progressFill.style.width = "100%";
    showResult();
  }
});

retryBtn.addEventListener("click", resetQuiz);

showQuestion();
