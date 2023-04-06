import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
//Voice recognition and speak
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

const ShowPlayers = ({
  players,
  addPoints,
  update,
  fowlHandle,
  deleteHandle,
  redPoints,
}) => {
  // Generate unique names array
  const uniquePlayers = Array.from(new Set(players.map((a) => a.name))).map(
    (name) => {
      return players.find((a) => a.name === name);
    }
  );

  //Voice commands
  const commands = [
    {
      command: "select *",
      callback: (name) => {
        let found = false;
        for (let index = 0; index < uniquePlayers.length; index++) {
          const element = uniquePlayers[index];
          let pattern = new RegExp(name, "i");
          if (element.name.match(pattern)) {
            found = true;
            name = element.name;
            break;
          }
        }
        if (found) {
          setActivePlayer(name);
          speak({ text: `${name} Selected` });
        } else {
          speak({ text: `${name} not found` });
        }
      },
    },
    {
      command: "ball *",
      callback: (color) => {
        if (activePlayer === "") {
          speak({ text: "Please select a player" });
        } else {
          if (color === "Red" || color === "red") {
            addScore(redPoints, "red");
            speak({ text: `"Red added" ${redPoints} Points` });
          } else if (color === "Yellow" || color === "yellow") {
            addScore(2, "#F2EC32");
            speak({ text: "Yellow added" });
          } else if (color === "Green" || color === "green") {
            addScore(3, "#48E51E");
            speak({ text: "Green added" });
          } else if (color === "Brown" || color === "brown") {
            addScore(4, "#EEA526");
            speak({ text: "Brown added" });
          } else if (color === "Blue" || color === "blue") {
            addScore(5, "blue");
            speak({ text: "Blue added" });
          } else if (color === "Pink" || color === "pink") {
            addScore(6, "pink");
            speak({ text: "Pink added" });
          } else if (color === "Black" || color === "black") {
            addScore(7, "");
            speak({ text: "Black added" });
          } else {
            speak({ text: "No ball for this color" });
          }
        }
      },
    },
    {
      command: "cross *",
      callback: (color) => {
        if (activePlayer === "") {
          speak({ text: "Please select a player" });
        } else {
          if (color === "Red" || color === "red") {
            fowlHandle(activePlayer, 10);
            speak({ text: "Red Foul" });
          } else if (color === "Brown" || color === "brown") {
            fowlHandle(activePlayer, 4);
            speak({ text: "Brown Foul" });
          } else if (color === "Blue" || color === "blue") {
            fowlHandle(activePlayer, 5);
            speak({ text: "Blue Foul" });
          } else if (color === "Pink" || color === "pink") {
            fowlHandle(activePlayer, 6);
            speak({ text: "Pink Foul" });
          } else if (color === "Black" || color === "black") {
            fowlHandle(activePlayer, 7);
            speak({ text: "Black Foul" });
          } else {
            speak({ text: "No ball for this color" });
          }
        }
      },
    },
    {
      command: "points",
      callback: () => {
        //Read all players
        for (let index = 0; index < uniquePlayers.length; index++) {
          const element = uniquePlayers[index];
          speak({
            text: element.name + " " + getPoints(element.name) + " Points",
          });
        }
      },
    },
  ];
  //Voice recognition and speak
  const { speak } = useSpeechSynthesis();
  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  });
  //States
  const [activePlayer, setActivePlayer] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [foulMode, setFoulMode] = useState(false);
  //Ball Hitted Details
  const [hittColor, setHittColor] = useState("");
  const [hittHide, setHittHide] = useState(true);

  //run function came from AddPlayers to add scores data to players state variable
  const addScore = (score, color) => {
    //Ball Hitted state change
    setHittHide(false);
    setHittColor(color);
    setTimeout(() => {
      setHittHide(true);
    }, 2000);
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
      {/* Voice recognition/speak */}
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button hidden={false} onClick={SpeechRecognition.startListening}>
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={() => speak({ text: "text" })}>Speak</button><br />
        <small>[select, ball, cross, points]</small>
        <p>{transcript}</p>
      </div>
      {/* List of Players (remove duplicates) */}

      <ul className="nav nav-tabs my-2">
        {uniquePlayers.map((p) => {
          key = key + 1;
          return (
            <div key={key}>
              {getPoints(p.name) < 100 ? (
                <li
                  key={key}
                  onClick={() => {
                    playerSelected(p.name);
                  }}
                  className="nav-item"
                >
                  <a
                    className={`nav-link ${
                      p.name === activePlayer ? "active" : ""
                    }`}
                    href="#"
                  >
                    {p.name}{" "}
                    <label style={{ color: "black" }}>
                      {getPoints(p.name)}
                    </label>
                  </a>
                </li>
              ) : (
                <li
                  key={key}
                  onClick={() => {
                    playerSelected(p.name);
                  }}
                  className="nav-item"
                >
                  <a
                    style={{ background: "green", color: "white" }}
                    className={`nav-link ${
                      p.name === activePlayer ? "active" : ""
                    }`}
                    href="#"
                  >
                    {p.name}{" "}
                    <label style={{ color: "white" }}>
                      {getPoints(p.name)}
                    </label>
                  </a>
                </li>
              )}
            </div>
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
        <i
          className="fa-solid fa-globe"
          style={{ color: hittColor, fontSize: "50px" }}
        ></i>
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
