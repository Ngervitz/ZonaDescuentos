import { useEffect } from "react";
import { applyPageSeo, SITE_SEO } from "../utils/seo";

export default function usePageSeo({ title, description } = SITE_SEO) {
  useEffect(() => {
    applyPageSeo({ title, description });

    return () => {
      applyPageSeo(SITE_SEO);
    };
  }, [title, description]);
}
