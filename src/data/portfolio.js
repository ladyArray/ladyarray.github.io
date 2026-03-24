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
      'Front-end developer with SharePoint Online, SPFx, React, TypeScript and Power Platform experience, focused on polished UI and real enterprise delivery.'
  },
  ui: {
    header: {
      brandTagline: 'Front-End / SharePoint',
      contactCta: "Let's talk",
      language: {
        label: 'Language',
        options: languageOptions
      }
    },
    hero: {
      visualDirectionEyebrow: 'Visual Direction',
      sceneLabel: 'Interactive Field',
      sceneHint: 'Move across the hero or tap to release a pulse through the orbit.'
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
        'SharePoint depth, product sensitivity and delivery habits shaped by real enterprise projects.'
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
    title: 'Front-end systems with enterprise depth and visual intent.',
    subtitle:
      'SharePoint Online, SPFx, React and TypeScript used to build interfaces that feel modern, structured and ready for real business environments.',
    description:
      'My strongest base is in SharePoint and Microsoft 365, but my work goes further: Power Platform, Azure-connected flows, polished UI, responsive front-end architecture and a real interest in how digital products look, move and communicate.',
    primaryCta: {
      label: 'Explore selected work',
      href: '#projects'
    },
    secondaryCta: {
      label: 'Get in touch',
      href: '#contact'
    },
    highlights: [
      'SharePoint Online',
      'SPFx',
      'React',
      'TypeScript',
      'Power Platform',
      'UI-focused development'
    ],
    metrics: [
      {
        label: 'Enterprise delivery',
        value: 'SharePoint modernization, Microsoft 365 ecosystems and business-facing solutions.'
      },
      {
        label: 'Front-end craft',
        value: 'Responsive UI, component structure and interaction detail that stays maintainable.'
      },
      {
        label: 'Integrations',
        value: 'Power Platform, Microsoft Graph, Azure Functions and scripting around real workflows.'
      },
      {
        label: 'Collaboration',
        value: 'Technical docs, POCs, client presentations and agile teamwork.'
      }
    ],
    orbit: [
      {
        title: 'Structure',
        copy: 'Component thinking, maintainable code and enterprise-ready implementation.'
      },
      {
        title: 'Experience',
        copy: 'Projects shaped by migrations, governance, real users and business context.'
      },
      {
        title: 'Expression',
        copy: 'Visual care, motion and rhythm used to make interfaces clearer and more memorable.'
      }
    ]
  },
  about: {
    title: 'SharePoint depth, front-end range and a clear product mindset.',
    description:
      'I have been building SharePoint Online solutions since 2022, first at Hiberus and now at Sogeti, working with SPFx, React, TypeScript and PnPjs in projects where usability, integration and business context all matter. At the same time, I keep pushing my front-end work beyond that ecosystem through React, Angular and Vue projects with a stronger visual and product-oriented layer.',
    pullQuote:
      'I want to build interfaces that stay solid inside complex environments without giving up clarity, rhythm or visual care.',
    body:
      'That is where I feel most useful: moving comfortably between enterprise constraints, client-facing delivery, documentation and technical structure, while still caring about responsive layouts, interaction quality and how polished the final experience feels. SharePoint is one of my strongest differentiators, but not the limit of how I work as a front-end developer.',
    highlights: [
      {
        label: '01',
        title: 'Enterprise modernization',
        copy: 'I work on SharePoint Online projects that often sit after on-premise migrations, so I am used to modernizing solutions without losing sight of business reality.'
      },
      {
        label: '02',
        title: 'SharePoint plus integrations',
        copy: 'My day-to-day includes SPFx web parts, extensions and Form Customizers, plus Power Platform, Azure Automation, Azure Functions, Microsoft Graph and PowerShell / PnP workflows.'
      },
      {
        label: '03',
        title: 'Front-end range',
        copy: 'My background also includes React, Angular and Vue projects, mobile-first builds, Firebase and Netlify, which keeps my front-end thinking wider than a single platform.'
      }
    ]
  },
  skills: {
    title: 'Capabilities shaped by SharePoint delivery and a wider front-end practice.',
    description:
      'The value is not only knowing tools, but being able to combine them into solutions that are maintainable, visually careful and realistic for business environments.',
    groups: [
      {
        label: 'Core',
        title: 'Front-End',
        mark: 'FE',
        featured: true,
        copy:
          'The layer where I feel most at home: building clean, responsive and maintainable UI with strong component thinking, from React-heavy work to Angular and Vue foundations.',
        items: [
          'React',
          'TypeScript',
          'JavaScript',
          'HTML5',
          'CSS3 / SCSS',
          'Angular',
          'Vue.js',
          'Responsive design'
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
          'Microsoft 365',
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
          'Useful when a solution needs to move beyond the interface and connect with automation, backend services or cloud workflows.',
        items: [
          'Microsoft Graph',
          'Azure Functions',
          'Power Automate',
          'Power Apps',
          '.NET / C#',
          'Firebase',
          'API integrations'
        ]
      },
      {
        label: 'Craft',
        title: 'UI / Motion / Experience',
        mark: 'UX',
        copy:
          'A product-minded layer focused on clarity, motion and finish, so interfaces feel considered rather than merely functional.',
        items: [
          'Motion-based UI',
          'Interactive interfaces',
          'Microinteractions',
          'Visual hierarchy',
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
          'Azure DevOps',
          'Agile delivery',
          'Technical documentation',
          'Functional documentation',
          'Client presentations',
          'Maintainable structure'
        ]
      }
    ]
  },
  experience: {
    title: 'A trajectory built through real delivery, not only demos.',
    description:
      'From front-end training and product-style builds to SharePoint delivery inside enterprise teams, my path has grown around practical implementation, integrations and interfaces that need to work for real users.',
    signals: [
      'SharePoint modernization',
      'SPFx web parts, extensions and Form Customizers',
      'React, TypeScript, SCSS and Fluent UI',
      'Power Platform, Microsoft Graph and Azure Functions',
      'PowerShell and PnP automation',
      'Documentation, POCs, client presentations and agile delivery'
    ],
    stages: [
      {
        step: '01',
        label: 'Sogeti | 2025 - Present',
        title: 'Power Platform & SharePoint Developer',
        copy:
          'Building modern SharePoint Online solutions after on-premise migrations, with SPFx web parts, extensions and Form Customizers in React and TypeScript, plus integrations with Power Platform, Azure Automation and Azure Functions. The role also includes PowerShell and PnP scripting, technical and functional documentation, POCs and client presentations.',
        items: [
          'SPFx web parts',
          'Extensions & Form Customizers',
          'React + TypeScript + Fluent UI',
          'Power Platform',
          'Azure Automation & Functions',
          'PowerShell / PnP'
        ]
      },
      {
        step: '02',
        label: 'Hiberus | 2022 - 2025',
        title: 'SharePoint Developer',
        copy:
          'Worked on SharePoint Online delivery and on-premise support, building SPFx solutions with React, TypeScript and PnPjs, integrating .NET APIs and taking care of SCSS-based UI implementation, code quality and day-to-day collaboration through Azure DevOps and agile workflows.',
        items: [
          'SharePoint Online + on-premise',
          'SPFx + React',
          'TypeScript + PnPjs',
          '.NET API integrations',
          'SCSS / CSS Modules',
          'Azure DevOps'
        ]
      },
      {
        step: '03',
        label: 'Front-End Foundation | 2022',
        title: 'UI-focused training and product builds',
        copy:
          'Through the Hiberus University front-end program and projects like Pitayapp, I worked with Vue, Angular and React, building mobile-first interfaces, MVP-oriented flows and accessible layouts connected to tools like Firebase and Netlify.',
        items: [
          'Vue, Angular and React',
          'HTML5 / SCSS / JavaScript',
          'Firebase / Netlify',
          'Mobile-first UI',
          'Accessibility',
          'Agile teamwork'
        ]
      }
    ]
  },
  projects: {
    title: 'Selected work across SharePoint, product UI and growth through shipping.',
    description:
      'This mix is arranged to show what I actually bring: strong SharePoint capability, broader front-end curiosity and projects that reveal how I think about structure, UX and technical evolution across different stacks.',
    items: [
      {
        title: 'GameDirectory',
        category: 'SharePoint / SPFx',
        status: 'Flagship build',
        featured: true,
        description:
          'A SharePoint Online directory experience built with SPFx and React, centered on structured content, filtering, detail views and a more curated, app-like interaction model inside Microsoft 365.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PnPjs'],
        role: 'SPFx architecture, React UI, data modelling and experience design.',
        links: {
          repo: 'https://github.com/ladyArray/GameDirectory',
          demo: null
        },
        accent: ['#8967ff', '#3cb8ff']
      },
      {
        title: 'meet-manager',
        category: 'SharePoint / Teams',
        status: 'Microsoft 365 flow',
        description:
          'An SPFx project for meeting-related management flows, built with React, Fluent UI, PnPjs and client-side routing for a more application-like Microsoft 365 experience.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PnPjs', 'Teams'],
        role: 'SPFx structure, React UI and Microsoft 365-focused interaction design.',
        links: {
          repo: 'https://github.com/ladyArray/meet-manager',
          demo: null
        },
        accent: ['#7080ff', '#78d8ff']
      },
      {
        title: 'staticWebAppAzure / ReleasePilot',
        category: 'Modern front-end',
        status: 'Azure-ready front-end',
        description:
          'A release-tracking dashboard built with React, TypeScript and Vite for Azure Static Web Apps, structured to show typed data, routing, filters and a cleaner deployment story.',
        stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Azure Static Web Apps'],
        role: 'Front-end architecture, dashboard UI and Azure-oriented deployment setup.',
        links: {
          repo: 'https://github.com/ladyArray/staticWebAppAzure',
          demo: null
        },
        accent: ['#5a7dff', '#59d7ff']
      },
      {
        title: 'Pitayapp-web',
        category: 'Front-end product',
        status: 'Collaborative build',
        description:
          'A collaborative front-end project built around a mobile-first experience, starting with vanilla JavaScript and Swiper on the landing and moving into a Vue-based main site with Firebase-backed flows and Netlify deployment.',
        stack: ['Vue 3', 'Vite', 'SCSS', 'Firebase', 'Swiper', 'Netlify'],
        role: 'Front-end architecture, landing implementation, Vue migration and responsive UI.',
        links: {
          repo: 'https://github.com/Pitayapp/Pitayapp-web',
          demo: null
        },
        accent: ['#8b6dff', '#57e4c7']
      },
      {
        title: 'JigsawApp',
        category: 'Mobile UI',
        status: 'Visual build',
        description:
          'An Android jigsaw puzzle app built in C#, with custom drawing, puzzle views and a more tailored interaction layer than a standard utility interface.',
        stack: ['C#', '.NET for Android', 'Android XML', 'Custom drawing', 'Material UI'],
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
          'A DAM final project focused on fitness class booking, schedules and reservations, built as a cross-platform app with .NET MAUI and a clear user-flow mindset.',
        stack: ['.NET MAUI', 'C#', 'XAML', 'SQLite', 'Cross-platform UI'],
        role: 'Product concept, reservation UX and app implementation.',
        links: {
          repo: 'https://github.com/ladyArray/FitBook',
          demo: null
        },
        accent: ['#69a6ff', '#6df3d3']
      },
      {
        title: 'perret.es',
        category: 'Angular front-end',
        status: 'Content-driven build',
        description:
          'An Angular project exploring routed views, component structure and a polished visual layer using Bootstrap as a base with custom styling on top.',
        stack: ['Angular', 'TypeScript', 'Bootstrap', 'HTML', 'CSS'],
        role: 'Front-end implementation and component-based page structure.',
        links: {
          repo: 'https://github.com/ladyArray/perret.es',
          demo: null
        },
        accent: ['#7487ff', '#ffc28a']
      },
      {
        title: 'superswitches',
        category: 'Full-stack build',
        status: 'TFG DAW',
        description:
          'A DAW final project that combines a PHP application layer with a Vite-driven frontend workflow, showing an early full-stack mindset and interface structuring beyond simple static pages.',
        stack: ['PHP', 'JavaScript', 'Vite', 'SCSS', 'Apache'],
        role: 'Full-stack implementation and interface structure.',
        links: {
          repo: 'https://github.com/ladyArray/superswitches',
          demo: null
        },
        accent: ['#9a73ff', '#ffc16d']
      },
      {
        title: 'WebApp / ServiceDesk API',
        category: 'Backend architecture',
        status: 'ServiceDesk API',
        description:
          'A layered ASP.NET Core Web API for support ticket management, organised around domain, application, infrastructure and tests to show maintainable architecture beyond the UI layer.',
        stack: ['ASP.NET Core', '.NET 9', 'C#', 'EF Core', 'SQLite', 'Swagger'],
        role: 'Architecture, API design, documentation and testing groundwork.',
        links: {
          repo: 'https://github.com/ladyArray/WebApp',
          demo: null
        },
        accent: ['#5766ff', '#a7b4ff']
      },
      {
        title: 'WebApi',
        category: 'API sandbox',
        status: 'Early foundation',
        description:
          'An initial repository kept as a lightweight sandbox for service-layer experimentation and decoupled application planning.',
        stack: ['C#', 'API exploration', 'Repository setup', 'Service planning'],
        role: 'Backend structure exploration.',
        links: {
          repo: 'https://github.com/ladyArray/WebApi',
          demo: null
        },
        accent: ['#5d74ff', '#87d5ff']
      }
    ]
  },
  values: {
    title: 'What I bring is technical reliability with a strong interface sensibility.',
    description:
      'I am at my best when a project needs both structure and care: clean implementation, business awareness and an interface that still feels considered.',
    items: [
      {
        mark: '01',
        title: 'SharePoint expertise without tunnel vision',
        copy: 'I can add real value in Microsoft 365 environments, especially with SharePoint Online and SPFx, while still positioning myself as a broader front-end developer.'
      },
      {
        mark: '02',
        title: 'UI care backed by implementation discipline',
        copy: 'I pay attention to hierarchy, motion, responsiveness and polish, but I also care about component structure, maintainability and accessibility.'
      },
      {
        mark: '03',
        title: 'Comfortable with integrations and delivery',
        copy: 'Power Platform, Azure Functions, Microsoft Graph, PowerShell, documentation and client presentations are already part of how I work.'
      },
      {
        mark: '04',
        title: 'A profile that keeps expanding',
        copy: 'React is central, but my background with Angular, Vue, .NET and mobile-oriented builds gives me wider perspective when shaping interfaces and products.'
      }
    ]
  },
  contact: {
    title: 'Open to front-end, SharePoint and UI-focused opportunities.',
    description:
      'I am currently working as a Power Platform & SharePoint Developer at Sogeti. If you need someone who can combine enterprise reliability, SharePoint depth and a sharper front-end eye, I would be glad to connect.',
    availability: [
      'Front-end roles',
      'SharePoint / SPFx',
      'Power Platform',
      'UI-focused delivery'
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
