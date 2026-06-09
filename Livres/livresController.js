import livre from "./Livres.js";

async function getAllLivres(req, res) {
    try {
        const livres = await livre.find({});
        if (livres.length === 0) return req.status(404).json({message:"No book found"});
        return res.status(200).json(livres);
    } catch (error) {
        console.error(error);
        res.status(500).send("server Error");
    }
}

async function getOneLivre(req, res) {
    try {
        const oneLivre = await livre.findById(req.params.id);
        if (!oneLivre) return res.status(404).json({message: "Livre not found"});
        return res.status(200).json(oneLivre)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export {
    getAllLivres,
    getOneLivre
};