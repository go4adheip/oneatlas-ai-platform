import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowLeft, Medal } from "lucide-react";

function Leaderboard() {
const [models, setModels] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchModels = async () => {
try {
const response = await fetch("http://localhost:5000/api/models");

    if (!response.ok) {
      throw new Error("Unable to fetch models.");
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid API response.");
    }

    // Demo ranking scores for the prototype.
    const rankedModels = result.data
      .map((model) => ({
        ...model,
        score: 70 + ((Number(model.id) * 7) % 30),
      }))
      .sort((a, b) => b.score - a.score);

    setModels(rankedModels);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

fetchModels();

}, []);

if (loading) {
return <div style={styles.message}>Loading leaderboard...</div>;
}

if (error) {
return <div style={styles.message}>{error}</div>;
}

return (
<div style={styles.page}>
<div style={styles.container}>
<Link to="/models" style={styles.back}>
<ArrowLeft size={18} />
Back to Models
</Link>

    <div style={styles.header}>
      <Trophy size={38} />
      <h1>AI Model Leaderboard</h1>
      <p>
        Explore and rank leading AI models from different providers.
      </p>
    </div>

    <div style={styles.stats}>
      <div style={styles.statCard}>
        <strong>{models.length}</strong>
        <span>Models Ranked</span>
      </div>

      <div style={styles.statCard}>
        <strong>{new Set(models.map((m) => m.provider)).size}</strong>
        <span>AI Providers</span>
      </div>

      <div style={styles.statCard}>
        <strong>100</strong>
        <span>Highest Demo Score</span>
      </div>
    </div>

    <div style={styles.table}>
      <div style={styles.tableHeader}>
        <span>RANK</span>
        <span>MODEL</span>
        <span>PROVIDER</span>
        <span>CATEGORY</span>
        <span>CONTEXT</span>
        <span>DEMO SCORE</span>
      </div>

      {models.map((model, index) => (
        <Link
          to={`/models/${model.id}`}
          key={model.id}
          style={styles.row}
        >
          <span style={styles.rank}>
            {index < 3 ? (
              <Medal size={20} />
            ) : (
              `#${index + 1}`
            )}
          </span>

          <strong>{model.name}</strong>
          <span>{model.provider}</span>
          <span>{model.category}</span>
          <span>
            {Number(model.contextWindow).toLocaleString()}
          </span>

          <span style={styles.score}>{model.score}/100</span>
        </Link>
      ))}
    </div>

    <p style={styles.note}>
      Prototype leaderboard. Scores are illustrative demo values,
      not verified benchmark results.
    </p>
  </div>
</div>

);
}

const styles = {
page: {
minHeight: "100vh",
background: "#080b16",
color: "#ffffff",
padding: "40px 20px",
fontFamily: "Arial, sans-serif",
},
container: {
maxWidth: "1200px",
margin: "0 auto",
},
message: {
minHeight: "100vh",
display: "grid",
placeItems: "center",
background: "#080b16",
color: "#ffffff",
},
back: {
display: "inline-flex",
alignItems: "center",
gap: "8px",
color: "#a5a5ff",
textDecoration: "none",
marginBottom: "30px",
},
header: {
textAlign: "center",
color: "#a5a5ff",
marginBottom: "35px",
},
stats: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
gap: "18px",
marginBottom: "30px",
},
statCard: {
background: "#121629",
border: "1px solid #292d4b",
borderRadius: "14px",
padding: "24px",
display: "flex",
flexDirection: "column",
gap: "8px",
textAlign: "center",
},
table: {
border: "1px solid #292d4b",
borderRadius: "14px",
overflowX: "auto",
},
tableHeader: {
display: "grid",
gridTemplateColumns: "0.6fr 1.5fr 1fr 1fr 1fr 0.8fr",
minWidth: "850px",
gap: "15px",
padding: "20px",
background: "#202443",
color: "#a5a5ff",
fontSize: "12px",
fontWeight: "bold",
},
row: {
display: "grid",
gridTemplateColumns: "0.6fr 1.5fr 1fr 1fr 1fr 0.8fr",
minWidth: "850px",
gap: "15px",
padding: "20px",
borderTop: "1px solid #292d4b",
alignItems: "center",
color: "#ffffff",
textDecoration: "none",
fontSize: "13px",
},
rank: {
color: "#a5a5ff",
fontWeight: "bold",
},
score: {
color: "#79e0ae",
fontWeight: "bold",
},
note: {
color: "#777e98",
fontSize: "12px",
marginTop: "25px",
},
};

export default Leaderboard;