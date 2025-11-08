import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Input } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.ts";

export default function Login() {
  const { login, isLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const tryLogin = async () => {
    const success = await login({ username, password });
    if (success) {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Form
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        await tryLogin();
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
}
