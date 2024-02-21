import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isCreator, setIsCreator] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        is_creator: isCreator,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form-modal">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="iscreator-label">
          Are you a creator?
          <input
            className="is-creator"
            type="checkbox"
            checked={isCreator}
            onChange={(e) => setIsCreator(e.target.checked)}
          />
        </label>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <button onClick={closeModal} className="close-modal-button">
        Close
      </button>
      <div className="login-link">
        Already have an account?{" "}
        <a
          onClick={() => {
            /* Handle opening login modal here */
          }}>
          Log in
        </a>
      </div>
    </div>
  );
}

export default SignupFormModal;
