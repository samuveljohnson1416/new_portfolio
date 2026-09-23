// Hand-written case studies for the strongest projects. Facts come from each repo's README;
// keep them in sync when a project changes.

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  context: string;
  problem: string;
  approach: { title: string; detail: string }[];
  challenge?: { title: string; detail: string };
  result?: string;
  stack: string[];
  github: string;
  live?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'health-diagnostics-ai',
    title: 'Health Diagnostics AI Agent',
    summary:
      'Reads a blood test report (PDF, photo or data file), checks every value against reference ranges and explains the results in plain language.',
    context: 'Infosys Springboard virtual internship, Dec 2025 – Feb 2026',
    problem:
      'Blood reports are dense tables of numbers and abbreviations, and they arrive as digital PDFs, scans or phone photos. Most people cannot tell which values matter or how worried to be.',
    approach: [
      {
        title: 'Numbers come from code, not the model',
        detail:
          'Status and severity are computed by pure functions in a domain layer. The Diagnosis agent calls read-only tools, so it can interpret the values but never change them.',
      },
      {
        title: 'Specialist agents in parallel',
        detail:
          'An Extraction agent runs first, then Diagnosis, Risk and Nutrition agents run in parallel and a Coordinator merges them. The Diagnosis agent runs a tool-calling loop capped at 6 rounds.',
      },
      {
        title: 'Layered OCR',
        detail:
          'Digital files use direct text extraction. Scans go through a Groq vision model, then NVIDIA Nemotron OCR, then local Tesseract with OpenCV preprocessing. Values read by the vision model are flagged so the user checks them against the original.',
      },
      {
        title: 'Works with no AI provider',
        detail:
          'Every agent has a deterministic, rule-based fallback, and LLMs sit behind a small provider interface so another model can be added without touching the agents.',
      },
    ],
    challenge: {
      title: 'Trusting OCR output',
      detail:
        'OCR misreads digits, and a wrong reference range turns a normal value into an alarming one. The parser applies sanity bounds to 30+ parameters, uses the range printed on the report first (it is what the lab used), falls back to built-in age- and sex-adjusted ranges, and ignores a printed range that looks like OCR noise.',
    },
    result:
      'Deployed on Render with Docker. Domain logic, agents and the tool-calling loop are covered by pytest suites that run with a scripted model and no network.',
    stack: ['Python', 'FastAPI', 'Pydantic v2', 'Streamlit', 'Groq LLMs', 'Tesseract', 'OpenCV', 'Supabase', 'Docker'],
    github: 'https://github.com/samuveljohnson1416/Multi-Model-Ai-Agent-For-Automated-Health-Diagnostics',
    live: 'https://multi-model-ai-agent-for-automated-04y7.onrender.com',
  },
  {
    slug: 'last-look',
    title: 'Last Look',
    summary:
      'An agentic command center that turns a failed film-delivery QC check into a costed decision a human approves.',
    context: 'Agentic Cinema hackathon, Grafana track',
    problem:
      'When a film’s Digital Cinema Package fails technical QC before a festival deadline, errors like “audio channel mismatch, subtitle drift” mean little to the people who must decide what to do and what it will cost.',
    approach: [
      {
        title: 'Money math lives in code',
        detail:
          'A deterministic, tested impact model computes the cost at risk and the ROI of each fix. Gemini narrates the result but never invents numbers.',
      },
      {
        title: 'The agent reads real telemetry',
        detail:
          'A Google ADK agent queries Prometheus metrics and Loki logs through the official Grafana MCP server at runtime, then proposes three ROI-ranked interventions.',
      },
      {
        title: 'Human in the loop',
        detail:
          'The investigation chain has no write tools. The Executor acts only on explicit approval and records an auditable Grafana annotation; an empty authorization returns 400 and nothing happens.',
      },
    ],
    challenge: {
      title: 'Working within 20 requests a day',
      detail:
        'The free Gemini tier allows 20 requests per model per day. The design has four agents (Watcher, Analyst, Advisor, Executor), but for live runs the three read-only ones are collapsed into a single investigator that needs about 4 Gemini calls instead of about 10, and its findings are cached.',
    },
    result:
      'Live demo on Vercel. It turns QC errors into statements like “$16,000 at risk, 15:1 ROI on a rush re-export”.',
    stack: ['Python', 'FastAPI', 'Google ADK', 'Gemini', 'Grafana Cloud', 'Prometheus', 'Loki', 'MCP', 'OpenTelemetry', 'Next.js'],
    github: 'https://github.com/samuveljohnson1416/Last-Look',
    live: 'https://last-look.vercel.app',
  },
  {
    slug: 'smart-expense-tracker',
    title: 'Smart Expense Tracker',
    summary: 'A MERN expense tracker where you log spending by typing “tea 25” instead of filling in a form.',
    context: 'Full Stack Web Development course mini project',
    problem:
      'Logging every small purchase through a form with amount, category and date is tedious, so people stop tracking.',
    approach: [
      {
        title: 'Natural-language input',
        detail:
          'Typing “uber to office 120” records ₹120 under Transportation. A keyword parser assigns one of 10 categories automatically.',
      },
      {
        title: 'Multi-user authentication',
        detail:
          'JWT tokens with a 7-day expiry, bcrypt password hashing and middleware-protected API routes.',
      },
      {
        title: 'Spending at a glance',
        detail:
          'Daily and monthly totals, a category pie chart and a 7-day bar chart built with Recharts, plus search, filter, edit and delete.',
      },
    ],
    stack: ['React 19', 'TypeScript', 'Express 5', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/samuveljohnson1416/mini_project__FSWD',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
