import { useEffect } from "react";
import { applyPageSeo, SITE_SEO } from "../utils/seo";

export default function usePageSeo({ title, description, noindex = false } = SITE_SEO) {
  useEffect(() => {
    applyPageSeo({ title, description, noindex });

    return () => {
      applyPageSeo(SITE_SEO);
    };
  }, [title, description, noindex]);
}
