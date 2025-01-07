import { IPortfolioData } from "@/types/types";

export const fetchPortfolios = async (
  search: string = "",
  sort: string = "id",
  order: string = "asc",
  page: number = 1
): Promise<IPortfolioData[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/portfolio/?search=${search}&sort=${sort}&order=${order}&page=${page}`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch portfolios");
  }
  const data = await response.json();
  return data.results || [];
};
