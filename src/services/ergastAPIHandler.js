import axios from "axios";

const API_URL = "http://ergast.com/api/f1";

export const getSeasonList = async () => {

  let seasons = [];

  const filterSeasonsFromTo = (seasons, from, to) => {
    return seasons.filter((season) => {
      const year = parseInt(season.season);
      return year >= from && year <= to;
    })
    .map((season) => parseInt(season.season));
  }

  return axios
    .get(`${API_URL}/seasons.json?limit=100`)
    .then((res)=> {
      seasons = res.data.MRData.SeasonTable.Seasons;
      const filteredSeasons = filterSeasonsFromTo(seasons, 2005, 2023);
      console.log(filteredSeasons);
      return filteredSeasons;
    })
    .catch((err) => {
      throw new Error(err);
    });
}