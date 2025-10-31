import {gql} from "@apollo/client";
import {useMutation} from "@apollo/client/react";
import {useState} from "react";
import {Button, Form, Input} from "react-daisyui";
import {useNavigate} from "react-router-dom";

const GET_TOKEN_MUTATION = gql`
    mutation GetToken($username: String!, $password: String!) {
        getToken(username: $username, password: $password)
    }
`;

type GetTokenMutationType = {
    getToken: string;
};

export const AdminLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useMutation<GetTokenMutationType>(GET_TOKEN_MUTATION, {
        onCompleted: (data) => {
            if (!data.getToken) {
                alert("Invalid credentials");
                return;
            }
            localStorage.setItem("token", data!.getToken);
            navigate("/admin");
        },
    });

    return (
        <Form
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                login({variables: {username, password}}).then();
            }}
        >
            <div className="flex flex-row justify-between items-center h-12">
                <h1 className="text-3xl w-full text-center">Admin Login</h1>
                <Button
                    type="button"
                    onClick={() => {
                        navigate("/");
                    }}
                    className="absolute top-4 left-4"
                >
                    Home
                </Button>
            </div>
            <Input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="mt-4"
            />
            <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-4"
            />
            <Button type="submit" className="mt-4" color="primary">
                Login
            </Button>
        </Form>
    );
};
