const express = require("express");
//autorise les echanges entre le back et le front
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// je construis mes questions dans une variable que je déclare
const QUESTIONS = [
  {
    id: 1,
    question: "React est principalement utilisé pour...",
    choices: ["le backend", "La construction d'UI", "La gestion de base de données"],
    answerIndex: 1, // indique quelle réponse est la bonne
  },
  {
    id: 2,
    question: "Node.js s'execute...",
    choices: ["Dans le navigateur", "Côté serveur (sur V8)", "Dans une base SQL"],
    answerIndex: 1,
  },
  {
    id: 3,
    question: "Express est...",
    choices: ["Un ORM", "Un framework web minimal pour Node", "Une bibliotheque CSS"],
    answerIndex: 1,
  },
  {
    id: 4,
    question: "Le 'state' dans React sert à...",
    choices: ["Stocker des styles", "Gérer des données dynamiques", "définir des routes"],
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
    choices: ["app.get('/...')", "db.query('/...')", "react.route('/...')"],
    answerIndex: 0,
  },
  {
    id: 7,
    question: "CORS est utile pour...",
    choices: ["Les styles CSS", "Autoriser des requêtes cross-origin", "Compiler du JSX"],
    answerIndex: 1,
  },
  {
    id: 8,
    question: "CORS est utile pour...",
    choices: ["Les styles CSS", "Autoriser des requêtes cross-origin", "compiler du JSX"],
    answerIndex: 1,
  },
  {
    id: 9,
    question: "Un composant React est...",
    choices: ["Une fonction/Classe qui retourne de l'UI", "Un serveur HTTP", "Un fichier .sql"],
    answerIndex: 0,
  },
  {
    id: 10,
    question: "Express peut aussi servir...",
    choices: ["Des fichiers statiques(front)", "uniquement du JSON", "Uniquement du XML"],
    answerIndex: 0,
  },
];

// Ajout de la route
app.get("/api/questions", (req, res) => {
  res.json(QUESTIONS.map(({ id, question, choices }) => ({ id, question, choices })));
});

// logique de verif de reponse
app.get("/api/check", (req, res) => {
    //le parseInt transforme une chaine de caracteres en nombre entier
  //Ce code stocke la position de la bonne réponse pour chaque question,
  //afin que le serveur puisse vérifier si le choix de l’utilisateur correspond à celle-ci.
  const id = parseInt(req.query.id, 10);
  const choice = parseInt(req.query.choice, 10);
  const q = QUESTIONS.find((q) => q.id === id);
  //isNan verifie si la valeur n'est pas un nombre
  if (!q || Number.isNaN(choice)) {
    return res.json({ correct: false, message: "mauvaise réponse" });
  }
  const correct = q.answerIndex === choice;
  return res.json({ correct, message: correct ? "ok super bravo" : "mauvaise réponse" });
});

//« Cette ligne permet à mon serveur Express d’envoyer automatiquement 
// les fichiers du dossier public (comme le HTML, le CSS ou les images)
// directement au navigateur, sans que j’aie besoin de créer de route spéciale pour ça. »
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
