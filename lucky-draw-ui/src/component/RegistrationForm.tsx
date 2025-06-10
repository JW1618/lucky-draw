import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

interface RegistrationFormProps {
  onRegister: (email: string) => void;
  isLoading: boolean;
}

export const RegistrationForm = ({
  onRegister,
  isLoading,
}: RegistrationFormProps) => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onRegister(email);
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
