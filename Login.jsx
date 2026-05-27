import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setUserInfo(data);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>ATM Login</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;