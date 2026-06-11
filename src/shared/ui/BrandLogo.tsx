type BrandLogoProps = {
  compact?: boolean
  light?: boolean
}

export function BrandLogo({ compact = false, light = true }: BrandLogoProps) {
  return (
    <a href="/" className="brand-logo group" aria-label="STARKTECH, inicio">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-s">S</span>
        <span className="brand-mark-t">T</span>
        <span className="brand-mark-spark" />
      </span>
      {!compact && (
        <span className="brand-copy">
          <span className={`brand-name ${light ? 'text-white' : 'text-slate-950'}`}>
            <span>STARK</span><span className="text-[#ff6b00]">TECH</span>
          </span>
          <span className={`brand-tagline ${light ? 'text-slate-400' : 'text-slate-500'}`}>
            Desarrollo de software
          </span>
        </span>
      )}
    </a>
  )
}
