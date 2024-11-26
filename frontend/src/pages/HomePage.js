import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../axiosConfig";
import TopBar from "../components/TopBar/TopBar";
import "../styles/HomePage.css";

function HomePage() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/plans/");
        setPlans(response.data.bots);
        setError(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError(true);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <TopBar />
      {error ? (
        <p style={{ color: "red" }}>Failed to load plans. Please try again later.</p>
      ) : (
        <div className="plans-container">
          <h1 className="plans-title">Find the Plan That Fits Your Needs</h1>
          <div className="plans">
            {plans.map((plan, index) => (
              <div key={index} className="plan-card">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="price"><strong>Price:</strong> {plan.price}</p>
                <p className="bots"><strong>Bots:</strong> {plan.bots}</p>
                <p className="memory"><strong>Memory:</strong> {plan.memory}</p>
                <p className="messages"><strong>Messages:</strong> {plan.messages}</p>
                <h3 className="features-title">Features:</h3>
                <ul className="features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">{feature}</li>
                  ))}
                </ul>
                {plan.selected === 'yes' ? (
                  <button className="selected-btn">You are on this plan</button>
                ) : plan.selected === 'no' && plan.id === 1 ? (
                  <button
                    className="signup-btn"
                    onClick={() => navigate(`/plan/basicplan`)}
                  >
                    Sign Up
                  </button>
                ) : plan.selected === 'no' && plan.id === 2 ? (
                  <button
                    className="signup-btn"
                    onClick={() => navigate(`/plan/standartplan`)}
                  >
                    Sign Up
                  </button>
                ) : (
                  <button className="in_dev">In development</button>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

