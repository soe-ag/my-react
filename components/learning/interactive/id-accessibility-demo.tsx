'use client'

import { useId, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type FieldCardProps = {
  title: string
  helper: string
}

function AccessibleField({ title, helper }: FieldCardProps) {
  const inputId = useId()
  const helperId = `${inputId}-helper`
  const [value, setValue] = useState('')

  return (
    <div className="space-y-2 rounded-lg border bg-background/80 p-3">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground/90">
        {title}
      </label>
      <Input
        id={inputId}
        aria-describedby={helperId}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type to confirm label + hint wiring"
      />
      <p id={helperId} className="text-xs text-muted-foreground">
        {helper}
      </p>
      <p className="text-xs text-muted-foreground">Generated id: {inputId}</p>
    </div>
  )
}

function AccessibleCheckbox() {
  const id = useId()
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background/80 p-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        className="h-4 w-4"
      />
      <label htmlFor={id} className="text-sm text-foreground/90">
        Enable weekly digest
      </label>
      <span className="ml-auto text-xs text-muted-foreground">{id}</span>
    </div>
  )
}

export function IdAccessibilityDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Reusable Field Instances</CardTitle>
          <CardDescription>
            Same component rendered twice, each with unique deterministic IDs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <AccessibleField title="Email" helper="We only use this for account notifications." />
          <AccessibleField title="Display Name" helper="Shown on your public profile." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ID Wiring Checks</CardTitle>
          <CardDescription>
            Label click and ARIA linking both rely on stable useId output.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <AccessibleCheckbox />
          <p>
            Click each label to verify it focuses the matching control. useId keeps these
            relationships unique even when components are duplicated.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
