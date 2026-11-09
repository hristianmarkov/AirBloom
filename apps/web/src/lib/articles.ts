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
  art: "journal" | "visit" | "conditions" | "routine";
  answer: string;
  sections: ArticleSection[];
  sources: { title: string; url: string }[];
};
export const articles: Article[] = [
  {
    slug: "how-to-keep-a-sinus-symptom-diary",
    title: "How to keep a sinus symptom diary.",
    description:
      "Track congestion, pressure, smell, sleep, and daily impact with a simple sinus symptom diary you can keep returning to.",
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
    title: "How to prepare for an ENT appointment.",
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
  {
  "slug": "why-sinus-symptoms-change-day-to-day",
  "title": "Why do my sinus symptoms change day to day?",
  "description": "A practical way to track congestion, sleep, outdoor conditions, and routine changes without jumping to conclusions about your triggers.",
  "category": "Patterns & daily life",
  "readTime": 5,
  "art": "conditions",
  "answer": "A blocked nose or facial pressure can vary for different reasons, and similar symptoms do not always have the same cause. A consistent diary can help you compare your symptoms with sleep, routines, illnesses, and outdoor conditions. Repeated patterns are useful questions to explore; they are not proof of a trigger or a reliable forecast of how you will feel tomorrow.",
  "sections": [
    {
      "id": "start-with-what-you-feel",
      "title": "Start with the symptoms, not a guess about the cause.",
      "paragraphs": [
        "“My sinuses are bad today” can mean different things: a blocked nose, pressure, a change in smell, poor sleep, or several things at once. Give each symptom its own short entry so a single score does not hide the details.",
        "The NHS lists blocked or runny nose, facial tenderness, and reduced smell among sinusitis symptoms. Allergic rhinitis can also involve a blocked or runny nose. A diary cannot tell you which condition you have."
      ]
    },
    {
      "id": "compare-like-with-like",
      "title": "How can I spot useful patterns in my symptom history?",
      "paragraphs": [
        "Pick a small set of details and use the same labels each time. For example, rate congestion on waking, then add a separate note about sleep and anything that changed in your normal routine.",
        "When you look back, compare several recorded days rather than one memorable flare. Keep missing days visible: no entry is not the same as no symptoms."
      ],
      "items": [
        "Record the symptom and time before adding context.",
        "Separate what happened from what you think caused it.",
        "Compare days with a similar level of detail.",
        "Keep uncertainty in the note: “possibly more blocked after the walk.”"
      ]
    },
    {
      "id": "outdoor-context",
      "title": "What can pollen and air-quality information tell me?",
      "paragraphs": [
        "For people with allergic rhinitis, pollen is one possible allergen; the NHS also lists dust mites, animal dander, and mould. That does not mean all congestion is caused by allergy.",
        "An air-quality index reports outdoor pollution conditions. It is not a measurement of your nose, a pollen count, or a personalized sinusitis score. Save the location and date alongside any environmental value, and treat it as context for your own record."
      ]
    },
    {
      "id": "daily-outlook",
      "title": "Can an app predict how my sinusitis will feel today?",
      "paragraphs": [
        "A morning overview can bring your recent entries, current check-in, and local conditions into one place. That is useful context for planning your day, but it is different from a clinically validated personal prediction.",
        "Sinus Companion’s daily outlook is being designed around this distinction: your own history first, with uncertainty made clear. It will not guarantee a symptom-free day or tell you to change medication because of a forecast."
      ]
    },
    {
      "id": "make-the-next-step-smaller",
      "title": "Turn an observation into one useful next step.",
      "paragraphs": [
        "Instead of trying to solve every flare at once, write down one question you want to understand. “Does this happen on the days I sleep poorly?” is easier to explore than “What causes everything?”",
        "Seek professional advice for symptoms that persist, keep returning, or get worse. If you feel very unwell or pain relief does not help, follow local urgent-care advice. Do not wait for a diary pattern before getting help."
      ]
    }
  ],
  "sources": [
    {
      "title": "NHS: Sinusitis — symptoms and when to get help",
      "url": "https://www.nhs.uk/conditions/sinusitis-sinus-infection/"
    },
    {
      "title": "NHS: Allergic rhinitis — symptoms and common allergens",
      "url": "https://www.nhs.uk/conditions/allergic-rhinitis/"
    },
    {
      "title": "AirNow: What the Air Quality Index measures",
      "url": "https://www.airnow.gov/aqi/aqi-basics/"
    }
  ]
},
  {
  "slug": "sinus-medication-routine-reminders",
  "title": "A simpler way to remember your sinus medication routine.",
  "description": "Keep your existing treatment instructions, reminders, and taken-or-missed notes together without letting an app decide your dose.",
  "category": "Routines & reminders",
  "readTime": 4,
  "art": "routine",
  "answer": "A medication reminder should help you follow the instructions you already have from a clinician, pharmacist, or medicine leaflet. Record the exact product and agreed schedule, use a reminder you can recognize, and distinguish “reminded” from “taken.” An app should not choose a medicine, alter a dose, or invent advice for a missed dose.",
  "sections": [
    {
      "id": "one-reliable-list",
      "title": "Start with one reliable list.",
      "paragraphs": [
        "A routine is harder to follow when instructions are spread across packaging, notes, and memory. Make one list of what you currently use, with the product name and the schedule you were given.",
        "If you are unsure which product you have or how to use it, check the leaflet or ask a pharmacist. Similar-looking nasal sprays can contain different types of medicine."
      ],
      "items": [
        "Exact product name, with a packaging photo if useful.",
        "Your existing instructions and who provided them.",
        "A start date, review date, or stop date when one was given.",
        "A note of questions to clarify with your pharmacist or clinician."
      ]
    },
    {
      "id": "reminder-not-prescription",
      "title": "A reminder is not a prescription.",
      "paragraphs": [
        "Choose a reminder label that tells you which existing routine it refers to. Use the timing specified in your treatment instructions; do not change that timing just to fit a notification.",
        "Sinus Companion’s reminder features are being designed to keep your agreed routine visible. The app will not independently recommend a dose or decide that a symptom score means you need another medicine."
      ]
    },
    {
      "id": "taken-missed-not-sure",
      "title": "Keep “taken,” “missed,” and “not sure” separate.",
      "paragraphs": [
        "A notification arriving does not mean you used the medicine. Log what actually happened, and leave room for uncertainty rather than filling a gap with a guess.",
        "If you miss a dose, consult the leaflet for that particular medicine or ask a pharmacist. Do not assume the same missed-dose instruction applies to every spray, tablet, or treatment."
      ]
    },
    {
      "id": "check-product-specific-limits",
      "title": "Check limits for the product you actually use.",
      "paragraphs": [
        "The NHS warns that decongestant nasal sprays and drops should not be used for more than five days because they can worsen a blocked nose. This warning is specific to decongestants; it is not a general schedule for all nasal products.",
        "Check the current leaflet and speak with a pharmacist if you are uncertain about a product or if symptoms worsen. A reminder should preserve a review or stop instruction, not silently repeat forever."
      ]
    },
    {
      "id": "connect-routine-and-history",
      "title": "Keep your routine beside your symptom history.",
      "paragraphs": [
        "A dated record can make it easier to remember when a routine changed and what you noticed afterwards. It can also help you explain what you actually followed, rather than what was intended.",
        "A change in symptoms after a routine change does not prove the routine caused it. Use the record to ask clearer questions, and keep treatment decisions with your care team."
      ]
    }
  ],
  "sources": [
    {
      "title": "NHS: Decongestants — use, limits, and precautions",
      "url": "https://www.nhs.uk/medicines/decongestants/"
    },
    {
      "title": "NHS: Steroids — types of medicine and safety information",
      "url": "https://www.nhs.uk/medicines/steroids/"
    },
    {
      "title": "NHS: Sinusitis — treatment and when to get help",
      "url": "https://www.nhs.uk/conditions/sinusitis-sinus-infection/"
    }
  ]
},
];
