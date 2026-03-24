const languageOptions = [
  { value: 'en', shortLabel: 'EN' },
  { value: 'es', shortLabel: 'ES' }
];

export const portfolioEs = {
  meta: {
    title: 'Regy | Desarrolladora Front-End',
    description:
      'Desarrolladora front-end con experiencia en SharePoint Online, SPFx, React, TypeScript y Power Platform, enfocada en UI cuidada y entrega real en entorno enterprise.'
  },
  ui: {
    header: {
      brandTagline: 'Front-End / SharePoint',
      contactCta: 'Hablemos',
      language: {
        label: 'Idioma',
        options: languageOptions
      }
    },
    hero: {
      visualDirectionEyebrow: 'Dirección visual',
      sceneLabel: 'Campo interactivo',
      sceneHint: 'Recorre el hero con el cursor o pulsa para liberar un pulso en la órbita.'
    },
    sections: {
      about: 'Sobre mí',
      skills: 'Capacidades',
      value: 'Por qué trabajar conmigo'
    },
    experience: {
      eyebrow: 'Experiencia',
      introEyebrow: 'Lo que esto aporta',
      introStatement:
        'Profundidad en SharePoint, sensibilidad de producto y hábitos de entrega construidos en proyectos enterprise reales.'
    },
    projects: {
      eyebrow: 'Proyectos destacados',
      roleLabel: 'Rol',
      repositoryLabel: 'Repositorio',
      livePreviewLabel: 'Vista en vivo',
      noDemoLabel: 'Sin demo pública por ahora'
    },
    contact: {
      eyebrow: 'Contacto',
      replaceLabel: 'Cambiar'
    }
  },
  visualDirection: {
    label: 'Observatorio Digital',
    statement:
      'Un portfolio oscuro y cinematográfico donde la luz orbital, la profundidad glass y una tipografía editorial presentan a Regy como una desarrolladora front-end con estructura enterprise y criterio visual.'
  },
  navigation: [
    { label: 'Sobre mí', href: '#about' },
    { label: 'Capacidades', href: '#skills' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Valor', href: '#value' },
    { label: 'Contacto', href: '#contact' }
  ],
  hero: {
    name: 'Regy',
    title: 'Sistemas front-end con profundidad enterprise y criterio visual.',
    subtitle:
      'SharePoint Online, SPFx, React y TypeScript al servicio de interfaces que se sienten modernas, estructuradas y listas para entornos reales de negocio.',
    description:
      'Mi base más fuerte está en SharePoint y Microsoft 365, pero mi trabajo va más allá: Power Platform, flujos conectados con Azure, UI pulida, arquitectura front-end responsive y mucho interés por cómo se ven, se mueven y comunican los productos digitales.',
    primaryCta: {
      label: 'Explorar proyectos',
      href: '#projects'
    },
    secondaryCta: {
      label: 'Contactar',
      href: '#contact'
    },
    highlights: [
      'SharePoint Online',
      'SPFx',
      'React',
      'TypeScript',
      'Power Platform',
      'Desarrollo centrado en UI'
    ],
    metrics: [
      {
        label: 'Entrega enterprise',
        value: 'Modernización SharePoint, ecosistemas Microsoft 365 y soluciones orientadas a negocio.'
      },
      {
        label: 'Craft front-end',
        value: 'UI responsive, estructura de componentes y detalle de interacción que sigue siendo mantenible.'
      },
      {
        label: 'Integraciones',
        value: 'Power Platform, Microsoft Graph, Azure Functions y scripting alrededor de flujos reales.'
      },
      {
        label: 'Colaboración',
        value: 'Documentación técnica, POCs, presentaciones a cliente y trabajo ágil.'
      }
    ],
    orbit: [
      {
        title: 'Estructura',
        copy: 'Pensamiento por componentes, código mantenible e implementación lista para contexto enterprise.'
      },
      {
        title: 'Experiencia',
        copy: 'Proyectos marcados por migraciones, gobernanza, usuarios reales y contexto de negocio.'
      },
      {
        title: 'Expresión',
        copy: 'Cuidado visual, motion y ritmo para hacer la interfaz más clara y más memorable.'
      }
    ]
  },
  about: {
    title: 'Profundidad en SharePoint, amplitud front-end y una mirada clara de producto.',
    description:
      'Llevo construyendo soluciones en SharePoint Online desde 2022, primero en Hiberus y ahora en Sogeti, trabajando con SPFx, React, TypeScript y PnPjs en proyectos donde usabilidad, integración y contexto de negocio importan de verdad. Al mismo tiempo, sigo empujando mi perfil front-end más allá de ese ecosistema a través de proyectos con React, Angular y Vue con una capa más visual y orientada a producto.',
    pullQuote:
      'Quiero construir interfaces que se mantengan sólidas dentro de entornos complejos sin renunciar a claridad, ritmo ni cuidado visual.',
    body:
      'Es justo ahí donde siento que aporto más valor: moviéndome con soltura entre restricciones enterprise, trato con cliente, documentación y estructura técnica, sin dejar de cuidar layouts responsive, calidad de interacción y el acabado final de la experiencia. SharePoint es uno de mis diferenciales más fuertes, pero no es el límite de cómo trabajo como desarrolladora front-end.',
    highlights: [
      {
        label: '01',
        title: 'Modernización enterprise',
        copy: 'Trabajo en proyectos de SharePoint Online que muchas veces llegan después de migraciones desde on-premise, así que estoy acostumbrada a modernizar sin perder de vista la realidad del negocio.'
      },
      {
        label: '02',
        title: 'SharePoint más integraciones',
        copy: 'Mi día a día incluye web parts, extensiones y Form Customizers en SPFx, además de Power Platform, Azure Automation, Azure Functions, Microsoft Graph y flujos con PowerShell / PnP.'
      },
      {
        label: '03',
        title: 'Rango front-end',
        copy: 'Mi recorrido también pasa por proyectos con React, Angular y Vue, desarrollos mobile-first, Firebase y Netlify, algo que mantiene mi mirada front-end más amplia que una sola plataforma.'
      }
    ]
  },
  skills: {
    title: 'Capacidades construidas entre entrega SharePoint y una práctica front-end más amplia.',
    description:
      'El valor no está solo en conocer herramientas, sino en combinarlas para construir soluciones mantenibles, visualmente cuidadas y realistas para entornos de negocio.',
    groups: [
      {
        label: 'Core',
        title: 'Front-End',
        mark: 'FE',
        featured: true,
        copy:
          'La capa donde más cómoda me siento: construir UI limpias, responsive y mantenibles con buen pensamiento de componentes, desde trabajo muy centrado en React hasta base en Angular y Vue.',
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
        label: 'Diferencial',
        title: 'SharePoint y ecosistema Microsoft',
        mark: 'SP',
        copy:
          'Una base fuerte en SharePoint Online y SPFx, respaldada por escenarios reales de negocio, integraciones y entrega dentro de entornos muy apoyados en Microsoft.',
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
        label: 'Sistemas',
        title: 'Cloud e integraciones',
        mark: 'CL',
        copy:
          'Muy útil cuando una solución necesita ir más allá de la interfaz y conectar con automatizaciones, servicios backend o flujos cloud.',
        items: [
          'Microsoft Graph',
          'Azure Functions',
          'Power Automate',
          'Power Apps',
          '.NET / C#',
          'Firebase',
          'Integraciones API'
        ]
      },
      {
        label: 'Craft',
        title: 'UI / Motion / Experiencia',
        mark: 'UX',
        copy:
          'Una capa más cercana a producto, enfocada en claridad, motion y acabado para que las interfaces se sientan pensadas y no solo funcionales.',
        items: [
          'Motion-based UI',
          'Interfaces interactivas',
          'Microinteracciones',
          'Jerarquía visual',
          'UI con accesibilidad en mente',
          'Ejecución responsive premium'
        ]
      },
      {
        label: 'Workflow',
        title: 'Herramientas y entrega',
        mark: 'WF',
        copy:
          'El trabajo menos visible que hace viables los proyectos: demos, documentación, colaboración ágil y comunicación con perfiles técnicos y no técnicos.',
        items: [
          'Azure DevOps',
          'Entrega ágil',
          'Documentación técnica',
          'Documentación funcional',
          'Presentaciones a cliente',
          'Estructura mantenible'
        ]
      }
    ]
  },
  experience: {
    title: 'Una trayectoria construida en entrega real, no solo en demos.',
    description:
      'Desde formación front-end y proyectos con foco producto hasta delivery en SharePoint dentro de equipos enterprise, mi recorrido ha crecido alrededor de implementación práctica, integraciones e interfaces que tienen que funcionar para usuarios reales.',
    signals: [
      'Modernización SharePoint',
      'Web parts, extensiones y Form Customizers en SPFx',
      'React, TypeScript, SCSS y Fluent UI',
      'Power Platform, Microsoft Graph y Azure Functions',
      'Automatización con PowerShell y PnP',
      'Documentación, POCs, presentaciones a cliente y entrega ágil'
    ],
    stages: [
      {
        step: '01',
        label: 'Sogeti | 2025 - Actualidad',
        title: 'Power Platform & SharePoint Developer',
        copy:
          'Desarrollo soluciones modernas en SharePoint Online después de migraciones desde on-premise, con web parts, extensiones y Form Customizers en SPFx usando React y TypeScript, además de integraciones con Power Platform, Azure Automation y Azure Functions. El rol también incluye scripting con PowerShell y PnP, documentación técnica y funcional, POCs y presentaciones a cliente.',
        items: [
          'SPFx web parts',
          'Extensions y Form Customizers',
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
          'Trabajé en desarrollo SharePoint Online y soporte en entornos on-premise, construyendo soluciones SPFx con React, TypeScript y PnPjs, integrando APIs .NET y cuidando la implementación visual con SCSS, CSS Modules, estandarización de código y colaboración diaria con Azure DevOps dentro de equipos ágiles.',
        items: [
          'SharePoint Online + on-premise',
          'SPFx + React',
          'TypeScript + PnPjs',
          'Integraciones con APIs .NET',
          'SCSS / CSS Modules',
          'Azure DevOps'
        ]
      },
      {
        step: '03',
        label: 'Base front-end | 2022',
        title: 'Formación UI y proyectos con enfoque producto',
        copy:
          'A través del programa front-end de Hiberus University y proyectos como Pitayapp, trabajé con Vue, Angular y React, construyendo interfaces mobile-first, flujos orientados a MVP y layouts accesibles conectados con herramientas como Firebase y Netlify.',
        items: [
          'Vue, Angular y React',
          'HTML5 / SCSS / JavaScript',
          'Firebase / Netlify',
          'UI mobile-first',
          'Accesibilidad',
          'Trabajo ágil'
        ]
      }
    ]
  },
  projects: {
    title: 'Proyectos seleccionados entre SharePoint, producto digital y aprendizaje construyendo.',
    description:
      'Esta selección está ordenada para mostrar lo que realmente aporto: solidez en SharePoint, curiosidad front-end más amplia y proyectos que dejan ver cómo pienso la estructura, la UX y la evolución técnica en distintos stacks.',
    items: [
      {
        title: 'GameDirectory',
        category: 'SharePoint / SPFx',
        status: 'Proyecto insignia',
        featured: true,
        description:
          'Una experiencia tipo directorio en SharePoint Online construida con SPFx y React, centrada en contenido estructurado, filtros, vistas de detalle y una interacción más cercana a producto dentro de Microsoft 365.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PnPjs'],
        role: 'Arquitectura SPFx, UI en React, modelado de datos y diseño de experiencia.',
        links: {
          repo: 'https://github.com/ladyArray/GameDirectory',
          demo: null
        },
        accent: ['#8967ff', '#3cb8ff']
      },
      {
        title: 'meet-manager',
        category: 'SharePoint / Teams',
        status: 'Flujo Microsoft 365',
        description:
          'Un proyecto SPFx orientado a flujos de gestión de reuniones, construido con React, Fluent UI, PnPjs y routing del lado cliente para una experiencia Microsoft 365 más cercana a una aplicación.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PnPjs', 'Teams'],
        role: 'Estructura SPFx, UI en React y diseño de interacción orientado a Microsoft 365.',
        links: {
          repo: 'https://github.com/ladyArray/meet-manager',
          demo: null
        },
        accent: ['#7080ff', '#78d8ff']
      },
      {
        title: 'staticWebAppAzure / ReleasePilot',
        category: 'Front-end moderno',
        status: 'Preparado para Azure',
        description:
          'Un dashboard de seguimiento de releases construido con React, TypeScript y Vite para Azure Static Web Apps, pensado para mostrar datos tipados, routing, filtros y una historia de despliegue más limpia.',
        stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Azure Static Web Apps'],
        role: 'Arquitectura front-end, UI del dashboard y configuración orientada a despliegue.',
        links: {
          repo: 'https://github.com/ladyArray/staticWebAppAzure',
          demo: null
        },
        accent: ['#5a7dff', '#59d7ff']
      },
      {
        title: 'Pitayapp-web',
        category: 'Producto front-end',
        status: 'Proyecto colaborativo',
        description:
          'Un proyecto front-end colaborativo construido alrededor de una experiencia mobile-first, empezando con JavaScript nativo y Swiper en la landing y evolucionando hacia una web principal en Vue con flujos apoyados en Firebase y despliegue en Netlify.',
        stack: ['Vue 3', 'Vite', 'SCSS', 'Firebase', 'Swiper', 'Netlify'],
        role: 'Arquitectura front-end, implementación de landing, migración a Vue y UI responsive.',
        links: {
          repo: 'https://github.com/Pitayapp/Pitayapp-web',
          demo: null
        },
        accent: ['#8b6dff', '#57e4c7']
      },
      {
        title: 'JigsawApp',
        category: 'UI móvil',
        status: 'Proyecto visual',
        description:
          'Una app de puzles para Android desarrollada en C#, con dibujo personalizado, vistas de tablero y una capa de interacción más cuidada que la de una utilidad convencional.',
        stack: ['C#', '.NET para Android', 'Android XML', 'Custom drawing', 'Material UI'],
        role: 'Estructura de app, flujo de interacción y estilo visual.',
        links: {
          repo: 'https://github.com/ladyArray/JigsawApp',
          demo: null
        },
        accent: ['#7f79ff', '#88dcff']
      },
      {
        title: 'FitBook',
        category: 'App multiplataforma',
        status: 'TFG DAM',
        description:
          'Un TFG de DAM centrado en reservas de clases fitness, horarios y flujos de usuario, construido como app multiplataforma con .NET MAUI y una lógica clara de uso.',
        stack: ['.NET MAUI', 'C#', 'XAML', 'SQLite', 'UI multiplataforma'],
        role: 'Concepto de producto, UX de reservas e implementación de la app.',
        links: {
          repo: 'https://github.com/ladyArray/FitBook',
          demo: null
        },
        accent: ['#69a6ff', '#6df3d3']
      },
      {
        title: 'perret.es',
        category: 'Front-end Angular',
        status: 'Proyecto de contenido',
        description:
          'Un proyecto en Angular que explora vistas enrutadas, estructura por componentes y una capa visual cuidada apoyada en Bootstrap con personalización propia.',
        stack: ['Angular', 'TypeScript', 'Bootstrap', 'HTML', 'CSS'],
        role: 'Implementación front-end y estructura de páginas por componentes.',
        links: {
          repo: 'https://github.com/ladyArray/perret.es',
          demo: null
        },
        accent: ['#7487ff', '#ffc28a']
      },
      {
        title: 'superswitches',
        category: 'Proyecto full-stack',
        status: 'TFG DAW',
        description:
          'Un TFG de DAW que combina una capa de aplicación en PHP con un workflow front-end basado en Vite, mostrando una mentalidad full-stack temprana y una estructuración de interfaz más allá de páginas estáticas simples.',
        stack: ['PHP', 'JavaScript', 'Vite', 'SCSS', 'Apache'],
        role: 'Implementación full-stack y estructura de interfaz.',
        links: {
          repo: 'https://github.com/ladyArray/superswitches',
          demo: null
        },
        accent: ['#9a73ff', '#ffc16d']
      },
      {
        title: 'WebApp / ServiceDesk API',
        category: 'Arquitectura backend',
        status: 'ServiceDesk API',
        description:
          'Una Web API por capas en ASP.NET Core para gestión de tickets de soporte, organizada en dominio, aplicación, infraestructura y tests para mostrar arquitectura mantenible más allá de la UI.',
        stack: ['ASP.NET Core', '.NET 9', 'C#', 'EF Core', 'SQLite', 'Swagger'],
        role: 'Arquitectura, diseño de API, documentación y base de testing.',
        links: {
          repo: 'https://github.com/ladyArray/WebApp',
          demo: null
        },
        accent: ['#5766ff', '#a7b4ff']
      },
      {
        title: 'WebApi',
        category: 'Sandbox API',
        status: 'Base temprana',
        description:
          'Un repositorio inicial mantenido como sandbox ligero para experimentación de capa de servicios y planificación de una aplicación desacoplada.',
        stack: ['C#', 'Exploración API', 'Setup de repositorio', 'Planificación de servicios'],
        role: 'Exploración de estructura backend.',
        links: {
          repo: 'https://github.com/ladyArray/WebApi',
          demo: null
        },
        accent: ['#5d74ff', '#87d5ff']
      }
    ]
  },
  values: {
    title: 'Lo que aporto es fiabilidad técnica con una sensibilidad fuerte por la interfaz.',
    description:
      'Funciono mejor cuando un proyecto necesita estructura y cuidado a la vez: implementación limpia, conciencia de negocio y una interfaz que siga sintiéndose pensada.',
    items: [
      {
        mark: '01',
        title: 'Experiencia SharePoint sin visión túnel',
        copy: 'Puedo aportar valor real en entornos Microsoft 365, especialmente con SharePoint Online y SPFx, sin dejar de posicionarme como un perfil front-end más amplio.'
      },
      {
        mark: '02',
        title: 'Cuidado UI respaldado por disciplina técnica',
        copy: 'Me fijo en jerarquía, motion, responsive y acabado, pero también en estructura de componentes, mantenibilidad y accesibilidad.'
      },
      {
        mark: '03',
        title: 'Cómoda con integraciones y delivery',
        copy: 'Power Platform, Azure Functions, Microsoft Graph, PowerShell, documentación y presentaciones a cliente ya forman parte de mi forma de trabajar.'
      },
      {
        mark: '04',
        title: 'Un perfil que sigue ampliándose',
        copy: 'React es central en mi perfil, pero la base en Angular, Vue, .NET y proyectos orientados a móvil me da más perspectiva al pensar interfaces y productos.'
      }
    ]
  },
  contact: {
    title: 'Abierta a oportunidades front-end, SharePoint y con foco UI.',
    description:
      'Actualmente trabajo como Power Platform & SharePoint Developer en Sogeti. Si buscas a alguien que combine fiabilidad enterprise, profundidad en SharePoint y una mirada front-end más afinada, estaré encantada de hablar contigo.',
    availability: [
      'Roles front-end',
      'SharePoint / SPFx',
      'Power Platform',
      'Entrega centrada en UI'
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
