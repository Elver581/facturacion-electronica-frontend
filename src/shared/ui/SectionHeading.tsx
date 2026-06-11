type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  accent?: 'blue' | 'orange'
  align?: 'left' | 'center'
  inverted?: boolean
}

const eyebrowStyles = {
  blue: 'text-blue-700 bg-blue-50 border-blue-100',
  orange: 'text-orange-700 bg-orange-50 border-orange-100',
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = 'blue',
  align = 'center',
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto' : 'text-left'}>
      <span className={`inline-flex text-xs font-bold uppercase tracking-[0.16em] border rounded-full px-3 py-1 ${eyebrowStyles[accent]}`}>
        {eyebrow}
      </span>
      <h2 className={`text-3xl md:text-4xl font-black tracking-[-0.035em] mt-4 mb-3 ${inverted ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      <p className={`max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${inverted ? 'text-slate-400' : 'text-slate-500'}`}>
        {description}
      </p>
    </div>
  )
}
