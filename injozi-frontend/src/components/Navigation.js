import { getSeasonList } from "../services/getSeasons";
import { useGet } from "../hooks/useGet";
import Error from "../error";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const Navigation = () => {
  const navigate = useNavigate();
  const selectedSeason = useRef(null);
  const yearItem = useRef();
  const [selectedScroll, setSelectedScroll] = useState(0);
  const { scrollY } = useScroll({ container: selectedSeason });
  const { year } = useParams();

  const { data, isLoading, isError } = useGet("seasons", getSeasonList);

  const initialScrollPosition = 22;
  const yearDifference = 5; // Difference between the initial year and the year corresponding to the initial scroll position
  const positionDifference = 43; // Difference between consecutive scroll positions in the pattern

  const getScrollFromYear = (year) => {
    const initialYear = 2005;
    const yearDifference = year - initialYear;

    const scrollPosition = initialScrollPosition + yearDifference * positionDifference;
    return scrollPosition;
  };

  const getYearFromScroll = (scrollPosition) => {
    if (scrollPosition === 0) {
      return 2005;
    }
    
    const year =
      Math.floor(
        (scrollPosition - initialScrollPosition) / positionDifference
    ) + yearDifference;
    return 2000 + year;
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    const year = getYearFromScroll(scrollY.current);
    setSelectedScroll(scrollY.current);
    navigate(`/season/${year}`);
  };

  useEffect(() => {
    const initialYear = parseInt(year); // Start year
    const initialScrollPosition = getScrollFromYear(initialYear);
    setSelectedScroll(initialScrollPosition);
    selectedSeason.current.scrollTop = selectedScroll;
  }, [year, selectedScroll, selectedSeason]);

  if (isError) {
    return <Error />;
  }

  return (
    <nav className="w-56 flex flex-col relative mt-[-15px] pl-5">
      <div className="">
        <div className="picker">
          <div className="picker-window"></div>
          <div className="triangle"></div>
          <ul className="picker-year w-full" ref={selectedSeason}>
            {!isLoading
              ? data.map((season) => {
                  return (<li
                    ref={yearItem}
                    data-scroll={`${scrollY.current}-${season}`}
                    key={season}
                    className={season === getYearFromScroll(selectedScroll) ? "bg-base-300" : "bg-base-100"}>
                      {season}
                    </li>);
                })
              : new Array(19).map((index) => {
                  <li key={index}>Loading seasons...</li>;
                })}
          </ul>
        </div>
        <div className="flex justify-center items-center pt-5">
          <button
            onClick={(e) => handleNavigation(e)}
            className="btn btn-primary"
          >
            Pick a year
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
