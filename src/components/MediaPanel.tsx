import type { Media, MediaCell } from '../data/projects'

function Cell({ cell }: { cell: MediaCell }) {
  if (cell.src) {
    return <img className="media__img" src={cell.src} alt={cell.label} />
  }
  return <div className="media__placeholder">{cell.label}</div>
}

export default function MediaPanel({ media }: { media: Media }) {
  if (media.type === 'single') {
    return (
      <div className="media">
        <Cell cell={media.cell} />
      </div>
    )
  }

  const totalHeight = media.rows.reduce((sum, r) => sum + r.height, 0)
  const width = Math.max(
    ...media.rows.map((r) => r.cells.reduce((s, c) => s + (c.flex ?? 1), 0)),
  )

  return (
    <div className="collage" style={{ aspectRatio: `${width} / ${totalHeight}` }}>
      {media.rows.map((row, i) => (
        <div className="collage__row" key={i} style={{ flex: row.height }}>
          {row.cells.map((cell, j) => (
            <div className="collage__cell" key={j} style={{ flex: cell.flex ?? 1 }}>
              <Cell cell={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
