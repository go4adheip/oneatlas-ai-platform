
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, Zap, Layers, DollarSign } from "lucide-react";

function ModelDetails() {
  const { id } = useParams();

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/models");
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          throw new Error("Unable to load model details.");
        }

        const selectedModel = result.data.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedModel) {
          throw new Error("Model not found.");
        }

        setModel(selectedModel);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [id]);

  if (loading) {
    return <div style={styles.message}>Loading model details...</div>;
  }

  if (error) {
    return (
      <div style={styles.message}>
        <p>{error}</p>
        <Link to="/models">Back to Models</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/models" style={styles.back}>
          <ArrowLeft size={18} /> Back to Models
        </Link>

        <div style={styles.header}>
          <div>
            <span style={styles.provider}>{model.provider}</span>
            <h1 style={styles.title}>{model.name}</h1>
            <p style={styles.description}>{model.description}</p>
          </div>

          <div style={styles.icon}>
            <Cpu size={42} />
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Model Specifications</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <Layers size={24} />
            <h3>Context Window</h3>
            <p>{Number(model.contextWindow).toLocaleString()}</p>
            <span>Tokens</span>
          </div>

          <div style={styles.card}>
            <DollarSign size={24} />
            <h3>Input Pricing</h3>
            <p>${model.inputPrice}</p>
            <span>Per million tokens</span>
          </div>

          <div style={styles.card}>
            <DollarSign size={24} />
            <h3>Output Pricing</h3>
            <p>${model.outputPrice}</p>
            <span>Per million tokens</span>
          </div>

          <div style={styles.card}>
            <Zap size={24} />
            <h3>Model Category</h3>
            <p>{model.category}</p>
            <span>Model type</span>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Capabilities</h2>

        <div style={styles.capabilities}>
          {model.capabilities?.map((capability, index) => (
            <span key={index} style={styles.tag}>
              {capability}
            </span>
          ))}
        </div>

        <p style={styles.note}>
          Demonstration dataset. Pricing is illustrative and not live provider
          pricing.
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
    padding: "50px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  message: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#080b16",
    color: "#ffffff",
    gap: "12px",
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#a5a5ff",
    textDecoration: "none",
    marginBottom: "35px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
    padding: "35px",
    background: "linear-gradient(135deg, #171a35, #101426)",
    border: "1px solid #292d4b",
    borderRadius: "18px",
  },
  provider: {
    color: "#a5a5ff",
    fontSize: "14px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "38px",
    margin: "12px 0",
  },
  description: {
    color: "#b5b8ca",
    lineHeight: "1.7",
    maxWidth: "750px",
  },
  icon: {
    color: "#a5a5ff",
    background: "#282b50",
    padding: "22px",
    borderRadius: "16px",
  },
  sectionTitle: {
    fontSize: "23px",
    margin: "40px 0 20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#121629",
    border: "1px solid #292d4b",
    borderRadius: "14px",
    padding: "24px",
    color: "#a5a5ff",
  },
  capabilities: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  tag: {
    background: "#202443",
    border: "1px solid #424875",
    color: "#c5c8ff",
    padding: "10px 18px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  note: {
    color: "#777e98",
    fontSize: "12px",
    marginTop: "35px",
  },
};

export default ModelDetails;