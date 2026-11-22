const express = require("express");
const router = express.Router();
const pool = require("../db");

const models = [
  {
    id: 1,
    name: "GPT-4o",
    provider: "OpenAI",
    category: "Multimodal",
    description: "A versatile AI model for text, images, and real-time interactions.",
    capabilities: ["Text", "Image", "Audio", "Vision"],
    inputPrice: 2.5,
    outputPrice: 10,
    contextWindow: 128000
  },
  {
    id: 2,
    name: "GPT-4.1",
    provider: "OpenAI",
    category: "Multimodal",
    description: "An advanced model designed for coding, instruction following, and long-context tasks.",
    capabilities: ["Text", "Image", "Coding", "Vision"],
    inputPrice: 2,
    outputPrice: 8,
    contextWindow: 1000000
  },
  {
    id: 3,
    name: "o3",
    provider: "OpenAI",
    category: "Reasoning",
    description: "A reasoning-focused model for complex mathematics, science, and coding.",
    capabilities: ["Text", "Coding", "Reasoning", "Vision"],
    inputPrice: 10,
    outputPrice: 40,
    contextWindow: 200000
  },
  {
    id: 4,
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    category: "Text",
    description: "An advanced model designed for reasoning, coding, and analysis.",
    capabilities: ["Text", "Coding", "Reasoning", "Vision"],
    inputPrice: 3,
    outputPrice: 15,
    contextWindow: 200000
  },
  {
    id: 5,
    name: "Claude Opus 4",
    provider: "Anthropic",
    category: "Text",
    description: "A powerful model for complex reasoning, programming, and problem solving.",
    capabilities: ["Text", "Coding", "Reasoning", "Vision"],
    inputPrice: 15,
    outputPrice: 75,
    contextWindow: 200000
  },
  {
    id: 6,
    name: "Gemini 2.5 Pro",
    provider: "Google",
    category: "Multimodal",
    description: "A multimodal model for complex reasoning and long-context tasks.",
    capabilities: ["Text", "Image", "Audio", "Video", "Coding"],
    inputPrice: 1.25,
    outputPrice: 10,
    contextWindow: 1000000
  },
  {
    id: 7,
    name: "Gemini 2.5 Flash",
    provider: "Google",
    category: "Multimodal",
    description: "A fast and efficient model for everyday AI applications.",
    capabilities: ["Text", "Image", "Audio", "Video", "Coding"],
    inputPrice: 0.3,
    outputPrice: 2.5,
    contextWindow: 1000000
  },
  {
    id: 8,
    name: "DeepSeek V3",
    provider: "DeepSeek",
    category: "Text",
    description: "An efficient AI model focused on coding, mathematics, and reasoning.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 0.27,
    outputPrice: 1.1,
    contextWindow: 64000
  },
  {
    id: 9,
    name: "DeepSeek R1",
    provider: "DeepSeek",
    category: "Reasoning",
    description: "A reasoning model designed for mathematics, logic, and complex problem solving.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 0.55,
    outputPrice: 2.19,
    contextWindow: 64000
  },
  {
    id: 10,
    name: "Llama 3.3 70B",
    provider: "Meta",
    category: "Text",
    description: "An open-weight language model for reasoning, coding, and conversational applications.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 0.3,
    outputPrice: 0.4,
    contextWindow: 128000
  },
  {
    id: 11,
    name: "Mistral Large",
    provider: "Mistral AI",
    category: "Text",
    description: "A capable language model for multilingual tasks, coding, and reasoning.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 2,
    outputPrice: 6,
    contextWindow: 128000
  },
  {
    id: 12,
    name: "Grok",
    provider: "xAI",
    category: "Text",
    description: "A conversational AI model designed for reasoning and general-purpose tasks.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 3,
    outputPrice: 15,
    contextWindow: 128000
  },
  {
    id: 13,
    name: "Qwen",
    provider: "Alibaba",
    category: "Text",
    description: "A family of language models supporting multilingual tasks and programming.",
    capabilities: ["Text", "Coding", "Reasoning"],
    inputPrice: 0.5,
    outputPrice: 2,
    contextWindow: 128000
  },
  {
    id: 14,
    name: "Command R+",
    provider: "Cohere",
    category: "Text",
    description: "A language model designed for enterprise workflows and retrieval-augmented generation.",
    capabilities: ["Text", "Reasoning"],
    inputPrice: 2.5,
    outputPrice: 10,
    contextWindow: 128000
  },
  {
    id: 15,
    name: "Amazon Nova Pro",
    provider: "Amazon",
    category: "Multimodal",
    description: "A multimodal model for enterprise applications and content understanding.",
    capabilities: ["Text", "Image", "Video"],
    inputPrice: 0.8,
    outputPrice: 3.2,
    contextWindow: 300000
  }
];

// Insert initial models into PostgreSQL.
const seedModels = async () => {
  for (const model of models) {
    await pool.query(
      `INSERT INTO models
        (id, name, provider, category, description, capabilities,
         input_price, output_price, context_window)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         provider = EXCLUDED.provider,
         category = EXCLUDED.category,
         description = EXCLUDED.description,
         capabilities = EXCLUDED.capabilities,
         input_price = EXCLUDED.input_price,
         output_price = EXCLUDED.output_price,
         context_window = EXCLUDED.context_window`,
      [
        model.id,
        model.name,
        model.provider,
        model.category,
        model.description,
        JSON.stringify(model.capabilities),
        model.inputPrice,
        model.outputPrice,
        model.contextWindow
      ]
    );
  }

  await pool.query(
    `SELECT setval(
      pg_get_serial_sequence('models', 'id'),
      COALESCE((SELECT MAX(id) FROM models), 1)
    )`
  );
};

// GET all models from PostgreSQL.
router.get("/", async (req, res) => {
  try {
    await seedModels();

    const result = await pool.query(
      "SELECT * FROM models ORDER BY id ASC"
    );

    const formattedModels = result.rows.map((model) => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      category: model.category,
      description: model.description,
      capabilities: model.capabilities,
      inputPrice: Number(model.input_price),
      outputPrice: Number(model.output_price),
      contextWindow: model.context_window
    }));

    res.json({
      success: true,
      count: formattedModels.length,
      data: formattedModels
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve models from the database."
    });
  }
});

module.exports = router;