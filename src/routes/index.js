const   express         =   require('express');
const   router          =   express.Router();
const   GuiaDosQuadrinhosBr     =   require('../controllers/GuiaDosQuadrinhosBr');
const   configRoutes    =   [
                            router.post('/extrair-colecao',      GuiaDosQuadrinhosBr.extrairColecao)
];

router.use('/api/guiadosquadrinhos/', configRoutes)
module.exports = router;