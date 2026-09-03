import pipebot02 from '../assets/pipebot-02.png'
import pipebot03 from '../assets/pipebot-03.png'
import pipebot04 from '../assets/pipebot-04.png'
import pipebot05 from '../assets/pipebot-05.png'
import pipebot06 from '../assets/pipebot-06.jpg'
import pipebotShowcase from '../assets/pipebot-showcase.png'
import previewChat from '../assets/preview-chat.png'
import previewPipebot from '../assets/preview-pipebot.png'
import previewSensing from '../assets/preview-sensing-the-fields.png'
import previewWavedrifter from '../assets/preview-wavedrifter.png'
import previewWavelamp from '../assets/preview-wavelamp.png'
import sensing03 from '../assets/sensing-03.png'
import sensing04 from '../assets/sensing-04.png'
import sensing05 from '../assets/sensing-05.png'
import sensing06 from '../assets/sensing-06.png'
import sensing07 from '../assets/sensing-07.png'
import sensing08 from '../assets/sensing-08.png'
import sensing09 from '../assets/sensing-09.png'
import sensing10 from '../assets/sensing-10.png'
import sensing11 from '../assets/sensing-11.png'
import sensing12 from '../assets/sensing-12.png'

export type MediaCell = {
  /** Label used for the placeholder and to identify the intended asset. */
  label: string
  /** Hover tooltip text. Falls back to `label` when omitted. */
  caption?: string
  /** Optional imported/hosted image source. When absent a placeholder renders. */
  src?: string
  /** Relative width within its collage row (flex-grow). Defaults to 1. */
  flex?: number
}

export type CollageRow = {
  cells: MediaCell[]
  /** Relative height of this row (flex-grow within the collage). */
  height: number
}

export type CollageRail = {
  /** Relative width of the right-hand column (same units as cell flex). */
  flex: number
  cells: MediaCell[]
}

export type Media =
  | { type: 'single'; cell: MediaCell }
  | { type: 'collage'; rows: CollageRow[]; rail?: CollageRail }

export type SectionId = 'overview' | 'process' | 'showcase'

export type Section = {
  id: SectionId
  label: string
  /** Short intro paragraph (16px). */
  lead?: string
  /** Roles / skills line (12px). */
  meta?: string
  /** Body paragraphs (16px). */
  body?: string[]
  media: Media
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  /** Homepage hover preview image. When absent the right panel stays blank. */
  preview?: string
  /** Whether the project has a fully designed set of pages. */
  designed: boolean
  sections: Section[]
}

const SECTION_ORDER: SectionId[] = ['overview', 'process', 'showcase']

export function orderedSections(project: Project): Section[] {
  return SECTION_ORDER.map((id) => project.sections.find((s) => s.id === id)).filter(
    (s): s is Section => Boolean(s),
  )
}

/** Placeholder body used for the not-yet-designed projects. */
function placeholderSections(overviewSrc?: string): Section[] {
  return [
    {
      id: 'overview',
      label: 'Overview',
      lead: 'Overview coming soon.',
      body: ['This project page is being written. Check back shortly.'],
      media: { type: 'single', cell: { label: 'overview image', src: overviewSrc } },
    },
    {
      id: 'process',
      label: 'Process',
      body: ['Process documentation coming soon.'],
      media: { type: 'single', cell: { label: 'process image' } },
    },
    {
      id: 'showcase',
      label: 'Showcase',
      body: ['Showcase coming soon.'],
      media: { type: 'single', cell: { label: 'showcase image' } },
    },
  ]
}

export const projects: Project[] = [
  {
    slug: 'sensing-the-fields',
    title: 'Sensing the Fields',
    subtitle: 'Interactive Agritech',
    preview: previewSensing,
    designed: true,
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        lead: 'A networked multi-sensor buoy designed for flooded rice paddies, designed alongside a companion dashboard and natural-language chatbot to facilitate accessible data insights to multiple stakeholders',
        meta: 'IOT and Networked Devices | Sensor Architecture | Design Research | Design Engineering | Microcontroller Prototyping | Design for Watertightness and Harsh Environments',
        body: [
          'RRI - the Resource Renewal Institute - approached our Designing Emerging Technologies class with a problem space: the implementation of offseason fish farming in flooded rice paddy fields.',
          'While “fish in the fields” is a practice with a rich culturual and indigenous history, modern adoption is low, and RRI is building support and momentum for it. A significant part of that work involves data collection and field monitoring.',
          'Our group designed a fully functional prototype as a proof concept for our solution: a networked array of sesnor buoys, accessible through an interactive dashboard and persona driven chatbot, that can distill the most relevant insights for the user, whether that be a farmer, scientist, or RRI representative.',
        ],
        media: { type: 'single', cell: { label: 'sensing_buoy', src: previewSensing } },
      },
      {
        id: 'process',
        label: 'Process',
        body: ['blah blah processy stuff'],
        media: {
          type: 'collage',
          rows: [
            {
              height: 418,
              cells: [
                { label: 'sensing_03', flex: 434, src: sensing03 },
                { label: 'sensing_04', flex: 434, src: sensing04 },
              ],
            },
            {
              height: 337,
              cells: [
                { label: 'sensing_05', flex: 286, src: sensing05 },
                { label: 'sensing_06', flex: 286, src: sensing06 },
                { label: 'sensing_07', flex: 286, src: sensing07 },
              ],
            },
          ],
          rail: {
            flex: 434,
            cells: [
              { label: 'sensing_08', src: sensing08 },
              { label: 'sensing_09', src: sensing09 },
            ],
          },
        },
      },
      {
        id: 'showcase',
        label: 'Showcase',
        body: ['blah blah showcase stuff'],
        media: {
          type: 'collage',
          rows: [
            {
              height: 1769,
              cells: [
                { label: 'sensing_12', flex: 1498, src: sensing12 },
                { label: 'sensing_10', flex: 1498, src: sensing10 },
              ],
            },
            {
              height: 1698,
              cells: [
                { label: 'sensing_11', flex: 3038, src: sensing11 },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    slug: 'pipebot',
    title: 'Pipebot',
    subtitle: 'Soft Robotics',
    preview: previewPipebot,
    designed: true,
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        lead: 'A novel soft robotic system for the investigation and clearance of blockages and obstructions in hard-to reach sewer lines.',
        meta: 'Soft Robotics | Microcontrollers and Automation | 3D Printing | Design Engineering',
        body: [
          "PipeBot was a final project for the MDes Program's Technological Design Foundations (TDF) class. Our group set out to design and build a robot prototype with the goal of presenting a novel solution to clear blocked pipes and sewers at the residential-municipal interface.",
          'The objective of this project is to develop a soft robotics system capable of navigating sewer networks to detect and clear blockages in a safe, efficient, and environmentally friendly manner. Reducing reliance on harsher cleaning methods; the robot uses a flexible, adaptive structure to travel through narrow and curved pipe sections, locate obstructions, and perform precise cleaning operations. This approach promotes preventative maintenance while protecting urban infrastructure, safeguarding worker health, and minimizing ecological impacts from wastewater pollution',
        ],
        media: { type: 'single', cell: { label: 'pipebot_01', src: previewPipebot } },
      },
      {
        id: 'process',
        label: 'Process',
        body: [
          'Early prototypes involved the exploration of different locomotion mechanisms, with the final choice being a sequence of linear actuators fitted with expanding mechanisms with which to anchor themselves with the walls of a pipe. When expanded and retracted at the correct intervals, the actuators and linkage created within the pipe a type of peristaltic motion-an expansion and contraction along a canal that pushes contents forward. Our robot would function like an inch worm, push-pulling itself along the inner wall of a pipe.',
          'As a team, we quickly moved away from plastic linkages to TPU-based spines, improving reliability by reducing moving parts, and drastically increasing the efficacy of the anchor mechanism by increasing the contact patch with the pliable material. TPU found its way into most components of our robot, as well as our rear umbillical tether, and the pliable linkages between actuator',
          'We also off-boarded many major components - including the microcontroller and motor controllers - into a control box, instead connecting to the robot with an umbillical tether that could also be used as a retrieval mechanism.',
        ],
        media: {
          type: 'collage',
          rows: [
            {
              height: 438,
              cells: [
                {
                  label: 'pipebot_02',
                  caption: 'Early brainstorming sketches of what would become PipeBot',
                  flex: 480,
                  src: pipebot02,
                },
                {
                  label: 'pipebot_03',
                  caption: 'An early sketch of the expansion anchor mechanism and locomotion sequence',
                  flex: 388,
                  src: pipebot03,
                },
              ],
            },
            {
              height: 384,
              cells: [
                {
                  label: 'pipebot_04',
                  caption: 'a proof-of-concept prototype demonstrating the efficacy of the linkage mechanism',
                  flex: 880,
                  src: pipebot04,
                },
              ],
            },
            {
              height: 418,
              cells: [
                {
                  label: 'pipebot_05',
                  caption: 'a midpoint prototype after replacing most parts with TPU',
                  flex: 880,
                  src: pipebot05,
                },
              ],
            },
            {
              height: 693,
              cells: [
                {
                  label: 'pipebot_06',
                  caption: 'rear view of the umbillical port and cable bundle',
                  flex: 880,
                  src: pipebot06,
                },
              ],
            },
          ],
        },
      },
      {
        id: 'showcase',
        label: 'Showcase',
        body: ['blah blah showcase stuff'],
        media: { type: 'single', cell: { label: 'pipebot_showcase', src: pipebotShowcase } },
      },
    ],
  },
  {
    slug: 'chat-am-i-going-to-hell',
    title: 'chat am i going to hell?',
    subtitle: 'Critical Art Installation',
    preview: previewChat,
    designed: false,
    sections: placeholderSections(previewChat),
  },
  {
    slug: 'wavelamp',
    title: 'Wavelamp',
    subtitle: 'Creating Re-Use',
    preview: previewWavelamp,
    designed: false,
    sections: placeholderSections(previewWavelamp),
  },
  {
    slug: 'wavedrifter',
    title: 'Wavedrifter',
    subtitle: 'Compact Breaking Wave Sensors',
    preview: previewWavedrifter,
    designed: false,
    sections: placeholderSections(previewWavedrifter),
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
