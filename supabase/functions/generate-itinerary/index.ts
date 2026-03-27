import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, travelClass, travelers, pace, interests } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const daysCount = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    const classLabels: Record<string, string> = {
      budget: "econômica (baixo custo)",
      "mid-range": "intermediária",
      luxury: "luxo (premium)",
    };

    const paceLabels: Record<string, string> = {
      relaxed: "relaxado (poucas atividades por dia)",
      moderate: "moderado (equilíbrio entre passeios e descanso)",
      packed: "intenso (aproveitar cada minuto)",
    };

    const systemPrompt = `Você é um especialista em viagens pelo Brasil e pelo mundo. Crie roteiros detalhados, práticos e personalizados. Responda sempre em português brasileiro. Use emojis para tornar o roteiro mais visual.`;

    const userPrompt = `Crie um roteiro de viagem detalhado para ${destination} com as seguintes preferências:

- Duração: ${daysCount} dias (de ${startDate} a ${endDate})
- Número de viajantes: ${travelers}
- Classe: ${classLabels[travelClass] || travelClass}
- Ritmo: ${paceLabels[pace] || pace || "moderado"}
- Interesses: ${interests.join(", ")}

Para cada dia, inclua:
1. 📍 Atividades da manhã, tarde e noite
2. 🍽️ Sugestões de restaurantes (adequados à classe de viagem)
3. 🏨 Tipo de hospedagem recomendada
4. 🚗 Como se locomover entre os pontos
5. 💡 Dicas práticas e locais

Formate o roteiro de forma clara com cabeçalhos para cada dia.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Erro ao gerar roteiro" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-itinerary error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
