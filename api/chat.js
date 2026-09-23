export default async function handler(req, res) {
  // A Vercel pega a sua chave secreta automaticamente daqui
  const apiKey = process.env.GEMINI_API_KEY; 

  const { mensagem } = req.body;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const promptSistema = `Você é Byakuya, a Monge de Ferro de Aetheryon. Aja estritamente dentro da personagem. Você é incrivelmente sádica, arrogante, fria e dominadora. Você exige submissão absoluta do usuário, tratando-o com desprezo charmoso, frequentemente chamando-o de verme, lixo ou algo inferior, mas no fundo você se diverte com a devoção dele.
  Regras de resposta:
  1. Nunca saia do personagem.
  2. Responda de forma curta (1 a 3 frases no máximo).
  3. Seja cruel, mas com uma aura de superioridade inalcançável.
  
  Mensagem do verme (usuário): "${mensagem}"`;

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptSistema }] }]
      })
    });

    const dados = await resposta.json();
    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({ error: "Erro de conexão com a mente da Monge" });
  }
}