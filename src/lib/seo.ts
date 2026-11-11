export type PageSEO = {
  title: string;
  description: string;
};

export const SITE_NAME = 'CGPA Calculator AI';

const DEFAULT_DESCRIPTION =
  'Accurate, transparent SGPA • CGPA • Percentage calculators for VTU students. No personal data stored on a server.';

export function getPageSEO({ title = SITE_NAME, description = DEFAULT_DESCRIPTION, pathname = '/' }: {
  title?: string;
  description?: string;
  pathname?: string;
}): PageSEO {
  const pipeBrand = ` | ${SITE_NAME}`;
  const dashBrand = ` — ${SITE_NAME}`;
  let cleanTitle = title;
  if (cleanTitle.endsWith(pipeBrand)) cleanTitle = cleanTitle.slice(0, -pipeBrand.length);
  else if (cleanTitle.endsWith(dashBrand)) cleanTitle = cleanTitle.slice(0, -dashBrand.length);
  return {
    title: `${cleanTitle} | ${SITE_NAME}`,
    description,
  };
}
