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
  return {
    title: title === SITE_NAME ? title : `${title} | ${SITE_NAME}`,
    description,
  };
}
