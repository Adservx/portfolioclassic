export const SITE_URL = "https://darshanpathak.com.np";

export const BOOK_MASTER_URL =
  "https://drive.usercontent.google.com/download?id=18FPW80lOGw702W222RZJDZ2f6df4tSBV&export=download&confirm=t";

export const SITE_NAME = "Darshan Pathak";
export const SITE_TITLE = "Darshan Pathak — Author of White Words";
export const SITE_DESCRIPTION =
  "The official portfolio of Darshan Pathak, author of White Words (2023). Microbiologist, sociologist, teacher, and writer of 93 articles on love, spirit, science, and the quiet architecture of the mind.";
export const SITE_KEYWORDS = [
  "Darshan Pathak",
  "White Words",
  "White Words book",
  "Darshan Pathak author",
  "Nepali author",
  "Nepali writer",
  "poetry and essays",
  "microbiologist author",
  "sociologist writer",
  "93 articles book",
  "ISBN 978-9937-1-3757-7",
  "Nepal literature",
  "bookstore",
  "buy White Words",
  "White Words PDF",
];

export const AUTHOR = {
  name: "Darshan Pathak",
  givenName: "Darshan",
  familyName: "Pathak",
  email: "darshanpathak2082@gmail.com",
  phone: "+977 9741766064",
  jobTitle: "Author, Microbiologist, Sociologist & Teacher",
  nationality: "Nepal",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/bookstore/messenger-creation.webp`,
};

export const BOOK = {
  title: "White Words",
  subtitle: "A collection of 93 articles",
  author: AUTHOR.name,
  category: "Poetry & Essays",
  year: "2023",
  isbn: "978-9937-1-3757-7",
  publisher: "Darshan Pathak",
  binding: "First Edition · 312 pp.",
  price: "$3.00/- · NPR 460",
  pageCount: 312,
  url: `${SITE_URL}/bookstore`,
  coverImage: `${SITE_URL}/bookstore/white-words-cover.webp`,
  description:
    "A collection of 93 articles on love, spirit, science and the quiet architecture of the mind — written to cure and prevent the chronic ache the world faces.",
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}