import { useParams } from "react-router-dom";

const Season = () => {
  const { year } = useParams();
  console.log("params", year);
  return (
    <div>
      Enter {year}
    </div>
  );
}

export default Season;