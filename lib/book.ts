export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  shortTitle?: string;
  badge?: string;
  author: string;
  category: string;
  year: string;
  cover: string;
  excerpt: string;
  binding: string;
  price: string;
  digitalOnly?: boolean;
  tocLabel?: string;
  details?: { label: string; value: string }[];
  pdfUrl?: string;
  isbn?: string;
  publisher?: string;
  email?: string;
  phone?: string;
  dedication?: string;
  preface?: string;
  toc?: { title: string; page?: string }[];
}

export const book: Book = {
  id: 1,
  title: "White Words",
  author: "Darshan Pathak",
  category: "Poetry & Essays",
  year: "2023",
  cover: "/bookstore/white-words-cover.webp",
  excerpt:
    "A collection of 93 articles on love, spirit, science and the quiet architecture of the mind — written to cure and prevent the chronic ache the world faces.",
  binding: "First Edition · 312 pp.",
  price: "$3.00/- · NPR 460",
  pdfUrl: "/bookstore/white-words.pdf",
  isbn: "978-9937-1-3757-7",
  publisher: "Darshan Pathak",
  email: "darshanpathak2082@gmail.com",
  phone: "+977 9741766064",
  dedication:
    "Dedicated to my wife — B.B.S. Graduate. “The book WHITE WORDS made me proud and challenge to my soul with proof of love existence with the character of this book’s words, the potential energy from imagination and thoughts to cure and prevention the chronic that the whole world is facing out.” — Binita Bhandari Pathak.",
  preface:
    "“This book may be useful for all. In this book the key feature is the series of 93 Articles, containing positive status, a glossary of literary terms, and motivates to writing literary essays and documenting them in correct format. In this book the article 'Dark' guides to find the natural light in our life. The author has tries to avoid the bad habits of people.” — Indra Prasad Pathak, Language Literature Editor, Bayetari.",
  toc: [
    { title: "Can it be possible to feel it non-living", page: "3" },
    { title: "Daily day dream", page: "5" },
    { title: "Do not tell lie", page: "6" },
    { title: "Words!!!", page: "7" },
    { title: "Wishing from Her", page: "9" },
    { title: "Why the crow is Crowing!", page: "11" },
    { title: "We pronounced them the “Mad”", page: "12" },
    { title: "To her!", page: "16" },
    { title: "The sky above space", page: "19" },
    { title: "The path of mind", page: "20" },
    { title: "Temple is heart", page: "21" },
    { title: "Spiritual symptoms", page: "22" },
    { title: "Soul", page: "29" },
    { title: "Show what you know", page: "30" },
    { title: "Scientific letter of love", page: "31" },
    { title: "Physical Punishment", page: "34" },
    { title: "No one like you", page: "36" },
    { title: "No competition at night", page: "38" },
    { title: "Nervous!", page: "39" },
    { title: "Mucosa Nebula", page: "41" },
    { title: "Micro organisms", page: "45" },
    { title: "Melodious music", page: "45" },
    { title: "Kitchen", page: "46" },
    { title: "I don’t think so!", page: "47" },
    { title: "Flowers", page: "49" },
    { title: "Fish", page: "50" },
    { title: "Yes!", page: "51" },
    { title: "Evolution of Age!", page: "52" },
    { title: "Don’t put your hand on head and sex organs by yourself", page: "54" },
    { title: "Moving Man", page: "59" },
    { title: "Through the window", page: "60" },
    { title: "Eye", page: "62" },
    { title: "Apocryphal God", page: "63" },
    { title: "Movement of Mind", page: "64" },
    { title: "Stars are starring you!", page: "65" },
    { title: "Wrong Answer!", page: "66" },
    { title: "The last Time", page: "68" },
    { title: "Mr. Nobody", page: "69" },
    { title: "No one can Construct and Destruct me", page: "70" },
    { title: "Why are you able to give Suggestion to me?", page: "71" },
    { title: "The last Night!", page: "72" },
    { title: "Pain Cares The Body", page: "73" },
    { title: "My life is Stealing", page: "74" },
    { title: "Cap a Pie Euphony", page: "75" },
    { title: "Birds", page: "76" },
    { title: "Alphabet of alphabets", page: "77" },
    { title: "Sand in sands", page: "78" },
    { title: "Dust", page: "79" },
    { title: "River", page: "80" },
    { title: "Respect", page: "82" },
    { title: "Regeneration Power", page: "83" },
    { title: "Dormancy", page: "84" },
    { title: "Girle", page: "86" },
    { title: "Deception", page: "88" },
    { title: "Heavenly hell habits!", page: "89" },
    { title: "The Word “Peace”", page: "91" },
    { title: "Crops life", page: "92" },
    { title: "Steam and Smoke", page: "93" },
    { title: "Fruits", page: "94" },
    { title: "What makes wobble and warm in wet winter!", page: "95" },
    { title: "Pen", page: "97" },
    { title: "God", page: "98" },
    { title: "Everything is Hole!", page: "100" },
    { title: "Bookworm", page: "101" },
    { title: "Returns in Return", page: "102" },
    { title: "Why air is colourless!", page: "103" },
    { title: "Earthquake", page: "105" },
    { title: "Dark", page: "107" },
    { title: "Shoe", page: "108" },
    { title: "Think, listen, see and speak in English", page: "110" },
    { title: "I love facebook status", page: "111" },
    { title: "Experienced and Empirical", page: "114" },
    { title: "Place to place", page: "129" },
    { title: "My Wishes", page: "130" },
    { title: "Hello Happy", page: "131" },
    { title: "Sex and Aids", page: "132" },
    { title: "They don’t give you sufficient Salary.", page: "133" },
    { title: "I want to be Defeated.", page: "134" },
    { title: "Dear Students,", page: "135" },
    { title: "Gossip and Gossiper", page: "136" },
    { title: "Lion Skin but Fox Heart", page: "137" },
    { title: "Shadow", page: "138" },
    { title: "Watch and Clock", page: "139" },
    { title: "Road", page: "140" },
    { title: "Rest and Religion", page: "141" },
    { title: "Love and war", page: "142" },
    { title: "Distance", page: "143" },
    { title: "Food", page: "144" },
    { title: "Zero Hour", page: "145" },
    { title: "Emptiness", page: "146" },
  ],
};

export const thesis: Book = {
  id: 2,
  title: "Persistence and Change in Livelihood Strategies in the Magar Community",
  subtitle: "A Case Study of Guwadi Gaun, Galyang Municipality, Ward No. 4",
  shortTitle: "MA Thesis",
  badge: "Digital Edition · MA Sociology",
  author: "Darshan Pathak",
  category: "Sociology · Thesis",
  year: "2024",
  cover: "/thesis_cover.png",
  excerpt:
    "A sociological research study examining the persistence, transformation and adaptation of livelihood strategies within the Magar community of Guwadi Gaun, with particular attention to traditional and contemporary economic practices.",
  binding: "Master of Arts in Sociology · Thesis Writing (So. 593)",
  price: "$7.00/- · NPR 1073",
  digitalOnly: true,
  tocLabel: "chapters",
  publisher: "Tribhuvan University · Galyang Multiple Campus",
  email: "darshanpathak2082@gmail.com",
  phone: "+977 9741766064",
  preface:
    "This thesis explores the livelihood strategies of the Magar community in Guwadi Gaun, Galyang Municipality Ward No. 4. It examines traditional livelihood practices and the changes that have occurred over the past 15 years, including shifts in agriculture, animal husbandry, business, employment and foreign employment. The research draws on primary data collected through household questionnaires, focus group discussions, key informant interviews and field observation, alongside secondary sources. The study uses descriptive and exploratory research approaches and examines the economic, social, cultural, educational and health-related dimensions associated with livelihood change.",
  details: [
    { label: "Degree", value: "Master of Arts in Sociology · Thesis Writing (So. 593)" },
    { label: "University", value: "Tribhuvan University · Faculty of Humanities and Social Sciences · Department of Sociology" },
    { label: "Campus", value: "Galyang Multiple Campus, Galyang, Syangja" },
    { label: "Submitted", value: "November 2024" },
    { label: "Study Area", value: "Guwadi Gaun, Galyang Municipality, Ward No. 4, Syangja" },
    { label: "Research Population", value: "270 Magar families" },
    { label: "Respondents", value: "54 respondents · 10 key-informant interviews" },
    { label: "Research Approach", value: "Exploratory and descriptive" },
    { label: "Data Sources", value: "Primary and secondary" },
    { label: "Methods", value: "Questionnaire survey · Focus group discussions · Key informant interviews · Field observation" },
    { label: "T.U. Registration No.", value: "5-2-37-338-2010" },
    { label: "Exam Roll No.", value: "47532001 · Campus Roll No. 01/2021" },
  ],
  toc: [
    { title: "I — Introduction" },
    { title: "II — Review of Literature" },
    { title: "III — Research Methods" },
    { title: "IV — Data Presentation & Analysis" },
    { title: "V — Summary & Conclusion" },
    { title: "References & Annexes" },
  ],
};

export const products: Book[] = [book, thesis];