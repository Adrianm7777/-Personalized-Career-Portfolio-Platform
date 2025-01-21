import { IValidationData } from "@/types/types";

export const signupHandler = async ({
  username,
  email,
  password,
}: IValidationData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Data.message || "Something went wrong");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.log("Error during registration:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
