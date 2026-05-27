import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Register failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          required
        />

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

        <button type="submit">Register</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;