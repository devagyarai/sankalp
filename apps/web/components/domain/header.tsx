import { DOMAINS, DomainId } from "@/lib/domains"

interface DomainHeaderProps {
  domainId: DomainId
  title: string
  description: string
}

export function DomainHeader({ domainId, title, description }: DomainHeaderProps) {
  const domain = DOMAINS[domainId]
  const Icon = domain.icon

  return (
    <div className="mb-12 border-b border-white/5 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl ${domain.bgLightClass} ${domain.borderClass} border flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${domain.colorClass}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white">
            {domain.name}
          </h1>
          <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">
            {domain.originalName} Domain
          </p>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mb-4">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground font-light max-w-3xl">
        {description}
      </p>
    </div>
  )
}
