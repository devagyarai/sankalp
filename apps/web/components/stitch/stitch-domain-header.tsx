import { DomainId } from "@/lib/domains"
import { STITCH_DOMAINS } from "./stitch-domain-shell"

interface DomainHeaderProps {
  domainId: DomainId
  title: string
  description: string
}

export function StitchDomainHeader({ domainId, title, description }: DomainHeaderProps) {
  const domain = STITCH_DOMAINS[domainId]
  const Icon = domain.icon

  return (
    <div className="mb-12 border-b border-zinc-900 pb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${domain.bg} ${domain.border} border flex items-center justify-center ${domain.shadow}`}>
          <Icon className={`w-6 h-6 ${domain.color}`} />
        </div>
        <div>
          <h1 className={`text-2xl font-black tracking-widest uppercase ${domain.color}`}>
            {domain.name}
          </h1>
          <p className="text-xs tracking-widest uppercase text-zinc-500 font-bold mt-1">
            {domain.originalName} Domain
          </p>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-zinc-400 font-medium max-w-3xl">
        {description}
      </p>
    </div>
  )
}
