import { Link } from "react-router-dom";
import bg1 from "../assets/bg1.webp";
import bg2 from "../assets/bg2.webp";
import bg3 from "../assets/bg3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";

const Banner = () => {
  return (
    <div className="w-11/12 lg:w-8/12 mx-auto">
      <section id="banner" className="p-10 text-center text-gray-900">
        {/* Swiper Slider for Banner */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mb-6"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg1}
                alt="Innovative Products"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Discover Innovative Products
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg2}
                alt="Community Driven Reviews"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Join Our Community of Innovators
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="w-full h-96 relative">
              <img
                src={bg3}
                alt="Upvote Your Favorites"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white px-4">
                  Upvote Your Favorite Products
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Welcome Message */}
        <div className="max-w-3xl mx-auto">
          <div>
            <h2 className="text-4xl sm:text-3xl font-extrabold mb-4 text-gray-900">
              Welcome to{" "}
              <span className="text-yellow-500">Product Hunt!</span>
            </h2>

            <Typewriter
              words={[
                "Discover the Latest Innovations",
                "Share Your Ideas with the World",
                "Vote for the Best Products",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>

          <Fade>
            <p className="text-lg text-gray-700 mb-6">
              Explore, upvote, and review amazing products curated by our 
              community of innovators and enthusiasts.
            </p>
          </Fade>

          {/* Explore Button */}
          <Link
            to="/explore-products"
            className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 hover:text-gray-100 transition"
          >
            Start Exploring Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Banner;
