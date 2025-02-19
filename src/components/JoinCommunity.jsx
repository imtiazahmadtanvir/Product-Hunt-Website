const JoinCommunity = () => {
    return (
      <section className="w-11/12 lg:w-8/12 mx-auto py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">👥 Join Our Community</h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Connect with innovators, share ideas, and be part of an amazing tech community.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            💬 Join Discord
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            👍 Follow on Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
          >
            🐦 Follow on Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300"
          >
            🔗 Connect on LinkedIn
          </a>
        </div>
      </section>
    );
  };
  
  export default JoinCommunity;
  