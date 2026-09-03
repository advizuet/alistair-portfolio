import { useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Media, MediaCell } from '../data/projects'

type Tip = { text: string; x: number; y: number }

function captionFor(cell: MediaCell) {
  return cell.caption?.trim() || cell.label
}

function Cell({
  cell,
  onMove,
  onLeave,
}: {
  cell: MediaCell
  onMove: (text: string, x: number, y: number) => void
  onLeave: () => void
}) {
  const text = captionFor(cell)
  const handleMove = (e: MouseEvent) => onMove(text, e.clientX, e.clientY)

  if (cell.src) {
    return (
      <img
        className="media__img"
        src={cell.src}
        alt={text}
        onMouseEnter={handleMove}
        onMouseMove={handleMove}
        onMouseLeave={onLeave}
      />
    )
  }

  return (
    <div
      className="media__placeholder"
      onMouseEnter={handleMove}
      onMouseMove={handleMove}
      onMouseLeave={onLeave}
    >
      {cell.label}
    </div>
  )
}

export default function MediaPanel({ media }: { media: Media }) {
  const [tip, setTip] = useState<Tip | null>(null)

  const onMove = (text: string, x: number, y: number) => {
    const offset = 12
    const maxW = 300
    const maxH = 80
    const left =
      x + offset + maxW > window.innerWidth - 8 ? Math.max(8, x - offset - maxW) : x + offset
    const top =
      y + offset + maxH > window.innerHeight - 8 ? Math.max(8, y - offset - maxH) : y + offset
    setTip({ text, x: left, y: top })
  }
  const onLeave = () => setTip(null)

  const tooltip = tip
    ? createPortal(
        <div
          className="img-tip"
          style={{ left: tip.x, top: tip.y }}
          role="tooltip"
        >
          {tip.text}
        </div>,
        document.body,
      )
    : null

  if (media.type === 'single') {
    return (
      <>
        <div className="media">
          <Cell cell={media.cell} onMove={onMove} onLeave={onLeave} />
        </div>
        {tooltip}
      </>
    )
  }

  const totalHeight = media.rows.reduce((sum, r) => sum + r.height, 0)
  const mainWidth = Math.max(
    ...media.rows.map((r) => r.cells.reduce((s, c) => s + (c.flex ?? 1), 0)),
  )
  const rail = media.rail
  const width = mainWidth + (rail?.flex ?? 0)

  const rows = media.rows.map((row, i) => (
    <div className="collage__row" key={i} style={{ flex: row.height }}>
      {row.cells.map((cell, j) => (
        <div className="collage__cell" key={j} style={{ flex: cell.flex ?? 1 }}>
          <Cell cell={cell} onMove={onMove} onLeave={onLeave} />
        </div>
      ))}
    </div>
  ))

  const collage = !rail ? (
    <div className="collage" style={{ aspectRatio: `${width} / ${totalHeight}` }}>
      {rows}
    </div>
  ) : (
    <div className="collage collage--rail" style={{ aspectRatio: `${width} / ${totalHeight}` }}>
      <div className="collage__main" style={{ flex: mainWidth }}>
        {rows}
      </div>
      <div className="collage__rail" style={{ flex: rail.flex }}>
        {rail.cells.map((cell, i) => (
          <div
            className="collage__cell"
            key={cell.label}
            style={{ flex: media.rows[i]?.height ?? 1 }}
          >
            <Cell cell={cell} onMove={onMove} onLeave={onLeave} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {collage}
      {tooltip}
    </>
  )
}
