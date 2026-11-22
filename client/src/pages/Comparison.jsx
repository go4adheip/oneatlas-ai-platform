import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GitCompareArrows } from "lucide-react";

function Comparison() {
  const [models, setModels] = useState([]);
  const [firstModel, setFirstModel] = useState("");
  const [secondModel, setSecondModel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/models");

        if (!response.ok) {
          throw new Error("Failed to fetch models.");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid API response.");
        }

        setModels(result.data);

        if (result.data.length >= 2) {
          setFirstModel(String(result.data[0].id));
          setSecondModel(String(result.data[1].id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const modelA = models.find(
    (model) => String(model.id) === firstModel
  );

  const modelB = models.find(
    (model) => String(model.id) === secondModel
  );

  const specifications = [
    {
      label: "Provider",
      value: (model) => model.provider,
    },
    {
      label: "Category",
      value: (model) => model.category,
    },
    {
      label: "Context Window",
      value: (model) =>
        `${Number(model.contextWindow).toLocaleString()} tokens`,
    },
    {
      label: "Input Price",
      value: (model) => `$${Number(model.inputPrice).toFixed(2)}`,
    },
    {
      label: "Output Price",
      value: (model) => `$${Number(model.outputPrice).toFixed(2)}`,
    },
    {
      label: "Capabilities",
      value: (model) =>
        Array.isArray(model.capabilities)
          ? model.capabilities.join(", ")
          : "Not available",
    },
    {
      label: "Description",
      value: (model) => model.description,
    },
  ];

  if (loading) {
    return <div style={styles.message}>Loading models...</div>;
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

        <div style={styles.heading}>
          <GitCompareArrows size={34} />
          <h1>Compare AI Models</h1>
          <p>
            Compare specifications, pricing and capabilities
            side by side.
          </p>
        </div>

        <div style={styles.selectors}>
          <div style={styles.selectorCard}>
            <label>Select First Model</label>
            <select
              value={firstModel}
              onChange={(e) => setFirstModel(e.target.value)}
            >
              {models.map((model) => (
                <option key={model.id} value={String(model.id)}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.selectorCard}>
            <label>Select Second Model</label>
            <select
              value={secondModel}
              onChange={(e) => setSecondModel(e.target.value)}
            >
              {models.map((model) => (
                <option key={model.id} value={String(model.id)}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {modelA && modelB && (
          <>
            <div style={styles.modelNames}>
              <div>{modelA.name}</div>
              <span>VS</span>
              <div>{modelB.name}</div>
            </div>

            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span>SPECIFICATION</span>
                <span>{modelA.name}</span>
                <span>{modelB.name}</span>
              </div>

              {specifications.map((spec) => (
                <div style={styles.row} key={spec.label}>
                  <strong>{spec.label}</strong>
                  <span>{spec.value(modelA)}</span>
                  <span>{spec.value(modelB)}</span>
                </div>
              ))}
            </div>

            <p style={styles.note}>
              Demonstration dataset. Pricing is illustrative
              and not live provider pricing.
            </p>
          </>
        )}
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
    maxWidth: "1100px",
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
    marginBottom: "35px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#a5a5ff",
  },
  selectors: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  selectorCard: {
    background: "#121629",
    border: "1px solid #292d4b",
    borderRadius: "14px",
    padding: "22px",
  },
  modelNames: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "15px",
    alignItems: "center",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  table: {
    border: "1px solid #292d4b",
    borderRadius: "14px",
    overflow: "hidden",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "15px",
    padding: "20px",
    background: "#202443",
    color: "#a5a5ff",
    fontWeight: "bold",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "15px",
    padding: "20px",
    borderTop: "1px solid #292d4b",
    lineHeight: "1.6",
    overflowWrap: "anywhere",
  },
  note: {
    color: "#777e98",
    fontSize: "12px",
    marginTop: "25px",
  },
};

export default Comparison;