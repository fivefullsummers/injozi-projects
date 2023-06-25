import { useQuery } from "react-query"

export const useGet = (queryKey, queryFunction) => {

  const {data, isLoading, isError} = useQuery({
    queryKey: [queryKey],
    queryFn: queryFunction,
  });

  return { data, isLoading, isError};
}