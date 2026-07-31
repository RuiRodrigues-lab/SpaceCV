/* ============================================================
   Rui Rodrigues — 3D CV data (PT / EN / ES)
   ============================================================ */
const CV = {
  ui: {
    pt: {
      subtitle: "Developer & DevOps",
      about:
        "Developer e DevOps, explorando Data & AI, licenciado em Gestão da Distribuição e Logística e com um mestrado em Ciência de Dados para Empresas. Em 2019 mudei de carreira para a tecnologia — esta é a viagem.",
      scrollHint: "Deslize para viajar pela linha do tempo",
      keysHint: "Roda do rato · setas · toque",
      current: "Actual",
      technologies: "Tecnologias",
      contactText:
        "Obrigado por viajar até aqui. Se procura alguém com esta experiência, entre em contacto.",
      linkedin: "Ver LinkedIn",
      restart: "Recomeçar a viagem",
      webglError:
        "O seu navegador não suporta WebGL — aqui fica a versão clássica do CV.",
    },
    en: {
      subtitle: "Developer & DevOps",
      about:
        "Developer & DevOps, exploring Data & AI, with a BSc in Distribution & Logistics Management and a Master's degree in Data Science for Business. In 2019 I switched careers into tech — this is the journey.",
      scrollHint: "Scroll to travel along the timeline",
      keysHint: "Mouse wheel · arrow keys · touch",
      current: "Current",
      technologies: "Technologies",
      contactText:
        "Thanks for travelling this far. If you are looking for someone with this experience, get in touch.",
      linkedin: "View LinkedIn",
      restart: "Restart the journey",
      webglError:
        "Your browser does not support WebGL — here is the classic version of the CV.",
    },
    es: {
      subtitle: "Developer & DevOps",
      about:
        "Developer y DevOps, explorando Data & AI, graduado en Gestión de la Distribución y Logística y con un máster en Ciencia de Datos para Empresas. En 2019 cambié de carrera hacia la tecnología — este es el viaje.",
      scrollHint: "Desplázate para viajar por la línea de tiempo",
      keysHint: "Rueda del ratón · flechas · táctil",
      current: "Actual",
      technologies: "Tecnologías",
      contactText:
        "Gracias por viajar hasta aquí. Si buscas a alguien con esta experiencia, ponte en contacto.",
      linkedin: "Ver LinkedIn",
      restart: "Reiniciar el viaje",
      webglError:
        "Tu navegador no soporta WebGL — aquí tienes la versión clásica del CV.",
    },
  },

  contact: {
    name: "Rui Rodrigues",
    phone: "+351 916 505 505",
    phoneHref: "tel:+351916505505",
    email: "rui.ped.rodrigues@gmail.com",
    emailHref: "mailto:rui.ped.rodrigues@gmail.com",
    linkedin: "https://www.linkedin.com/in/ruiirodrigues/",
  },

  /* era colors used by the 3D scene */
  eras: {
    pre: 0xffb54d, /* industry years  — amber  */
    switch: 0xc77dff, /* career switch  — violet */
    dev: 0x4dd2ff, /* software career — cyan   */
    knowledge: 0x8effc1, /* skills & certs — mint   */
    contact: 0xff7ab8, /* finale          — pink  */
  },

  stops: [
    {
      id: "factory",
      era: "pre",
      year: "2010–2013",
      label: "Sapec Agro",
      title: { pt: "Operário Fabril", en: "Factory Operator", es: "Operario Fabril" },
      company: "Sapec Agro",
      period: { pt: "2010 – 2013", en: "2010 – 2013", es: "2010 – 2013" },
      bullets: {
        pt: ["Início do percurso profissional na indústria química."],
        en: ["Where the professional journey began — in the chemical industry."],
        es: ["Inicio de la trayectoria profesional en la industria química."],
      },
    },
    {
      id: "logistics",
      era: "pre",
      year: "2016–2019",
      label: "Logística",
      labelEn: "Logistics",
      labelEs: "Logística",
      title: {
        pt: "Técnico de Logística",
        en: "Logistics Technician",
        es: "Técnico de Logística",
      },
      company: "Sapec Agro / Visteon / Autoeuropa",
      period: { pt: "2016 – 2019", en: "2016 – 2019", es: "2016 – 2019" },
      bullets: {
        pt: ["Operações de logística nas indústrias química e automóvel."],
        en: ["Logistics operations across the chemical and automotive industries."],
        es: ["Operaciones de logística en las industrias química y automovilística."],
      },
    },
    {
      id: "teleperformance",
      era: "switch",
      year: "2019–2020",
      label: "Teleperformance",
      badge: {
        pt: "Mudança para a tecnologia",
        en: "Career switch into tech",
        es: "Cambio hacia la tecnología",
      },
      title: {
        pt: "Técnico de Suporte Microsoft Office 365",
        en: "Microsoft Office 365 Support Technician",
        es: "Técnico de Soporte Microsoft Office 365",
      },
      company: "Teleperformance Portugal",
      period: {
        pt: "Out 2019 – Jan 2020",
        en: "Oct 2019 – Jan 2020",
        es: "Oct 2019 – Ene 2020",
      },
      bullets: {
        pt: ["Suporte técnico a utilizadores e organizações Microsoft Office 365."],
        en: ["Technical support for Microsoft Office 365 users and organisations."],
        es: ["Soporte técnico a usuarios y organizaciones de Microsoft Office 365."],
      },
      tech: ["Office 365"],
    },
    {
      id: "upskill",
      era: "switch",
      year: "2020–2021",
      label: "Upskill",
      badge: { pt: "Requalificação", en: "Retraining", es: "Recualificación" },
      title: { pt: ".NET — Upskill", en: ".NET — Upskill", es: ".NET — Upskill" },
      company: "Upskill + UPS/ESCE",
      period: {
        pt: "Set 2020 – Ago 2021",
        en: "Sep 2020 – Aug 2021",
        es: "Sep 2020 – Ago 2021",
      },
      bullets: {
        pt: ["Programa intensivo de requalificação em desenvolvimento .NET."],
        en: ["Intensive retraining programme in .NET software development."],
        es: ["Programa intensivo de recualificación en desarrollo .NET."],
      },
      tech: [".NET", "C#", "SQL"],
    },
    {
      id: "bnp",
      era: "dev",
      year: "2021–2022",
      label: "BNP Paribas",
      title: {
        pt: "Cash Management Technical Officer",
        en: "Cash Management Technical Officer",
        es: "Cash Management Technical Officer",
      },
      company: "BNP Paribas",
      period: {
        pt: "Set 2021 – Mar 2022",
        en: "Sep 2021 – Mar 2022",
        es: "Sep 2021 – Mar 2022",
      },
      bullets: {
        pt: ["Funções técnicas na área de Cash Management no sector bancário."],
        en: ["Technical role in Cash Management within the banking sector."],
        es: ["Funciones técnicas en el área de Cash Management en el sector bancario."],
      },
    },
    {
      id: "orbcom",
      era: "dev",
      year: "2022",
      label: "Orbcom",
      title: {
        pt: "Analyst / Software Engineer",
        en: "Analyst / Software Engineer",
        es: "Analyst / Software Engineer",
      },
      company: "Orbcom",
      period: {
        pt: "Abr 2022 – Set 2022",
        en: "Apr 2022 – Sep 2022",
        es: "Abr 2022 – Sep 2022",
      },
      bullets: {
        pt: [
          "Desenvolvimento de novas funcionalidades e manutenção correctiva em aplicações Reactive e Mobile, num projecto na área da logística e indústria automóvel.",
        ],
        en: [
          "Built new features and performed corrective maintenance on Reactive and Mobile applications on a project in logistics and the automotive industry.",
        ],
        es: [
          "Desarrollo de nuevas funcionalidades y mantenimiento correctivo en aplicaciones Reactive y Mobile, en un proyecto del área de logística e industria automovilística.",
        ],
      },
      tech: ["OutSystems (O11)", "HTML", "CSS", "JavaScript", "SQL", "Postman"],
    },
    {
      id: "smart",
      era: "dev",
      year: "2022–2023",
      label: "Smart Consulting",
      title: {
        pt: "Analyst / Software Engineer",
        en: "Analyst / Software Engineer",
        es: "Analyst / Software Engineer",
      },
      company: "Smart Consulting",
      period: {
        pt: "Set 2022 – Fev 2023",
        en: "Sep 2022 – Feb 2023",
        es: "Sep 2022 – Feb 2023",
      },
      bullets: {
        pt: [
          "Actualização e modificação de funcionalidades em aplicações, incluindo integração de novos endpoints REST e SOAP, num projecto na área do gás e da energia.",
        ],
        en: [
          "Updated and extended application features, including integration of new REST and SOAP endpoints, on a project in the gas & energy sector.",
        ],
        es: [
          "Actualización y modificación de funcionalidades en aplicaciones, incluida la integración de nuevos endpoints REST y SOAP, en un proyecto del sector del gas y la energía.",
        ],
      },
      tech: ["OutSystems (O11)", "HTML", "CSS", "JavaScript", "SQL", "Postman"],
    },
    {
      id: "capgemini",
      era: "dev",
      year: "2023–2024",
      label: "Capgemini",
      title: {
        pt: "Analyst / Software Engineer",
        en: "Analyst / Software Engineer",
        es: "Analyst / Software Engineer",
      },
      company: "Capgemini Portugal",
      period: {
        pt: "Mar 2023 – Jul 2024",
        en: "Mar 2023 – Jul 2024",
        es: "Mar 2023 – Jul 2024",
      },
      bullets: {
        pt: [
          "Projectos internos centrados na digitalização de processos.",
          "Plataforma global de logística no sector da saúde.",
          "Desenvolvimento de bibliotecas locais para uso em OutSystems.",
          "Desenvolvimento de serviços de IA-LLM (Modelos de Linguagem de Grande Escala).",
          "Algoritmo do Caminho Mais Curto de Dijkstra para alocação optimizada de recursos humanos a projectos.",
          "Manutenção de aplicações OutSystems.",
          "Ciclo de vida do desenvolvimento de software com foco em monitorização (Kibana e Excel).",
        ],
        en: [
          "Internal projects focused on process digitalisation.",
          "Global logistics platform in the healthcare sector.",
          "Development of local libraries for use in OutSystems.",
          "Development of AI-LLM services (Large Language Models).",
          "Dijkstra's shortest-path algorithm for optimised allocation of people to projects.",
          "Maintenance of OutSystems applications.",
          "Software development life cycle with a focus on monitoring (Kibana and Excel).",
        ],
        es: [
          "Proyectos internos centrados en la digitalización de procesos.",
          "Plataforma global de logística en el sector sanitario.",
          "Desarrollo de librerías locales para uso en OutSystems.",
          "Desarrollo de servicios de IA-LLM (Modelos de Lenguaje a Gran Escala).",
          "Algoritmo del Camino Más Corto de Dijkstra para la asignación optimizada de personas a proyectos.",
          "Mantenimiento de aplicaciones OutSystems.",
          "Ciclo de vida del desarrollo de software con foco en la monitorización (Kibana y Excel).",
        ],
      },
      tech: [
        "OutSystems (O11)",
        "ODC",
        "HTML",
        "CSS",
        "JavaScript",
        "SQL",
        "Postman",
        "C#",
        "Jira",
        "Figma",
        "Python",
      ],
    },
    {
      id: "goodyear",
      era: "dev",
      year: "2024–…",
      label: "Goodyear",
      current: true,
      title: {
        pt: "Analyst / Software Engineer",
        en: "Analyst / Software Engineer",
        es: "Analyst / Software Engineer",
      },
      company: "The Goodyear Tire & Rubber Company",
      period: {
        pt: "Jul 2024 – Presente",
        en: "Jul 2024 – Present",
        es: "Jul 2024 – Presente",
      },
      bullets: {
        pt: [
          "Projectos centrados na digitalização de processos.",
          "Manutenção e refactorização de aplicações críticas.",
          "Manutenção de aplicações OutSystems.",
          "Ciclo de Vida do Desenvolvimento de Software (SDLC).",
          "Agentes de IA.",
          "DevOps.",
        ],
        en: [
          "Projects focused on process digitalisation.",
          "Maintenance and refactoring of critical applications.",
          "Maintenance of OutSystems applications.",
          "Software Development Life Cycle (SDLC).",
          "AI agents.",
          "DevOps.",
        ],
        es: [
          "Proyectos centrados en la digitalización de procesos.",
          "Mantenimiento y refactorización de aplicaciones críticas.",
          "Mantenimiento de aplicaciones OutSystems.",
          "Ciclo de Vida del Desarrollo de Software (SDLC).",
          "Agentes de IA.",
          "DevOps.",
        ],
      },
      tech: [
        "OutSystems (O11)",
        "ODC",
        "LifeTime",
        "HTML",
        "CSS",
        "JavaScript",
        "SQL",
        "Postman",
        "Jira",
        "AI"
      ],
    },
    {
      id: "education",
      era: "knowledge",
      year: "UPS/ESCE",
      label: "Educação",
      labelEn: "Education",
      labelEs: "Educación",
      title: { pt: "Educação", en: "Education", es: "Educación" },
      company: "UPS / ESCE",
      period: { pt: "", en: "", es: "" },
      bullets: {
        pt: [
          "Licenciatura em Gestão da Distribuição e Logística — UPS/ESCE.",
          "Mestrado em Ciência de Dados para Empresas — UPS/ESCE.",
          ".NET Developer — UPS/ESCE + Upskill.",
        ],
        en: [
          "BSc in Distribution & Logistics Management — UPS/ESCE.",
          "Master's degree in Data Science for Business — UPS/ESCE.",
          ".NET Developer — UPS/ESCE + Upskill.",
        ],
        es: [
          "Grado en Gestión de la Distribución y Logística — UPS/ESCE.",
          "Máster en Ciencia de Datos para Empresas — UPS/ESCE.",
          ".NET Developer — UPS/ESCE + Upskill.",
        ],
      },
    },
    {
      id: "certifications",
      era: "knowledge",
      year: "OutSystems x13",
      label: "Certificações",
      labelEn: "Certifications",
      labelEs: "Certificaciones",
      title: { pt: "Certificações", en: "Certifications", es: "Certificaciones" },
      company: "OutSystems · Mendix · Google · Power BI",
      period: { pt: "", en: "", es: "" },
      groups: [
        {
          h: { pt: "OutSystems", en: "OutSystems", es: "OutSystems" },
          items: [
            "Associate Reactive Developer (O11)",
            "Associate Traditional Web Developer (O11)",
            "Associate Developer (ODC)",
            "Mobile Developer Specialist (O11 & ODC)",
            "Architecture Specialist (O11)",
            "Professional Platform Ops Engineer (O11)",
            "Security Specialist (O11)",
            "Web Developer Specialist (O11)",
            "Web Developer Specialist (ODC)",
            "Professional Web Developer (O11)",
            "Professional Mobile Developer (O11)",
            "OutSystems Sales Associate",
            "Agentic AI Specialist (ODC)",
          ],
        },
        {
          h: { pt: "Outras", en: "Other", es: "Otras" },
          items: [
            "Mendix Rapid Developer",
            "Academia de Desenvolvimento de Software — FullStack",
            "EF Level 16 — Upper Advanced (CEFR C2)",
            "Power BI — Advanced",
            "Google UX Design Professional Certificate",
            "Global Industry L2 — Tech & Digital (Software)",
            "Microsoft Certified: Azure Fundamentals",
            "Microsoft Certified: Azure AI Fundamentals",
          ],
        },
      ],
    },
    {
      id: "skills",
      era: "knowledge",
      year: "Stack",
      label: "Competências",
      labelEn: "Skills",
      labelEs: "Competencias",
      title: {
        pt: "Competências e Especializações",
        en: "Skills & Specialisations",
        es: "Competencias y Especializaciones",
      },
      company: "",
      period: { pt: "", en: "", es: "" },
      groups: [
        {
          h: { pt: "Arquitectura", en: "Architecture", es: "Arquitectura" },
          items: ["Best Practices", "Microservices", "Event-Driven", "Monoliths"],
        },
        {
          h: { pt: "Plataformas", en: "Platforms", es: "Plataformas" },
          items: [".NET", "OutSystems (O11)", "ODC", "Office 365"],
        },
        {
          h: { pt: "Componentes", en: "Components", es: "Componentes" },
          items: [
            "ASP.NET (WebAPI + Core + Entity Framework)",
            "Python (FastAPI + NumPy + LangChain)",
            "Power BI",
            "Figma",
            "Postman",
            "Claude Code",
          ],
        },
        {
          h: { pt: "Cloud & Dados", en: "Cloud & Data", es: "Cloud y Datos" },
          items: ["Microsoft Azure", "AWS", "SQL Server"],
        },
        {
          h: {
            pt: "Linguagens de programação",
            en: "Programming languages",
            es: "Lenguajes de programación",
          },
          items: ["C#", "Python", "HTML5/CSS", "JavaScript (ES6)", "SQL"],
        },
        {
          h: {
            pt: "Conhecimento aprofundado",
            en: "Deep knowledge",
            es: "Conocimiento profundo",
          },
          items: {
            pt: [
              "Web Development",
              "Supply Chain Management",
              "Software Development",
              "Googling",
              "Scrum",
              "DevOps",
              "Inteligência Artificial",
            ],
            en: [
              "Web Development",
              "Supply Chain Management",
              "Software Development",
              "Googling",
              "Scrum",
              "DevOps",
              "Artificial Intelligence",
            ],
            es: [
              "Web Development",
              "Supply Chain Management",
              "Software Development",
              "Googling",
              "Scrum",
              "DevOps",
              "Inteligencia Artificial",
            ],
          },
        },
        {
          h: {
            pt: "Competências organizacionais",
            en: "Soft skills",
            es: "Competencias organizativas",
          },
          items: {
            pt: [
              "Pensamento crítico",
              "Flexibilidade",
              "Aprendizagem ao longo da vida",
              "Competências interpessoais",
            ],
            en: [
              "Critical thinking",
              "Flexibility",
              "Lifelong learning",
              "Interpersonal skills",
            ],
            es: [
              "Pensamiento crítico",
              "Flexibilidad",
              "Aprendizaje a lo largo de la vida",
              "Competencias interpersonales",
            ],
          },
        },
      ],
    },
    {
      id: "languages",
      era: "knowledge",
      year: "PT · EN · ES",
      label: "Línguas",
      labelEn: "Languages",
      labelEs: "Idiomas",
      title: { pt: "Línguas", en: "Languages", es: "Idiomas" },
      company: "",
      period: { pt: "", en: "", es: "" },
      bullets: {
        pt: ["Português — Nativo", "Inglês — Fluente (C2)", "Espanhol — Bom (B1/B2)"],
        en: ["Portuguese — Native", "English — Fluent (C2)", "Spanish — Good (B1/B2)"],
        es: ["Portugués — Nativo", "Inglés — Fluido (C2)", "Español — Bueno (B1/B2)"],
      },
    },
    {
      id: "contact",
      era: "contact",
      year: "☕",
      label: "Contacto",
      labelEn: "Contact",
      labelEs: "Contacto",
      isContact: true,
      title: { pt: "Vamos falar?", en: "Let's talk?", es: "¿Hablamos?" },
      company: "",
      period: { pt: "", en: "", es: "" },
    },
  ],
};
