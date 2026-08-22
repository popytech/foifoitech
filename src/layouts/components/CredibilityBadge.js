import config from '@config/config.json';

export default function CredibilityBadge({ className = '' }) {
  const { rccm, nif } = config.params;
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="ft-badge">RCCM {rccm}</span>
      <span className="ft-badge">NIF {nif}</span>
    </div>
  );
}
