const express = require("express");
const router = express.Router();
const Poems = require('../models/Poems')


/*
 * Get/
 * HOME
 *  
 */

// adding pagination

router.get("/", async (req, res) => {
  try {
    const locals = {
        title: "Meus Poemas",
        description: "Simple website for poems created with NodeJs, Express &amp; MongoDb."
    }

    let perPage = 6;
    let page = req.query.page || 1;

    const data = await Poems.aggregate([{ $sort: { createdAt: -1 }}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()

    const count = await Poems.countDocuments({})
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil( count / perPage)
       res.render("index", {
        locals,
         data,
        current: page,
        nextPage: hasNextPage ? nextPage: null,
        currentRoute: '/'
      });
      
    } catch (error) {
      console.log(error);
    }

});




/*
 * Get/
 * poems
 *  
 */



router.get("/poema/:id", async (req, res) => {
  try {
    let slug = req.params.id

    const data = await Poems.findById( { _id: slug })

    const locals = {
        title: data.title,
        description: "Simple website for poems created with NodeJs, Express &amp; MongoDb."
    }

    res.render('poem', { 
      locals,
       data,
       currentRoute: `/post/${slug}`,
       })
  
      
    } catch (error) {
      console.log(error);
    }

});



/*
 * post/
 * poems searchTerm
 *  
 */

router.post("/search", async (req, res) => {
  try {
    
    const locals = {
        title:  "Search",
        description: "Simple website for poems created with NodeJs, Express &amp; MongoDb."
    }

let searchTerm = req.body.searchTerm;
const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

const data = await Poems.find({
  $or: [
    { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
    { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
    { author: { $regex: new RegExp(searchNoSpecialChar, "i") } }
  ]
})

res.render('search', { 
  locals, 
  data,
  currentRoute: '/'
});
  
      
    } catch (error) {
      console.log(error);
    }

});






router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: '/about'
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    currentRoute: '/contact'
  });
});










// function insertPoemData() {
//   Poems.insertMany([
//     {
//       title: "Reflexões ao Luar",
//       author: "Lara Starlight",
//       body: "Luar derrama suas lágrimas prateadas,\nRefletindo segredos nos espelhos da noite.\nCada raio conta uma história,\nNa serenata mágica sob a luz lunar."
//     },
//     {
//       title: "O Canto do Riacho",
//       author: "River Harmony",
//       body: "Riacho murmura uma canção suave,\nA melodia da natureza ecoa nas pedras.\nCada gota, uma nota em sintonia,\nNa sinfonia eterna das águas dançantes."
//     },
//     {
//       title: "Inverno Silencioso",
//       author: "Elsa Frost",
//       body: "Silêncio paira sobre a paisagem de gelo,\nInverno tece um manto de quietude.\nFlocos de neve dançam em câmera lenta,\nUm conto gélido sob o abraço do frio."
//     },
//     {
//       title: "Canção do Viajante",
//       author: "Wanderer's Muse",
//       body: "Pé ante pé, o viajante avança,\nCaminhos traçados por estrelas cintilantes.\nHistórias sussurram nas brisas itinerantes,\nA jornada, uma poesia em constante mudança."
//     },
//     {
//       title: "A Dança das Folhas",
//       author: "Autumn Whispers",
//       body: "Outono pinta a floresta em tons de ouro,\nFolhas dançam na brisa outonal.\nO chão se torna um tapete de memórias,\nA dança efêmera das folhas em sua despedida."
//     },
//     {
//       title: "Canção da Noite Estrelada",
//       author: "Stella Nightfall",
//       body: "Estrelas se alinham em um balé celestial,\nCintilando na vastidão da noite.\nUma canção silenciosa ressoa,\nA sinfonia da noite estrelada."
//     },
//     {
//       title: "Retrato do Amanhecer",
//       author: "Dawn Painter",
//       body: "Pincéis de luz pintam o horizonte,\nAmanhecer, um retrato em tons suaves.\nCores despertam o mundo adormecido,\nUm novo dia se revela na paleta do sol."
//     },
//     {
//       title: "Poesia do Mar",
//       author: "Marina Serenade",
//       body: "Ondas sussurram poesia nas areias,\nHistórias antigas esculpidas em conchas.\nMares vastos, um poema em movimento,\nO eco eterno da poesia do mar."
//     },
//     {
//       title: "Canção da Primavera",
//       author: "Floral Melody",
//       body: "Botões desabrocham em um concerto floral,\nPrimavera, maestrina de cores vivas.\nA terra desperta em alegria,\nNa melodia suave da estação das flores."
//     },
//     {
//       title: "Céu Noturno da Montanha",
//       author: "Summit Serenity",
//       body: "Montanhas tocam o céu noturno,\nEstrelas como diamantes sobre o pico.\nSilêncio majestoso, uma prece na altitude,\nNa serenidade do céu noturno da montanha."
//     },
//   ]);
// }

// insertPoemData()




module.exports = router;
