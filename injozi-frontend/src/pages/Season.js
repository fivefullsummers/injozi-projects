import { useParams } from "react-router-dom";
import { getWinnersBySeason } from "../services/getWinners";
import { useGet } from "../hooks/useGet";
import { useEffect, useState } from "react";
import { useDriverImages } from "../hooks/useDriverImage";
import { useQueryClient } from "react-query";

const Season = () => {
  const { year } = useParams();
  const [wikiTitles, setWikiTitles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [worldChamp, setWorldChamp] = useState();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useGet(
    `winners-${year}`,
    () => getWinnersBySeason(year)
  );

  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log("data", data);
      const wikiUrls = data.map((res) => {
        return res.Results[0].Driver.url;
      });
      setWikiTitles(wikiUrls.map((url) => decodeURI(url).split("/").pop()));
      const driverWithMostPoints = calculateDriverWithMostPoints(data);
      setWorldChamp(driverWithMostPoints);
    }
  }, [isSuccess, isLoading, data, queryClient, worldChamp]);

  const driverPhotos = useDriverImages(wikiTitles, { enabled: !!wikiTitles });

  useEffect(() => {
    async function getImages() {
      let imagesUrls = [];
      if (driverPhotos.isFetched) {
        let images = driverPhotos.data.pages;

        await Promise.all(images)
          .then((resolvedImages) => {
            if (resolvedImages[0].length > 0) {
              const imagesPromises = resolvedImages[0].map((image) => {
                return image.then((url) => {
                  imagesUrls = url.replaceAll("thumb/", "").split("/");
                  imagesUrls.pop();
                  return imagesUrls.join("/");
                });
              });

              Promise.all(imagesPromises)
                .then((resolvedUrls) => {
                  setPhotos(resolvedUrls);
                })
                .catch((err) => {
                  console.error("Error: ", err);
                });
            }
          })
          .catch((err) => {
            console.error("Error: ", err);
          });
      }
    }

    getImages();
  }, [driverPhotos.isSuccess, driverPhotos.data]);

  const calculateDriverWithMostPoints = (data) => {
    let maxPoints = 0;
    let driverWithMostPoints = null;

    data.forEach((race) => {
      const results = race.Results;
      results.forEach((result) => {
        const points = parseInt(result.points);
        if (points > maxPoints) {
          maxPoints = points;
          driverWithMostPoints = result.Driver;
        }
      });
    });

    console.log("driver with most points", driverWithMostPoints);

    return driverWithMostPoints;
  };

  //console.log("data", data[0].Results[0]);

  return (
    <div className="flex flex-col pt-5 pb-20 px-5 bg-neutral-200 justify-center">
      <h1 className="font-semibold text-lg">{year} Season</h1>
      <div className="aspect-square grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 gap-4 ">
        {!isLoading &&
          data.map((winner, index) => {
            return (
              <div
                key={index}
                className="card w-fit h-fit min-w-[260px] max-w-[318px] lg:max-w-[582px] bg-neutral-100 shadow-xl rounded-md overflow-hidden"
              >
                <figure className="block overflow-hidden h-[60%]">
                  <img
                    alt={winner.Results[0].Driver.givenName}
                    src={photos[index]}
                    className="hover:scale-105 transition duration-500"
                  />
                </figure>
                <div
                  className={`
                  card-body
                  p-0
                  
                  ${
                    !isLoading &&
                    worldChamp?.driverId === winner.Results[0].Driver.driverId
                      ? "bg-secondary"
                      : "bg-white"
                  }
                  `}
                >
                  <div className="overflow-hidden">
                    <table className="table table-xs">
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{`${winner.Results[0].Driver.givenName} ${winner.Results[0].Driver.familyName}`}</td>
                        </tr>
                        <tr>
                          <th>Constructor</th>
                          <td>{winner.Results[0].Constructor.name}</td>
                        </tr>
                        <tr>
                          <th>Circuit</th>
                          <td>{winner.Circuit.circuitId}</td>
                        </tr>
                        <tr>
                          <th>Time</th>
                          <td>{winner.Results[0].Time.time}</td>
                        </tr>
                        <tr>
                          <th>Points</th>
                          <td>{winner.Results[0].points}</td>
                        </tr>
                      </tbody>
                    </table>
                    {!isLoading &&
                      worldChamp?.driverId ===
                        winner.Results[0].Driver.driverId && (
                        <div>
                          <p className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-lg font-black">
                            Season World Champ
                          </p>
                          🏆
                        </div>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Season;
