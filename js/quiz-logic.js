/**
 * DEFINITION DES ETATS ET DES DONNEES
 * On définit d'abord les données et les variables de suivi.
 */

// Tableau de 10 questions couvrant tout le contenu du cours
const questions = [
    // --- Section 1 : Variables & Types ---
    {
        question: "Quel est le résultat de 5 + '5' en JavaScript ?",
        options: ["10", "55", "Erreur", "undefined"],
        answer: 1 // Coercition de type : number + string = string
    },
    {
        question: "Quelle est la différence entre == et === en JavaScript ?",
        options: [
            "Aucune différence",
            "=== vérifie la valeur ET le type, == vérifie seulement la valeur",
            "== est plus rapide que ===",
            "=== est utilisé uniquement pour les strings"
        ],
        answer: 1 // === est l'égalité stricte (valeur + type)
    },
    {
        question: "Que retourne typeof 42 en JavaScript ?",
        options: ["'int'", "'number'", "'integer'", "'float'"],
        answer: 1 // JavaScript n'a qu'un seul type numérique : 'number'
    },
    {
        question: "Comment déclarer une variable constante en JS ?",
        options: ["var", "let", "const", "static"],
        answer: 2 // const = valeur immuable après déclaration
    },

    // --- Section 2 : Conditions ---
    {
        question: "Que fait le mot-clé 'else if' dans une structure conditionnelle ?",
        options: [
            "Il répète le bloc if",
            "Il vérifie une nouvelle condition si la précédente est fausse",
            "Il remplace le bloc else",
            "Il arrête l'exécution du programme"
        ],
        answer: 1 // else if = condition alternative chainée
    },
    {
        question: "Quel est le résultat de : if (0) { ... } en JavaScript ?",
        options: [
            "Le bloc s'exécute car 0 est un nombre",
            "Le bloc ne s'exécute pas car 0 est 'falsy'",
            "Une erreur est lancée",
            "Le bloc s'exécute une seule fois"
        ],
        answer: 1 // 0 est une valeur falsy en JS
    },

    // --- Section 3 : Boucles ---
    {
        question: "Quelle boucle s'exécute au moins une fois, même si la condition est fausse ?",
        options: ["for", "while", "do...while", "foreach"],
        answer: 2 // do...while évalue la condition APRÈS la première exécution
    },
    {
        question: "Que fait l'instruction 'break' à l'intérieur d'une boucle ?",
        options: [
            "Elle passe à l'itération suivante",
            "Elle met la boucle en pause",
            "Elle termine immédiatement la boucle",
            "Elle réinitialise le compteur"
        ],
        answer: 2 // break = sortie forcée de la boucle
    },

    // --- Section 4 : Fonctions & Tableaux ---
    {
        question: "Quelle est la syntaxe correcte pour déclarer une fonction en JavaScript ?",
        options: [
            "function: maFonction() {}",
            "def maFonction() {}",
            "function maFonction() {}",
            "func maFonction() {}"
        ],
        answer: 2 // Syntaxe standard JS
    },
    {
        question: "Comment accéder au premier élément d'un tableau 'tab' en JavaScript ?",
        options: ["tab[1]", "tab.first()", "tab[0]", "tab.get(0)"],
        answer: 2 // Les tableaux sont indexés à partir de 0 (zero-indexed)
    }
];

// Variables d'état pour suivre la progression
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120; // 2 minutes  en secondes
let timerInterval;  // Reference pour le setInterval du timer

/**
 * MAPPAGE DU DOM (Document Object Model)
 */
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const scoreDisplay = document.getElementById('score-display');
const progress = document.getElementById('progress');
const timerDisplay = document.getElementById('timer-display');

/**
 * ACTIONS ET LOGIQUE
 */

 // LOGIQUE DU TIMER (Moteur de temps)
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--; // Action : -1 seconde à chaque tick

        // Visualization du timer (Format MM:SS)
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Edge-case : le temps est écoulé
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Protège la mémoire (Stop leak)
            alert("Temps écoulé ! Retour au cours.");
            window.location.href = "index.html"; // Redirect automatique
        }
    }, 1000);
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    
    questionText.innerText = currentQuestion.question;
    answerOptions.innerHTML = '';

    // Barre de progression : (index actuel + 1) / total * 100
    let progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = progressPercentage + '%';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.className = "p-4 border-2 border-slate-200 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all font-medium";
        button.onclick = () => checkAnswer(index);
        answerOptions.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    }

    currentQuestionIndex++;

    // Edge-case : plus de questions ?
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalResult();
    }
}

// Fonction de fin de quiz : affichage propre au lieu d'un alert()
function showFinalResult() {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '🏆 Excellent ! Tu maîtrises les bases.';
    } else if (percentage >= 50) {
        message = '📘 Pas mal, mais relis le cours pour consolider.';
    } else {
        message = '⚠️ Retourne au cours, les bases ne sont pas solides.';
    }

    document.querySelector('.bg-white').innerHTML = `
        <div class="text-center py-12">
            <h2 class="text-4xl font-extrabold text-slate-900 mb-4">Quiz Terminé !</h2>
            <p class="text-6xl font-black text-blue-600 my-6">${score}/${questions.length}</p>
            <p class="text-xl font-semibold text-slate-600 mb-2">${percentage}% de réussite</p>
            <p class="text-lg text-slate-500 mb-10">${message}</p>
            <div class="flex justify-center gap-4">
                <a href="cours.html" class="bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl hover:bg-slate-300 transition-all">
                    Revoir le Cours
                </a>
                <a href="index.html" class="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all">
                    Retour à l'Accueil
                </a>
            </div>
        </div>
    `;
}

// Lancement initial du temps et affichage de la première question
startTimer();
showQuestion();