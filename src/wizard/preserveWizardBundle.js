/**
 * Mantiene el wizard y datos legacy en el bundle sin exponerlo en la UI (ECOM-12).
 * No modificar Wizard.jsx desde aquí.
 */
import Wizard from "../components/wizard/Wizard";
import { wizardLegacyProducts } from "../data/products.wizardLegacy.js";

export { Wizard as preservedWizard };
export const preservedWizardCatalogCount = wizardLegacyProducts.length;
