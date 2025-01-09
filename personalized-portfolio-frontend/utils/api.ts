import { IPortfolioData } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

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

export const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error during login:", errorMessage);
    return res.status(500).json({ error: "Internal server error." });
  }
};
