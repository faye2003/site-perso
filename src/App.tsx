import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Github, Linkedin, Mail, Phone, ExternalLink, Download, ChevronRight, ChevronUp, GithubIcon, GitlabIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { link } from 'fs';

// --- Types ---
interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  link: string;
  link_demo: string;
}

interface Experience {
  role: string;
  company: string;
  project?: string;
  period: string;
  description: string[];
  technologies: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Site officiel Du Restaurant Nooko Beugué à Saly",
    description: "Prospection, Développement complète, Déploiement et livraison du site .",
    technologies: ["React", "Firebase", "HTML5", "Tailwind CSS"],
    features: ["Navigation Fluide", "Contact Facile (CTA)", "Design responsive"],
    image: "/images/banner_resto_nb.png",
    link: "https://github.com/faye2003/",
    link_demo: "https://nooko-beuguee-resto.web.app/"
  },
  {
    title: "Site officiel Salon de beauté BODY-CULT à Saly",
    description: "Prospection, Développement complète, Déploiement et livraison du site .",
    technologies: ["NodeJs", "React", "Firebase", "Tailwind CSS"],
    features: ["Navigation Fluide", "Contact Facile (CTA)", "Design responsive"],
    image: "/images/banner_salon_beauty.png",
    link: "https://github.com/faye2003/site_body_cult",
    link_demo: "https://seen-beauty-scult.web.app/"
  },
  {
    title: "SenTekki – Plateforme de traduction Wolof ↔ Français",
    description: "Plateforme intelligente de traduction intégrant un modèle d’intelligence artificielle.",
    technologies: ["Flutter", "Angular", "Django", "PostgreSQL", "REST API"],
    features: ["Traduction automatique", "Interface utilisateur moderne", "Intégration IA", "Participation collaborative"],
    image: "/images/banner_sentekki.png",
    link: "https://github.com/faye2003/frontend_sentekki",
    link_demo: "https://sentekki.unchk.sn/"
  },
  {
    title: "Application intelligente de gestion de parking",
    description: "Projet de mémoire basé sur la vision par ordinateur pour la détection de véhicules.",
    technologies: ["YOLO", "PostgreSQL", "Python", "Django", "Angular", "React Native", "Google Maps API"],
    features: ["Détection automatique", "Reconnaissance de plaques (OCR)", "Localisation", "Paiement Mobile Money"],
    image: "/images/banner_parking.png",
    link: "https://github.com/faye2003/gestion_parking_front",
    link_demo: ""
  },
  {
    title: "Plateforme éducative moderne pour écoles",
    description: "Développement complète et sécurisation du backoffice institutionnel.",
    technologies: ["Laravel", "HMTL5", "AngularJS", "CSS", "PostgreSQL", "GraphQL"],
    features: ["Sécurité renforcée", "Architecture robuste", "Design responsive"],
    image: "/images/banner_school.png",
    link: "https://github.com/faye2003/memoire_Licence3_back",
    link_demo: ""
  },
  // {
  //   title: "Site officiel de la mairie de Ziguinchor",
  //   description: "Refonte complète et sécurisation du site institutionnel.",
  //   technologies: ["Laravel", "Bootstrap", "JavaScript", "CSS"],
  //   features: ["Sécurité renforcée", "Architecture robuste", "Design responsive"],
  //   image: "/images/banner_school.png"
  // },
  {
    title: "Plateforme de gestion des dons de sang",
    description: "Projet collaboratif pour optimiser la gestion des stocks et des donneurs.",
    technologies: ["Flutter", "Laravel", "Angular", "MySQL", "REST API"],
    features: ["Gestion des donneurs, Banques, Demandes, Campagnes, etc", "Suivi des stocks", "Transfert Poches"],
    image: "/images/banner_dondesang.png",
    link: "https://github.com/sendevhub/Frontend-don-de-sang",
    link_demo: ""
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "Développeur Web & Mobile",
    company: "UNCHK",
    project: "SenTekki",
    period: "Présent",
    description: [
      "Développement frontend Angular",
      "Développement mobile Flutter",
      "Backend Django",
      "Intégration du moteur IA"
    ],
    technologies: ["Angular", "Flutter", "Django", "AI"]
  },
  {
    role: "Développeur Web",
    company: "Niane Technologies",
    project: "Mairie de Ziguinchor",
    period: "Passé",
    description: [
      "Refonte complète du site",
      "Architecture sécurisée avec Laravel",
      "Collaboration à distance avec l’équipe"
    ],
    technologies: ["Laravel", "Bootstrap", "JavaScript"]
  },
  {
    role: "Développeur Full Stack",
    company: "Guindy Technology",
    period: "Passé",
    description: [
      "Développement web full stack",
      "API REST / GraphQL",
      "Déploiement sur serveur Linux"
    ],
    technologies: ["Laravel", "AngularJS", "PostgreSQL", "Nginx"]
  }
];

const SKILLS = {
  Frontend: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "TailwindCSS", "SCSS"],
  Backend: ["Laravel", "Django", "Node.js", "REST API", "GraphQL"],
  Mobile: ["Flutter", "React Native", "Ionic"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"],
  Tools: ["Git / GitHub", "Linux", "Nginx", "Docker", "Postman", "UML"]
};

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Expérience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo-rm2.png"
            alt="Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          {/* <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">M</div> */}
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Mamadou Faye</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 dark:text-slate-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <div className="flex flex-col space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 dark:text-slate-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              Disponible pour de nouveaux projets
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Mamadou Faye
            </h1>
            <p className="mt-4 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Full Stack Developer | Web & Mobile | IA & Innovation
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Créateur de solutions web & mobiles innovantes. Passionné par l’IA, l’UX et la performance.
              Je suis titulaire d'un Master en Informatique, Conception et Développement d'Application Fullstack Web et Mobile à l’Université Numérique Cheikh Hamidou Kane (UNCHK).
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#projects"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Voir mes projets
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                <Download size={18} /> Télécharger mon CV
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold leading-6 text-slate-900 dark:text-white"
              >
                Me contacter <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-white shadow-2xl dark:border-slate-800 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <img
                src="/images/faye_dev_square.png"
                alt="Mamadou Faye"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/mamadou/800/800";
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-indigo-600/10 backdrop-blur-xl border border-indigo-600/20 flex items-center justify-center text-indigo-600">
              <div className="text-center">
                <div className="text-2xl font-bold">1+</div>
                <div className="text-[10px] uppercase tracking-wider font-bold">Ans d'exp</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              À propos de moi
            </h2>
            <div className="mt-6 space-y-6 text-lg text-slate-600 dark:text-slate-400">
              <p>
                Je suis <span className="font-semibold text-indigo-600 dark:text-indigo-400">Mamadou Faye</span>, développeur Full Stack passionné par l’innovation technologique et les solutions numériques à impact.
              </p>
              <p>
                Je conçois et développe des applications web, mobiles et intelligentes en utilisant des technologies modernes. Mon objectif est de créer des plateformes performantes, sécurisées et utiles, capables de répondre aux besoins des entreprises et des institutions.
              </p>
              <p>
                Je m’intéresse particulièrement à :
              </p>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  "L’intelligence artificielle",
                  "Technologies web modernes",
                  "Applications mobiles",
                  "Solutions numériques pour l’Afrique"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-indigo-600 p-8 text-white flex flex-col justify-end">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-80">Projets Terminés</div>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img src="/images/desk.jpeg" className="w-full h-full object-cover" alt="Coding" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img src="/images/faye.jpg" className="w-full h-full object-cover" alt="Coding" />
              </div>
              <div className="aspect-square rounded-2xl bg-slate-800 dark:bg-indigo-900 p-8 text-white flex flex-col justify-end">
                <div className="text-xl font-bold">Innovation</div>
                <div className="text-sm opacity-80">IA & Web3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Compétences Techniques
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Un aperçu des technologies que j'utilise pour donner vie à vos idées.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Mes Projets
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Quelques-unes de mes réalisations récentes.
            </p>
          </div>
          <a href="https://github.com/faye2003" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline">
            Voir tout sur GitHub <ChevronRight size={20} />
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Fonctionnalités clés :</h4>
                  <ul className="mt-2 space-y-1">
                    {project.features.map(f => (
                      <li key={f} className="text-sm text-slate-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-indigo-600 rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href={project.link_demo}
                    target='_blank'
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Github size={18} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Expérience Professionnelle
          </h2>
        </div>

        <div className="mt-16 space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-start md:justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                    <ChevronRight size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  {exp.description.map((item, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {exp.period}
                </span>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500 dark:border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Travaillons ensemble
            </h2>
            <p className="mt-6 text-lg text-indigo-100">
              Je suis ouvert aux opportunités professionnelles, aux collaborations et aux projets innovants. N'hésitez pas à me contacter !
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Email</p>
                  <p className="text-lg font-semibold">fayem7409@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Téléphone</p>
                  <p className="text-lg font-semibold">+221 77 836 36 22</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">LinkedIn</p>
                  <p className="text-lg font-semibold"><a href="https://linkedin.com/in/mamadou-faye-dev" target="_blank" rel="noopener noreferrer">linkedin.com/in/mamadou-faye-dev</a></p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <GithubIcon size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">GitHub</p>
                  <p className="text-lg font-semibold"><a href="https://github.com/faye2003" target="_blank" rel="noopener noreferrer">github.com/faye2003</a></p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <GitlabIcon size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">GitLab</p>
                  <p className="text-lg font-semibold"><a href="https://gitlab.com/Mamadou-Faye" target="_blank" rel="noopener noreferrer">gitlab.com/Mamadou-Faye</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Nom</label>
                  <input type="text" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</label>
                  <input type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none" placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Sujet</label>
                <input type="text" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none" placeholder="Objet de votre message" />
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Message</label>
                <textarea rows={4} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-600 focus:outline-none" placeholder="Comment puis-je vous aider ?"></textarea>
              </div>
              <button className="w-full rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 transition-colors">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Mamadou Faye</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Mamadou Faye. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/faye2003" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/mamadou-faye-dev" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin size={20} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BLOG_POSTS = [
  {
    title: "Comment fonctionne YOLO pour la détection d’objets",
    excerpt: "Plongez dans les coulisses de l'algorithme de vision par ordinateur le plus rapide au monde.",
    date: "15 Mars 2024",
    category: "IA & Vision"
  },
  {
    title: "Comment créer une API REST avec Django",
    excerpt: "Un guide complet pour construire des backends robustes et scalables avec Python.",
    date: "10 Mars 2024",
    category: "Backend"
  },
  {
    title: "Angular vs React : Lequel choisir en 2024 ?",
    excerpt: "Analyse comparative des deux frameworks les plus populaires du marché.",
    date: "05 Mars 2024",
    category: "Frontend"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Blog Technique
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Partage de connaissances et réflexions sur les technologies modernes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{post.category}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-500">
                  Lire l'article <ChevronRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-indigo-700 focus:outline-none"
          aria-label="Retour en haut"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Expérience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-600 dark:selection:bg-indigo-900/30">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
