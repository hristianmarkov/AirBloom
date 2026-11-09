export type ArticleSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  ordered?: boolean;
  quote?: string;
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  art: "journal" | "visit";
  answer: string;
  sections: ArticleSection[];
  sources: { title: string; url: string }[];
};
export const articles: Article[] = [
  {
    slug: "how-to-keep-a-sinus-symptom-diary",
    title: "A sinus symptom diary that fits into real life.",
    description:
      "What to notice, what to write down, and why a few small entries can help you tell your story.",
    category: "Everyday understanding",
    readTime: 5,
    art: "journal",
    answer:
      "A useful sinus symptom diary records the date, how your symptoms feel, their impact on your day, and any changes to routines you already follow. Keep entries brief and use the same scale. Bring the history to a clinician; a diary can support a conversation but cannot identify the cause of your symptoms.",
    sections: [
      {
        id: "why-keep-a-diary",
        title: "Why keep a sinus symptom diary?",
        paragraphs: [
          "When you live with recurring congestion, reduced smell, or facial pressure, individual days can blur together. At an appointment, “it has been a difficult few weeks” may be true, but it can be hard to explain what changed and when.",
          "A diary gives you a dated personal record. It may help you remember when symptoms started, whether they returned to your usual, and which parts of daily life felt different. It does not prove that weather, a routine, or a particular exposure caused a change.",
        ],
      },
      {
        id: "what-to-record",
        title: "What should you write down?",
        paragraphs: [
          "Start with a small set of details you can record consistently. You can always add more when it is helpful.",
        ],
        items: [
          "Date and overall burden: choose a simple scale, such as none, mild, moderate, severe, or very severe.",
          "Symptoms you notice: nasal blockage, drainage, reduced smell, facial pressure, or headache. Record headache separately rather than assuming its cause.",
          "Daily impact: a short note about sleep, concentration, work, or an activity you missed.",
          "Your existing routines: record what you actually did, and when a routine changed. Follow your clinician’s instructions rather than changing treatment based on the diary.",
          "Context, if useful: a cold-like illness, travel, or outdoor conditions. Mark uncertain details as uncertain.",
        ],
      },
      {
        id: "find-your-usual",
        title: "Make room for “my usual.”",
        paragraphs: [
          "Your usual is not necessarily the same as having no symptoms. If you live with persistent congestion, a day that feels typical can still include symptoms.",
          "Keep “compared with my usual” separate from an overall rating. For example, you might write “usual nasal blockage, moderate overall symptoms.” That helps preserve both the day-to-day change and the burden you are living with.",
        ],
        quote:
          "The goal is a clearer record of your experience, not a perfect score for how well you tracked it.",
      },
      {
        id: "keep-it-small",
        title: "A small routine is easier to return to.",
        paragraphs: [
          "Try recording your overall experience at a similar time, using the same wording and scale. An optional morning note can capture how you woke up; an evening note can describe the day as a whole.",
          "Missed a day? Leave it blank or label a later entry as recalled. A missing entry does not mean you felt well. If daily tracking feels like too much, log a flare when it starts and note when you return to your usual.",
        ],
      },
      {
        id: "use-it-at-a-visit",
        title: "Take the story to your next visit.",
        paragraphs: [
          "Before your appointment, look for a few concrete things you want to discuss: a symptom that stayed different, a change in smell, disruption to sleep, or uncertainty about a routine.",
          "A concise summary and a few questions may be easier to review than a long diary. Your clinician can decide what information is relevant and whether examination or other assessment is needed. Persistent or worsening symptoms deserve professional advice; tracking should never delay getting care.",
        ],
      },
    ],
    sources: [
      {
        title:
          "NIDCD: Smell disorders — recording changes and discussing your history",
        url: "https://www.nidcd.nih.gov/health/smell-disorders",
      },
      {
        title:
          "NHS: Sinusitis (sinus infection) — symptoms and when to get help",
        url: "https://www.nhs.uk/conditions/sinusitis-sinus-infection/",
      },
      {
        title:
          "Mayo Clinic: Chronic sinusitis — preparing for your appointment",
        url: "https://www.mayoclinic.org/diseases-conditions/chronic-sinusitis/diagnosis-treatment/drc-20351667",
      },
    ],
  },
  {
    slug: "prepare-for-your-ent-appointment",
    title: "Your next ENT visit: a little preparation, a clearer conversation.",
    description:
      "A thoughtful checklist to bring your symptoms, routines, and questions into the same conversation.",
    category: "Your care, your conversation",
    readTime: 6,
    art: "visit",
    answer:
      "To prepare for an ENT appointment about sinus symptoms, bring a short symptom timeline, a current medication and routine list, relevant previous records, and your most important questions. Include how symptoms affect sleep, smell, and daily life. Follow the clinic’s preparation instructions and let the clinician guide diagnosis and treatment.",
    sections: [
      {
        id: "start-with-your-story",
        title: "Start with the story you want to tell.",
        paragraphs: [
          "An appointment can feel short when you have months of experiences to explain. You do not need to arrive with a diagnosis or a perfectly organized folder. A few dated notes can help you describe what has been happening.",
          "Write one or two sentences in your own words: “My nose feels blocked most days, and my sense of smell changed about two months ago.” Include what you most want help understanding.",
        ],
      },
      {
        id: "bring-a-timeline",
        title: "1. Bring a simple symptom timeline.",
        paragraphs: [
          "Note when symptoms began, whether they are persistent or come in bouts, and whether there are clear intervals when you return to your usual. Use approximate dates when you do not remember exactly.",
        ],
        items: [
          "Which symptoms you notice, and whether they affect one side or both.",
          "Changes in smell, nasal blockage, drainage, facial pressure, and headache, recorded separately.",
          "Effects on sleep, energy, concentration, and activities.",
          "Any major changes, procedures, or previous clinician assessments you want to discuss.",
        ],
      },
      {
        id: "list-your-routines",
        title: "2. List what you already use.",
        paragraphs: [
          "Bring the names of prescription medicines, over-the-counter products, supplements, rinses, or sprays you currently use. Include the schedule as you actually follow it and, where possible, when it started or changed.",
          "Photographs of packaging can help you remember product names. Avoid guessing an ingredient or dose. Your care team can help clarify uncertain information. Do not stop or change a treatment for the appointment unless the clinic or your clinician tells you to.",
        ],
      },
      {
        id: "choose-your-questions",
        title: "3. Choose the questions that matter most.",
        paragraphs: [
          "A short question list can help you return to your priorities during the conversation. Here are a few starting points to adapt:",
        ],
        items: [
          "What might explain these symptoms, and what would help distinguish the possibilities?",
          "Does the change in my sense of smell need further assessment?",
          "Which details in my symptom history are most useful to track?",
          "How should I follow the plan we agree on, and when should we review it?",
          "What changes should prompt me to contact the clinic or seek urgent help?",
        ],
        quote:
          "You do not have to explain everything perfectly. Your lived experience is a useful place to start.",
      },
      {
        id: "records-and-logistics",
        title: "4. Check the practical details.",
        paragraphs: [
          "Ask the clinic which previous records are useful and how to send them securely. Depending on your history, they may want reports, previous imaging, allergy testing, or information from another clinician. Do not arrange tests yourself just to complete a checklist.",
          "Confirm appointment time, referral requirements, accessibility needs, and any clinic-specific preparation. Consider bringing someone you trust if that would help you remember the conversation.",
        ],
      },
      {
        id: "leave-with-a-plan",
        title: "Leave with a plan in your own words.",
        paragraphs: [
          "Before the visit ends, ask about anything that is unclear. You can repeat the agreed next steps back in your own words and ask when a follow-up is needed.",
          "Sinus Companion is being designed to help turn your own records into an editable visit summary. You will choose what to include and share. It is a way to prepare your story, not a clinical assessment.",
        ],
      },
    ],
    sources: [
      {
        title:
          "Mayo Clinic: Chronic sinusitis — diagnosis, treatment, and appointment preparation",
        url: "https://www.mayoclinic.org/diseases-conditions/chronic-sinusitis/diagnosis-treatment/drc-20351667",
      },
      {
        title: "NIDCD: Smell disorders",
        url: "https://www.nidcd.nih.gov/health/smell-disorders",
      },
      {
        title: "NHS: Sinusitis (sinus infection)",
        url: "https://www.nhs.uk/conditions/sinusitis-sinus-infection/",
      },
    ],
  },
];
