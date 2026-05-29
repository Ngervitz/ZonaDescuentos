export const EVENTS = {
  WIZARD_OPEN: "wizard_open",
  WIZARD_STEP: "wizard_step",
  WIZARD_SUBMIT: "wizard_submit",
  WIZARD_SUCCESS: "wizard_success",
  WIZARD_ERROR: "wizard_error",
  CLIENT_FOUND: "client_found",
  CLIENT_NEW: "client_new",
  PRODUCT_VIEW: "product_view",
  CTA_CLICK: "cta_click",
};

export function track(event, params = {}) {
  const payload = { event, ...params };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }
}

export function trackWizardOpen(product) {
  track(EVENTS.WIZARD_OPEN, {
    product_id: product.id,
    product_slug: product.slug,
    product_name: product.name,
  });
}

export function trackWizardStep(step, product) {
  track(EVENTS.WIZARD_STEP, {
    step,
    product_id: product.id,
    product_slug: product.slug,
  });
}

export function trackWizardSubmit(product) {
  track(EVENTS.WIZARD_SUBMIT, {
    product_id: product.id,
    product_slug: product.slug,
  });
}

export function trackWizardSuccess(product) {
  track(EVENTS.WIZARD_SUCCESS, {
    product_id: product.id,
    product_slug: product.slug,
  });
}

export function trackWizardError(product, errorMessage) {
  track(EVENTS.WIZARD_ERROR, {
    product_id: product.id,
    product_slug: product.slug,
    error_message: errorMessage,
  });
}

export function trackClientFound(product, document) {
  track(EVENTS.CLIENT_FOUND, {
    product_id: product.id,
    document_last4: document.slice(-4),
  });
}

export function trackClientNew(product) {
  track(EVENTS.CLIENT_NEW, {
    product_id: product.id,
    product_slug: product.slug,
  });
}
