import axios from "axios";

export const getDriverImage = async (wikiTitles) => {
const url = process.env.REACT_APP_WIKI_URL;

  return await wikiTitles.map(async(title) => {
    return axios
      .get(`${url}/api.php`, {
        params: {
          action: 'query',
          prop: 'pageimages',
          format: 'json',
          titles: title,
          origin: "*",
          redirects: '',
        }
      })
      .then((res) => {
        const pages = res.data.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];
        const image = page.thumbnail?.source || '';
        return image;
      })
      .catch((err) => {
        throw new Error(err);
      })
  })

}
