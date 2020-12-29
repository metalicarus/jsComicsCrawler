const {extrairColecao} = require('../services');

exports.extrairColecao = (req, res, next) => {
    extrairColecao(req.body.url)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error);
        })
};
