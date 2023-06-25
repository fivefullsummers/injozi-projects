import axios from "axios";

export const getWinnersBySeason = async (season) => {
  const url = process.env.REACT_APP_ERGAST_API_URL;

  return await axios
    .get(`${url}/${season}/results/1.json`)
    .then((res) => {
      const data = res.data.MRData.RaceTable.Races;
      return data
    })
    .catch((err) => {
      throw new Error(err);
    })
}