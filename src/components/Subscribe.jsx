import bannerShadow from '../assets/bg-shadow.png'

const Subscribe = () => {
    return (
        <div className='relative z-10 top-28 w-9/12 mx-auto mt-12 border border-white rounded-3xl p-3'>
            <div
                className="hero rounded-3xl bg-white"
                style={{
                    backgroundImage: `url(${bannerShadow})`,
                }}>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mt-8 mb-5 text-3xl text-black font-semibold">
                            Subscribe to our Newsletter
                        </h1>
                        <p className="mb-5 text-[#131313B3] font-medium">
                            Get the latest updates and news right in your inbox!
                        </p>
                        <div className="flex items-center w-[100%] justify-between gap-2 md:gap-0 pb-14">
                            <input type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" />
                            <button className='btn bg-gradient-to-r from-[#ff8a8a] to-[#fbcf72]'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;