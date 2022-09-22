import {
  faCalendarDays,
  faHotel,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import "./searchbar.scss";

function SearchBar() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      open: false,
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
    open: false,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", {
      state: { destination, date, options },
    });
  };

  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faHotel} className="headerIcon" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="headerSearchInput"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <span
          className="headerSearchText"
          onClick={() =>
            setDate((prevDate) => [{ ...prevDate[0], open: !prevDate[0].open }])
          }
        >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
          date[0].endDate,
          "dd/MM/yyyy"
        )}`}</span>
        {date[0].open && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            className="date"
          />
        )}
      </div>

      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <span
          className="headerSearchText"
          onClick={() =>
            setOptions((prevOptions) => ({
              ...prevOptions,
              open: !prevOptions.open,
            }))
          }
        >{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
        {options.open && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                  disabled={options.children <= 0}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "d")}
                  disabled={options.room <= 1}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="headerSearchItem">
        <button className="headerBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
