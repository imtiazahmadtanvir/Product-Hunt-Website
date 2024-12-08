import PropTypes from "prop-types";

const Available = ({ handleActiveTab, selected, activeButton, handleActiveButton }) => {
    return (
        <div className="w-11/12 mx-auto mt-16 flex justify-between">
            <h2 className="card-title">Available Players</h2>
            <div className="flex overflow-hidden">
                <button
                    onClick={() => {
                        handleActiveButton(1);
                        handleActiveTab(1); // Update the active tab
                    }}
                    className={`btn font-bold border-[#e0e0e2] rounded-l-xl rounded-r-none ${activeButton === 1 ? 'bg-[#E7FE29]' : 'bg-white'
                        }`}
                >
                    Available
                </button>
                <button
                    onClick={() => {
                        handleActiveButton(2);
                        handleActiveTab(2); // Update the active tab
                    }}
                    className={`btn border text-[#13131399] border-[#e0e0e2] rounded-l-none rounded-r-xl ${activeButton === 2 ? 'bg-[#E7FE29]' : 'bg-white'
                        }`}
                >
                    Selected ({selected})
                </button>
            </div>
        </div>
    );
};

Available.propTypes = {
    handleActiveTab: PropTypes.func.isRequired,
    selected: PropTypes.num,
    activeButton: PropTypes.num,
    handleActiveButton: PropTypes.func.isRequired,
}

export default Available;