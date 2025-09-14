import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: string;
  sub: string;
  exp: number;
  iat: number;
  customer?: {
    id: number;
    email: string;
    fullName: string;
  };
}

export const getLoginTypeFromToken = (): "USER" | "CUSTOMER" => {
  const token = localStorage.getItem("access_token");
  if (!token) return "USER";

  try {
    const payload = jwtDecode<TokenPayload>(token);

    if (payload.role === "ROLE_CUSTOMER") {
      return "CUSTOMER";
    }

    return "USER";
  } catch (e) {
    console.error("Decode token error:", e);
    return "USER";
  }
};
