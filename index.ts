import quotes from './src/apis/quotes';
import Twitter from './src/apis/twitter';
import searchCharacterImg from './src/apis/searchCharacterImg';
import axios from 'axios';
import sharp from 'sharp';
require("dotenv");

const twitter = new Twitter();

async function generateTweetQuote() {
  try {
    const { quote, character, anime } = await quotes();
    const quoteFormated = `
    "${quote}" - ${character}, ${anime}

#${character.replace(/\s+/g, '')} #${anime.replace(/\s+/g, '')}
    `;

    const { data } = await new searchCharacterImg().anilist(character);
    const downloadedImage = await axios.get(data.Character.image.large, { responseType: 'arraybuffer' });
    const imageResize = (await sharp(Buffer.from(downloadedImage.data, 'binary')).toFormat("jpg", { mozjpeg: true, lossless: true, quality: 100 }).toBuffer()).toString('base64');
    const idOfTheimageSentToTwitter = await twitter.uploadImage(imageResize);

    await twitter.newPost(quoteFormated, idOfTheimageSentToTwitter);
    console.log('New post!');
  } catch (error: any) {
    if (error.response?.statusText === 'Not Found') {
      console.log(error)
      generateTweetQuote()
    }
    console.log(error);
    twitter.sendDm(error.message, "1098974140747448321");
  }
}


setInterval(generateTweetQuote, 2000);
