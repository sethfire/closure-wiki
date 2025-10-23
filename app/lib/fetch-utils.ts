const SUPPORTED_LANGS = ["en", "cn", "jp"];
const SUPPORTED_TYPES = ["operators", "enemies"];

const API_URL = "https://api.closure.wiki";
const API_VERSION = "v1";

export async function fetchEntries(lang: string, type: string) {
  try {
    if (!SUPPORTED_LANGS.includes(lang)) return null;
    if (!SUPPORTED_TYPES.includes(type)) return null;

    const response = await fetch(`${API_URL}/${API_VERSION}/${lang}/${type}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return null;
  }
}

export async function fetchEntry(lang: string, type: string, slug: string) {
  try {
    if (!SUPPORTED_LANGS.includes(lang)) return null;
    if (!SUPPORTED_TYPES.includes(type)) return null;

    const response = await fetch(`${API_URL}/${API_VERSION}/${lang}/${type}/${slug}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
}