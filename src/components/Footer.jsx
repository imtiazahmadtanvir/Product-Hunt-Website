import logoImage from '../assets/logo-footer.png'

const Footer = () => {
    return (
        <footer className='bg-[#06091a]'>
            <div className='flex justify-center pt-40'>
                <img src={logoImage} alt="" />
            </div>
            <div className="footer justify-evenly md:w-11/12 mx-auto text-[#FFFFFF99] text-base-content p-10">
                <nav className='w-[70%]'>
                    <h6 className="footer-title text-white font-semibold">About Us</h6>
                    <p className=' text-[#FFFFFF99]'>We are a passionate team dedicated to providing the best services to our customers.</p>
                </nav>
                <nav className='mr-32'>
                    <h6 className="footer-title text-white font-semibold">Quick Links</h6>
                    <ol className='flex flex-col pl-4'>
                        <li className="link link-hover text-[#FFFFFF99] list-disc">Home</li>
                        <li className="link link-hover text-[#FFFFFF99] list-disc">Service</li>
                        <li className="link link-hover text-[#FFFFFF99] list-disc">About</li>
                        <li className="link link-hover text-[#FFFFFF99] list-disc">Contact</li>
                    </ol>
                </nav>
                <form className='w-11/12 md:w-full'>
                    <h6 className="footer-title text-white font-semibold">Subscribe</h6>
                    <p className='text-[#FFFFFF99]'>Subscribe to our newsletter for the latest updates.</p>
                    <fieldset className="form-control w-80">
                        <div className="join mt-4">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="input input-bordered join-item" />
                            <button className="btn join-item bg-gradient-to-r from-[#ff8a8a] to-[#fbcf72] text-black">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="divider border-t-2 border-[#e0e0e2]"></div>
            <p className='text-center text-[#FFFFFF99] text-sm pb-8'>@2024 Your Company All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
