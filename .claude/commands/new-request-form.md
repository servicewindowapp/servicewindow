# /new-request-form — Scaffold Request Posting Form

Scaffold the requester-side form for posting a new food truck request. Includes all fields, validation, accessibility, and a submission handler stub.

## Invocation
```
/new-request-form
/new-request-form [output path]
```

Default output: `src/components/RequestForm/RequestForm.tsx`

---

## Fields Required — All With Validation

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `event_title` | text | Yes | 3–100 chars |
| `event_type` | select | Yes | Must be from enum |
| `location_address` | text + geocode | Yes | Non-empty, must resolve to lat/long |
| `location_notes` | textarea | No | Max 200 chars |
| `event_date` | date | Yes | Must be today or future |
| `start_time` | time | Yes | — |
| `end_time` | time | Yes | Must be after start_time |
| `headcount_max` | number | Yes | 1–5000, integer |
| `headcount_min` | number | No | 1–headcount_max if provided |
| `cuisine_prefs` | multi-select | No | Valid cuisine types only |
| `budget_min` | currency | No | > 0, ≤ budget_max if both provided |
| `budget_max` | currency | No | > 0, ≥ budget_min if both provided |
| `notes` | textarea | No | Max 500 chars |

---

## Generated Files

### `src/components/RequestForm/RequestForm.tsx`

```tsx
"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

// Flag: zod and react-hook-form must be installed — run /dependency-check zod react-hook-form @hookform/resolvers

const EVENT_TYPES = [
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'private_party', label: 'Private Party' },
  { value: 'hoa_community', label: 'HOA / Community Event' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'festival', label: 'Festival / Market' },
  { value: 'other', label: 'Other' },
] as const

const CUISINE_OPTIONS = [
  'American', 'BBQ', 'Mexican / Tacos', 'Asian Fusion', 'Mediterranean',
  'Seafood', 'Italian', 'Desserts', 'Vegan / Vegetarian', 'Indian',
  'Caribbean', 'Pizza', 'Sandwiches', 'Other',
] as const

const requestSchema = z.object({
  event_title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  event_type: z.enum(['corporate', 'private_party', 'hoa_community', 'wedding', 'festival', 'other']),
  location_address: z.string().min(1, 'Location is required'),
  location_notes: z.string().max(200).optional(),
  event_date: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().toDateString()),
    'Event date must be today or in the future'
  ),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
  headcount_max: z.number().int().min(1).max(5000),
  headcount_min: z.number().int().min(1).optional(),
  cuisine_prefs: z.array(z.string()).optional(),
  budget_min: z.number().positive().optional(),
  budget_max: z.number().positive().optional(),
  notes: z.string().max(500).optional(),
}).refine(
  (data) => data.end_time > data.start_time,
  { message: 'End time must be after start time', path: ['end_time'] }
).refine(
  (data) => !data.budget_min || !data.budget_max || data.budget_max >= data.budget_min,
  { message: 'Maximum budget must be greater than minimum', path: ['budget_max'] }
).refine(
  (data) => !data.headcount_min || data.headcount_min <= data.headcount_max,
  { message: 'Minimum headcount must be less than or equal to maximum', path: ['headcount_min'] }
)

type RequestFormValues = z.infer<typeof requestSchema>

interface RequestFormProps {
  onSubmitSuccess: (requestId: string) => void
  onCancel?: () => void
}

export function RequestForm({ onSubmitSuccess, onCancel }: RequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
  })

  const onSubmit = async (data: RequestFormValues) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call to POST /api/requests
      // const response = await createRequest({ ...data, cuisine_prefs: selectedCuisines })
      // onSubmitSuccess(response.id)
      console.log('Form submitted:', data)
    } catch (error) {
      // TODO: Handle error — display user-facing message
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Post a food truck request"
    >
      {/* Event Title */}
      <div>
        <Label htmlFor="event_title">
          Event name <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </Label>
        <Input
          id="event_title"
          type="text"
          placeholder="e.g., Cape Coral HOA Summer Night Market"
          aria-required="true"
          aria-invalid={!!errors.event_title}
          aria-describedby={errors.event_title ? 'event_title-error' : undefined}
          {...register('event_title')}
        />
        {errors.event_title && (
          <p id="event_title-error" role="alert" className="text-sm text-destructive">
            {errors.event_title.message}
          </p>
        )}
      </div>

      {/* Event Type */}
      <div>
        <Label htmlFor="event_type">
          Event type <span aria-hidden="true">*</span>
        </Label>
        <Select
          onValueChange={(value) => setValue('event_type', value as RequestFormValues['event_type'])}
        >
          <SelectTrigger
            id="event_type"
            aria-required="true"
            aria-invalid={!!errors.event_type}
          >
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.event_type && (
          <p role="alert" className="text-sm text-destructive">{errors.event_type.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location_address">
          Event location <span aria-hidden="true">*</span>
        </Label>
        <Input
          id="location_address"
          type="text"
          placeholder="e.g., 1234 Cape Coral Pkwy, Cape Coral, FL 33914"
          aria-required="true"
          aria-invalid={!!errors.location_address}
          aria-describedby="location-hint"
          {...register('location_address')}
        />
        <p id="location-hint" className="text-sm text-muted-foreground">
          Enter a full street address — this helps operators calculate travel distance.
        </p>
      </div>

      {/* Date and Time */}
      <div role="group" aria-labelledby="datetime-group-label">
        <p id="datetime-group-label" className="font-medium">
          Date and time <span aria-hidden="true">*</span>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="event_date">Date</Label>
            <Input
              id="event_date"
              type="date"
              aria-required="true"
              aria-invalid={!!errors.event_date}
              {...register('event_date')}
            />
          </div>
          <div>
            <Label htmlFor="start_time">Start time</Label>
            <Input
              id="start_time"
              type="time"
              aria-required="true"
              {...register('start_time')}
            />
          </div>
          <div>
            <Label htmlFor="end_time">End time</Label>
            <Input
              id="end_time"
              type="time"
              aria-required="true"
              aria-invalid={!!errors.end_time}
              aria-describedby={errors.end_time ? 'end_time-error' : undefined}
              {...register('end_time')}
            />
            {errors.end_time && (
              <p id="end_time-error" role="alert" className="text-sm text-destructive">
                {errors.end_time.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Headcount */}
      <div role="group" aria-labelledby="headcount-label">
        <p id="headcount-label" className="font-medium">
          Expected attendance <span aria-hidden="true">*</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="headcount_min">Minimum (optional)</Label>
            <Input
              id="headcount_min"
              type="number"
              min={1}
              placeholder="e.g., 50"
              {...register('headcount_min', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label htmlFor="headcount_max">Maximum</Label>
            <Input
              id="headcount_max"
              type="number"
              min={1}
              max={5000}
              placeholder="e.g., 200"
              aria-required="true"
              aria-invalid={!!errors.headcount_max}
              {...register('headcount_max', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      {/* Cuisine Preferences — multi-select via checkboxes */}
      <fieldset>
        <legend className="font-medium">Cuisine preferences (optional)</legend>
        <p className="text-sm text-muted-foreground">Select any that apply — leave blank to see all trucks.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CUISINE_OPTIONS.map((cuisine) => (
            <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={cuisine}
                checked={selectedCuisines.includes(cuisine)}
                onChange={(e) => {
                  setSelectedCuisines(prev =>
                    e.target.checked
                      ? [...prev, cuisine]
                      : prev.filter(c => c !== cuisine)
                  )
                }}
                className="rounded border-border"
              />
              {cuisine}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Budget Range */}
      <div role="group" aria-labelledby="budget-label">
        <p id="budget-label" className="font-medium">Budget range (optional)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="budget_min">Minimum ($)</Label>
            <Input
              id="budget_min"
              type="number"
              min={0}
              placeholder="e.g., 300"
              {...register('budget_min', { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label htmlFor="budget_max">Maximum ($)</Label>
            <Input
              id="budget_max"
              type="number"
              min={0}
              placeholder="e.g., 800"
              aria-invalid={!!errors.budget_max}
              {...register('budget_max', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Additional notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="e.g., This is an outdoor event in a parking lot — truck needs to be self-contained. No open flames per HOA rules."
          maxLength={500}
          {...register('notes')}
        />
        <p className="text-sm text-muted-foreground">Max 500 characters</p>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Posting request...' : 'Post request'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
```

### `src/components/RequestForm/RequestForm.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { RequestForm } from './RequestForm'

expect.extend(toHaveNoViolations)

describe('RequestForm', () => {
  it('renders all required fields', () => {
    render(<RequestForm onSubmitSuccess={jest.fn()} />)
    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/maximum/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RequestForm onSubmitSuccess={jest.fn()} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it.todo('shows validation errors when submitted with empty required fields')
  it.todo('shows an error when end time is before start time')
  it.todo('disables the submit button while submitting')
  it.todo('calls onSubmitSuccess with the new request ID on successful submission')
})
```

### `src/components/RequestForm/index.ts`

```ts
export { RequestForm } from './RequestForm'
```

---

## After Scaffolding

State:
1. Validation schema covers all fields with correct constraints
2. The submission handler is stubbed — wire to `POST /api/requests` in the next step
3. Location geocoding (address → lat/long) is not yet implemented — flag this as a follow-up: the `location_point` PostGIS field requires geocoding before DB insert
4. Cuisine multi-select is checkbox-based — if a combobox pattern is preferred, flag before rebuilding
