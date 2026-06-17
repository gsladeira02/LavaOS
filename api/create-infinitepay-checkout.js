export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const body = req.body || {};
    const handle = body.handle || process.env.INFINITEPAY_HANDLE || 'sistemasos';
    const plan = body.plan || {};
    const company = body.company || {};
    const orderNsu = body.order_nsu || `lavaos_${Date.now()}`;

    if (!plan.id || !plan.cents || !company.id) {
      return res.status(400).json({ error: 'Dados insuficientes para criar o checkout.' });
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = process.env.PUBLIC_SITE_URL || `${proto}://${host}`;

    const payload = {
      handle,
      redirect_url: `${baseUrl}/?payment=success&order_nsu=${encodeURIComponent(orderNsu)}`,
      webhook_url: `${baseUrl}/api/infinitepay-webhook`,
      order_nsu: orderNsu,
      items: [
        {
          quantity: 1,
          price: Number(plan.cents),
          description: `LavaOS - Plano ${plan.name} - ${company.name}`
        }
      ]
    };

    const ipResponse = await fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await ipResponse.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!ipResponse.ok) {
      return res.status(ipResponse.status).json({
        error: 'A InfinitePay não criou o checkout.',
        details: data
      });
    }

    return res.status(200).json({
      url: data.url,
      order_nsu: orderNsu,
      infinitepay: data
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erro interno ao criar checkout.' });
  }
}
