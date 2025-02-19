import { useEffect, useState } from "react";

const UpcomingLaunches = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    // Inline JSON Data
    const upcomingLaunchesData = [
      {
        "id": 1,
        "name": "AI Content Generator",
        "description": "A revolutionary AI-powered tool that creates high-quality content in seconds.",
        "date": "2025-03-15",
        "image": "https://via.placeholder.com/150/1a73e8/ffffff?text=AI+Content+Generator"
      },
      {
        "id": 2,
        "name": "No-Code Website Builder",
        "description": "Easily build professional websites without writing a single line of code.",
        "date": "2025-04-10",
        "image": "https://via.placeholder.com/150/34a853/ffffff?text=No-Code+Builder"
      },
      {
        "id": 3,
        "name": "Blockchain Payment Gateway",
        "description": "A secure and fast blockchain-based payment processing system.",
        "date": "2025-05-05",
        "image": "https://via.placeholder.com/150/fbbc05/ffffff?text=Blockchain+Gateway"
      },
      {
        "id": 4,
        "name": "Smart Home Automation",
        "description": "Control your home devices seamlessly with AI-powered automation.",
        "date": "2025-06-20",
        "image": "https://via.placeholder.com/150/ea4335/ffffff?text=Smart+Home+Automation"
      }
    ];

    // Set the data into state
    setLaunches(upcomingLaunchesData);
  }, []);

  return (
    <section className="w-11/12 lg:w-8/12 mx-auto py-16 text-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">📆 Upcoming Launches</h2>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Stay updated on the latest product releases and get early access to innovations.
      </p>
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {launches.length > 0 ? (
            launches.map((launch) => (
              <li key={launch.id} className="py-4 flex items-center justify-between">
                <img
                  src={launch.image}
                  alt={launch.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="text-left flex-1 ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {launch.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {launch.description}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-300">{launch.date}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No upcoming launches at the moment.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default UpcomingLaunches;
