import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Page from '../app/page'

describe('Page', () => {
  it('renders a Sankalp heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toBe('Sankalp Platform')
  })
})
