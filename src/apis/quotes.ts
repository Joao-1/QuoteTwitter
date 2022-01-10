import axios from "axios";

export interface ShapeQuote {
    anime: string,
    character: string,
    quote: string
}

const newQuote = async () => {
    try {
        const generatedQuote = await axios.get("https://animechan.vercel.app/api/random");
        return generatedQuote.data as ShapeQuote;
    } catch (error) {
        throw new Error("The generate sentences api does not return anything. Could not make a new post")
    }
}

export default newQuote;