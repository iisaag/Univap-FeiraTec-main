import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', process.cwd());
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Carrega variáveis do .env

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const app = express(); // Agora 'app' é inicializado antes de ser usado
const port = 3000;

app.use(cors()); // Permite conexões do frontend para o backend
app.use(express.json()); // Permite trabalhar com JSON

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});