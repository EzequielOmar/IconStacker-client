import { ResponseError } from "@/app/_entities/ResponseError";
import { LoginRequest, LoginResponse } from "../types";

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<any> => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeStamp: new Date().toISOString(),
        data: {
          email,
          password,
        },
      }),
    });

    if (!res.ok) {
      const error = await res.json();

      if (error.message) {
        throw new ResponseError(res.status, error.message, error.field);
      }

      throw new ResponseError(res.status, "Network error");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};
