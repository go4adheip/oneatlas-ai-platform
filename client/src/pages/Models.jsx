import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X
} from "lucide-react";

import "./Models.css";

function Models() {
  const navigate = useNavigate();

  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [sort, setSort] = useState("default");
  const [selectedCapability, setSelectedCapability] = useState("All");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/models");

        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid API response");
        }

        const formattedModels = result.data.map((model) => ({
          id: model.id,
          name: model.name,
          company: model.provider,
          type: model.category,
          description: model.description || "No description available.",
          context: Number(model.contextWindow) || 0,
          input: Number(model.inputPrice) || 0,
          output: Number(model.outputPrice) || 0,
          capabilities: Array.isArray(model.capabilities)
            ? model.capabilities
            : []
        }));

        setModelData(formattedModels);
      } catch (err) {
        console.error("Model fetching error:", err);
        setError("Unable to connect to the backend. Please check your server.");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const filteredModels = modelData
    .filter((model) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        model.name.toLowerCase().includes(searchText) ||
        model.company.toLowerCase().includes(searchText) ||
        model.description.toLowerCase().includes(searchText);

      const matchesCompany =
        company === "All" || model.company === company;

      const matchesCapability =
        selectedCapability === "All" ||
        model.capabilities.includes(selectedCapability);

      return matchesSearch && matchesCompany && matchesCapability;
    })
    .sort((a, b) => {
      if (sort === "price") return a.input - b.input;
      if (sort === "context") return b.context - a.context;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return <div className="models-page">Loading AI models...</div>;
  }

  if (error) {
    return <div className="models-page">{error}</div>;
  }

  return (
    <div className="models-page">
      <header className="models-header">
        <div>
          <span className="models-label">MODEL DIRECTORY</span>
          <h1>Explore AI Models</h1>
          <p>
            Discover and compare powerful AI models from leading companies.
          </p>
        </div>

        <div className="model-count">
          <strong>{filteredModels.length}</strong>
          <span>Models found</span>
        </div>
      </header>

      <div className="models-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search models or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="models-toolbar">
        <div className="filter-heading">
          <SlidersHorizontal size={17} />
          Filters
        </div>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="All">All Companies</option>
          <option value="OpenAI">OpenAI</option>
          <option value="Anthropic">Anthropic</option>
          <option value="Google">Google</option>
          <option value="DeepSeek">DeepSeek</option>
          <option value="Meta">Meta</option>
          <option value="Mistral AI">Mistral AI</option>
          <option value="xAI">xAI</option>
          <option value="Alibaba">Alibaba</option>
          <option value="Cohere">Cohere</option>
          <option value="Amazon">Amazon</option>
        </select>

        <select
          value={selectedCapability}
          onChange={(e) => setSelectedCapability(e.target.value)}
        >
          <option value="All">All Capabilities</option>
          <option value="Text">Text</option>
          <option value="Vision">Vision</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
          <option value="Coding">Coding</option>
          <option value="Reasoning">Reasoning</option>
        </select>

        <div className="sort-control">
          <ArrowUpDown size={16} />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="price">Lowest Input Price</option>
            <option value="context">Largest Context</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className="models-table">
        <div className="models-table-heading">
          <span>MODEL</span>
          <span>COMPANY</span>
          <span>TYPE</span>
          <span>CONTEXT</span>
          <span>INPUT / 1M TOKENS</span>
          <span>OUTPUT / 1M TOKENS</span>
        </div>

        {filteredModels.map((model) => (
          <div
            className="models-table-row"
            key={model.id}
            onClick={() => navigate(`/models/${model.id}`)}
            style={{ cursor: "pointer" }}
            title={`View ${model.name} details`}
          >
            <div className="directory-model">
              <div className="directory-avatar">
                {model.name.charAt(0)}
              </div>

              <div className="model-information">
                <h3>{model.name}</h3>

                <p className="model-description">
                  {model.description}
                </p>

                <div className="capability-tags">
                  {model.capabilities.map((capability) => (
                    <span key={capability}>{capability}</span>
                  ))}
                </div>
              </div>
            </div>

            <span className="company-name">{model.company}</span>
            <span className="type-badge">{model.type}</span>

            <span className="context-value">
              {model.context.toLocaleString("en-US")}
            </span>

            <span className="price-value">
              ${model.input.toFixed(2)}
            </span>

            <span className="price-value">
              ${model.output.toFixed(2)}
            </span>
          </div>
        ))}

        {filteredModels.length === 0 && (
          <div className="empty-state">
            <Search size={30} />
            <h3>No models found</h3>
            <p>Try changing your search or filters.</p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCompany("All");
                setSelectedCapability("All");
                setSort("default");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <p className="data-note">
        Demonstration dataset · Pricing is illustrative and not live provider pricing.
      </p>
    </div>
  );
}

export default Models;