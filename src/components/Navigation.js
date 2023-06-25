import { getSeasonList } from "../services/ergastAPIHandler";
import { useGet } from "../hooks/useGet";
import Error from "../error";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useScroll } from "framer-motion";

const Navigation = () => {
  const navigate = useNavigate();
  const selectedSeason = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({ container: selectedSeason})

  const { data, isLoading, isError } = useGet("seasons", getSeasonList);

  if (isError) {
    return <Error />;
  }

  const getYearFromScroll = (scrollPosition) => {
    if (scrollPosition === 0) {
      return 2005; // start date
    }
    const initialScrollPosition = 22;
    const yearDifference = 5; // Difference between the initial year and the year corresponding to the initial scroll position
    const positionDifference = 43; // Difference between consecutive scroll positions in the pattern

    const year = Math.floor((scrollPosition - initialScrollPosition) / positionDifference) + yearDifference;
    return 2000 + year;
  }

  const handleNavigation = (e) => {
    e.preventDefault();
    console.log("scroll", scrollY.current);
    const year = getYearFromScroll(scrollY.current);
    navigate(`/season/${year}`);
  };

  return (
    <nav className="w-56 h-full pt-10 flex-col">
      <p className="font-semibold text-large">Seasons</p>
      <div className="picker">
        <div className="picker-window"></div>
        <div className="triangle"></div>
        <ul className="picker-year" ref={selectedSeason}>
          {!isLoading
            ? data.map((season) => {
                return <li key={season}>{season}</li>;
              })
            : new Array(19).map((season, index) => {
                <li key={index}>Loading seasons...</li>;
              })}
        </ul>
      </div>
      <div className="flex justify-center items-center pt-5">
        <button onClick={(e) => handleNavigation(e)} className="btn btn-primary">
          Pick a year
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
