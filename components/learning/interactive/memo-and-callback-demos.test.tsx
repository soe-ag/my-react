import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CallbackStabilityDemo } from '@/components/learning/interactive/callback-stability-demo'
import { MemoFilterDemo } from '@/components/learning/interactive/memo-filter-demo'

describe('MemoFilterDemo interactions', () => {
  it('supports behavior toggles and filtering state transitions', () => {
    render(<MemoFilterDemo />)

    expect(screen.getByText('Items shown: 6.', { exact: false })).toBeInTheDocument()

    const toggleMemoButton = screen.getByRole('button', { name: 'Using useMemo' })
    fireEvent.click(toggleMemoButton)
    expect(screen.getByRole('button', { name: 'No memoization' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Unrelated rerender:/ }))
    expect(screen.getByRole('button', { name: 'Unrelated rerender: 1' })).toBeInTheDocument()

    const searchInput = screen.getByLabelText('Search lessons')
    fireEvent.change(searchInput, { target: { value: 'context' } })

    expect(screen.getByText('Context theme provider')).toBeInTheDocument()
    expect(screen.getByText('Items shown: 1.', { exact: false })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Core' }))
    expect(screen.getByText('Items shown: 0.', { exact: false })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Pattern' }))
    expect(screen.getByText('Items shown: 1.', { exact: false })).toBeInTheDocument()
  })
})

describe('CallbackStabilityDemo interactions', () => {
  it('toggles callback mode and updates child selection state', () => {
    render(<CallbackStabilityDemo />)

    expect(screen.getByText('Selected child: none')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Using useCallback' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Select A' }))
    expect(screen.getByText('Selected child: A')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Unrelated parent rerender:/ }))
    expect(screen.getByRole('button', { name: 'Unrelated parent rerender: 1' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Using useCallback' }))
    expect(screen.getByRole('button', { name: 'Inline callbacks' })).toBeInTheDocument()
    expect(screen.getByText('Active mode: new functions per render')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Select B' }))
    expect(screen.getByText('Selected child: B')).toBeInTheDocument()
  })
})
