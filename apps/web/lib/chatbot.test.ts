import { describe, it, expect } from 'vitest';
import { findBestAnswer } from './chatbot';

describe('Chatbot FAQ Matching Engine', () => {
  it('should find exact matches for SANKALP', () => {
    const result = findBestAnswer('What is SANKALP?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is SANKALP?');
  });

  it('Test A: what is FOCUS?', () => {
    const result = findBestAnswer('what is FOCUS?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is FOCUS?');
  });

  it('Test B: tell me about trajectory', () => {
    const result = findBestAnswer('tell me about trajectory');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is TRAJECTORY?');
  });

  it('Test C: WHAT DOES SANKALP DO?', () => {
    const result = findBestAnswer('WHAT DOES SANKALP DO?');
    expect(result).not.toBeNull();
  });

  it('Test D: xyz123 -> fallback', () => {
    const result = findBestAnswer('xyz123');
    expect(result).toBeNull();
  });

  it('Test E: empty string -> fallback', () => {
    const result = findBestAnswer('');
    expect(result).toBeNull();
  });

  it('Test F: how can you help me study?', () => {
    const result = findBestAnswer('how can you help me study?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is FOCUS?');
  });

  it('Test G: my grades are getting worse', () => {
    const result = findBestAnswer('my grades are getting worse');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is PULSE?');
  });

  it('Test H: is this message a scam?', () => {
    const result = findBestAnswer('is this message a scam?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is SENTINEL?');
  });

  it('Test I: what skills should I learn?', () => {
    const result = findBestAnswer('what skills should I learn?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is TRAJECTORY?');
  });

  it('Test J: how are all these things connected?', () => {
    const result = findBestAnswer('how are all these things connected?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is NEXUS?');
  });

  it('Test K: how safe am I online?', () => {
    const result = findBestAnswer('how safe am I online?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is SHIELD?');
  });

  it('Test L: what is the weather today? -> fallback', () => {
    const result = findBestAnswer('what is the weather today?');
    expect(result).toBeNull();
  });

  it('Test M: tell me a joke -> fallback', () => {
    const result = findBestAnswer('tell me a joke');
    expect(result).toBeNull();
  });

  it('Test N: what are Next Best Actions?', () => {
    const result = findBestAnswer('what are Next Best Actions?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What are Next Best Actions?');
  });

  it('Test O: who is SANKALP for?', () => {
    const result = findBestAnswer('who is SANKALP for?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('Who is SANKALP for?');
  });

  it('Test P: does this use an external AI?', () => {
    const result = findBestAnswer('does this use an external AI?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('Does the chatbot use an external AI?');
  });

  it('Test Q: can you check this email for a scam?', () => {
    const result = findBestAnswer('can you check this email for a scam?');
    expect(result).not.toBeNull();
    expect(result?.question).toBe('What is SENTINEL?');
  });

  describe('Adversarial and Generic Query Guards', () => {
    const invalidSingleWords = [
      'hello', 'hi', 'hey', 'help', 'study', 'career', 'security', 
      'risk', 'data', 'platform', 'dashboard', 'safety', 'scam'
    ];

    invalidSingleWords.forEach(word => {
      it(`should reject single generic word: "${word}"`, () => {
        expect(findBestAnswer(word)).toBeNull();
      });
    });

    const invalidPhrases = [
      'what should I do?',
      'what is bitcoin?',
      'what is quantum physics?',
      'who is the president?',
      'tell me a joke',
      'write me Python code',
      'what is the weather today?',
      'random completely unrelated sentence',
      'xyz123'
    ];

    invalidPhrases.forEach(phrase => {
      it(`should reject unrelated or generic phrase: "${phrase}"`, () => {
        expect(findBestAnswer(phrase)).toBeNull();
      });
    });

    const ambiguousPhrases = [
      'study planning',
      'career planning',
      'online safety',
      'academic risk',
      'scam detection'
    ];

    ambiguousPhrases.forEach(phrase => {
      it(`should handle ambiguous phrase gracefully: "${phrase}"`, () => {
        // Based on new strict threshold, these will likely fail fuzzy matching
        // which is preferred over false positives.
        expect(findBestAnswer(phrase)).toBeNull();
      });
    });
  });
});
