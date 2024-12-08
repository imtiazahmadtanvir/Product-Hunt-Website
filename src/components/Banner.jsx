import PropTypes from "prop-types";
import bannerShadow from '../assets/bg-shadow.png'
import bannerImage from '../assets/banner-main.png'

const Banner = ({handleCredit}) => {
    const totalCredit = 1000000;

    return (
        <div
            className="hero w-11/12 mx-auto mt-10 rounded-3xl bg-black"
            style={{
                backgroundImage: `url(${bannerShadow})`,
            }}>
            <div className="hero-content text-neutral-content text-center">
                <div className="">
                    <div className='flex justify-center mt-8'>
                        <img src={bannerImage} alt="" />
                    </div>
                    <h1 className="mt-8 mb-5 text-4xl font-bold">Assemble Your Ultimate Dream 11 Cricket Team</h1>
                    <p className="mb-5 text-[#FFFFFFB3]">
                        Beyond Boundaries Beyond Limits
                    </p>
                    <div className=' sm:w-1/5 mx-auto border border-[#e7fe29] rounded-2xl p-2'>
                        <button onClick={() => handleCredit(totalCredit)} className="w-full btn bg-[#E7FE29] text-black font-bold border-none">Claim Free Credit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Banner.propTypes = {
    handleCredit: PropTypes.func.isRequired
}

export default Banner;