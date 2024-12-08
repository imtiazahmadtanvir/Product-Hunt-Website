import PropTypes from "prop-types";

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
                    alt="Shoes"
                    className="rounded-xl object-fill w-full h-[175px]"
                />
            </figure>
            <div className="card-body items-center text-center w-11/12 mx-auto px-0">
                <div className="w-full flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    <h2 className="card-title">{name}</h2>
                </div>
                <div className="w-full mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>
                        <p>{region}</p>

                    </div>
                    <div>
                        <button className="btn cursor-not-allowed">{playing_role}</button>
                    </div>
                </div>
                <div className="divider"></div>

                <h3 className="w-full text-left font-bold">Rating</h3>

                <div className="w-full flex justify-between items-center mt-2">
                    <h3 className="w-full text-left font-bold">{batting_style}</h3>
                    <h3 className="w-full text-[#131313B3] text-right font-bold">{bowling_style}</h3>
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                    <h3 className="w-full text-left font-bold">Price: ${price}</h3>
                    <button onClick={() => handleSelectedPlayers(player_id, profile_image, name, batting_style, price)} className="btn bg-white border border-[#e0e0e2] hover:bg-[#e7fe29]">Choose Player</button>
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
