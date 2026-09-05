import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import previewResume from '../assets/preview-resume.png'
import { projects } from '../data/projects'

type Preview = {
  src: string
  fit: 'contain' | 'cover'
}

export default function Home() {
  const [preview, setPreview] = useState<Preview | null>(null)

  return (
    <Layout home>
      <div className="home">
        <div className="home__nav">
          <Logo home />

          <Link
            to="/about"
            className="home__resume"
            onMouseEnter={() => setPreview({ src: previewResume, fit: 'cover' })}
            onMouseLeave={() => setPreview(null)}
            onFocus={() => setPreview({ src: previewResume, fit: 'cover' })}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPreview(null)
              }
            }}
          >
            About + Resume {'>'}
          </Link>

          <div
            className="work"
            onMouseLeave={() => setPreview(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPreview(null)
              }
            }}
          >
            <h1 className="work__heading">Work</h1>
            <div className="work__list">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="work__item"
                  onMouseEnter={() =>
                    project.preview ? setPreview({ src: project.preview, fit: 'contain' }) : setPreview(null)
                  }
                  onFocus={() =>
                    project.preview ? setPreview({ src: project.preview, fit: 'contain' }) : setPreview(null)
                  }
                >
                  <span className="work__title-row">
                    <span className="work__title">{project.title}</span>
                    <span className="work__arrow" aria-hidden>
                      {'>'}
                    </span>
                  </span>
                  <span className="work__subtitle">{project.subtitle}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="home__preview" aria-hidden={!preview}>
          {preview ? (
            <img
              className={`home__preview-img home__preview-img--${preview.fit}`}
              src={preview.src}
              alt=""
            />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
