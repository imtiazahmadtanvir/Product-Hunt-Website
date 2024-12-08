import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaRunning, FaDollarSign, FaUserCheck } from "react-icons/fa"; // Import icons

const Player = ({ player, handleSelectedPlayers }) => {
    const {
        player_id,
        name,
        profile_image,
        region,
        playing_role,
        batting_style,
        bowling_style,
        price,
    } = player;

    return (
        <div className="card border border-[#e0e0e2]">
            <figure className="px-4 pt-10">
                <img
                    src={profile_image}
                    alt={name}
                    className="rounded-xl object-fill w-full h-[175px]"
                />
            </figure>
            <div className="card-body items-center text-center w-11/12 mx-auto px-0">
                <div className="w-full flex items-center gap-2">
                    <FaRunning className="text-lg text-gray-600" /> {/* New icon for the title */}
                    <h2 className="card-title text-[#131313B3] ">{name}</h2>
                </div>
                <div className="w-full mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" /> {/* New region icon */}
                        <p className="text-[#131313B3] ">{region}</p>
                    </div>
                    <div>
                        <button className="btn text-[#131313B3]  bg-transparent  cursor-not-allowed">{playing_role}</button>
                    </div>
                </div>
                <div className="divider"></div>

                {/* <h3 className="w-full text-left font-bold">Rating</h3> */}

                <div className="w-full flex justify-between items-center mt-2">
                    <h3 className="w-full text-[#131313B3]  text-left font-bold">Batting: {batting_style}</h3>
                    <h3 className="w-full text-[#131313B3] text-right font-bold">{bowling_style}</h3>
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                    <h3 className="w-full text-[#131313B3] text-left font-bold flex items-center gap-2">
                        <FaDollarSign className="text-black" /> {/* New price icon */}
                        ${price}
                    </h3>
                    <button
                        onClick={() =>
                            handleSelectedPlayers(player_id, profile_image, name, batting_style, price)
                        }
                        className="btn btn-success bg-yellow-400 border-none  hover:bg-[#e7fe29] flex items-center gap-2"
                    >
                        <FaUserCheck className="text-blue-500" /> {/* New button icon */}
                        Choose Player
                    </button>
                </div>
            </div>
        </div>
    );
};

Player.propTypes = {
    player: PropTypes.object.isRequired,
    handleSelectedPlayers: PropTypes.func.isRequired,
};

export default Player;
