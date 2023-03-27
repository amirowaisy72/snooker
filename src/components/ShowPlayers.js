import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShowPlayers = ({
  players,
  addPoints,
  update,
  fowlHandle,
  deleteHandle,
  redPoints,
}) => {
  //States
  const [activePlayer, setActivePlayer] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [foulMode, setFoulMode] = useState(false);
  //Ball Hitted Details
  const [hittColor, setHittColor] = useState('')
  const [hittHide, setHittHide] = useState(true)

  //run function came from AddPlayers to add scores data to players state variable
  const addScore = (score, color) => {
    //Ball Hitted state change
    setHittHide(false)
    setHittColor(color)
    setTimeout(()=>{
      setHittHide(true)
    }, 2000)
    if (updateMode) {
      //run update function and setUpdateMode false after updating completed
      update(updateId, score);
      setUpdateMode(false);
    } else if (foulMode) {
      //Run Fowl Mode function
      fowlHandle(activePlayer, score);
      setFoulMode(false);
    } else {
      if (activePlayer == "") {
        alert("There is no active player, points can not be pushed");
      } else {
        // alert("add Points to player "+activePlayer)
        addPoints(activePlayer, score);
      }
    }
  };

  //Delete entry
  const deleteTriger = (id) => {
    deleteHandle(updateId);
    setUpdateMode(false);
  };

  //Function to set foulMode true
  const foulTriger = (score) => {
    setUpdateMode(false);
    setFoulMode(true);
  };

  //Select active player
  const playerSelected = (player) => {
    setActivePlayer(player);
  };

  //Fetch total points of specific player
  const getPoints = (player) => {
    let totalPoints = 0;
    for (let index = 0; index < players.length; index++) {
      const element = players[index];
      if (element.name == player) {
        totalPoints = totalPoints + element.score;
      }
    }
    return totalPoints;
  };

  // Generate unique names array
  const uniquePlayers = Array.from(new Set(players.map((a) => a.name))).map(
    (name) => {
      return players.find((a) => a.name === name);
    }
  );

  // Set Update Mode On
  const updateOn = (id) => {
    setFoulMode(false);
    setUpdateMode(true);
    setUpdateId(id);
  };

  //Set suppose key to avoid same key error
  let key = 0;

  return (
    <div className="container text-center my-2">
      {/* List of Players (remove duplicates) */}

      <ul className="nav nav-tabs my-2">
        {uniquePlayers.map((p) => {
          key = key + 1;
          return (
            <li
              key={key}
              onClick={() => {
                playerSelected(p.name);
              }}
              className="nav-item"
            >
              <a
                key={key}
                className={`nav-link ${
                  p.name === activePlayer ? "active" : ""
                }`}
                href="#"
              >
                {p.name}{" "}
                <label key={key} style={{ color: "black" }}>
                  {getPoints(p.name)}
                </label>
              </a>
            </li>
          );
        })}
      </ul>
      {/* Player detail */}
      <button
        className="btn my-2 btn-sm btn-danger"
        hidden={activePlayer ? false : true}
        onClick={foulTriger}
      >
        Foul
      </button>
      <center>
        <div className="card my-2" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{activePlayer}</h5>
            <p className="card-text">
              {players.map((p) => {
                key = key + 1;
                if (p.name === activePlayer) {
                  if (
                    p.score == 10 ||
                    p.score == -10 ||
                    p.score == 1 ||
                    p.score == -1
                  ) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "red" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "red" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 2 || p.score == -2) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "#F2EC32" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "#F2EC32" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 3 || p.score == -3) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "#48E51E" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "#48E51E" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 4 || p.score == -4) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "#EEA526" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "#EEA526" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 5 || p.score == -5) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "blue" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "blue" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 6 || p.score == -6) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark mx-2"
                          style={{ color: "pink" }}
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe mx-2"
                          style={{ color: "pink" }}
                        ></i>
                      );
                    }
                  } else if (p.score == 7 || p.score == -7) {
                    if (p.score < 0) {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-xmark  mx-2"
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={key}
                          onClick={() => {
                            updateOn(p.id);
                          }}
                          className="fa-solid fa-globe  mx-2"
                        ></i>
                      );
                    }
                  }
                }
              })}
            </p>
            <div className="btn btn-sm btn-primary">
              {getPoints(activePlayer)}
            </div>
          </div>
        </div>
      </center>
      {/* Balls being hitted by active player */}
      <center hidden={hittHide} className="mb-1">
        <i className="fa-solid fa-globe" style={{ color: hittColor, fontSize: '50px' }}></i>
      </center>
      <center>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <i
              className="fa-solid fa-globe"
              onClick={() => {
                addScore(redPoints, "red");
              }}
              style={{ color: "red" }}
            ></i>
            {!foulMode ? (
              <>
                <i
                  className="fa-solid fa-globe mx-5"
                  onClick={() => {
                    addScore(2, "#F2EC32");
                  }}
                  style={{ color: "#F2EC32" }}
                ></i>
                <i
                  className="fa-solid fa-globe"
                  onClick={() => {
                    addScore(3, "#48E51E");
                  }}
                  style={{ color: "#48E51E" }}
                ></i>
              </>
            ) : (
              ""
            )}
            <i
              className="fa-solid fa-globe my-5 mx-5"
              onClick={() => {
                addScore(4, "#EEA526");
              }}
              style={{ color: "#EEA526" }}
            ></i>
            <i
              className="fa-solid fa-globe"
              onClick={() => {
                addScore(5, "blue");
              }}
              style={{ color: "blue" }}
            ></i>
            <i
              className="fa-solid fa-globe mx-5"
              onClick={() => {
                addScore(6, "pink");
              }}
              style={{ color: "pink" }}
            ></i>
            {foulMode ? (
              <>
                <i
                  className="fa-solid fa-globe"
                  onClick={() => {
                    addScore(7, "");
                  }}
                ></i>
              </>
            ) : (
              <>
                <center>
                  <i
                    className="fa-solid fa-globe"
                    onClick={() => {
                      addScore(7);
                    }}
                  ></i>
                </center>
              </>
            )}
            <label className="mx-5">
              {updateMode ? "Update Mode on" : foulMode ? "Fowl Mode On" : ""}
              {updateMode && (
                <button
                  onClick={deleteTriger}
                  className="btn mx-2 btn-sm btn-primary"
                >
                  Delete
                </button>
              )}
            </label>
          </div>
        </div>
      </center>

      {/* End */}
    </div>
  );
};

export default ShowPlayers;
