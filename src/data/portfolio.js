import { portfolioEs } from './portfolio.es';

export const supportedLocales = ['en', 'es'];
export const defaultLocale = 'en';

const languageOptions = [
  { value: 'en', shortLabel: 'EN' },
  { value: 'es', shortLabel: 'ES' }
];

const portfolioEn = {
  meta: {
    title: 'Regy | Microsoft 365 Solutions Developer',
    description:
      'Microsoft 365 solutions developer focused on SharePoint, SPFx, architecture-minded delivery, automation, integrations and real enterprise execution.'
  },
  ui: {
    header: {
      brandTagline: 'Microsoft 365 / Modern Work',
      contactCta: "Let's talk",
      language: {
        label: 'Language',
        options: languageOptions
      }
    },
    hero: {
      visualDirectionEyebrow: 'Solution focus',
      sceneLabel: 'Assembly Field',
      sceneHint: 'Guide the layers to align and stabilize the hidden structure.'
    },
    sections: {
      about: 'Solution Mindset',
      skills: 'Capabilities',
      value: 'Why This Profile'
    },
    experience: {
      eyebrow: 'Experience',
      introEyebrow: 'What this translates into',
      introStatement:
        'SharePoint depth, Microsoft 365 solution thinking and delivery habits shaped by real enterprise programs.'
    },
    projects: {
      eyebrow: 'Selected Solutions',
      roleLabel: 'Role',
      impactLabel: 'What it shows',
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
    label: 'Microsoft 365 Systems',
    statement:
      'I design and implement solutions across SharePoint, SPFx, Power Platform, Azure-connected workflows and collaboration experiences, with an architecture mindset shaped by real enterprise delivery.'
  },
  navigation: [
    { label: 'Mindset', href: '#about' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Solutions', href: '#projects' },
    { label: 'Value', href: '#value' },
    { label: 'Contact', href: '#contact' }
  ],
  hero: {
    name: 'Regy',
    title: 'SharePoint and Microsoft 365 solutions with architecture-minded delivery.',
    subtitle:
      'SPFx, Modern Work, Power Platform, Azure-connected automation and integration patterns used to build systems that are useful, maintainable and credible in enterprise environments.',
    description:
      'My core work lives in SharePoint Online and Microsoft 365, but the value I aim for is broader: structuring solution architecture, shaping collaboration flows, connecting services, supporting adoption and exploring AI as a practical layer when it improves clarity, automation or decision support.',
    primaryCta: {
      label: 'Explore solutions',
      href: '#projects'
    },
    secondaryCta: {
      label: 'Get in touch',
      href: '#contact'
    },
    highlights: [
      'SharePoint Online',
      'SPFx',
      'Microsoft 365',
      'Power Platform',
      'Azure Integration',
      'Applied AI'
    ],
    metrics: [
      {
        label: 'Solution architecture',
        value: 'Platform structure, information models and implementation decisions shaped for maintainability and growth.'
      },
      {
        label: 'Modern Work delivery',
        value: 'SharePoint, collaboration surfaces and Microsoft 365 solutions built for real users, migration context and governance.'
      },
      {
        label: 'Automation & integration',
        value: 'Power Platform, Microsoft Graph, Azure Functions and scripting used to connect workflows instead of leaving them siloed.'
      },
      {
        label: 'Business-facing execution',
        value: 'Technical documentation, POCs, client presentations and solution thinking that stays grounded in adoption and utility.'
      }
    ],
    orbit: [
      {
        title: 'Architecture',
        copy: 'Structuring lists, services, APIs and collaboration flows into solutions that can evolve without losing coherence.'
      },
      {
        title: 'Modernization',
        copy: 'Working in migration, governance and operational contexts where the challenge is not only to build, but to modernize responsibly.'
      },
      {
        title: 'Automation & AI',
        copy: 'Treating automation, integration and AI as leverage layers that improve workflows, search, guidance or decision support when they genuinely help.'
      }
    ]
  },
  about: {
    title: 'Enterprise Microsoft delivery with a solution-architecture mindset.',
    description:
      'Since 2022 I have been building SharePoint Online solutions in real delivery contexts, first at Hiberus and now at Sogeti, working across SPFx, React, TypeScript, PnPjs, Power Platform and Azure-connected automation. What motivates me most is not a single framework, but how collaboration platforms, structure and user needs come together into something usable.',
    pullQuote:
      'I am most valuable when a solution needs to connect platform, business reality and implementation discipline without losing clarity.',
    body:
      'That means thinking beyond a screen: information architecture, maintainable service layers, governance constraints, integrations, adoption, documentation and the operational context that makes a Microsoft 365 solution succeed or fail. I still care about visual quality, but in service of a stronger platform experience rather than design as the main story.',
    highlights: [
      {
        label: '01',
        title: 'Enterprise modernization',
        copy: 'I work on SharePoint Online projects that often arrive after on-premise histories, so I am used to modernizing without losing sight of governance, adoption and business reality.'
      },
      {
        label: '02',
        title: 'Platform orchestration',
        copy: 'My day-to-day includes SPFx web parts, extensions and Form Customizers, plus Power Platform, Azure Automation, Azure Functions, Microsoft Graph and PowerShell / PnP workflows.'
      },
      {
        label: '03',
        title: 'Applied innovation',
        copy: 'I am especially interested in AI as a value layer inside Microsoft solutions: search assistance, guided experiences, workflow acceleration and knowledge access patterns that feel useful rather than decorative.'
      }
    ]
  },
  skills: {
    title: 'Capabilities shaped by SharePoint delivery, Modern Work systems and architecture-focused implementation.',
    description:
      'The value is not only knowing technologies, but combining them into platform solutions that are maintainable, credible in enterprise contexts and understandable for the people who depend on them.',
    groups: [
      {
        label: 'Core platform',
        title: 'SharePoint & SPFx',
        mark: 'SP',
        featured: true,
        copy:
          'The strongest foundation in my profile: building SharePoint Online solutions with SPFx, React and TypeScript while shaping information architecture, business-facing flows and maintainable structure.',
        items: [
          'SharePoint Online',
          'SPFx',
          'React',
          'TypeScript',
          'Fluent UI',
          'PnPjs',
          'Web parts & extensions',
          'Information modelling'
        ]
      },
      {
        label: 'Modern Work',
        title: 'Microsoft 365 Solutions',
        mark: 'MW',
        copy:
          'A solution view that goes beyond a single tool: collaboration surfaces, productivity flows, governance-aware delivery and an understanding of how people work inside Microsoft 365.',
        items: [
          'Microsoft 365',
          'Teams-aware delivery',
          'Lists & libraries',
          'Collaboration flows',
          'Governance-aware implementation',
          'Adoption-minded UX'
        ]
      },
      {
        label: 'Integration',
        title: 'Automation, Azure & APIs',
        mark: 'AZ',
        copy:
          'Useful when a solution needs to connect beyond the interface and become part of a wider operational ecosystem.',
        items: [
          'Power Automate',
          'Power Apps',
          'Microsoft Graph',
          'Azure Functions',
          'Azure Automation',
          'PowerShell',
          'API integrations'
        ]
      },
      {
        label: 'Architecture',
        title: 'Solution Design & Delivery',
        mark: 'AR',
        copy:
          'The layer that ties technology to execution: solution framing, documentation, modelling, maintainability and communication across technical and business audiences.',
        items: [
          'Solution architecture',
          'Data modelling',
          'Technical documentation',
          'Functional documentation',
          'POCs',
          'Client presentations',
          'Agile delivery'
        ]
      },
      {
        label: 'Innovation',
        title: 'Applied AI & Clarity',
        mark: 'AI',
        copy:
          'I care about AI and visual clarity from a solution perspective: useful guidance, knowledge access, readable tools and interfaces that help adoption instead of distracting from the platform.',
        items: [
          'AI exploration for workflows',
          'Knowledge discovery patterns',
          'Adoption-friendly interfaces',
          'Interactive dashboards',
          'Readable enterprise UX',
          'Solution storytelling'
        ]
      }
    ]
  },
  experience: {
    title: 'A trajectory built through enterprise delivery, platform evolution and solution ownership.',
    description:
      'My path has grown around SharePoint modernization, Microsoft 365 delivery, integrations and the practical work needed to make collaboration platforms useful in real organizations.',
    signals: [
      'SharePoint modernization after on-premise histories',
      'SPFx web parts, extensions and Form Customizers',
      'Power Platform, Microsoft Graph and Azure Functions',
      'Automation with PowerShell and PnP',
      'Documentation, POCs and client-facing solution delivery',
      'AI as a future value layer for Microsoft solutions'
    ],
    stages: [
      {
        step: '01',
        label: 'Sogeti | 2025 - Present',
        title: 'Power Platform, SharePoint & M365 Solutions Developer',
        copy:
          'Building modern SharePoint Online solutions after on-premise migrations, with SPFx web parts, extensions and Form Customizers in React and TypeScript, plus integrations with Power Platform, Azure Automation and Azure Functions. The role also includes PowerShell and PnP scripting, technical and functional documentation, POCs, client presentations and solution framing for real Microsoft 365 contexts.',
        items: [
          'SharePoint Online modernization',
          'SPFx web parts / extensions / Form Customizers',
          'Power Platform',
          'Azure Automation & Functions',
          'Technical + functional documentation',
          'Client POCs & presentations'
        ]
      },
      {
        step: '02',
        label: 'Hiberus | 2022 - 2025',
        title: 'SharePoint Developer',
        copy:
          'Worked on SharePoint Online delivery and on-premise support, building SPFx solutions with React, TypeScript and PnPjs, integrating .NET APIs and working within agile delivery through Azure DevOps. This stage strengthened both implementation discipline and the ability to modernize existing enterprise platforms without treating them as greenfield demos.',
        items: [
          'SharePoint Online + on-premise support',
          'SPFx + React + TypeScript',
          'PnPjs and .NET API integrations',
          'SCSS / CSS Modules',
          'Azure DevOps',
          'PowerShell / PnP'
        ]
      },
      {
        step: '03',
        label: 'Front-End Foundation | 2022',
        title: 'Front-end foundation that now reinforces solution clarity',
        copy:
          'Through the Hiberus University front-end program and projects in React, Angular and Vue, I built mobile-first interfaces and product-style flows. Today that foundation helps me present complex Microsoft solutions with more clarity, but it is no longer the main axis of the profile.',
        items: [
          'Vue, Angular and React',
          'Responsive implementation',
          'Accessible layouts',
          'Product thinking',
          'Visual clarity in complex tools',
          'Agile teamwork'
        ]
      }
    ]
  },
  projects: {
    title: 'Selected solutions across SharePoint, Modern Work, Azure and architecture-oriented delivery.',
    description:
      'This selection is intentionally weighted towards the work that best represents how I think: SharePoint and Microsoft 365 solutions, structured application design, Azure-ready delivery, integration patterns and maintainable foundations for enterprise contexts.',
    items: [
      {
        title: 'GameDirectory',
        category: 'SharePoint / Knowledge Platform',
        status: 'Flagship solution',
        featured: true,
        description:
          'A structured SharePoint Online directory built as a real SPFx solution, with catalog views, filters, detail panels, CRUD flows, file management, thematic text blocks and useful links organised around a reusable service layer.',
        stack: ['SharePoint Online', 'SPFx 1.20', 'React', 'Fluent UI', 'PnP'],
        role: 'Solution design, information model, SPFx architecture and product-style interaction inside Microsoft 365.',
        impact:
          'Demonstrates how list-based SharePoint content can become a maintainable knowledge surface with reusable services, edit flows and a more application-like experience.',
        links: {
          repo: 'https://github.com/ladyArray/GameDirectory',
          demo: null
        },
        accent: ['#8967ff', '#3cb8ff']
      },
      {
        title: 'meet-manager',
        category: 'SPFx / Modern Work',
        status: 'Collaboration workflow',
        description:
          'An SPFx solution oriented to meeting management flows, built with React, Fluent UI, PnPjs and client-side routing to create a more application-like collaboration experience inside Microsoft 365.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PnPjs', 'Teams'],
        role: 'SPFx structure, route-driven interaction and solution design for collaboration-heavy Microsoft 365 scenarios.',
        impact:
          'Shows how fragmented meeting coordination can move towards a clearer digital workflow with stronger structure, navigation and business-facing UX.',
        links: {
          repo: 'https://github.com/ladyArray/meet-manager',
          demo: null
        },
        accent: ['#7080ff', '#78d8ff']
      },
      {
        title: 'ReleasePilot',
        category: 'Azure / Delivery Intelligence',
        status: 'Azure-ready dashboard',
        description:
          'A release-tracking dashboard prepared for Azure Static Web Apps, with typed data, routed views, custom hooks, favourites persistence and a clear path towards Azure Functions if the solution grows beyond static data.',
        stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Azure Static Web Apps'],
        role: 'Front-end architecture, dashboard structure and Azure-oriented deployment setup.',
        impact:
          'Shows Azure-ready frontend architecture, typed data flows and a practical migration path from a clean SPA foundation to a wider cloud solution.',
        links: {
          repo: 'https://github.com/ladyArray/staticWebAppAzure',
          demo: null
        },
        accent: ['#5a7dff', '#59d7ff']
      },
      {
        title: 'ServiceDesk API',
        category: 'Architecture / API',
        status: 'Layered service platform',
        featured: true,
        description:
          'A layered ASP.NET Core support-ticket API organised into Domain, Application, Infrastructure and Api projects, with EF Core, SQLite, Swagger, tests, Docker and a documented growth path towards SQL Server and enterprise deployment.',
        stack: ['ASP.NET Core', '.NET 9', 'C#', 'EF Core', 'Swagger', 'Docker'],
        role: 'Architecture design, domain modelling, API contracts, documentation and testing groundwork.',
        impact:
          'Shows realistic solution architecture, separation of responsibilities and a clean path towards Azure App Service, Azure SQL and Entra ID integration.',
        links: {
          repo: 'https://github.com/ladyArray/WebApp',
          demo: null
        },
        accent: ['#5766ff', '#a7b4ff']
      },
      {
        title: 'WebApi',
        category: 'Integration foundation',
        status: 'Sandbox for future services',
        description:
          'A lightweight API-oriented repository kept as a base for service-layer exploration, decoupled planning and future integrations, useful as a placeholder for backend thinking that can mature into a wider enterprise solution.',
        stack: ['C#', 'Service planning', 'API exploration', 'Repository setup'],
        role: 'Exploration of backend structure and integration-ready foundations.',
        impact:
          'Keeps a lightweight base for decoupled services and future enterprise integrations, without pretending to be more complete than it currently is.',
        links: {
          repo: 'https://github.com/ladyArray/WebApi',
          demo: null
        },
        accent: ['#5d74ff', '#87d5ff']
      },
      {
        title: 'WikiUsers',
        category: 'Knowledge Lookup / Collaboration',
        status: 'Technical assessment turned product-like prototype',
        description:
          'An Angular-based user lookup experience created as a technical assessment, useful as a reference for searchable directory patterns, collaboration-oriented information access and product presentation under constrained scope.',
        stack: ['Angular', 'TypeScript', 'User lookup patterns', 'Search UI', 'Vercel'],
        role: 'Frontend implementation, information browsing flow and product-style presentation.',
        impact:
          'Even outside the Microsoft stack, it supports the portfolio narrative around searchable directories, collaboration surfaces and structuring information for real users.',
        links: {
          repo: 'https://github.com/ladyArray/WikiUsers',
          demo: 'https://wikiusers.vercel.app'
        },
        accent: ['#7487ff', '#9ee6ff']
      }
    ]
  },
  values: {
    title: 'What I bring is Microsoft platform depth with a solution mindset.',
    description:
      'I am at my best when a project needs both structure and clarity: a solution that works in real conditions, can evolve cleanly and still feels understandable to the people using it.',
    items: [
      {
        mark: '01',
        title: 'SharePoint expertise without tunnel vision',
        copy: 'I can add real value in Microsoft 365 environments, especially with SharePoint Online and SPFx, while thinking beyond a single web part or isolated screen.'
      },
      {
        mark: '02',
        title: 'Architecture and maintainability mindset',
        copy: 'I naturally think in terms of structure, service boundaries, information models, scalability and clean evolution instead of one-off implementation.'
      },
      {
        mark: '03',
        title: 'Automation, integration and pragmatic AI',
        copy: 'Power Platform, Azure Functions, Microsoft Graph, PowerShell and AI exploration all make sense to me as part of a wider platform strategy, not as disconnected extras.'
      },
      {
        mark: '04',
        title: 'Clarity that supports adoption',
        copy: 'I care about visual clarity and user experience because adoption matters, especially when enterprise solutions need to feel approachable without losing technical seriousness.'
      }
    ]
  },
  contact: {
    title: 'Open to Microsoft 365, SharePoint and architecture-minded solution work.',
    description:
      'I am currently working as a Power Platform & SharePoint Developer at Sogeti. If you need someone who can combine enterprise reliability, SharePoint depth, solution architecture thinking and a modern presentation layer, I would be glad to connect.',
    availability: [
      'Microsoft 365 solutions',
      'SharePoint / SPFx',
      'Power Platform & automation',
      'Architecture-minded delivery'
    ],
    links: [
      {
        type: 'email',
        label: 'Email',
        value: 'regina.rguez.c@gmail.com',
        href: 'mailto:regina.rguez.c@gmail.com'
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'Regina Rodriguez',
        href: 'https://www.linkedin.com/in/regina-rodriguez-sharepoint-developer/'
      },
      {
        type: 'github',
        label: 'GitHub',
        value: 'github.com/ladyArray',
        href: 'https://github.com/ladyArray'
      }
    ]
  }
};

export const portfolio = {
  en: portfolioEn,
  es: portfolioEs
};
