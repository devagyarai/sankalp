class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}

// Polyfill IntersectionObserver in jsdom environment for tests
if (typeof window !== 'undefined') {
  (window as any).IntersectionObserver = IntersectionObserverMock;
}
