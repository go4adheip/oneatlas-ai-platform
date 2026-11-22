import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Cpu,
  ChevronRight,
  Search
} from "lucide-react";

function Providers() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/models")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load providers");
        }
        return response.json();
      })
      .then((result) => {
        setModels(result.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to connect to the server. Please check your backend.");
        setLoading(false);
      });
  }, []);

  const providers = Object.values(
    models.reduce((groups, model) => {
      const provider = model.provider || "Unknown";

      if (!groups[provider]) {
        groups[provider] = {
          name: provider,
          models: []
        };
      }

      groups[provider].models.push(model);
      return groups;
    }, {})
  ).filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#080b18",
      color: "#ffffff",
      padding: "40px 6%",
      fontFamily: "Arial, sans-serif"
    },
    back: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#a5a9bd",
      textDecoration: "none",
      marginBottom: "35px"
    },
    heading: {
      fontSize: "36px",
      marginBottom: "10px"
    },
    subtitle: {
      color: "#9ca3b8",
      marginBottom: "30px",
      lineHeight: "1.6"
    },
    search: {
      width: "100%",
      maxWidth: "450px",
      padding: "14px 16px",
      background: "#11172a",
      border: "1px solid #252d45",
      borderRadius: "10px",
      color: "#ffffff",
      outline: "none",
      marginBottom: "30px",
      fontSize: "15px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "20px"
    },
    card: {
      background: "#11172a",
      border: "1px solid #252d45",
      borderRadius: "14px",
      padding: "24px",
      transition: "border-color 0.2s"
    },
    icon: {
      width: "45px",
      height: "45px",
      borderRadius: "10px",
      background: "#20294a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9b8cff",
      marginBottom: "18px"
    },
    providerName: {
      fontSize: "21px",
      marginBottom: "8px"
    },
    count: {
      color: "#a5a9bd",
      fontSize: "14px",
      marginBottom: "20px"
    },
    modelList: {
      borderTop: "1px solid #252d45",
      paddingTop: "15px"
    },
    modelLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#c7cbe0",
      textDecoration: "none",
      padding: "9px 0",
      fontSize: "14px"
    },
    empty: {
      color: "#a5a9bd",
      padding: "30px 0"
    }
  };

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.back}>
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <h1 style={styles.heading}>AI Providers</h1>

      <p style={styles.subtitle}>
        Explore AI companies and discover the models they develop.
      </p>

      <input
        style={styles.search}
        type="text"
        placeholder="Search providers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading providers...</p>}

      {error && <p style={{ color: "#ff7777" }}>{error}</p>}

      {!loading && !error && (
        <>
          <p style={{ color: "#9ca3b8", marginBottom: "22px" }}>
            {providers.length} providers · {models.length} models
          </p>

          <div style={styles.grid}>
            {providers.map((provider) => (
              <div
                key={provider.name}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#8270ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#252d45";
                }}
              >
                <div style={styles.icon}>
                  <Building2 size={23} />
                </div>

                <h2 style={styles.providerName}>
                  {provider.name}
                </h2>

                <p style={styles.count}>
                  <Cpu
                    size={14}
                    style={{ verticalAlign: "middle", marginRight: "6px" }}
                  />
                  {provider.models.length} models available
                </p>

                <div style={styles.modelList}>
                  {provider.models.map((model) => (
                    <Link
                      key={model.id}
                      to={`/models/${model.id}`}
                      style={styles.modelLink}
                    >
                      {model.name}
                      <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {providers.length === 0 && (
            <p style={styles.empty}>No providers found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Providers;