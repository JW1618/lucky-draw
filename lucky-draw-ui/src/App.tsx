import React, { useEffect, useState } from "react";
import { RegistrationForm } from "./component/RegistrationForm";
import { WinnersDisplay } from "./component/WinnersDisplay";
import styles from "./App.module.css";
import { DrawResult } from "./types";

const API_URL = process.env.REACT_APP_API_URL;
const POLLING_INTERRVAL_MS = 60 * 1000;

const initialDrawState: DrawResult = {
  drawDate: null,
  winners: [],
  participantCount: 0,
};

const App = () => {
  const [drawResult, setDrawResult] = useState<DrawResult>(initialDrawState);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWinners = async () => {
    try {
      const response = await fetch(`${API_URL}/winners`);
      const data = await response.json();
      setDrawResult(data);
    } catch (error) {
      console.error("Error fetching winners:", error);
    }
  };

  const handleRegister = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
      await fetchWinners();
    } catch (error: any) {
      console.error("Error registering email:", error);
      alert("An error occurred while registering the email.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
    const intervalId = setInterval(() => {
      fetchWinners();
    }, POLLING_INTERRVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      <h2 className={styles.title}>Lucky Draw System</h2>
      <RegistrationForm onRegister={handleRegister} isLoading={isLoading} />
      <hr className={styles.divider} />
      <WinnersDisplay drawResult={drawResult} />
    </div>
  );
};

export default App;
