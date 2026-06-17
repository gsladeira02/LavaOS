# LavaOS

Sistema SaaS mobile-first para lava-jatos, estética automotiva, higienização, polimento, vitrificação e lavagem delivery.

## Como rodar localmente

Opção simples: abra `index.html` no navegador para testar a interface.

Para testar o checkout automático da InfinitePay, rode/suba em ambiente com suporte a `/api`, como Vercel:

```bash
npm install
npm run dev
```

## Login demo

- E-mail: `demo@lavaos.com`
- Senha: `123456`

## O que está incluso

- Landing page pública
- Cadastro da empresa
- Escolha de plano
- Checkout automático InfinitePay via API
- Login com bloqueio de assinatura
- Onboarding obrigatório
- Painel administrativo mobile-first
- Unidades
- Serviços
- Profissionais
- Horários
- Exceções de agenda
- Clientes com múltiplos veículos
- Página pública de agendamento
- Agenda administrativa
- Status do atendimento
- Ordem de serviço
- Pacotes
- Histórico por veículo
- Relatórios simples
- Configurações
- Persistência em localStorage para teste

## InfinitePay automático

O checkout não usa links manuais.

Ao clicar em **Pagar com InfinitePay**, o front chama:

```txt
/api/create-infinitepay-checkout
```

Essa rota cria o link de pagamento automaticamente na InfinitePay usando:

```txt
https://api.checkout.infinitepay.io/links
```

Handle configurado:

```txt
sistemasos
```

Você pode trocar pelo `.env` na Vercel:

```txt
INFINITEPAY_HANDLE=sistemasos
PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

## Webhook

Também foi criada a rota:

```txt
/api/infinitepay-webhook
```

Ela já recebe o retorno da InfinitePay. Para produção real, conecte essa rota ao Supabase para marcar a assinatura como ativa, salvar pagamento, vencimento e liberar o painel automaticamente.

## Observação importante

Esta versão entrega a base funcional em HTML/CSS/JS para validação, venda inicial, demonstração e evolução.

Para produção real multiempresa segura, o próximo passo é conectar:

- Supabase Auth;
- tabelas multiempresa;
- RLS;
- webhook salvando pagamentos no banco;
- bloqueio de assinatura baseado no banco, não apenas localStorage.
