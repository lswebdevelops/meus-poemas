const express = require("express");
const router = express.Router();
const Poems = require('../models/Poems')


/*
 * Get/
 * HOME
 *  
 */


router.get("/", async (req, res) => {
    const locals = {
        title: "Meus Poemas",
        description: "Simple Blog created with NodeJs, Express &amp; MongoDb."
    }

    try {
      const data = await Poems.find();
      res.render("index", {locals, data});
      
    } catch (error) {
      console.log(error);
    }

});









// function insertPoemData() {
//   Poems.insertMany([
//     {
//       title: "Sussurros da Noite",
//       author: "Emily Grace",
//       body: "No silêncio da noite iluminada pela lua,\nSussurros tecem uma história tão suave.\nEstrelas acima, como diamantes que cintilam,\nEcoando o sonho de um amante."
//     },
//     {
//       title: "Sinfonia Silenciosa",
//       author: "Alexander Muse",
//       body: "A natureza conduz uma sinfonia silenciosa,\nVento e folhas, uma harmoniosa festa.\nMontanhas permanecem com graça estoica,\nEnquanto o mundo veste sua face tranquila."
//     },
//     {
//       title: "Ecos Eternos",
//       author: "Serena Rain",
//       body: "Pegadas desvanecem na praia de areia,\nEcos de amor para sempre.\nOndas abraçam, depois se despedem,\nMas o amor permanece sob o céu."
//     },
//     {
//       title: "Serenata da Primavera",
//       author: "Elijah Bloom",
//       body: "No jardim onde as flores brincam,\nA primavera orquestra uma grande bailarina.\nPétalas dançam na luz suave,\nUma sinfonia de cores alçando voo."
//     },
//     {
//       title: "Reverie da Meia-Noite",
//       author: "Luna Song",
//       body: "Sussurros da meia-noite revelam segredos não contados,\nCorrentes prateadas de luz da lua se desdobram.\nSonhos emergem na quietude,\nUma tapeçaria tecida no tear."
//     },
//     {
//       title: "Cascata de Sonhos",
//       author: "Aria Nightingale",
//       body: "Sonhos caem como uma cascata,\nRaios de lua tecendo um xale celestial.\nNo reino tranquilo onde os sonhos residem,\nRealidade e fantasia coincidem."
//     },
//     {
//       title: "Vozes da Floresta",
//       author: "Finn Woods",
//       body: "No coração da floresta antiga,\nSussurros das árvores, sábios e bons.\nFolhas sussurram contos de eras passadas,\nSabedoria da natureza inigualável."
//     },
//     {
//       title: "Abraço do Crepúsculo",
//       author: "Isabella Twilight",
//       body: "O crepúsculo desce, um beijo de amante,\nCéu pintado em tons de felicidade.\nEstrelas surgem como fogo distante,\nIniciando o tranquilo coral da noite."
//     },
//     {
//       title: "Dança da Aurora",
//       author: "Orion Borealis",
//       body: "A aurora tece sua dança cósmica,\nFitas de luz em um transe celestial.\nCores giram na noite do norte,\nUma bailarina cósmica, pura e brilhante."
//     },
//     {
//       title: "Almas Errantes",
//       author: "Sylvia Wanderer",
//       body: "Almas errantes na bruma do crepúsculo,\nPerseguindo sonhos que persistentemente flutuam.\nPegadas ecoam na luz que desvanece,\nUma jornada na noite tranquila."
//     },
//   ]);
// }

//insertPoemData()






















router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
