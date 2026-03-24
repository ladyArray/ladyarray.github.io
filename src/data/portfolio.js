import { portfolioEs } from './portfolio.es';

export const supportedLocales = ['en', 'es'];
export const defaultLocale = 'en';

const languageOptions = [
  { value: 'en', shortLabel: 'EN' },
  { value: 'es', shortLabel: 'ES' }
];

const portfolioEn = {
  meta: {
    title: 'Regy | Front-End Developer',
    description:
      'Regy is a front-end developer shaping premium interfaces with SharePoint, React, TypeScript and immersive UI craft.'
  },
  ui: {
    header: {
      brandTagline: 'Front-End / SPFx',
      contactCta: "Let's talk",
      language: {
        label: 'Language',
        options: languageOptions
      }
    },
    hero: {
      visualDirectionEyebrow: 'Visual Direction'
    },
    sections: {
      about: 'About',
      skills: 'Capabilities',
      value: 'Why Work With Me'
    },
    experience: {
      eyebrow: 'Experience',
      introEyebrow: 'What this translates into',
      introStatement:
        'Enterprise solidity, product sensitivity and the habit of shipping interfaces that make sense in the real world.'
    },
    projects: {
      eyebrow: 'Selected Work',
      roleLabel: 'Role',
      repositoryLabel: 'Repository',
      livePreviewLabel: 'Live preview',
      noDemoLabel: 'No public demo yet'
    },
    contact: {
      eyebrow: 'Contact',
      replaceLabel: 'Replace'
    }
  },
  visualDirection: {
    label: 'Digital Observatory',
    statement:
      'A dark, cinematic portfolio where orbiting light, glass depth and editorial typography frame Regy as a front-end developer with enterprise structure and strong visual intent.'
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Value', href: '#value' },
    { label: 'Contact', href: '#contact' }
  ],
  hero: {
    name: 'Regy',
    title: 'Front-end systems with visual gravity.',
    subtitle:
      'SharePoint depth, React craft and motion-led detail for interfaces that need to feel premium, clear and production-ready.',
    description:
      'I design and build polished digital experiences across Microsoft 365 environments and modern front-end stacks, balancing technical structure, interaction quality and a strong eye for visual composition.',
    primaryCta: {
      label: 'View selected work',
      href: '#projects'
    },
    secondaryCta: {
      label: 'Start a conversation',
      href: '#contact'
    },
    highlights: [
      'SharePoint Online',
      'SPFx',
      'React',
      'TypeScript',
      'Microsoft Graph',
      'UI-focused development'
    ],
    metrics: [
      {
        label: 'Enterprise depth',
        value: 'SharePoint Online, SPFx and integration-heavy delivery.'
      },
      {
        label: 'Visual intent',
        value: 'Motion, rhythm and detail without sacrificing clarity.'
      },
      {
        label: 'Frontend range',
        value: 'From Microsoft ecosystems to modern product-style interfaces.'
      },
      {
        label: 'Practical craft',
        value: 'Component architecture, responsive UI and maintainable implementation.'
      }
    ],
    orbit: [
      {
        title: 'Structure',
        copy: 'Reusable UI, scalable components and real-world delivery discipline.'
      },
      {
        title: 'Motion',
        copy: 'Transitions and microinteractions used to guide attention, not distract from it.'
      },
      {
        title: 'Depth',
        copy: 'SharePoint expertise as a differentiator, without narrowing the overall front-end positioning.'
      }
    ]
  },
  about: {
    title: 'Enterprise experience, frontend ambition and a careful visual eye.',
    description:
      'My background is strongly grounded in SharePoint Online, SPFx, React and TypeScript, but the way I approach products is wider than a single ecosystem. I care about interface quality, visual precision and building experiences that feel intentional from first glance to final interaction.',
    pullQuote:
      'I like products that look composed, behave clearly and still hold up inside complex technical environments.',
    body:
      'That combination is what I bring to the table: I can work comfortably with enterprise constraints, integrations, documentation and client-facing delivery, while still pushing the interface toward something cleaner, sharper and more memorable than expected.',
    highlights: [
      {
        label: '01',
        title: 'Real-world delivery',
        copy: 'SharePoint and Microsoft 365 work has trained me to design for complexity, not only for ideal conditions.'
      },
      {
        label: '02',
        title: 'SharePoint as leverage',
        copy: 'It is one of my strongest differentiators, especially when a project needs structure, integration and business context.'
      },
      {
        label: '03',
        title: 'UI with intention',
        copy: 'I am interested in the space where interface, interaction and technical quality reinforce each other.'
      }
    ]
  },
  skills: {
    title: 'Capabilities shaped for enterprise reality and modern interface work.',
    description:
      'The goal is not only to know tools, but to combine them with enough design sensitivity and implementation discipline to make the final experience feel coherent.',
    groups: [
      {
        label: 'Core',
        title: 'Front-End',
        mark: 'FE',
        featured: true,
        copy:
          'The layer where I am most at home: building clean, responsive and maintainable UI with solid component thinking and attention to layout, states and interaction flow.',
        items: [
          'React',
          'TypeScript',
          'JavaScript',
          'HTML5',
          'CSS3 / SCSS',
          'Responsive design',
          'Component architecture',
          'UI development'
        ]
      },
      {
        label: 'Differentiator',
        title: 'SharePoint & Microsoft Ecosystem',
        mark: 'SP',
        copy:
          'A strong foundation in SharePoint Online and SPFx, backed by real business scenarios, integrations and delivery inside Microsoft-heavy environments.',
        items: [
          'SharePoint Online',
          'SPFx',
          'Microsoft Graph',
          'Fluent UI',
          'PnPjs',
          'PowerShell'
        ]
      },
      {
        label: 'Systems',
        title: 'Cloud & Integrations',
        mark: 'CL',
        copy:
          'Useful when solutions need to move beyond the interface and connect with automation, backend services or lightweight cloud workflows.',
        items: [
          'Azure Functions',
          'Power Automate',
          'Power Apps',
          'API integrations',
          'Firebase',
          'Netlify'
        ]
      },
      {
        label: 'Craft',
        title: 'UI / Motion / Experience',
        mark: 'UX',
        copy:
          'A product-minded layer focused on motion, clarity and finish, so interfaces feel considered rather than merely functional.',
        items: [
          'Motion-based UI',
          'Interactive interfaces',
          'Visual rhythm',
          'Microinteractions',
          'Accessibility-aware UI',
          'Premium responsive execution'
        ]
      },
      {
        label: 'Workflow',
        title: 'Tools & Delivery',
        mark: 'WF',
        copy:
          'The behind-the-scenes work that keeps projects viable: demos, documentation, agile collaboration and communication with technical and non-technical stakeholders.',
        items: [
          'Agile environments',
          'Technical documentation',
          'Functional documentation',
          'Client presentations',
          'Version control',
          'Maintainable structure'
        ]
      }
    ]
  },
  experience: {
    title: 'A trajectory built between enterprise systems and interface quality.',
    description:
      'My experience combines implementation work, stakeholder-facing delivery and the ability to keep interfaces readable even when the surrounding ecosystem is anything but simple.',
    signals: [
      'SharePoint Online development',
      'SPFx web parts and extensions',
      'React + TypeScript interfaces',
      'Microsoft Graph and Azure integrations',
      'Power Platform workflows',
      'Client communication and agile delivery'
    ],
    stages: [
      {
        step: '01',
        label: 'Enterprise UI',
        title: 'SharePoint solutions with real business weight.',
        copy:
          'I have worked on SharePoint Online and SPFx solutions where business rules, content structure, governance and usability all matter at the same time.',
        items: [
          'Custom web parts',
          'Application customizers',
          'Microsoft 365 ecosystems',
          'Documentation and handoff'
        ]
      },
      {
        step: '02',
        label: 'Frontend Craft',
        title: 'React interfaces that stay maintainable as they grow.',
        copy:
          'Beyond the Microsoft layer, I focus on reusable UI, responsive behavior, strong state handling and layouts that feel deliberate instead of improvised.',
        items: [
          'React',
          'TypeScript',
          'Component systems',
          'Interaction-focused implementation'
        ]
      },
      {
        step: '03',
        label: 'Automation & Integration',
        title: 'Comfortable across flows, APIs and ecosystem boundaries.',
        copy:
          'I can move between interface work and surrounding services when a project needs integration thinking, automation or cloud-aware architecture.',
        items: [
          'Microsoft Graph',
          'Azure Functions',
          'Power Automate',
          'Power Apps'
        ]
      }
    ]
  },
  projects: {
    title: 'Selected projects that show breadth, not just one lane.',
    description:
      'SharePoint remains one of my clearest strengths, but this selection is arranged to show range: enterprise delivery, UI sensitivity, cross-platform thinking and early-stage architectural work.',
    items: [
      {
        title: 'GameDirectory',
        category: 'SharePoint / SPFx',
        status: 'Flagship build',
        featured: true,
        description:
          'A content-rich SharePoint experience that turns a games catalogue into a curated directory with filters, details panels, file management, exports and a knowledge-assistant extension layered into the site.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PowerShell'],
        role: 'Architecture, UI development, data modelling and experience design inside SharePoint.',
        links: {
          repo: 'https://github.com/ladyArray/GameDirectory',
          demo: null
        },
        accent: ['#8967ff', '#3cb8ff']
      },
      {
        title: 'JigsawApp',
        category: 'Mobile UI',
        status: 'Visual build',
        description:
          'A custom jigsaw puzzle application for Android with tailored layouts, puzzle views and a more expressive visual treatment than a typical utility-style app.',
        stack: ['.NET for Android', 'C#', 'Android XML', 'Custom drawing', 'Material UI'],
        role: 'App structure, interaction flow and visual styling.',
        links: {
          repo: 'https://github.com/ladyArray/JigsawApp',
          demo: null
        },
        accent: ['#7f79ff', '#88dcff']
      },
      {
        title: 'FitBook',
        category: 'Cross-platform app',
        status: 'TFG DAM',
        description:
          'A fitness class booking concept built as a DAM final project, covering schedules, reservations, user flows and multi-platform UI with .NET MAUI.',
        stack: ['.NET MAUI', 'C#', 'XAML', 'SQLite', 'Cross-platform UI'],
        role: 'Product concept, reservation UX and app implementation.',
        links: {
          repo: 'https://github.com/ladyArray/FitBook',
          demo: null
        },
        accent: ['#69a6ff', '#6df3d3']
      },
      {
        title: 'staticWebAppAzure / ReleasePilot',
        category: 'Modern front-end',
        status: 'Azure-ready',
        description:
          'A React + TypeScript dashboard designed for Azure Static Web Apps, with typed data, routing, release metrics and a deployment-aware frontend structure.',
        stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Azure Static Web Apps'],
        role: 'UI architecture, dashboard composition and deployment setup.',
        links: {
          repo: 'https://github.com/ladyArray/staticWebAppAzure',
          demo: null
        },
        accent: ['#5a7dff', '#59d7ff']
      },
      {
        title: 'superswitches',
        category: 'Full-stack build',
        status: 'TFG DAW',
        description:
          'A DAW final project combining a PHP application layer with a modern Vite-based frontend workflow, showing a broader full-stack delivery mindset.',
        stack: ['PHP', 'JavaScript', 'Vite', 'SCSS', 'Apache'],
        role: 'Full-stack implementation and interface structure.',
        links: {
          repo: 'https://github.com/ladyArray/superswitches',
          demo: null
        },
        accent: ['#9a73ff', '#ffc16d']
      },
      {
        title: 'webapp',
        category: 'Architecture foundation',
        status: 'In build',
        description:
          'A lightweight front-end repository kept separate from the service layer, ready to evolve into a decoupled application without mixing UI and backend concerns.',
        stack: ['Client shell', 'Repo split', 'Scaffold', 'Future UI lane'],
        role: 'Structure-first repository setup.',
        links: {
          repo: 'https://github.com/ladyArray/webapp',
          demo: null
        },
        accent: ['#5766ff', '#a7b4ff']
      },
      {
        title: 'webapi',
        category: 'Service foundation',
        status: 'In build',
        description:
          'Companion API groundwork intended to support a cleaner application split, integration experiments and service-oriented evolution as projects mature.',
        stack: ['API layer', 'Decoupled architecture', 'Integration-ready', 'Backend slot'],
        role: 'Service-layer repository foundation.',
        links: {
          repo: 'https://github.com/ladyArray/webapi',
          demo: null
        },
        accent: ['#5d74ff', '#87d5ff']
      }
    ]
  },
  values: {
    title: 'A profile that connects technical structure with visual judgement.',
    description:
      'The value I bring is not just writing code. It is being able to shape interfaces that hold up under real constraints while still feeling polished, intentional and contemporary.',
    items: [
      {
        mark: '01',
        title: 'Technical structure with design awareness',
        copy: 'I care about systems, naming, maintainability and delivery quality, but also about how the interface lands emotionally and visually.'
      },
      {
        mark: '02',
        title: 'Enterprise reality without losing product sensitivity',
        copy: 'SharePoint work has given me resilience around business context, integrations and stakeholder complexity without flattening the UI ambition.'
      },
      {
        mark: '03',
        title: 'Modern interfaces with discipline',
        copy: 'I aim for clarity, rhythm and sharp interaction detail rather than effects for the sake of effects.'
      },
      {
        mark: '04',
        title: 'A front-end profile with range',
        copy: 'SharePoint is a strength, not a cage. I can move between enterprise platforms, modern React work and interface-heavy experiments.'
      }
    ]
  },
  contact: {
    title: 'Open to front-end, SPFx and UI-focused opportunities.',
    description:
      'If you are looking for someone who can work inside real product constraints and still care deeply about the experience layer, I would love to connect.',
    availability: [
      'Recruiter conversations',
      'Front-end roles',
      'SPFx / SharePoint projects',
      'UI-focused delivery'
    ],
    links: [
      {
        type: 'github',
        label: 'GitHub',
        value: 'github.com/ladyArray',
        href: 'https://github.com/ladyArray'
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'Regina Rodriguez',
        href: 'https://www.linkedin.com/in/regina-rodriguez-sharepoint-developer/'
      },
      {
        type: 'email',
        label: 'Email',
        value: 'Add your professional email here',
        href: null
      }
    ]
  }
};

export const portfolio = {
  en: portfolioEn,
  es: portfolioEs
};
