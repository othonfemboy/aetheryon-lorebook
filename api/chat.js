export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { mensagem, promptPersonalidade } = req.body; 

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const promptFinal = `${promptPersonalidade}\n\nMensagem do jogador: "${mensagem}"`;

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptFinal }] }]
      })
    });

    const dados = await resposta.json();
    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({ error: "Erro de conexão com a IA" });
  }
}