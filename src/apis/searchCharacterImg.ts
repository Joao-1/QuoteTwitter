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

    const resultFromAnilistApi = await axios.post('https://graphql.anilist.co', {
      query: queryForGraphQL
    });

    if (!resultFromAnilistApi) {
      throw new Error("Error fetching the phrase character image. Could not make a new post")
    }

    return resultFromAnilistApi.data as unknown as ShapeData;
  }
}

export default Images;