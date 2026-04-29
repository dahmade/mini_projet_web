/**
 * PROTOCOLE LAMPORT : DEFINITION DES ETATS (STATES)
 * On définit d'abord les données et les variables de suivi.
 */

// Tableau d'objets contenant les questions, options et index de la bonne réponse
const questions = [
    {
        question: "Quel est le résultat de 5 + '5' en JavaScript ?",
        options: ["10", "55", "Erreur", "undefined"],
        answer: 1 // L'index 1 correspond à "55" (Concaténation)
    },
    {
        question: "Quelle boucle s'exécute au moins une fois ?",
        options: ["for", "while", "do...while", "foreach"],
        answer: 2 // L'index 2 correspond à "do...while"
    },
    {
        question: "Comment déclarer une variable constante en JS ?",
        options: ["var", "let", "const", "static"],
        answer: 2 // L'index 2 correspond à "const"
    }
];

// Variables d'état pour suivre la progression
let currentQuestionIndex = 0; // Index de la question actuelle
let score = 0;               // Score de l'utilisateur

/**
 * MAPPAGE DU DOM (Document Object Model)
 * On lie les éléments HTML aux variables JS pour pouvoir les manipuler.
 */
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const scoreDisplay = document.getElementById('score-display');
const progress = document.getElementById('progress');

/**
 * ACTIONS ET LOGIQUE
 */

// Fonction pour afficher une question
function showQuestion() {
    // 1. Récupérer la question actuelle
    let currentQuestion = questions[currentQuestionIndex];
    
    // 2. Mettre à jour le texte de la question dans le HTML
    questionText.innerText = currentQuestion.question;
    
    // 3. Vider les anciens boutons de réponse pour ne pas les accumuler
    answerOptions.innerHTML = ''; 

    // 4. Mettre à jour la barre de progression (Calcul de pourcentage)
    let progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = progressPercentage + '%';

    // 5. Créer dynamiquement un bouton pour chaque option
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        
        // Classes Tailwind pour le style
        button.className = "p-4 border-2 border-slate-200 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all font-medium";
        
        // Action au clic sur une réponse
        button.onclick = () => checkAnswer(index);
        
        // Ajouter le bouton dans le conteneur HTML
        answerOptions.appendChild(button);
    });
}

// Fonction pour vérifier la réponse choisie
function checkAnswer(selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];

    // Vérification de la logique : Comparaison des index
    if (selectedIndex === currentQuestion.answer) {
        score++; // Incrémenter le score si c'est juste
        scoreDisplay.innerText = `Score: ${score}`;
    }

    // Passer à la question suivante
    currentQuestionIndex++;

    // Edge-case : Vérifier s'il reste des questions
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Fin du quiz
        alert(`Quiz terminé ! Votre score est de : ${score}/${questions.length}`);
        window.location.href = "index.html"; // Redirection vers l'accueil
    }
}

// Lancement initial du quiz
showQuestion();