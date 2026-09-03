import { Link } from 'react-router-dom'

type LogoProps = {
  /** When true, this is the home page: logo is blue and non-navigating. */
  home?: boolean
}

export default function Logo({ home = false }: LogoProps) {
  if (home) {
    return <span className="logo logo--home">Alistair Vizuet</span>
  }
  return (
    <Link to="/" className="logo">
      <span className="logo__back" aria-hidden>
        {'<'}
      </span>
      <span className="logo__name">Alistair Vizuet</span>
    </Link>
  )
}
