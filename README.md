RAPPORT DE PROJET : ARCHITECTURE D'UNE APPLICATION QUIZ
Étudiant : Ahmed Balouch
Établissement : FSSM - Informatique Appliquée (S2)

I. INTRODUCTION GÉNÉRALE
Ce projet consiste en la création d'une plateforme de Quiz interactive et sécurisée. L'objectif n'est pas seulement de coder, mais d'appliquer le Protocole Lamport (Logic Before Syntax) : chaque fonction a été pensée sur papier (états et actions) avant d'être implémentée pour garantir zéro bug logique.

II. ANALYSE DÉTAILLÉE PAR FICHIER
1. index.html : L'Architecture Structurelle
Ce fichier ne contient pas de logique métier, mais définit les points d'ancrage essentiels pour le JavaScript.

Conteneur Dynamique (#quiz-container) : C'est l'élément le plus important. Au lieu de créer 10 pages HTML, nous utilisons une seule page où le contenu est injecté dynamiquement.

Les Identifiants : Chaque élément (#question, #options, #timer) sert d'interface entre le monde statique (HTML) et le monde dynamique (JS).

Optimisation : Nous avons placé les scripts à la fin du <body> pour garantir que le DOM est totalement chargé avant l'exécution de la logique.

2. script.js : Le Cerveau de l'Application
C'est ici que réside toute l'intelligence du projet. Nous avons appliqué la règle des 80/20 pour obtenir une performance maximale avec un code épuré.

Gestion du Timer (Ligne critique : setInterval) :

Le minuteur est réglé sur 120 secondes.

Logic : On utilise une variable d'état pour le temps restant. À chaque seconde, on vérifie la Post-condition : Si temps === 0, alors déclencher la fin du quiz.

Traitement du Tableau de Questions :

Les questions sont indexées à partir de 0. Une attention particulière a été portée à la gestion des débordements pour éviter que l'application ne plante à la fin du tableau.

Sécurisation des Inputs :

Chaque clic de l'utilisateur est filtré pour vérifier s'il correspond à la réponse attendue avant de passer à l'état suivant.

3. js/tailwind.js : Le Moteur de Design Local (Offline Engine)
Contrairement aux méthodes classiques utilisant un lien externe, nous avons intégré Tailwind de manière autonome.

Le Choix du Local : En enregistrant le script directement dans /js/, nous éliminons la dépendance aux serveurs tiers.

Performance : Le navigateur accède au script via le bus système (SSD) plutôt que via la carte réseau, ce qui rend le rendu du style instantané.

Logic d'Intégration : Ce fichier analyse les classes utilitaires injectées par le JavaScript et génère le CSS correspondant en temps réel dans le navigateur (Runtime Compilation).

III. MÉTHODOLOGIE DE DÉVELOPPEMENT
1. Règle du 80/20 (Pareto)
80% de l'expérience utilisateur (fluidité, timer, score) repose sur seulement 20% du code (les fonctions de transition et le minuteur). Nous avons priorisé la robustesse de ces fonctions critiques.

2. Gestion des Edge-Cases
Nous avons anticipé les scénarios où le code pourrait casser :

Rafraîchissement accidentel : La structure est prête pour une future implémentation du localStorage.

Temps écoulé : Le script bloque toute interaction dès que le minuteur atteint zéro, assurant l'intégrité des résultats.

IV. CONCLUSION TECHNIQUE
Ce projet démontre qu'une application web ne se résume pas à des balises HTML, mais à une gestion rigoureuse de la mémoire et des états logiques. L'utilisation de Tailwind CSS en local couplée à une logique JavaScript "Clean Code" permet d'avoir un outil rapide, fiable et prêt pour une mise en production.
