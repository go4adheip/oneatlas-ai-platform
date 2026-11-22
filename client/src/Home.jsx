import {
  Search,
  ArrowUpRight,
  ChevronDown,
  Zap,
  Cpu,
  Layers,
  GitCompareArrows,
  Trophy,
  Building2,
  Menu
} from "lucide-react";

import "./App.css";

function Home() {
  const models = [
    {
      name: "GPT-4o",
      company: "OpenAI",
      type: "Multimodal",
      context: "128K",
      price: "$2.50",
      tag: "Popular"
    },
    {
      name: "Claude Sonnet 4",
      company: "Anthropic",
      type: "Reasoning",
      context: "200K",
      price: "$3.00",
      tag: "Trending"
    },
    {
      name: "Gemini 2.5 Pro",
      company: "Google",
      type: "Multimodal",
      context: "1M",
      price: "$1.25",
      tag: "Featured"
    },
    {
      name: "DeepSeek V3",
      company: "DeepSeek",
      type: "Coding",
      context: "128K",
      price: "$0.27",
      tag: "Value"
    }
  ];

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">◈</span>
          ONEATLAS<span className="logo-dot">.</span>
        </div>

        <div className="nav-links">
          <a href="/">Discover</a>
          <a href="/models">Models</a>
          <a href="/compare">Compare</a>
          <a href="/leaderboard">leaderboard</a>
          <a href="/labs">AI Labs</a>
          <a href="/providers">Providers</a>
        </div>

        <button className="nav-button">
          Explore Models <ArrowUpRight size={16} />
        </button>

        <Menu className="mobile-menu" />
      </nav>

      <main>

        <section className="hero">

          <div className="announcement">
            <span className="live-dot"></span>
            THE AI INTELLIGENCE DIRECTORY
            <ArrowUpRight size={14} />
          </div>

          <h1>
            Navigate the
            <br />
            <span>Universe of AI.</span>
          </h1>

          <p className="hero-description">
            Discover, compare and explore the world's most powerful
            AI models, providers and research labs — all in one place.
          </p>

          <div className="search-box">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search  AI models, companies, providers..."
            />

            <button>
              Search <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="popular-searches">
            <span>Popular:</span>
            <a href="/models">GPT-4o</a>
            <a href="/models">Claude</a>
            <a href="/models">Gemini</a>
            <a href="/models">DeepSeek</a>
          </div>

        </section>

        <section className="stats">

          <div className="stat-item">
            <Cpu />
            <div>
              <h2>500+</h2>
              <p>AI Models</p>
            </div>
          </div>

          <div className="stat-item">
            <Building2 />
            <div>
              <h2>50+</h2>
              <p>AI Companies</p>
            </div>
          </div>

          <div className="stat-item">
            <Layers />
            <div>
              <h2>30+</h2>
              <p>Providers</p>
            </div>
          </div>

          <div className="stat-item">
            <Zap />
            <div>
              <h2>100+</h2>
              <p>Benchmarks</p>
            </div>
          </div>

        </section>

        <section className="models-section">

          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE THE ECOSYSTEM</span>
              <h2>Discover AI Models</h2>
              <p>Find the right intelligence for your next project.</p>
            </div>

            <a href="/models" className="view-all">
              View all models <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="model-table">

            <div className="table-header">
              <span>MODEL</span>
              <span>TYPE</span>
              <span>CONTEXT</span>
              <span>INPUT PRICE</span>
              <span></span>
            </div>

            {models.map((model, index) => (
              <div className="model-row" key={index}>

                <div className="model-info">
                  <div className="model-avatar">
                    {model.name.charAt(0)}
                  </div>

                  <div>
                    <h3>{model.name}</h3>
                    <p>{model.company}</p>
                  </div>
                </div>

                <span className="model-type">{model.type}</span>

                <span className="context">{model.context}</span>

                <span className="price">{model.price}</span>

                <ArrowUpRight className="row-arrow" size={18} />

              </div>
            ))}

          </div>

        </section>

        <section className="bottom-section">

          <div className="bottom-card">
            <GitCompareArrows size={25} />
            <h3>Compare Models</h3>
            <p>Compare AI models side by side and find the best fit.</p>
            <a href="/compare">Start comparing <ArrowUpRight size={15} /></a>
          </div>

          <div className="bottom-card">
            <Trophy size={25} />
            <h3>AI Leaderboards</h3>
            <p>Explore model leaderboard and benchmark performance.</p>
            <a href="/leaderboard">Explore leaderboard <ArrowUpRight size={15} /></a>
          </div>

          <div className="bottom-card">
            <Building2 size={25} />
            <h3>Explore AI Labs</h3>
            <p>Discover companies shaping the future of artificial intelligence.</p>
            <a href="/labs">Explore labs <ArrowUpRight size={15} /></a>
          </div>

        </section>

      </main>

      <footer>
        <div className="logo">
          ◈ ONEATLAS<span className="logo-dot">.</span>
        </div>
        <p>Mapping the intelligence ecosystem.</p>
        <span>© 2026 OneAtlas. Built for the AI ecosystem.</span>
      </footer>

    </div>
  );
}

export default Home;