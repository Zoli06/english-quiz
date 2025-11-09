import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const GET_TOKEN_MUTATION = graphql(`
  mutation GetToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password)
  }
`);

export const useAuth = () => {
  const [getTokenMutation] = useMutation(GET_TOKEN_MUTATION);
  const navigate = useNavigate();

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const verifyToken = (token: string) => {
    if (!token) {
      return false;
    }
    try {
      const parsedToken = parseJwt(token);
      if (
        parseJwt(localStorage.getItem(parsedToken)!)?.exp * 1000 <
        Date.now()
      ) {
        localStorage.removeItem(parsedToken);
        return false;
      }
    } catch {
      return false;
    }
    return true;
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data } = await getTokenMutation({
      variables: { username, password },
    });

    // Save token to localStorage
    if (data?.getToken) {
      localStorage.setItem("token", data.getToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return verifyToken(token || "");
  };

  const ensureLoggedIn = (redirect: string) => {
    // TODO: Refresh token logic can be added here
    console.log(isLoggedIn());
    if (!isLoggedIn()) {
      navigate(redirect);
    }
  };

  return { login, logout, isLoggedIn, ensureLoggedIn };
};
