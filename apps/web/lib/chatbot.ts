import Fuse from 'fuse.js';
import faqData from '@/data/faq.json';

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  aliases?: string[];
  keywords?: string[];
}

export interface ChatbotResponse {
  question: string;
  answer: string;
  confidence: number;
}

// Initialize Fuse instance once
const fuseOptions = {
  includeScore: true,
  // Keys to search within the FAQ items
  keys: [
    { name: 'question', weight: 3 },
    { name: 'aliases', weight: 2.5 },
    { name: 'keywords', weight: 1.5 },
    { name: 'answer', weight: 0.5 },
    { name: 'category', weight: 0.5 }
  ],
  // Threshold: 0.0 is a perfect match, 1.0 is a complete mismatch.
  threshold: 0.4, // Stricter threshold to require stronger signals
  ignoreLocation: true,
};

const fuse = new Fuse<FAQItem>(faqData.faqs, fuseOptions);

const REJECTED_SINGLE_WORDS = new Set([
  "hello", "hi", "hey", "help",
  "study", "career", "security", "risk", "data",
  "platform", "dashboard", "safety", "scam"
]);

const GENERIC_PHRASES = new Set([
  "what should i do",
  "what do i do",
  "help me",
  "i am worried",
  "study planning",
  "career planning",
  "online safety",
  "academic risk",
  "scam detection"
]);

export function findBestAnswer(query: string): ChatbotResponse | null {
  if (!query || query.trim() === '') {
    return null;
  }

  const cleanQuery = query.toLowerCase().trim();
  const normalizedForCheck = cleanQuery.replace(/[?.,!]/g, '').trim();
  const tokens = normalizedForCheck.split(/\s+/).filter(Boolean);

  // Guard: empty or extremely short
  if (tokens.length === 0) return null;

  // Guard: single generic word
  if (tokens.length === 1 && REJECTED_SINGLE_WORDS.has(tokens[0])) {
    return null;
  }

  // Guard: generic help requests or greetings
  if (GENERIC_PHRASES.has(normalizedForCheck) || REJECTED_SINGLE_WORDS.has(normalizedForCheck)) {
    return null;
  }

  // 1. Exact Match Priority (Question or Alias)
  const exactMatch = faqData.faqs.find(faq => {
    const qNorm = faq.question.toLowerCase().replace(/[?.,!]/g, '').trim();
    if (qNorm === normalizedForCheck) return true;
    if (faq.aliases) {
      return faq.aliases.some(alias => alias.toLowerCase().replace(/[?.,!]/g, '').trim() === normalizedForCheck);
    }
    return false;
  });

  if (exactMatch) {
    return {
      question: exactMatch.question,
      answer: exactMatch.answer,
      confidence: 1.0,
    };
  }

  // Pre-process query for fuzzy search
  const cleanForFuzzy = cleanQuery
    .replace(/^(what is|tell me about|what does|how does) /i, '')
    .trim();

  // 2. Fuzzy Match with stricter threshold
  const results = fuse.search(cleanForFuzzy);

  if (results.length === 0) {
    return null;
  }

  const topMatch = results[0];
  
  // Strict check: if score is worse than 0.40, return null
  if (topMatch.score !== undefined && topMatch.score > 0.40) {
    return null;
  }

  // Calculate confidence (0 to 1)
  const confidence = topMatch.score !== undefined ? 1 - topMatch.score : 1;

  return {
    question: topMatch.item.question,
    answer: topMatch.item.answer,
    confidence: confidence,
  };
}
