import { Link } from "react-router-dom";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "TechWave",
      description: "TechWave launched their AI-powered productivity app on Product Hunt and gained 10,000+ users within the first week!",
      image: "https://source.unsplash.com/500x300/?startup,success",
      link: "/success/techwave",
    },
    {
      id: 2,
      name: "EcoGadget",
      description: "EcoGadget revolutionized sustainable tech by showcasing their solar-powered gadgets, securing funding and partnerships!",
      image: "https://source.unsplash.com/500x300/?eco,technology",
      link: "/success/ecogadget",
    },
    {
      id: 3,
      name: "InnovateX",
      description: "InnovateX transformed online learning with interactive AR tools, gaining media recognition and thousands of downloads!",
      image: "https://source.unsplash.com/500x300/?education,technology",
      link: "/success/innovatex",
    },
  ];

  return (
    <section className="w-11/12 lg:w-8/12 mx-auto py-16">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
        🎉 Success Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {story.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{story.description}</p>
              <Link
                to={story.link}
                className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
