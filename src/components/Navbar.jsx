import PropTypes from "prop-types";
import coinImage from '../assets/coin.png';
import logoImage from '../assets/logo.png'

const Navbar = ({ credit }) => {
    return (
        <div className="navbar w-11/12  mx-auto mt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>Home</a></li>
                    <li><a>Fixture</a></li>
                    <li><a>Teams</a></li>
                    <li><a>Schedules</a></li>
                    </ul>
                </div>
                <div className="">

                    <img src={logoImage} alt="" />
                </div>
                
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end">
            <ul className="hidden lg:flex justify-center items-center menu menu-horizontal px-1">
                <li>
                    <a>Home</a></li>
                    <li><a>Fixture</a></li>
                    <li><a>Teams</a></li>
                    <li><a>Schedules</a></li>
                </ul>
            <button className='flex items-center gap-1 p-2 border border-[#1313131A] rounded-xl text-black font-semibold'><span>{credit}</span> Coin <img className='w-[25%]' src={coinImage} alt="" /></button>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    credit: PropTypes.number.isRequired
}

export default Navbar;