const languageOptions = [
  { value: 'en', shortLabel: 'EN' },
  { value: 'es', shortLabel: 'ES' }
];

export const portfolioEs = {
  meta: {
    title: 'Regy | Desarrolladora Front-End',
    description:
      'Regy es una desarrolladora front-end que crea interfaces premium con SharePoint, React, TypeScript y una capa visual inmersiva.'
  },
  ui: {
    header: {
      brandTagline: 'Front-End / SPFx',
      contactCta: 'Hablemos',
      language: {
        label: 'Idioma',
        options: languageOptions
      }
    },
    hero: {
      visualDirectionEyebrow: 'Direccion visual'
    },
    sections: {
      about: 'Sobre mi',
      skills: 'Capacidades',
      value: 'Por que trabajar conmigo'
    },
    experience: {
      eyebrow: 'Experiencia',
      introEyebrow: 'Lo que esto aporta',
      introStatement:
        'Solidez enterprise, sensibilidad de producto y el habito de construir interfaces que funcionan de verdad en contextos reales.'
    },
    projects: {
      eyebrow: 'Proyectos destacados',
      roleLabel: 'Rol',
      repositoryLabel: 'Repositorio',
      livePreviewLabel: 'Vista en vivo',
      noDemoLabel: 'Sin demo publica por ahora'
    },
    contact: {
      eyebrow: 'Contacto',
      replaceLabel: 'Cambiar'
    }
  },
  visualDirection: {
    label: 'Observatorio Digital',
    statement:
      'Un portfolio oscuro y cinematografico donde la luz orbital, la profundidad glass y una tipografia editorial presentan a Regy como una desarrolladora front-end con estructura enterprise y criterio visual.'
  },
  navigation: [
    { label: 'Sobre mi', href: '#about' },
    { label: 'Capacidades', href: '#skills' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Valor', href: '#value' },
    { label: 'Contacto', href: '#contact' }
  ],
  hero: {
    name: 'Regy',
    title: 'Sistemas front-end con gravedad visual.',
    subtitle:
      'Profundidad en SharePoint, criterio en React y detalle guiado por motion para interfaces que necesitan verse premium, claras y listas para produccion.',
    description:
      'Diseno y desarrollo experiencias digitales pulidas dentro de entornos Microsoft 365 y stacks front-end modernos, equilibrando estructura tecnica, calidad de interaccion y una mirada visual muy cuidada.',
    primaryCta: {
      label: 'Ver proyectos',
      href: '#projects'
    },
    secondaryCta: {
      label: 'Iniciar conversacion',
      href: '#contact'
    },
    highlights: [
      'SharePoint Online',
      'SPFx',
      'React',
      'TypeScript',
      'Microsoft Graph',
      'Desarrollo centrado en UI'
    ],
    metrics: [
      {
        label: 'Solidez enterprise',
        value: 'SharePoint Online, SPFx y entregas con integraciones reales.'
      },
      {
        label: 'Intencion visual',
        value: 'Motion, ritmo y detalle sin perder claridad.'
      },
      {
        label: 'Amplitud front-end',
        value: 'Desde ecosistemas Microsoft hasta interfaces de producto mas modernas.'
      },
      {
        label: 'Craft practico',
        value: 'Arquitectura de componentes, UI responsive e implementacion mantenible.'
      }
    ],
    orbit: [
      {
        title: 'Estructura',
        copy: 'UI reutilizable, componentes escalables y disciplina de entrega real.'
      },
      {
        title: 'Motion',
        copy: 'Transiciones y microinteracciones usadas para guiar la atencion, no para distraer.'
      },
      {
        title: 'Profundidad',
        copy: 'SharePoint como ventaja diferencial sin encerrar el perfil en una sola categoria.'
      }
    ]
  },
  about: {
    title: 'Experiencia enterprise, ambicion front-end y un ojo visual muy cuidado.',
    description:
      'Mi base esta muy anclada en SharePoint Online, SPFx, React y TypeScript, pero mi forma de abordar producto va mas alla de un solo ecosistema. Me importa la calidad de interfaz, la precision visual y construir experiencias que se sientan intencionales desde el primer vistazo hasta la interaccion final.',
    pullQuote:
      'Me interesan los productos que se ven compuestos, se entienden con claridad y siguen funcionando bien dentro de entornos tecnicamente complejos.',
    body:
      'Esa combinacion es justo lo que aporto: puedo moverme con comodidad entre restricciones enterprise, integraciones, documentacion y trato con cliente, mientras empujo la interfaz hacia algo mas limpio, mas afinado y mas memorable de lo esperado.',
    highlights: [
      {
        label: '01',
        title: 'Entrega real',
        copy: 'El trabajo con SharePoint y Microsoft 365 me ha entrenado para disenar pensando en complejidad, no solo en escenarios ideales.'
      },
      {
        label: '02',
        title: 'SharePoint como palanca',
        copy: 'Es uno de mis diferenciales mas claros, especialmente cuando un proyecto necesita estructura, integracion y contexto de negocio.'
      },
      {
        label: '03',
        title: 'UI con intencion',
        copy: 'Me interesa el punto donde interfaz, interaccion y calidad tecnica se refuerzan entre si.'
      }
    ]
  },
  skills: {
    title: 'Capacidades pensadas para la realidad enterprise y el front-end moderno.',
    description:
      'El objetivo no es solo conocer herramientas, sino combinarlas con suficiente sensibilidad visual y disciplina de implementacion para que el resultado final se sienta coherente.',
    groups: [
      {
        label: 'Core',
        title: 'Front-End',
        mark: 'FE',
        featured: true,
        copy:
          'La capa donde me siento mas comoda: construir UI limpias, responsive y mantenibles con buen pensamiento de componentes y atencion a layout, estados y flujo de interaccion.',
        items: [
          'React',
          'TypeScript',
          'JavaScript',
          'HTML5',
          'CSS3 / SCSS',
          'Responsive design',
          'Arquitectura de componentes',
          'Desarrollo UI'
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
          'Microsoft Graph',
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
          'Muy util cuando la solucion necesita ir mas alla de la interfaz y conectar con automatizaciones, servicios backend o flujos cloud ligeros.',
        items: [
          'Azure Functions',
          'Power Automate',
          'Power Apps',
          'Integraciones API',
          'Firebase',
          'Netlify'
        ]
      },
      {
        label: 'Craft',
        title: 'UI / Motion / Experiencia',
        mark: 'UX',
        copy:
          'Una capa mas cercana a producto, enfocada en motion, claridad y acabado para que las interfaces se sientan pensadas y no solo funcionales.',
        items: [
          'Motion-based UI',
          'Interfaces interactivas',
          'Ritmo visual',
          'Microinteracciones',
          'UI con accesibilidad en mente',
          'Ejecucion responsive premium'
        ]
      },
      {
        label: 'Workflow',
        title: 'Herramientas y entrega',
        mark: 'WF',
        copy:
          'El trabajo menos visible que hace viables los proyectos: demos, documentacion, colaboracion agil y comunicacion con perfiles tecnicos y no tecnicos.',
        items: [
          'Entornos agiles',
          'Documentacion tecnica',
          'Documentacion funcional',
          'Presentaciones a cliente',
          'Control de versiones',
          'Estructura mantenible'
        ]
      }
    ]
  },
  experience: {
    title: 'Una trayectoria construida entre sistemas enterprise y calidad de interfaz.',
    description:
      'Mi experiencia mezcla implementacion, entrega de cara a stakeholders y capacidad para mantener la interfaz legible incluso cuando el ecosistema que la rodea esta lejos de ser simple.',
    signals: [
      'Desarrollo SharePoint Online',
      'Web parts y extensiones SPFx',
      'Interfaces con React y TypeScript',
      'Integraciones con Microsoft Graph y Azure',
      'Flujos con Power Platform',
      'Comunicacion con cliente y entrega agil'
    ],
    stages: [
      {
        step: '01',
        label: 'UI enterprise',
        title: 'Soluciones SharePoint con peso real de negocio.',
        copy:
          'He trabajado en soluciones de SharePoint Online y SPFx donde las reglas de negocio, la estructura de contenido, la gobernanza y la usabilidad importan a la vez.',
        items: [
          'Web parts personalizados',
          'Application customizers',
          'Ecosistemas Microsoft 365',
          'Documentacion y handoff'
        ]
      },
      {
        step: '02',
        label: 'Craft front-end',
        title: 'Interfaces React que siguen siendo mantenibles al crecer.',
        copy:
          'Mas alla de la capa Microsoft, me centro en UI reutilizable, comportamiento responsive, buen manejo de estado y layouts que se sienten intencionales y no improvisados.',
        items: [
          'React',
          'TypeScript',
          'Sistemas de componentes',
          'Implementacion orientada a interaccion'
        ]
      },
      {
        step: '03',
        label: 'Automatizacion e integracion',
        title: 'Comoda entre flujos, APIs y limites entre ecosistemas.',
        copy:
          'Puedo moverme entre la capa de interfaz y los servicios que la rodean cuando un proyecto necesita pensar en integraciones, automatizacion o una arquitectura mas cloud-aware.',
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
    title: 'Proyectos seleccionados para mostrar amplitud, no una sola via.',
    description:
      'SharePoint sigue siendo una de mis fortalezas mas claras, pero esta seleccion esta ordenada para mostrar rango: entrega enterprise, sensibilidad UI, pensamiento multiplataforma y trabajo de arquitectura en fases tempranas.',
    items: [
      {
        title: 'GameDirectory',
        category: 'SharePoint / SPFx',
        status: 'Proyecto insignia',
        featured: true,
        description:
          'Una experiencia rica en contenido sobre SharePoint que convierte un catalogo de juegos en un directorio curado con filtros, paneles de detalle, gestion de archivos, exportaciones y una extension tipo knowledge assistant integrada en el sitio.',
        stack: ['SPFx', 'React', 'TypeScript', 'Fluent UI', 'PowerShell'],
        role: 'Arquitectura, desarrollo UI, modelado de datos y diseno de experiencia dentro de SharePoint.',
        links: {
          repo: 'https://github.com/ladyArray/GameDirectory',
          demo: null
        },
        accent: ['#8967ff', '#3cb8ff']
      },
      {
        title: 'JigsawApp',
        category: 'UI movil',
        status: 'Proyecto visual',
        description:
          'Una aplicacion de puzles para Android con layouts personalizados, vistas de tablero propias y un tratamiento visual mas expresivo que el de una app utilitaria convencional.',
        stack: ['.NET para Android', 'C#', 'Android XML', 'Custom drawing', 'Material UI'],
        role: 'Estructura de app, flujo de interaccion y estilo visual.',
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
          'Un concepto de reserva de clases fitness desarrollado como TFG de DAM, con horarios, reservas, flujos de usuario y UI multiplataforma en .NET MAUI.',
        stack: ['.NET MAUI', 'C#', 'XAML', 'SQLite', 'UI multiplataforma'],
        role: 'Concepto de producto, UX de reservas e implementacion de la app.',
        links: {
          repo: 'https://github.com/ladyArray/FitBook',
          demo: null
        },
        accent: ['#69a6ff', '#6df3d3']
      },
      {
        title: 'staticWebAppAzure / ReleasePilot',
        category: 'Front-end moderno',
        status: 'Preparado para Azure',
        description:
          'Un dashboard en React + TypeScript pensado para Azure Static Web Apps, con datos tipados, routing, metricas de release y una estructura front-end preparada para despliegue.',
        stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Azure Static Web Apps'],
        role: 'Arquitectura UI, composicion del dashboard y configuracion de despliegue.',
        links: {
          repo: 'https://github.com/ladyArray/staticWebAppAzure',
          demo: null
        },
        accent: ['#5a7dff', '#59d7ff']
      },
      {
        title: 'superswitches',
        category: 'Proyecto full-stack',
        status: 'TFG DAW',
        description:
          'Un TFG de DAW que combina una capa de aplicacion en PHP con un workflow front-end basado en Vite, mostrando una forma de trabajo mas amplia y full-stack.',
        stack: ['PHP', 'JavaScript', 'Vite', 'SCSS', 'Apache'],
        role: 'Implementacion full-stack y estructura de interfaz.',
        links: {
          repo: 'https://github.com/ladyArray/superswitches',
          demo: null
        },
        accent: ['#9a73ff', '#ffc16d']
      },
      {
        title: 'webapp',
        category: 'Base de arquitectura',
        status: 'En construccion',
        description:
          'Un repositorio front-end ligero separado de la capa de servicio, preparado para evolucionar hacia una aplicacion desacoplada sin mezclar UI y backend.',
        stack: ['Client shell', 'Separacion por repos', 'Scaffold', 'Futura capa UI'],
        role: 'Preparacion estructural del repositorio.',
        links: {
          repo: 'https://github.com/ladyArray/webapp',
          demo: null
        },
        accent: ['#5766ff', '#a7b4ff']
      },
      {
        title: 'webapi',
        category: 'Base de servicios',
        status: 'En construccion',
        description:
          'Una base de API pensada para acompanar un split mas limpio de aplicacion, experimentar con integraciones y permitir una evolucion mas orientada a servicios.',
        stack: ['Capa API', 'Arquitectura desacoplada', 'Lista para integracion', 'Hueco backend'],
        role: 'Base estructural de la capa de servicios.',
        links: {
          repo: 'https://github.com/ladyArray/webapi',
          demo: null
        },
        accent: ['#5d74ff', '#87d5ff']
      }
    ]
  },
  values: {
    title: 'Un perfil que conecta estructura tecnica con criterio visual.',
    description:
      'El valor que aporto no es solo escribir codigo. Es poder dar forma a interfaces que resisten restricciones reales y aun asi se sienten pulidas, intencionales y contemporaneas.',
    items: [
      {
        mark: '01',
        title: 'Estructura tecnica con sensibilidad de diseno',
        copy: 'Me importan los sistemas, el naming, la mantenibilidad y la calidad de entrega, pero tambien como aterriza la interfaz a nivel visual y emocional.'
      },
      {
        mark: '02',
        title: 'Realidad enterprise sin perder sensibilidad de producto',
        copy: 'El trabajo en SharePoint me ha dado resistencia frente a contexto de negocio, integraciones y complejidad de stakeholders sin aplastar la ambicion visual.'
      },
      {
        mark: '03',
        title: 'Interfaces modernas con disciplina',
        copy: 'Busco claridad, ritmo y detalle fino de interaccion, no efectos por acumular efectos.'
      },
      {
        mark: '04',
        title: 'Un perfil front-end con rango',
        copy: 'SharePoint es una fortaleza, no una jaula. Puedo moverme entre plataformas enterprise, React moderno y experimentos de interfaz mas visuales.'
      }
    ]
  },
  contact: {
    title: 'Abierta a oportunidades front-end, SPFx y UI-focused.',
    description:
      'Si buscas a alguien que pueda trabajar dentro de restricciones reales de producto y aun asi cuidar mucho la capa de experiencia, me encantara hablar contigo.',
    availability: [
      'Conversaciones con recruiters',
      'Roles front-end',
      'Proyectos SPFx / SharePoint',
      'Entrega centrada en UI'
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
        value: 'Anade aqui tu email profesional',
        href: null
      }
    ]
  }
};
