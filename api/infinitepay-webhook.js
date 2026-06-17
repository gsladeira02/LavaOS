export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const event = req.body || {};

  // Em produção, salve/atualize no banco a assinatura vinculada a event.order_nsu.
  // Exemplo de dados esperados no retorno/webhook da InfinitePay:
  // order_nsu, invoice_slug, paid_amount, installments, capture_method,
  // transaction_nsu, receipt_url e items.
  console.log('InfinitePay webhook recebido:', JSON.stringify(event));

  return res.status(200).json({ ok: true });
}
