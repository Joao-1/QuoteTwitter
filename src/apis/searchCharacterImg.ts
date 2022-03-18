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
    const queryForGraphQL = `{
      Character(search: "${characterName}") {
        image {
          large
          medium
        }
      }
    }`;

    try {
      const resultFromAnilistApi = await axios.post('https://graphql.anilist.co', { query: queryForGraphQL });

      return resultFromAnilistApi.data as unknown as ShapeData;
    } catch (error: any) {
      throw new Error("Error fetching the phrase character image.")
    }
  }
}

export default Images;
