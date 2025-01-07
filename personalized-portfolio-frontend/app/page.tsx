import { IPortfolioData } from "@/types/types";
import { fetchPortfolios } from "@/utils/api";

const Home = async ({
  searchParams,
}: {
  searchParams: { search?: string; sort?: string; order?: string };
}) => {
  const search = searchParams.search || "";
  const sort = searchParams.sort || "id";
  const order = searchParams.order || "asc";

  let portfolios: IPortfolioData[] = [];
  try {
    portfolios = await fetchPortfolios(search, sort, order);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold">Portfolios</h1>
      <div className="flex space-x-4 my-4">
        <form method="get" className="flex space-x-4">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            defaultValue={search}
            className="border p-2 rounded"
          />
          <select
            name="sort"
            defaultValue={sort}
            className="border p-2 rounded"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="experience">Experience</option>
          </select>
          <select
            name="order"
            defaultValue={order}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Apply
          </button>
        </form>
      </div>
      {portfolios.length > 0 ? (
        portfolios.map((portfolio) => (
          <div key={portfolio.id} className="mt-4">
            <h2 className="text-xl">{portfolio.name}</h2>
            <p className="text-gray-700">{portfolio.title}</p>
            <p className="text-sm">Experience: {portfolio.experience} years</p>
            <h3 className="mt-4 font-bold">Skills:</h3>
            <ul className="list-disc pl-4">
              {portfolio.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Home;
