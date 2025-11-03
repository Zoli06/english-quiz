import config from "./config";
import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ApolloClient, InMemoryCache,} from "@apollo/client";
import {HttpLink} from "@apollo/client/link/http";
import {SetContextLink} from "@apollo/client/link/context";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {HomePage} from "@/features/public/home/pages/HomePage.tsx";
import {QuizPage} from "@/features/public/quiz/pages/QuizPage.tsx";
import {ResultPage} from "@/features/public/result/pages/ResultPage.tsx";
import {AdminQuizzesPage} from "@/features/admin/quizzes/pages/AdminQuizzesPage.tsx";
import {AdminQuestionsPage} from "@/features/admin/questions/pages/AdminQuestionsPage.tsx";
import {AdminLoginPage} from "@/features/admin/login/pages/AdminLoginPage.tsx";
import {Theme} from "react-daisyui";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import {ApolloProvider} from "@apollo/client/react";

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

const client = new ApolloClient({
    link: headerLink.concat(uploadLink).concat(httpLink),
    cache: new InMemoryCache(),
    dataMasking: true
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/quiz/:quizId" element={<QuizPage/>}/>
            <Route path="/result/:attemptId" element={<ResultPage/>}/>
            <Route path="/admin" element={<AdminQuizzesPage/>}/>
            <Route path="/admin/quiz/:quizId" element={<AdminQuestionsPage/>}/>
            <Route path="/admin/login" element={<AdminLoginPage/>}/>
            <Route path="*" element={<HomePage/>}/>
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
                <RouterProvider router={router}/>
            </Theme>
        </ApolloProvider>
    </StrictMode>,
);
