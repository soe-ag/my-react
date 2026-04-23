'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Errors = {
  email?: string
  password?: string
  form?: string
}

function validateEmail(value: string) {
  if (!value.includes('@') || value.trim().length < 5) {
    return 'Enter a valid email address.'
  }
  return ''
}

function validatePassword(value: string) {
  if (value.length < 8) {
    return 'Password must be at least 8 characters.'
  }
  return ''
}

export function ControlledFormsBoundaryDemo() {
  const [strictSubmit, setStrictSubmit] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const isFieldValid = useMemo(() => {
    return !validateEmail(email) && !validatePassword(password)
  }, [email, password])

  function onEmailChange(value: string) {
    setEmail(value)
    setErrors((previous) => ({
      ...previous,
      email: validateEmail(value) || undefined,
      form: undefined,
    }))
  }

  function onPasswordChange(value: string) {
    setPassword(value)
    setErrors((previous) => ({
      ...previous,
      password: validatePassword(value) || undefined,
      form: undefined,
    }))
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    const nextErrors: Errors = {
      email: emailError || undefined,
      password: passwordError || undefined,
    }

    if (strictSubmit && !email.endsWith('@example.com')) {
      nextErrors.form = 'Strict mode requires an @example.com email.'
    }

    setErrors(nextErrors)

    if (!nextErrors.email && !nextErrors.password && !nextErrors.form) {
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Controlled Form</CardTitle>
          <CardDescription>
            Field-level checks run immediately; strict cross-field rule applies on submit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label htmlFor="pattern-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="pattern-email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="you@example.com"
              />
              {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="pattern-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="pattern-password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="At least 8 characters"
              />
              {errors.password ? <p className="text-xs text-red-600">{errors.password}</p> : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                variant={strictSubmit ? 'default' : 'outline'}
                onClick={() => setStrictSubmit((previous) => !previous)}
              >
                Strict submit rule: {strictSubmit ? 'On' : 'Off'}
              </Button>
            </div>

            {errors.form ? <p className="text-xs text-red-600">{errors.form}</p> : null}
            {submitted ? (
              <p className="text-xs text-emerald-700">
                Submitted successfully with current boundaries.
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Boundary View</CardTitle>
          <CardDescription>
            Track which checks happen during typing versus on submit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Instant field checks:{' '}
            <span className="font-medium text-foreground/85">Email format and password length</span>
          </p>
          <p>
            Submit boundary check:{' '}
            <span className="font-medium text-foreground/85">
              {strictSubmit ? 'Requires @example.com email' : 'No strict domain rule'}
            </span>
          </p>
          <p>
            Overall field validity:{' '}
            <span className="font-medium text-foreground/85">
              {isFieldValid ? 'Valid' : 'Invalid'}
            </span>
          </p>
          <p>
            This separation keeps per-keystroke feedback fast while preserving stronger checks only
            at submit time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
