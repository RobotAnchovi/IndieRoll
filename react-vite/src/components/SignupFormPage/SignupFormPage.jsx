import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css"; // Make sure you have this CSS file
function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
      return;
    }

    const serverResponse = await dispatch(thunkSignup({
      email,
      username,
      password,
    }));

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else if (serverResponse) {
      navigate("/content");
    }
  };


  return (
    <div className="signup-form-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-field">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-field">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <label className="iscreator-label">
          Are you a creator?
          <input
            className="is-creator"
            type="checkbox"
            checked={isCreator}
            onChange={(e) => setIsCreator(e.target.checked)}
          />
        </label>
        {errors.user && (
            <p className="error">{errors.user}</p>
          )}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <div className="login-link">
          Already have an account?{" "}
          <a
            className="a-login"
            onClick={() => {
              /* Handle opening login modal here */
            }}>
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
