import { IValidationData } from "@/types/types";

export const loginHandler = async ({ username, password }: IValidationData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error during login:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
