import axios from 'axios';

interface ShapeData {
  data: {
    Character: {
      image: {
        large: string,
        medium: string
      }
    }
  }
}

class Images {
  async anilist(characterName: string) {
    try {  
      const resultFromAnilistApi = await axios.post('https://graphql.anilist.co', {
        query: `{
          Character(search: "${characterName}") {
            image {
              large
              medium
            }
          }
        }`
      });

      return resultFromAnilistApi.data as unknown as ShapeData;
    } catch (error) {
      throw new Error("Error fetching the phrase character image. Could not make a new post")
    }
  }
}

export default Images;