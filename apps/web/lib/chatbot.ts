import Fuse from 'fuse.js';
import faqData from '@/data/faq.json';

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
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
    { name: 'question', weight: 2 },
    { name: 'answer', weight: 1 },
    { name: 'category', weight: 0.5 }
  ],
  // Threshold: 0.0 is a perfect match, 1.0 is a complete mismatch.
  // Relaxed to 0.85 to allow sentence variations like "tell me about..."
  threshold: 0.85, 
  ignoreLocation: true,
};

const fuse = new Fuse<FAQItem>(faqData.faqs, fuseOptions);

/**
 * Finds the best FAQ answer using deterministic fuzzy matching.
 * Returns null if no match meets the confidence threshold.
 */
export function findBestAnswer(query: string): ChatbotResponse | null {
  if (!query || query.trim() === '') {
    return null;
  }

  // Pre-process query: convert to lowercase and remove common stop words for better matching
  const cleanQuery = query.toLowerCase().replace(/^(what is|tell me about|can you tell me about|what does|how does|how do i|are the) /i, '').trim();

  const results = fuse.search(cleanQuery || query);

  if (results.length === 0) {
    return null;
  }

  const topMatch = results[0];
  
  // Strict check: if score is worse than 0.80, return null
  if (topMatch.score !== undefined && topMatch.score > 0.80) {
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
