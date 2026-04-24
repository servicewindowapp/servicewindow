# /operator-listing — Scaffold Operator Profile/Listing Editor

Scaffold the operator-side listing editor covering all profile fields, validation, completeness indicator, and save/publish logic.

## Invocation
```
/operator-listing
/operator-listing [output path]
```

Default output: `src/components/ListingEditor/`

---

## Fields Required

| Field | Type | Required for publish | Validation |
|-------|------|---------------------|-----------|
| `truck_name` | text | Yes | 2–80 chars |
| `description` | textarea | No | Max 600 chars |
| `cuisine_types` | multi-select | Yes (≥1) | From enum list |
| `service_radius_m` | number + unit toggle | Yes | 1,000–80,000m (1–50 miles) |
| `base_location` | address + geocode | Yes | Must resolve to lat/long |
| `capacity_min` | number | No | ≥ 1, ≤ capacity_max |
| `capacity_max` | number | No | ≥ 1 |
| `pricing_model` | select | No | hourly, flat_rate, per_head, negotiable |
| `hourly_rate` | currency | Conditional | Required if pricing_model = hourly |
| `flat_rate` | currency | Conditional | Required if pricing_model = flat_rate |
| `photo_urls` | file upload | Yes (≥1) | JPG/PNG/WebP, max 5MB each, max 10 photos |
| `cert_urls` | file upload | No (needed for badge) | PDF/JPG/PNG, max 10MB |
| `social_links.website` | url | No | Valid URL |
| `social_links.instagram` | text | No | Handle only (no @, no full URL) |
| `social_links.facebook` | url | No | Valid URL |
| `social_links.yelp` | url | No | Valid URL |

---

## Completeness Indicator

The listing editor must show a completeness status telling the operator what's missing before their listing goes live. This is not a progress bar percentage — it's a specific checklist.

```tsx
interface ListingCompletenessProps {
  hasPhoto: boolean
  hasCuisineType: boolean
  hasServiceRadius: boolean
  hasBaseLocation: boolean
  hasActiveSubscription: boolean
}

function ListingCompleteness({ ... }: ListingCompletenessProps) {
  const requirements = [
    { label: 'At least one photo', met: hasPhoto },
    { label: 'Cuisine type selected', met: hasCuisineType },
    { label: 'Service radius set', met: hasServiceRadius },
    { label: 'Service location set', met: hasBaseLocation },
    { label: 'Active subscription', met: hasActiveSubscription },
  ]

  const allMet = requirements.every(r => r.met)

  return (
    <section aria-label="Listing completeness">
      {allMet ? (
        <p>Your listing is active and visible to requesters.</p>
      ) : (
        <>
          <p>Complete the following to publish your listing:</p>
          <ul>
            {requirements.filter(r => !r.met).map(r => (
              <li key={r.label}>{r.label}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
```

---

## Generated Files

### `src/components/ListingEditor/ListingEditor.tsx` (scaffold)

```tsx
"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const CUISINE_OPTIONS = [
  'American', 'BBQ', 'Mexican / Tacos', 'Asian Fusion', 'Mediterranean',
  'Seafood', 'Italian', 'Desserts', 'Vegan / Vegetarian', 'Indian',
  'Caribbean', 'Pizza', 'Sandwiches', 'Greek', 'Japanese', 'Other',
] as const

const PRICING_MODELS = [
  { value: 'hourly', label: 'Hourly rate' },
  { value: 'flat_rate', label: 'Flat rate per event' },
  { value: 'per_head', label: 'Per person' },
  { value: 'negotiable', label: 'Negotiable — contact me' },
] as const

const listingSchema = z.object({
  truck_name: z.string().min(2, 'Truck name must be at least 2 characters').max(80),
  description: z.string().max(600).optional(),
  cuisine_types: z.array(z.string()).min(1, 'Select at least one cuisine type'),
  service_radius_m: z.number().int().min(1000).max(80000),
  base_location: z.string().min(1, 'Service location is required'),
  capacity_min: z.number().int().min(1).optional(),
  capacity_max: z.number().int().min(1).optional(),
  pricing_model: z.enum(['hourly', 'flat_rate', 'per_head', 'negotiable']).optional(),
  hourly_rate: z.number().positive().optional(),
  flat_rate: z.number().positive().optional(),
  social_links: z.object({
    website: z.string().url().optional().or(z.literal('')),
    instagram: z.string().regex(/^[a-zA-Z0-9._]*$/, 'Enter your handle only — no @ symbol').optional(),
    facebook: z.string().url().optional().or(z.literal('')),
    yelp: z.string().url().optional().or(z.literal('')),
  }).optional(),
}).refine(
  data => !data.capacity_min || !data.capacity_max || data.capacity_min <= data.capacity_max,
  { message: 'Minimum capacity must be less than or equal to maximum', path: ['capacity_min'] }
).refine(
  data => data.pricing_model !== 'hourly' || !!data.hourly_rate,
  { message: 'Enter your hourly rate', path: ['hourly_rate'] }
).refine(
  data => data.pricing_model !== 'flat_rate' || !!data.flat_rate,
  { message: 'Enter your flat rate per event', path: ['flat_rate'] }
)

type ListingFormValues = z.infer<typeof listingSchema>

interface ListingEditorProps {
  initialValues?: Partial<ListingFormValues>
  photoUrls: string[]
  certUrls: string[]
  hasActiveSubscription: boolean
  onSave: (values: ListingFormValues) => Promise<void>
}

export function ListingEditor({
  initialValues,
  photoUrls,
  certUrls,
  hasActiveSubscription,
  onSave,
}: ListingEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    initialValues?.cuisine_types ?? []
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: initialValues,
  })

  const pricingModel = watch('pricing_model')

  const completeness = {
    hasPhoto: photoUrls.length > 0,
    hasCuisineType: selectedCuisines.length > 0,
    hasServiceRadius: true,  // determined by form value
    hasBaseLocation: true,   // determined by form value
    hasActiveSubscription,
  }

  const onSubmit = async (data: ListingFormValues) => {
    setIsSaving(true)
    try {
      await onSave({ ...data, cuisine_types: selectedCuisines })
    } catch (err) {
      // TODO: display user-facing error
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Edit truck listing">

      {/* Completeness indicator */}
      {/* TODO: render ListingCompleteness component */}

      {/* Truck Name */}
      {/* Description */}
      {/* Cuisine Types — multi-select checkboxes */}
      {/* Service Radius — number input with mi/km toggle */}
      {/* Base Location — address input with geocoding */}
      {/* Capacity Range */}
      {/* Pricing Model — select + conditional rate field */}
      {/* Photos — upload section (stub: photo upload requires Supabase Storage — flag) */}
      {/* Health Certifications — upload section (stub) */}
      {/* Social Links */}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSaving}
          aria-busy={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save listing'}
        </button>
      </div>

      {/* Photo upload flag */}
      {/* 
        🟡 IMPLEMENTATION NOTE — Photo Upload
        Photo and certification uploads require Supabase Storage (or equivalent).
        See docs/webdev-standards.md — photo uploads are disabled until Supabase Pro
        is configured per CLAUDE.md. Wire upload buttons to Supabase Storage bucket
        'listings' with path: listings/{operator_id}/{filename}
        Max file size: 5MB for photos, 10MB for certs
        Accepted types: image/jpeg, image/png, image/webp (photos); application/pdf, image/* (certs)
      */}

    </form>
  )
}
```

### Test stub

```tsx
// src/components/ListingEditor/ListingEditor.test.tsx
describe('ListingEditor', () => {
  it('renders all required fields', () => { /* TODO */ })
  it('has no accessibility violations', async () => { /* TODO — axe check */ })
  it('shows validation error when no cuisine type is selected on submit', async () => { /* TODO */ })
  it('shows hourly rate field only when hourly pricing model is selected', async () => { /* TODO */ })
  it('shows completeness checklist when required fields are missing', async () => { /* TODO */ })
  it('calls onSave with correct values on valid submission', async () => { /* TODO */ })
  it.todo('handles photo upload — pending Supabase Storage implementation')
})
```

---

## Flags

1. **Geocoding is not included** — the `base_location` and `service_radius_m` fields require converting a text address into a `geography(POINT)` before DB insert. This needs a geocoding API (Google Maps Geocoding, Mapbox, or Supabase's PostGIS functions with an address lookup). Flag this as a dependency decision before implementing.

2. **Photo uploads** — require Supabase Storage bucket `listings` to be configured. Per `CLAUDE.md`, photo uploads are deferred until Supabase Pro. The upload UI can be scaffolded with a disabled state and a clear message to the operator about when it will be available.

3. **Service radius display** — the DB stores meters. The UI should allow input in miles (converted to meters on save), since the target market is US-based (SWFL).
