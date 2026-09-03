import Layout from '../components/Layout'
import MediaPanel from '../components/MediaPanel'
import portrait from '../assets/preview-resume.png'

const roles =
  'Mechanical Engineer | Cad Junkie | Troubleshooter | Equipment Technician | Problem Solver | Artist | Emerging Tech Skeptic | Systems Thinker | Design Engineer'

const bio = [
  'blah blah MDes at Berkeley',
  'blah blah past experience at Nano3',
  'blah blah mech eng at UCSD',
  'blah blah hobbies',
]

export default function Resume() {
  return (
    <Layout>
      <div className="split">
        <div className="split__left">
          <h1 className="section-title">About + Resume</h1>
          <p className="meta-line">{roles}</p>
          <p className="lead">
            I love designing things and I am goated and fantastic. You should hire me :)
          </p>
          {bio.map((line) => (
            <p className="lead" key={line}>
              {line}
            </p>
          ))}
        </div>

        <div className="split__right">
          <MediaPanel media={{ type: 'single', cell: { label: 'portrait', src: portrait } }} />
        </div>
      </div>
    </Layout>
  )
}
