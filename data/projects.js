// Cada projeto vira um card na home.
// theme: "one" ou "two" (controla o gradiente). Adicione novos temas em styles.css se quiser.
window.PROJECTS = [
  {
    name: "AnimeList",
    user: "xhinzz",
    repo: "animelist",
    url: "https://github.com/xhinzz/animelist",
    theme: "one",
    files: ["README.md", "src/", "public/", "package.json"],
    paragraphs: [
      "Aplicacao voltada para organizacao e consulta de listas de anime em uma interface direta.",
      "Projeto ideal para destacar estrutura frontend, navegacao e apresentacao de dados.",
      "Repositorio publico para mostrar evolucao tecnica e refinamento visual."
    ],
    cta: "Abrir GitHub"
  },
  {
    name: "PentestTool",
    user: "xhinzz",
    repo: "PentestTool",
    url: "https://github.com/xhinzz/PentestTool",
    theme: "two",
    files: ["scanner/", "utils/", "reports/", "requirements.txt"],
    paragraphs: [
      "Ferramenta voltada para fluxos de pentest, reunindo utilidade tecnica em uma apresentacao limpa.",
      "Boa vitrine para mostrar codigo mais funcional, orientado a seguranca e automacao.",
      "Projeto forte para equilibrar portfolio visual com repertorio tecnico."
    ],
    cta: "Ver repositorio"
  }
];
