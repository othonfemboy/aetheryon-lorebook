export default async function handler(req, res) {
    // Só aceita requisições do tipo POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido.' });
    }

    // Puxa a chave secreta que você configurou lá no painel do Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        // Envia a requisição do servidor do Vercel para o Google (ninguém vê isso)
        // OBS: Corrigi o nome do modelo para gemini-1.5-flash, que é a versão oficial mais recente e rápida!
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body) // Repassa a pergunta exatamente como o HTML mandou
            }
        );

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || "Erro na API do Google");
        }

        // Devolve a resposta pronta pro seu site
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "As trevas falharam: " + error.message });
    }
}