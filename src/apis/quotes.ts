import axios from "axios";

export interface ShapeQuote {
    anime: string,
    character: string,
    quote: string
}

const newQuote = async () => {
    const generatedQuote = await axios.get("https://animechan.vercel.app/api/random");

    if (!generatedQuote) {
        throw new Error("The generate sentences api does not return anything. Could not make a new post")
    }

    return generatedQuote.data as ShapeQuote;
}

export default newQuote;