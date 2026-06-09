import { Schema, model } from "mongoose";
import { type } from "node:os";

const livreSchema = new Schema ({
    livreTitle: {
        type: string,
        required: true,
    },
    livreCategory: {
        type: string,
        required: true,
    },
    livreAuthor: {
        type: string,
        required: true,
    },
});

const livre = model("livres", livreSchema)

export default livre;