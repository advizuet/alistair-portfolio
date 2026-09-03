import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Media, MediaCell } from '../data/projects'

const TIP_OFFSET = 12
const TIP_PAD = 8

type Tip = { text: string; cursorX: number; cursorY: number }

function placeTip(el: HTMLElement, cursorX: number, cursorY: number) {
  const w = el.offsetWidth
  const h = el.offsetHeight
  const vw = window.innerWidth
  const vh = window.innerHeight

  let left = cursorX + TIP_OFFSET
  if (left + w > vw - TIP_PAD) {
    left = cursorX - TIP_OFFSET - w
  }
  left = Math.min(Math.max(left, TIP_PAD), Math.max(TIP_PAD, vw - w - TIP_PAD))

  let top = cursorY + TIP_OFFSET
  if (top + h > vh - TIP_PAD) {
    top = cursorY - TIP_OFFSET - h
  }
  top = Math.min(Math.max(top, TIP_PAD), Math.max(TIP_PAD, vh - h - TIP_PAD))

  el.style.left = `${left}px`
  el.style.top = `${top}px`
}

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

export default function MediaPanel({
  media,
  fit = 'contain',
}: {
  media: Media
  fit?: 'contain' | 'cover'
}) {
  const [tip, setTip] = useState<Tip | null>(null)
  const tipRef = useRef<HTMLDivElement>(null)

  const onMove = (text: string, x: number, y: number) => {
    setTip({ text, cursorX: x, cursorY: y })
  }
  const onLeave = () => setTip(null)

  useLayoutEffect(() => {
    if (!tip || !tipRef.current) return
    placeTip(tipRef.current, tip.cursorX, tip.cursorY)
  }, [tip])

  const tooltip = tip
    ? createPortal(
        <div ref={tipRef} className="img-tip" role="tooltip">
          {tip.text}
        </div>,
        document.body,
      )
    : null

  if (media.type === 'single') {
    return (
      <>
        <div className={`media media--${fit}`}>
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
