import config from '@config/config.json';

export default function CredibilityBadge({ className = '', dark = false }) {
  const { rccm, nif } = config.params;
  const badgeClass = dark
    ? 'inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80'
    : 'ft-badge';
  return (
    <div className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      <span className={badgeClass}>RCCM {rccm}</span>
      <span className={badgeClass}>NIF {nif}</span>
    </div>
  );
}
