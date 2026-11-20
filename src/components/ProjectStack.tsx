import axios from '../assets/tech/axios.svg';
import dart from '../assets/tech/dart.svg';
import django from '../assets/tech/django.svg';
import express from '../assets/tech/express.svg';
import figma from '../assets/tech/figma.svg';
import flutter from '../assets/tech/flutter.svg';
import flutterLocalNotifications from '../assets/tech/flutter-local-notifications.svg';
import goRouter from '../assets/tech/go-router.svg';
import motion from '../assets/tech/motion.svg';
import mysql from '../assets/tech/mysql.svg';
import node from '../assets/tech/nodejs.svg';
import python from '../assets/tech/python.svg';
import react from '../assets/tech/react.svg';
import reactRouter from '../assets/tech/reactrouter.svg';
import riverpod from '../assets/tech/riverpod.svg';
import sequelize from '../assets/tech/sequelize.svg';
import sharedPreferences from '../assets/tech/shared-preferences.svg';
import sqlite from '../assets/tech/sqlite.svg';
import tailwind from '../assets/tech/tailwindcss.svg';
import typescript from '../assets/tech/typescript.svg';
import vite from '../assets/tech/vitejs.svg';

const logos: Readonly<Partial<Record<string, string>>> = {
  Axios: axios,
  Dart: dart,
  Django: django,
  Express: express,
  Figma: figma,
  Flutter: flutter,
  'Flutter Local Notifications': flutterLocalNotifications,
  'Framer Motion': motion,
  GoRouter: goRouter,
  MySQL: mysql,
  'Node.js': node,
  Python: python,
  React: react,
  'React Router': reactRouter,
  Riverpod: riverpod,
  Sequelize: sequelize,
  'Shared Preferences': sharedPreferences,
  SQLite: sqlite,
  'Tailwind CSS': tailwind,
  TypeScript: typescript,
  Vite: vite,
};

export function TechnologyChips({ tools }: { tools: string[] }) {
  return (
    <ul className="project-stack-tools" role="list">
      {tools.map((tool) => {
        const logo = logos[tool];

        return (
          <li key={tool} data-technology={tool}>
            {logo && <img src={logo} alt="" width={30} height={30} />}
            <span>{tool}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectStack({ stack }: { stack?: { frontend: string[]; backend?: string[] } }) {
  const tools = stack ? [...stack.frontend, ...(stack.backend ?? [])] : [];

  return (
    <section className="project-stack" aria-labelledby="project-stack">
      <h2 className="sr-only" id="project-stack">Tech stack</h2>
      {tools.length ? (
        <TechnologyChips tools={tools} />
      ) : (
        <p>Technologies to be added.</p>
      )}
    </section>
  );
}
