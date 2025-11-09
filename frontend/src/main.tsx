import config from "./config";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "@/pages/Home";
import QuizPage from "@/pages/Quiz";
import AdminQuizzesPage from "@/pages/admin/dashboard/Quizzes.tsx";
import AdminQuestionsPage from "@/pages/admin/dashboard/Questions.tsx";
import AdminLoginPage from "@/pages/admin/Login";
import { Theme } from "react-daisyui";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { ApolloProvider } from "@apollo/client/react";
import { BaseLayout } from "@/components/base-layout/BaseLayout.tsx";
import { DashboardLayout } from "@/components/admin/dashboard/dashboard-layout/DashboardLayout.tsx";

const httpLink = new HttpLink({
  uri: config.apiUrl + "/graphql",
});

const headerLink = new SetContextLink(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      "Apollo-Require-Preflight": "true",
    },
  };
});

const uploadLink = new UploadHttpLink({
  uri: config.apiUrl + "/graphql",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        quizzes: {
          merge(_, incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
    Question: {
      fields: {
        options: {
          merge(_, incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: headerLink.concat(uploadLink).concat(httpLink),
  cache,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/admin">
        <Route index element={<AdminLoginPage />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminQuizzesPage />} />
          <Route path="quiz/:quizId" element={<AdminQuestionsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<HomePage />} />
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
