import { describe, it, expect } from 'vitest';
import { findBestAnswer } from './chatbot';

describe('Chatbot FAQ Matching Engine', () => {
  it('should find exact matches for SANKALP', () => {
    const result = findBestAnswer('What is SANKALP?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is SANKALP?');
    expect(result?.confidence).toBeGreaterThan(0.8);
  });

  it('should handle fuzzy matches and wording variations (Test B)', () => {
    // "tell me about trajectory" -> "What is TRAJECTORY?"
    const result = findBestAnswer('tell me about trajectory');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is TRAJECTORY?');
  });

  it('should handle case-insensitivity and punctuation (Test C)', () => {
    // "what does sankalp do?" -> "What does SANKALP do?"
    const result = findBestAnswer('what does sankalp do?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What does SANKALP do?');
  });

  it('should return null for gibberish (Test D)', () => {
    // "xyz123" -> null
    const result = findBestAnswer('xyz123');
    expect(result).toBeNull();
  });

  it('should correctly fallback for low confidence non-gibberish', () => {
    // "When was George Washington born?" -> should not confidently match
    const result = findBestAnswer('When was George Washington born?');
    expect(result).toBeNull();
  });

  it('should match dashboard question (Test E)', () => {
    // "Can you tell me about the dashboard?" -> "What is the dashboard?"
    const result = findBestAnswer('Can you tell me about the dashboard?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is the dashboard?');
  });

  it('should handle empty input gracefully', () => {
    const result = findBestAnswer('');
    expect(result).toBeNull();

    const resultSpace = findBestAnswer('   ');
    expect(resultSpace).toBeNull();
  });
});
