export type PageSEO = {
  title: string;
  description: string;
};

export const SITE_NAME = 'CGPA Calculator AI';

const DEFAULT_DESCRIPTION =
  'Calculate SGPA, CGPA and percentage with transparent formulas. Compare supported university schemes and verify rules against your official regulations.';

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
