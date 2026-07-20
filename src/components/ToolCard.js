import Link from 'next/link'
import Icon from './Icon'
import { categories } from '@/data/tools'

export default function ToolCard({ tool, compact = false, rank }) {
  const category = categories.find((item) => item.id === tool.category)
  return (
    <Link href={`/${tool.slug}/`} className={`tool-card category-${tool.category} ${compact ? 'compact' : ''}`}>
      {rank && <span className="tool-rank">{String(rank).padStart(2, '0')}</span>}
      <span className="tool-card-icon"><Icon name={tool.icon} /></span>
      <span className="tool-card-copy">
        <span className="tool-card-meta"><span>{category?.name}</span>{tool.badge && <em>{tool.badge}</em>}</span>
        <span className="tool-card-top"><strong>{tool.shortTitle || tool.title}</strong></span>
        {!compact && <small>{tool.description}</small>}
      </span>
      <span className="card-arrow"><Icon name="arrow" size="sm" /></span>
    </Link>
  )
}
