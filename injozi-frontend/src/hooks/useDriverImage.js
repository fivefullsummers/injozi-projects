import { useInfiniteQuery } from "react-query"
import { getDriverImage } from "../services/getDriverImage"

export const useDriverImages = (wikiTitles) => {
  
  return useInfiniteQuery({
    queryKey: ['driverImage', wikiTitles],
    queryFn: () => getDriverImage(wikiTitles),
  });
}
