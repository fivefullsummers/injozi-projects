import { useQuery } from "react-query"

export const useGet = (queryKey, queryFunction) => {
  const {data, isLoading, isError, isSuccess} = useQuery(queryKey, { queryFn: queryFunction });
  return { data, isLoading, isError, isSuccess};
}