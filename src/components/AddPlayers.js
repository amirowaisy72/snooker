import React, { useState } from "react";
import ShowPlayers from "./ShowPlayers";

const AddPlayers = () => {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const [redPoints, setRedPoints] = useState(1);

  //Set Red Points
  const redPointsSetter = (points) => {
    setRedPoints(points);
  };
  //Add Players
  const handlePlayersSubmit = (e) => {
    e.preventDefault();
    let key = 0;
    if (players.length == 0) {
      key = 0;
    } else {
      key = players[players.length - 1].id + 1;
    }
    const newElement = { id: key, name: player, score: 0 };
    setPlayers((players) => [...players, newElement]);
    setPlayer("");
  };

  const handleOnChange = (e) => {
    setPlayer(e.target.value);
  };

  //Add Points
  const addPoints = (player, score) => {
    let key = 0;
    if (players.length == 0) {
      key = 0;
    } else {
      key = players[players.length - 1].id + 1;
    }
    const newElement = { id: key, name: player, score: score };
    setPlayers((players) => [...players, newElement]);
  };

  //Update function
  const update = (id, score) => {
    let newPlayers = JSON.parse(JSON.stringify(players));
    //Logic to edit in client
    for (let index = 0; index < newPlayers.length; index++) {
      const element = newPlayers[index];
      if (element.id == id) {
        newPlayers[index].score = score;
        break;
      }
    }
    setPlayers(newPlayers);
  };

  //Foul function
  const fowlHandle = (player, score) => {
    let key = 0;
    if (players.length == 0) {
      key = 0;
    } else {
      key = players[players.length - 1].id + 1;
    }
    const newElement = { id: key, name: player, score: -score };
    setPlayers((players) => [...players, newElement]);
  };

  //Delete Entry
  const deleteHandle = (id) => {
    const newEntries = players.filter((player) => {
      return player.id !== id;
    });
    setPlayers(newEntries);
  };

  return (
    <>
    <ShowPlayers
        players={players}
        addPoints={addPoints}
        update={update}
        fowlHandle={fowlHandle}
        deleteHandle={deleteHandle} redPoints={redPoints}
      />
      <div className="container">
        <center>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <p className="card-text">Red = {redPoints} point</p>
              <div
                className="btn btn-danger btn-sm"
                onClick={() => {
                  redPointsSetter(1);
                }}
              >
                1 Point
              </div>
              <div
                className="btn btn-danger btn-sm mx-2"
                onClick={() => {
                  redPointsSetter(10);
                }}
              >
                10 Point
              </div>
            </div>
          </div>
        </center>
      </div>
      <div className="container my-2">
        <form onSubmit={handlePlayersSubmit}>
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              value={player}
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Enter Player Name"
              onChange={handleOnChange}
            />
          </div>
          <center>
            <button type="submit" disabled={player == '' ? true : false} className="btn btn-primary my-2">
              Add Player
            </button>
          </center>
        </form>
      </div>
    </>
  );
};

export default AddPlayers;
