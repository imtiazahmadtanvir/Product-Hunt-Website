import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Player from "../components/Player";

const Players = ({ handleSelectedPlayers }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('/players.json') // Fetch from public folder
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData) => setPlayers(jsonData))
            .catch((error) => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <div className="w-11/12 mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
                <Player key={player.player_id} player={player} handleSelectedPlayers={handleSelectedPlayers}></Player>
            ))}
        </div>
    );
};

Players.propTypes = {
    handleSelectedPlayers: PropTypes.func.isRequired
};

export default Players;
