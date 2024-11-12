import config from "./config";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Quiz } from "./pages/Quiz.tsx";
import { Result } from "./pages/Result.tsx";
import { Admin } from "./pages/Admin.tsx";
import { AdminQuizView } from "./pages/AdminQuizView.tsx";
import { AdminLogin } from "./pages/AdminLogin.tsx";
import { Theme } from "react-daisyui";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createHttpLink({
  uri: config.apiUrl + "/graphql",
});

const headerLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Apollo-Require-Preflight": "true",
    },
  };
});

const uploadLink = createUploadLink({
  uri: config.apiUrl + "/graphql",
});

const client = new ApolloClient({
  link: headerLink.concat(uploadLink).concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
      <Route path="/result/:attemptId" element={<Result />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/quiz/:quizId" element={<AdminQuizView />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<Home />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Theme dataTheme="dark">
        <RouterProvider router={router} />
      </Theme>
    </ApolloProvider>
  </StrictMode>,
);
