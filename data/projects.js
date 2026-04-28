// Each project becomes a card on the home page.
// theme: "one" or "two" controls the gradient. Add new themes in styles.css if needed.
window.PROJECTS = [
  {
    name: "AnimeList",
    user: "xhinzz",
    repo: "animelist",
    url: "https://github.com/xhinzz/animelist",
    theme: "one",
    files: ["app.py", "templates/", "static/", "requirements.txt"],
    paragraphs: [
      "A Flask app for browsing anime and manga using the Jikan API.",
      "It has login, profile photos, watched anime lists, filters, sorting and dark mode.",
      "I built it to practice backend work with SQLite/SQLAlchemy and simple Jinja templates."
    ],
    cta: "Open GitHub"
  },
  {
    name: "PentestTool",
    user: "xhinzz",
    repo: "PentestTool",
    url: "https://github.com/xhinzz/PentestTool",
    theme: "two",
    files: ["security_scanner.rb", "README.md", "scan_results.txt"],
    paragraphs: [
      "A Ruby script for security testing in my own environments or authorized labs.",
      "It checks connectivity, scans common ports, looks for endpoints and runs simple SQL injection tests.",
      "The idea was to keep a few basic checks in one terminal tool with logs and a report."
    ],
    cta: "View repository"
  }
];
