import quotes from './src/apis/quotes';
import Twitter from './src/apis/twitter';
import searchCharacterImg from './src/apis/searchCharacterImg';
import axios from 'axios';
import sharp from 'sharp';

console.log(process.env.INIT);
const twitter = new Twitter();

async function generateTweetQuote() {
  try {
    const { quote, character, anime } = await quotes();
    const quoteFormated = `
    "${quote}" - ${character}, ${anime}

#${character.replace(/[^a-zA-Z0-9 ]/g, '')} #${anime.replace(/[^a-zA-Z0-9 ]/g, '')}
    `;
    const { data } = await new searchCharacterImg().anilist(character);
    const downloadedImage = await axios.get(data.Character.image.large, { responseType: 'arraybuffer' });
    const imageResize = (await sharp(Buffer.from(downloadedImage.data, 'binary')).toFormat("jpg", { mozjpeg: true, lossless: true, quality: 100 }).toBuffer()).toString('base64');
    const idOfTheimageSentToTwitter = await twitter.uploadImage(imageResize);

    await twitter.newPost(quoteFormated, idOfTheimageSentToTwitter);
  } catch (error: any) {
    if (error.response?.statusText === 'Not Found') {
      generateTweetQuote()
    } else {
      twitter.sendDm(error.message, "1098974140747448321");
    }
  }
}

setInterval(generateTweetQuote, 1000 * 60 * 6);
