// Generated from slides/sessions.json in github.com/JohannesRabauer/talk-ai-learnings.
// Every live-coding session the talk draws on; "moments" deep-link into the recordings.

export type Moment = { time: string; url: string; label: string };

export type Session = {
  id: string;
  date: string;
  title: string;
  youtube: string;
  thumbnail: string;
  blog: string;
  repo: string | null;
  cohost: { name: string; role: string; company: string; image: string; github: string };
  talkStories: string[];
  moments: Moment[];
};

export const SESSIONS: Session[] = [
  {
    "id": "guided-coding",
    "date": "2026-02-26",
    "title": "Guided Coding instead of Vibe Coding in Java",
    "youtube": "https://youtu.be/vopBYXp9YV0",
    "thumbnail": "https://img.youtube.com/vi/vopBYXp9YV0/hqdefault.jpg",
    "blog": "/en/blog/guided-coding/",
    "repo": "https://github.com/JohannesRabauer/vaadin-banking-app",
    "cohost": {
      "name": "Kenny Pflug",
      "role": "Guided Coding author",
      "company": "TELIS/GWVS",
      "image": "/jcon-db-2026/cohosts/kenny-pflug.jpg",
      "github": "https://github.com/feO2x"
    },
    "talkStories": [
      "Walls of text"
    ],
    "moments": [
      {
        "time": "11:40",
        "url": "https://youtu.be/vopBYXp9YV0?t=700",
        "label": "Guided Coding core: plan, implement, guide"
      },
      {
        "time": "1:38:02",
        "url": "https://youtu.be/vopBYXp9YV0?t=5882",
        "label": "The banking app plan written in planning mode"
      },
      {
        "time": "2:09:16",
        "url": "https://youtu.be/vopBYXp9YV0?t=7756",
        "label": "Writing the deviation document"
      }
    ]
  },
  {
    "id": "vibe-coding-battle",
    "date": "2026-03-05",
    "title": "Live Vibe Coding Battle: Build a Java App with GitHub Copilot",
    "youtube": "https://youtu.be/emA_olJE6AU",
    "thumbnail": "/jcon-db-2026/sessions/vibe-coding-battle.jpg",
    "blog": "/en/blog/vibe-coding-battle/",
    "repo": "https://github.com/code-with-bellsoft/ai-coding-battle",
    "cohost": {
      "name": "Catherine Edelveis",
      "role": "DevRel",
      "company": "BellSoft",
      "image": "/jcon-db-2026/cohosts/catherine-edelveis.png",
      "github": "https://github.com/des-felins"
    },
    "talkStories": [
      "Split the prompt",
      "Gates watch, so you don't"
    ],
    "moments": [
      {
        "time": "20:58",
        "url": "https://youtu.be/emA_olJE6AU?t=1258",
        "label": "Catherine starts the single-shot prompt"
      },
      {
        "time": "30:18",
        "url": "https://youtu.be/emA_olJE6AU?t=1818",
        "label": "Johannes starts the iterative (split) prompt"
      },
      {
        "time": "1:20:10",
        "url": "https://youtu.be/emA_olJE6AU?t=4810",
        "label": "Check results: single-shot prompt"
      },
      {
        "time": "1:56:00",
        "url": "https://youtu.be/emA_olJE6AU?t=6960",
        "label": "Check results: iterative prompt"
      }
    ]
  },
  {
    "id": "ibm-bob",
    "date": "2026-04-13",
    "title": "AI Coding with IBM Bob: Building a JavaFX Chess Game Live",
    "youtube": "https://youtu.be/uvQwVpG3c5A",
    "thumbnail": "/jcon-db-2026/sessions/ibm-bob.jpg",
    "blog": "/en/blog/ibm-bob/",
    "repo": "https://github.com/JohannesRabauer/ibm-bob-javafx-chess",
    "cohost": {
      "name": "Ryan Jarvinen",
      "role": "Principal Developer Advocate",
      "company": "IBM",
      "image": "/jcon-db-2026/cohosts/ryan-jarvinen.jpg",
      "github": "https://github.com/ryanj"
    },
    "talkStories": [
      "The agent turned off the tests"
    ],
    "moments": [
      {
        "time": "1:22:40",
        "url": "https://youtu.be/uvQwVpG3c5A?t=4960",
        "label": "Evaluating the tests"
      },
      {
        "time": "1:53:30",
        "url": "https://youtu.be/uvQwVpG3c5A?t=6810",
        "label": "Running out of budget"
      },
      {
        "time": "1:58:50",
        "url": "https://youtu.be/uvQwVpG3c5A?t=7130",
        "label": "Last look at the unfinished application"
      }
    ]
  },
  {
    "id": "docker-sbx",
    "date": "2026-04-30",
    "title": "How Safe Is Docker Sandbox? Testing AI Agents with Java",
    "youtube": "https://youtu.be/I-FqemEnUAc",
    "thumbnail": "/jcon-db-2026/sessions/docker-sbx.jpg",
    "blog": "/en/blog/docker-sbx/",
    "repo": "https://github.com/JohannesRabauer/docker-sandbox-demo",
    "cohost": {
      "name": "Kevin Wittek",
      "role": "Engineering Leader",
      "company": "Docker",
      "image": "/jcon-db-2026/cohosts/kevin-wittek.jpg",
      "github": "https://github.com/kiview"
    },
    "talkStories": [
      "Context first, sandbox second"
    ],
    "moments": [
      {
        "time": "17:30",
        "url": "https://youtu.be/I-FqemEnUAc?t=1050",
        "label": "Credential proxying"
      },
      {
        "time": "26:30",
        "url": "https://youtu.be/I-FqemEnUAc?t=1590",
        "label": "Running the malicious project (README present)"
      },
      {
        "time": "33:40",
        "url": "https://youtu.be/I-FqemEnUAc?t=2020",
        "label": "Rerunning without the README"
      },
      {
        "time": "43:00",
        "url": "https://youtu.be/I-FqemEnUAc?t=2580",
        "label": "The blocked network request"
      }
    ]
  },
  {
    "id": "semantic-anchors",
    "date": "2026-05-10",
    "title": "LLM Coding with Semantic Anchors: From Vibe Coding to a Real Java App",
    "youtube": "https://youtu.be/Q_DWMayAQEQ",
    "thumbnail": "/jcon-db-2026/sessions/semantic-anchors.jpg",
    "blog": "/en/blog/semantic-anchors/",
    "repo": null,
    "cohost": {
      "name": "Ralf D. Müller",
      "role": "arc42 committer, creator of docToolchain",
      "company": "DB Systel",
      "image": "/jcon-db-2026/cohosts/ralf-d-mueller.jpg",
      "github": "https://github.com/rdmueller"
    },
    "talkStories": [
      "Not in the spec, not in the app"
    ],
    "moments": [
      {
        "time": "34:22",
        "url": "https://youtu.be/Q_DWMayAQEQ?t=2062",
        "label": "Creating requirements with the Socratic method"
      },
      {
        "time": "1:11:05",
        "url": "https://youtu.be/Q_DWMayAQEQ?t=4265",
        "label": "arc42 document from the requirements"
      },
      {
        "time": "1:42:40",
        "url": "https://youtu.be/Q_DWMayAQEQ?t=6160",
        "label": "Epic and story issues for implementation"
      },
      {
        "time": "1:50:58",
        "url": "https://youtu.be/Q_DWMayAQEQ?t=6658",
        "label": "Checking the issues (no GUI issue)"
      }
    ]
  },
  {
    "id": "ai-unified-process",
    "date": "2026-05-13",
    "title": "Spec-Driven Development and the AI Unified Process",
    "youtube": "https://youtu.be/4Fw4Qne9z8E",
    "thumbnail": "/jcon-db-2026/sessions/ai-unified-process.jpg",
    "blog": "/en/blog/ai-unified-process/",
    "repo": "https://github.com/JohannesRabauer/spec-driven-demo",
    "cohost": {
      "name": "Simon Martinelli",
      "role": "Java Architect, author of the Vaadin-JOOQ Archetype",
      "company": "Martinelli GmbH",
      "image": "/jcon-db-2026/cohosts/simon-martinelli.jpg",
      "github": "https://github.com/simasch"
    },
    "talkStories": [
      "Specs are for humans",
      "Simon's workflow, packaged as skills"
    ],
    "moments": [
      {
        "time": "6:50",
        "url": "https://youtu.be/4Fw4Qne9z8E?t=410",
        "label": "Spec-driven development: update the spec first"
      },
      {
        "time": "24:21",
        "url": "https://youtu.be/4Fw4Qne9z8E?t=1461",
        "label": "Simon: we don't do prompt engineering, we do skill engineering"
      },
      {
        "time": "25:45",
        "url": "https://youtu.be/4Fw4Qne9z8E?t=1545",
        "label": "AI Unified Process"
      },
      {
        "time": "1:24:44",
        "url": "https://youtu.be/4Fw4Qne9z8E?t=5084",
        "label": "Flyway migration skill: rerun whenever the entity model changes"
      },
      {
        "time": "2:23:20",
        "url": "https://youtu.be/4Fw4Qne9z8E?t=8600",
        "label": "Simon: create your own skills for your stack"
      }
    ]
  },
  {
    "id": "antigravity-cli",
    "date": "2026-05-31",
    "title": "How Good Is Google's New Antigravity CLI?",
    "youtube": "https://youtu.be/61KMU_3SPQI",
    "thumbnail": "/jcon-db-2026/sessions/antigravity-cli.jpg",
    "blog": "/en/blog/antigravity-cli/",
    "repo": "https://github.com/JohannesRabauer/antigravity-marathon-demo",
    "cohost": {
      "name": "Abdel Sghiouar",
      "role": "Cloud Developer Advocate",
      "company": "Google",
      "image": "/jcon-db-2026/cohosts/abdel-sghiouar.jpg",
      "github": "https://github.com/boredabdel"
    },
    "talkStories": [
      "Three fixes, zero root cause"
    ],
    "moments": [
      {
        "time": "59:40",
        "url": "https://youtu.be/61KMU_3SPQI?t=3580",
        "label": "Starting the application, first try"
      },
      {
        "time": "1:25:00",
        "url": "https://youtu.be/61KMU_3SPQI?t=5100",
        "label": "Fix 1: Vaadin skills"
      },
      {
        "time": "1:40:10",
        "url": "https://youtu.be/61KMU_3SPQI?t=6010",
        "label": "Fix 2: update to Vaadin 25"
      },
      {
        "time": "2:02:40",
        "url": "https://youtu.be/61KMU_3SPQI?t=7360",
        "label": "Fix 3: change Quarkus to Spring Boot"
      }
    ]
  },
  {
    "id": "junie-intellij-spec-driven",
    "date": "2026-06-11",
    "title": "Junie, IntelliJ, and Spec-Driven Development",
    "youtube": "https://youtu.be/LekXCf-FJ00",
    "thumbnail": "/jcon-db-2026/sessions/junie-intellij-spec-driven.jpg",
    "blog": "/en/blog/junie-intellij-spec-driven/",
    "repo": "https://github.com/JohannesRabauer/junie-midi-javafx-app",
    "cohost": {
      "name": "Anton Arhipov",
      "role": "Developer Advocate",
      "company": "JetBrains",
      "image": "/jcon-db-2026/cohosts/anton-arhipov.jpg",
      "github": "https://github.com/antonarhipov"
    },
    "talkStories": [
      "Junie crashed. The workflow didn't.",
      "The workflow finished after the stream",
      "Specs are for humans",
      "Context first, sandbox second"
    ],
    "moments": [
      {
        "time": "36:05",
        "url": "https://youtu.be/LekXCf-FJ00?t=2165",
        "label": "Installing Anton's skills; why he writes his own"
      },
      {
        "time": "38:21",
        "url": "https://youtu.be/LekXCf-FJ00?t=2301",
        "label": "Third-party skills are a security risk"
      },
      {
        "time": "52:58",
        "url": "https://youtu.be/LekXCf-FJ00?t=3178",
        "label": "Junie: unknown exception on the first prompt"
      },
      {
        "time": "53:38",
        "url": "https://youtu.be/LekXCf-FJ00?t=3218",
        "label": "Switching to the Claude agent in the same chat"
      },
      {
        "time": "54:43",
        "url": "https://youtu.be/LekXCf-FJ00?t=3283",
        "label": "Spec skill asks: falling notes or horizontal scrolling"
      },
      {
        "time": "1:09:14",
        "url": "https://youtu.be/LekXCf-FJ00?t=4154",
        "label": "Anton: delete the spec after implementing"
      },
      {
        "time": "1:20:30",
        "url": "https://youtu.be/LekXCf-FJ00?t=4830",
        "label": "Trying Junie a second time"
      },
      {
        "time": "1:21:12",
        "url": "https://youtu.be/LekXCf-FJ00?t=4872",
        "label": "Anton: IntelliJ is a platform, your workflow doesn't break"
      }
    ]
  },
  {
    "id": "github-copilot-app-java-development",
    "date": "2026-06-25",
    "title": "How Good Is GitHub Copilot App for Java Development?",
    "youtube": "https://youtu.be/Xg3uYN6AMCA",
    "thumbnail": "/jcon-db-2026/sessions/github-copilot-app-java-development.jpg",
    "blog": "/en/blog/github-copilot-app-java-development/",
    "repo": "https://github.com/JohannesRabauer/hr-onboarding-java-app",
    "cohost": {
      "name": "Bruno Borges",
      "role": "Principal Product Manager for Java",
      "company": "Microsoft",
      "image": "/jcon-db-2026/cohosts/bruno-borges.jpg",
      "github": "https://github.com/brunoborges"
    },
    "talkStories": [
      "Too many agents, too many tabs",
      "Repeated? Make it a skill."
    ],
    "moments": [
      {
        "time": "20:08",
        "url": "https://youtu.be/Xg3uYN6AMCA?t=1208",
        "label": "Parallel sessions and worktrees"
      },
      {
        "time": "58:18",
        "url": "https://youtu.be/Xg3uYN6AMCA?t=3498",
        "label": "Bruno's /commit and push as PR skill"
      },
      {
        "time": "1:08:05",
        "url": "https://youtu.be/Xg3uYN6AMCA?t=4085",
        "label": "Bruno: 10 agents in parallel on translation issues"
      },
      {
        "time": "1:22:41",
        "url": "https://youtu.be/Xg3uYN6AMCA?t=4961",
        "label": "'Did we merge the Portuguese PR? No. Yes. No, we did.'"
      },
      {
        "time": "1:44:29",
        "url": "https://youtu.be/Xg3uYN6AMCA?t=6269",
        "label": "The session list can give a false impression"
      }
    ]
  },
  {
    "id": "software-factories",
    "date": "2026-07-02",
    "title": "Stop Prompting. Start Building Software Factories for Java",
    "youtube": "https://youtu.be/5vm4eckX6f8",
    "thumbnail": "/jcon-db-2026/sessions/software-factories.jpg",
    "blog": "/en/blog/software-factories/",
    "repo": "https://github.com/JohannesRabauer/quanta",
    "cohost": {
      "name": "Ingo Eichhorst",
      "role": "AI Architect & Engineering Trainer",
      "company": "IONOS",
      "image": "/jcon-db-2026/cohosts/ingo-eichhorst.jpg",
      "github": "https://github.com/ingo-eichhorst"
    },
    "talkStories": [
      "One real change, idea to commit",
      "Find the weak link",
      "Ramble",
      "Let the AI ask the questions",
      "Small spec, clear goal",
      "Specs are for humans",
      "A stronger oracle",
      "Worked first try, then tested",
      "Not too big, not too small",
      "A fresh agent only had the PRD",
      "Gates watch, so you don't",
      "One more gate: the agent reviews itself",
      "AI proposes. You own the oracle."
    ],
    "moments": [
      {
        "time": "27:22",
        "url": "https://youtu.be/5vm4eckX6f8?t=1642",
        "label": "Introduction to the Eichhorst Principle"
      },
      {
        "time": "56:17",
        "url": "https://youtu.be/5vm4eckX6f8?t=3377",
        "label": "Rambling the idea: query area, result area"
      },
      {
        "time": "58:00",
        "url": "https://youtu.be/5vm4eckX6f8?t=3480",
        "label": "Ask me clarifying questions, one at a time"
      },
      {
        "time": "1:01:27",
        "url": "https://youtu.be/5vm4eckX6f8?t=3687",
        "label": "Stop after 3-5 'recommended' answers"
      },
      {
        "time": "1:06:47",
        "url": "https://youtu.be/5vm4eckX6f8?t=4007",
        "label": "Summarize into a 50-line PRD"
      },
      {
        "time": "1:08:21",
        "url": "https://youtu.be/5vm4eckX6f8?t=4101",
        "label": "Non-goals in the PRD; 'a weak oracle'"
      },
      {
        "time": "1:11:43",
        "url": "https://youtu.be/5vm4eckX6f8?t=4303",
        "label": "Made-up non-functional requirements deleted"
      },
      {
        "time": "1:12:38",
        "url": "https://youtu.be/5vm4eckX6f8?t=4358",
        "label": "Three acceptance criteria"
      },
      {
        "time": "1:15:18",
        "url": "https://youtu.be/5vm4eckX6f8?t=4518",
        "label": "Commit before implementing: git lets you time-travel"
      },
      {
        "time": "1:16:45",
        "url": "https://youtu.be/5vm4eckX6f8?t=4605",
        "label": "Specs nobody reads are worthless (Shannon)"
      },
      {
        "time": "1:25:23",
        "url": "https://youtu.be/5vm4eckX6f8?t=5123",
        "label": "TDD with LLMs: human-written tests work best"
      },
      {
        "time": "1:28:49",
        "url": "https://youtu.be/5vm4eckX6f8?t=5329",
        "label": "Regression tests stopped the whack-a-mole"
      },
      {
        "time": "1:47:25",
        "url": "https://youtu.be/5vm4eckX6f8?t=6445",
        "label": "'It actually just worked'; not too big, not too small"
      },
      {
        "time": "1:49:16",
        "url": "https://youtu.be/5vm4eckX6f8?t=6556",
        "label": "Fresh agent writes tests from the PRD alone"
      },
      {
        "time": "1:50:42",
        "url": "https://youtu.be/5vm4eckX6f8?t=6642",
        "label": "Models judging each other's code"
      }
    ]
  },
  {
    "id": "bmad-method",
    "date": "2026-07-24",
    "title": "The BMad Method for Java Developers",
    "youtube": "https://youtu.be/Gki9fAlefyw",
    "thumbnail": "/jcon-db-2026/sessions/bmad-method.jpg",
    "blog": "/en/blog/bmad-method/",
    "repo": "https://github.com/JohannesRabauer/bmad-personal-finance-tracker",
    "cohost": {
      "name": "Brian Madison",
      "role": "Creator of the BMad Method",
      "company": "BMad Code",
      "image": "/jcon-db-2026/cohosts/brian-madison.png",
      "github": "https://github.com/bmadcode"
    },
    "talkStories": [
      "Goal clarity beats instruction detail",
      "Party Mode: many voices",
      "One more gate: the agent reviews itself"
    ],
    "moments": [
      {
        "time": "22:30",
        "url": "https://youtu.be/Gki9fAlefyw?t=1350",
        "label": "Brian: a 2,000-line skill replaced by three sentences"
      },
      {
        "time": "23:13",
        "url": "https://youtu.be/Gki9fAlefyw?t=1393",
        "label": "Writing leaner, goal-driven skills (2,000 lines to three sentences)"
      },
      {
        "time": "44:57",
        "url": "https://youtu.be/Gki9fAlefyw?t=2697",
        "label": "Using the /bmad help system"
      },
      {
        "time": "52:11",
        "url": "https://youtu.be/Gki9fAlefyw?t=3131",
        "label": "Creating a product brief"
      },
      {
        "time": "1:15:46",
        "url": "https://youtu.be/Gki9fAlefyw?t=4546",
        "label": "Party Mode: personas react to the brief"
      },
      {
        "time": "1:24:29",
        "url": "https://youtu.be/Gki9fAlefyw?t=5069",
        "label": "BMad Spec"
      },
      {
        "time": "1:29:56",
        "url": "https://youtu.be/Gki9fAlefyw?t=5396",
        "label": "QuickDev and review agents"
      }
    ]
  },
  {
    "id": "biomelab",
    "date": "2026-09-17",
    "title": "Three Coding Agents, One Java Project. Take a look at biomelab.",
    "youtube": "https://youtu.be/9-WxSKFFEcE",
    "thumbnail": "/jcon-db-2026/sessions/biomelab.jpg",
    "blog": "/en/blog/biomelab/",
    "repo": "https://github.com/JohannesRabauer/biomelab-german-disaster-demo",
    "cohost": {
      "name": "Manuel de la Peña",
      "role": "Staff Software Engineer",
      "company": "Docker",
      "image": "/jcon-db-2026/cohosts/manuel-de-la-pena.jpg",
      "github": "https://github.com/mdelapenya"
    },
    "talkStories": [
      "Too many agents, too many tabs",
      "The agent turned off the tests",
      "Repeated? Make it a skill."
    ],
    "moments": [
      {
        "time": "4:19",
        "url": "https://youtu.be/9-WxSKFFEcE?t=259",
        "label": "Why biomelab: cycles of 'which terminal is this'"
      },
      {
        "time": "1:14:11",
        "url": "https://youtu.be/9-WxSKFFEcE?t=4451",
        "label": "Three issues in parallel"
      },
      {
        "time": "1:20:19",
        "url": "https://youtu.be/9-WxSKFFEcE?t=4819",
        "label": "Johannes: every repeated live-coding task is a skill"
      },
      {
        "time": "1:27:53",
        "url": "https://youtu.be/9-WxSKFFEcE?t=5273",
        "label": "Agent opens a PR without asking"
      },
      {
        "time": "1:29:20",
        "url": "https://youtu.be/9-WxSKFFEcE?t=5360",
        "label": "'We are just blindly trusting it'"
      },
      {
        "time": "1:30:03",
        "url": "https://youtu.be/9-WxSKFFEcE?t=5403",
        "label": "Couldn't verify, kept going: 'This is fine'"
      }
    ]
  }
];
