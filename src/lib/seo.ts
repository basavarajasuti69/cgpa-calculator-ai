export type PageSEO = {
  title: string;
  description: string;
};

export const SITE_NAME = 'CGPA Calculator AI';
export const SITE_URL = 'https://cgpacalculatorai.com';

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

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tools/sgpa', label: 'SGPA' },
  { href: '/tools/cgpa', label: 'CGPA' },
  { href: '/tools/percentage', label: 'Percentage' },
  { href: '/tools/planner', label: 'Target Planner' },
  { href: '/tools/what-if', label: 'What-if / Backlog' },
  { href: '/tools/converter', label: 'Converters' },
  { href: '/grading', label: 'Grading' },
  { href: '/examples', label: 'Examples' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];
