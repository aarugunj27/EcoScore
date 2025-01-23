import { useEffect, useState } from "react";
import axios from "axios";

const Api = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [ecoScores, setEcoScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Api}/get-eco-scores`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setEcoScores(response.data.ecoScores);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Eco Scores:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Your Eco Scores</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {ecoScores.length > 0 ? (
            <ul>
              {ecoScores.map((score, index) => (
                <li key={index}>
                  <p>Score: {score.score}</p>
                  <p>Saved on: {new Date(score.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No saved Eco scores found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
