import { describe, it, expect } from 'vitest';
import { getChatResponse } from '../services/chatbot';

describe('Chatbot Service', () => {
  it('responds to registration query', async () => {
    const response = await getChatResponse('How do I register to vote?');
    expect(response).toContain('register');
  });

  it('responds to EVM query', async () => {
    const response = await getChatResponse('What is an EVM?');
    expect(response).toContain('EVM');
  });

  it('responds to NOTA query', async () => {
    const response = await getChatResponse('What is NOTA?');
    expect(response).toContain('NOTA');
  });

  it('busts EVM hacking myth', async () => {
    const response = await getChatResponse('Can EVMs be hacked?');
    expect(response).toContain('Myth');
  });

  it('handles first-time voter query', async () => {
    const response = await getChatResponse('I am a first time voter');
    expect(response).toContain('first-time');
  });

  it('provides fallback for unknown queries', async () => {
    const response = await getChatResponse('random gibberish xyz123');
    expect(response.length).toBeGreaterThan(0);
    expect(response).toContain('help');
  });

  it('handles empty input', async () => {
    const response = await getChatResponse('');
    expect(response).toBe('');
  });
});
