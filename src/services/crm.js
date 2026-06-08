const MOCK_DELAY_MS = 900;

function delay(ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_CLIENTS = {
  "12345678": {
    name: "María González",
    phone: "099123456",
    document: "12345678",
    status: "existing",
  },
  "87654321": {
    name: "Carlos Pérez",
    phone: "098765432",
    document: "87654321",
    status: "existing",
  },
};

export async function lookupClient(document) {
  await delay(700);

  const clean = document.replace(/\D/g, "");

  if (MOCK_CLIENTS[clean]) {
    return {
      found: true,
      client: MOCK_CLIENTS[clean],
    };
  }

  return { found: false, client: null };
}

export async function submitLead(payload) {
  await delay(1100);

  if (import.meta.env.VITE_CRM_MOCK_ERROR === "true") {
    throw new Error("Error simulado de CRM");
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  if (apiUrl) {
    const response = await fetch(`${apiUrl}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`CRM respondió con status ${response.status}`);
    }

    return response.json();
  }

  console.info("[CRM mock] Lead recibido:", payload);

  return {
    success: true,
    leadId: `mock-${Date.now()}`,
    status: "lead_received",
  };
}

export function buildLeadPayload({ product, form, clientStatus, productContext }) {
  return {
    contact: {
      name: form.name,
      phone: form.phone,
      document: form.document.replace(/\D/g, ""),
    },
    operation: {
      type: "financed_purchase",
      product_id: product.id,
      product_slug: product.slug,
      product_name: product.name,
      monthly_price: product.pricing.monthlyFormatted,
      installments: product.pricing.installments,
      status: "lead_received",
      source: "zona_descuentos_landing",
      client_status: clientStatus,
      financing_note:
        "Cliente solicita compra financiada. Si califica, recibe el producto y luego tarjeta Cabal para pagar cuotas.",
    },
    financial: {
      income: form.income,
      employment: form.employment,
      department: form.department,
    },
    context: {
      entry_path: productContext?.entry_path || null,
      product_category: productContext?.product_category || null,
      product_total_price: productContext?.product_total_price || null,
    },
    meta: {
      created_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
    },
  };
}
