import { IPortfolioData } from "@/types/types";
import { fetchPortfolios } from "@/utils/api";

const Home = async ({
  searchParams,
}: {
  searchParams: { search?: string; sort?: string; order?: string };
}) => {
  const { search = "", sort = "id", order = "asc" } = await searchParams;

  let portfolios: IPortfolioData[] = [];
  try {
    portfolios = await fetchPortfolios(search, sort, order);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Explore Portfolios
        </h1>

        <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
          <form method="get" className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by name or skill..."
              defaultValue={search}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
            <select
              name="sort"
              defaultValue={sort}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
              <option value="experience">Sort by Experience</option>
            </select>
            <select
              name="order"
              defaultValue={order}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Portfolio List */}
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {portfolio.name}
                </h2>
                <p className="text-gray-600">{portfolio.title}</p>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-medium text-gray-700">Experience:</span>{" "}
                  {portfolio.experience} years
                </p>
                <h3 className="mt-4 text-gray-700 font-bold">Skills:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {portfolio.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            No results found. Try adjusting your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
