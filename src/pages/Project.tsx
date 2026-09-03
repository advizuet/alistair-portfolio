import { Fragment } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import MediaPanel from '../components/MediaPanel'
import { getProject, orderedSections, type Section, type SectionId } from '../data/projects'

function SectionBody({ section }: { section: Section }) {
  return (
    <>
      {section.lead && <p className="lead">{section.lead}</p>}
      {section.meta && <p className="meta-line">{section.meta}</p>}
      {section.body && section.body.length > 0 && (
        <div className="body">
          {section.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default function Project() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const project = getProject(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const sections = orderedSections(project)
  const requested = searchParams.get('section') as SectionId | null
  const current: SectionId =
    requested && sections.some((s) => s.id === requested) ? requested : sections[0].id
  const activeSection = sections.find((s) => s.id === current) ?? sections[0]

  const selectSection = (id: SectionId) => {
    if (id === sections[0].id) {
      setSearchParams({}, { replace: false })
    } else {
      setSearchParams({ section: id }, { replace: false })
    }
  }

  return (
    <Layout>
      <div className="split">
        <div className="split__left">
          <div className="proj-header">
            <h1 className="proj-header__title">{project.title}</h1>
            <p className="proj-header__sub">{project.subtitle}</p>
          </div>

          {sections.map((section) => {
            const isActive = section.id === current
            return (
              <Fragment key={section.id}>
                {isActive ? (
                  <span className="section-nav section-nav--active">{section.label}</span>
                ) : (
                  <button
                    type="button"
                    className="section-nav section-nav--link"
                    onClick={() => selectSection(section.id)}
                  >
                    {section.label} <span aria-hidden>{'>'}</span>
                  </button>
                )}
                {isActive && <SectionBody section={section} />}
              </Fragment>
            )
          })}
        </div>

        <div className="split__right">
          <MediaPanel media={activeSection.media} />
        </div>
      </div>
    </Layout>
  )
}
