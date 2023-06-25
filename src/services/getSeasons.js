import axios from "axios";

export const getSeasonList = async () => {

  const url = process.env.REACT_APP_ERGAST_API_URL;
  let seasons = [];

  const filterSeasonsFromTo = (seasons, from, to) => {
    return seasons.filter((season) => {
      const year = parseInt(season.season);
      return year >= from && year <= to;
    })
    .map((season) => parseInt(season.season));
  }

  return await axios
    .get(`${url}/seasons.json?limit=100`)
    .then((res)=> {
      seasons = res.data.MRData.SeasonTable.Seasons;
      const filteredSeasons = filterSeasonsFromTo(seasons, 2005, 2023);
      return filteredSeasons;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

