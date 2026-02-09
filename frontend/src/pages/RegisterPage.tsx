import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/RegisterPage.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post("/users/register", {
        name,
        email,
        password,
      });
      login(data, data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <div className={styles.logoSection}>
          <h1 className={styles.logoText}>ByteMarket</h1>
          <p className={styles.registerSubtitle}>Create your account</p>
        </div>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className={styles.checkboxLabel}>
              I agree to the Terms of Service
            </span>
          </div>

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className={styles.dividerRow}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine} />
          </div>

          <button
            type="button"
            className={styles.socialBtn}
            onClick={() => alert("Social login coming soon!")}
          >
            Continue with Google
          </button>

          <p className={styles.altAction}>
            Already have an account?{" "}
            <Link to="/login" className={styles.altLink}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
