const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// données en memoire (reponses incluses côté server)

const QUESTIONS = [
  {
    id: 1,
    question: "React est principalement utilisé pour...",
    choices: [
      "le backend",
      "La construction d'UI",
      "La gestion de base de données",
    ],
    anwerIndex: 1,
  },

  {
    id: 2,
    question: "Node.js s'execute...",
    choices: [
      "Dans le navigateur",
      "Côté serveur (sur V8",
      "Dans une base SQL",
    ],
    answerIndex: 1,
  },
  {
    id: 3,
    question: "Express est...",
    choices: [
      "Un ORM",
      "Un framework web minimal pour Node",
      "Une bibliotheque CSS",
    ],
    answerIndex: 1,
  },
  {
    id: 4,
    question: "Le 'state' dans React sert à...",
    choices: [
      "Stocker des styles",
      "Gérer des données dynamiques",
      "définir des routes",
    ],
    answerIndex: 1,
  },
  {
    id: 5,
    question: "Quelle méthode HTTP ici est utilisée pour valider les réponses?",
    choices: ["GET", "POST", "PUT"],
    answerIndex: 0,
  },
  {
    id: 6,
    question: "Avec Express,pour créer une route on utilise...",
    choices: ["app.get('/...')", "db.query('/...)", "react.route('/...)"],
    answerIndex: 0,
  },
  {
    id: 7,
    question: "Dans Reacton me met souvent le rendu dans...",
    choices: [
      "Les styles CSS",
      "Autoriser des requêtes cross-origin",
      "Compiler du JSX",
    ],
    answerIndex: 1,
  },
  {
    id: 8,
    question: "CORS est utile pour...",
    choices: [
      "Les styles CSS",
      "Autoriser des requêtes cross-origin",
      "compiler du JSX",
    ],
    answerIndex: 1,
  },
  {
    id: 9,
    question: "Un composant 'React est...",
    choices: [
      "Une fonction/Classe qui retourne de l'UI",
      "Un serveur HTTP",
      " Un fichier .sql",
    ],
    answerIndex: 0,
  },
  {
    id: 10,
    question: "Express peut aussi servir...",
    choices: [
      "Des fichiers statiques(front)",
      "uniquement du JSON",
      "Uniquement du XML",
    ],
    answerIndex: 0,
  },
];

//Liste des questions sans les réponses
app.get("/api/check", (req, res) => {
  const id = parseInt(req.query.id, 10);
  //index de la réponse choisie
  const choice = parseInt(req.query.choice, 10);

  const q = QUESTIONS.find((q) => q.id === id);
  if (!q || Number.isNaN(choice)) {
    return res.json({ correct: false, message: "mauvaise réponse" });
  }

  const correct = q.answerIndex === choice;
  return res.json({
    correct,
    message: correct ? "ok super bravo" : "mauvaise réponse",
  });
});

//servir le front static depuis /public

app.use(express.static(path.join(__dirname, "public")));

//je lance le serveur

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
