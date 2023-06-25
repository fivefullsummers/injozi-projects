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
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useGet(
    `winners-${year}`,
    () => getWinnersBySeason(year)
  );

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const wikiUrls = data.map((res) => {
        return res.Results[0].Driver.url;
      });
      setWikiTitles(wikiUrls.map((url) => decodeURI(url).split("/").pop()));
    }
  }, [isSuccess, isLoading, data, queryClient]);

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

  return (
    <div className="flex w-full h-full pt-10 pb-20 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 p-2 gap-4 ">
        {!isLoading &&
          data.map((winner, index) => {
            return (
              <div
                key={index}
                className="card w-46 h-full bg-neutral-100 shadow-xl rounded-md"
              >
                <figure className="block overflow-hidden">
                  <img alt="driver" src={photos[index]} className="hover:scale-105 transition duration-500"/>
                </figure>
                <div className="card-body">
                  <div>{winner.Results[0].Driver.givenName}</div>
                  <div>{winner.Results[0].Driver.familyName}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Season;
