// Cloudflare Worker для проксирования SOAP запросов к ROSSKO API

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    // CORS headers
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
        return new Response("Method not allowed", {
            status: 405,
            headers: corsHeaders,
        });
    }

    try {
        const { key1, key2 } = await request.json();

        if (!key1 || !key2) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "KEY1 и KEY2 обязательны",
                }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        // SOAP запрос
        const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://api.rossko.ru/">
  <soap:Body>
    <ns:GetSettlements>
      <ns:KEY1>${key1}</ns:KEY1>
      <ns:KEY2>${key2}</ns:KEY2>
    </ns:GetSettlements>
  </soap:Body>
</soap:Envelope>`;

        const response = await fetch("http://api.rossko.ru/service/v2.1/GetSettlements", {
            method: "POST",
            headers: {
                "Content-Type": "text/xml; charset=utf-8",
                SOAPAction: "",
            },
            body: soapEnvelope,
        });

        const xmlText = await response.text();

        // Парсинг XML ответа
        const balanceMatch = xmlText.match(/<ns1:balance>(.*?)<\/ns1:balance>/);
        const typeMatch = xmlText.match(/<ns1:type>(.*?)<\/ns1:type>/);
        const currencyMatch = xmlText.match(/<ns1:currency>(.*?)<\/ns1:currency>/);
        const successMatch = xmlText.match(/<ns1:success>(.*?)<\/ns1:success>/);
        const messageMatch = xmlText.match(/<ns1:message>(.*?)<\/ns1:message>/);

        if (successMatch && successMatch[1] === "false") {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: messageMatch ? messageMatch[1] : "Ошибка API",
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        // Парсинг контрагентов
        const customers = [];
        const customerRegex = /<ns1:Customers>[\s\S]*?<ns1:id>(.*?)<\/ns1:id>[\s\S]*?<ns1:name>(.*?)<\/ns1:name>[\s\S]*?<ns1:balance>(.*?)<\/ns1:balance>[\s\S]*?<\/ns1:Customers>/g;
        let match;
        while ((match = customerRegex.exec(xmlText)) !== null) {
            customers.push({
                id: match[1],
                name: match[2],
                balance: match[3],
            });
        }

        return new Response(
            JSON.stringify({
                success: true,
                balance: balanceMatch ? balanceMatch[1] : "0.00",
                type: typeMatch ? typeMatch[1] : "",
                currency: currencyMatch ? currencyMatch[1] : "руб",
                customers: customers,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message,
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    }
}
