import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cgpacalculatorai.com';

function brandAppend(title) {
  const candidate = title + ' | CGPA Calculator AI';
  if (candidate.length <= 60) return candidate;
  return title;
}

function getToolLabel(tool) {
  if (tool === 'sgpa') return 'SGPA Calculator';
  if (tool === 'cgpa') return 'CGPA Calculator';
  if (tool === 'percentage') return 'CGPA to Percentage Calculator';
  return tool.toUpperCase() + ' Calculator';
}

function getUnivName(id) {
  const map = { vtu: 'VTU', anna: 'Anna University', ktu: 'KTU', srm: 'SRM', vit: 'VIT', ipu: 'IPU', saveetha: 'Saveetha' };
  return map[id] || id.toUpperCase();
}
