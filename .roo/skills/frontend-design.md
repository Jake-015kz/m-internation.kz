# Roo Code Skill: Production-Grade Frontend Architecture (Next.js 15 + TypeScript + Tailwind)

## Skill Name

frontend-design

---

## Purpose

Build exceptional production-grade frontend interfaces using:

* Next.js App Router
* TypeScript (strict mode)
* SCSS
* Framer Motion

The goal is to produce work that looks handcrafted by a senior frontend engineer and product designer rather than generic AI-generated UI.

This skill applies when the user requests:

* Components
* Layouts
* Landing pages
* Dashboards
* SaaS applications
* Marketing websites
* Design systems
* UI architecture

---

# Language Rules

## Default Language

All user-facing content MUST be written in Russian unless explicitly requested otherwise.

This includes:

* Buttons
* Inputs
* Labels
* Navigation
* Tooltips
* Empty states
* Loading states
* Error messages
* Code comments

---

## Localization Compatibility

The project uses:

```txt
app/[locale]/
```

Supported locales:

```txt
ru
en
kz
```

Static strings must remain easy to extract into future i18n dictionaries.

Avoid deeply embedding text inside business logic.

---

# Development Workflow (STRICT)

## Rule 1: One Atomic File Unit (AFU) Per Response

You MUST create or modify exactly ONE Atomic File Unit (AFU).

An AFU consists of:
- main file (required)
- associated structural files like index.ts (optional, part of same unit)

Examples:

✅ Allowed — Single component AFU:

```txt
Button/
├── Button.tsx
└── index.ts
```

This is ONE AFU, not multiple files.

✅ Allowed — Single utility file:

```txt
cn.ts
```

❌ Forbidden — Multiple unrelated units:

```txt
Button.tsx
Header.tsx
index.ts
```

---

## Rule 2: Stop After File Creation

After generating a file:

1. Explain what was created.
2. Explain why it exists.
3. Stop immediately.

Wait for user approval before continuing.

---

## Rule 3: No Project Sweeps

Never generate:

* Entire pages
* Entire layouts
* Entire feature folders

before atomic components are approved.

Build from the smallest reusable unit upward.

---

# Design Direction

Before generating code, silently choose a design philosophy and stay consistent.

Examples:

* Swiss Editorial
* Brutalist Minimalism
* Industrial Interface
* Premium Dark Console
* Neo-Utility
* Technical Luxury

Do NOT explain the chosen philosophy unless asked.

---

# Visual Standards

## Typography

Avoid generic stacks.

Forbidden:

* Arial
* Roboto
* System UI defaults

Preferred:

* JetBrains Mono
* Manrope
* IBM Plex Sans
* Space Grotesk
* Geist Mono
* Instrument Serif

Use intentional pairings.

Example:

```txt
Headings:
JetBrains Mono

Body:
Manrope
```

---

## Colors

Avoid:

```txt
#ffffff
#000000
```

Prefer:

```txt
#FAFAFA
#F5F5F7
#121417
#171A1F
#1E232B
```

Always define semantic tokens.

Example:

```css
--background
--foreground
--border
--accent
--muted
```

Never hardcode colors repeatedly.

---

## Motion

Micro-interactions are required.

Buttons:

```css
active:scale-[0.98]
```

Transitions:

```css
transition-all duration-200
```

or

```css
transition-all duration-300
```

Custom easing preferred:

```css
cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Layout

Avoid:

* Generic centered cards
* Symmetrical AI layouts
* Random gradients

Prefer:

* Intentional asymmetry
* Negative space
* Thin borders
* Structured rhythm
* Visual hierarchy

---

# Next.js Architecture Rules

## Server First

Default:

```tsx
Server Component
```

Only use:

```tsx
'use client'
```

when required.

Examples:

* useState
* useEffect
* event handlers
* browser APIs

---

## Client Boundary

Client Components must remain leaf nodes whenever possible.

Never turn entire layouts into client components.

---

## Data Fetching

Use:

```tsx
Server Components
```

for:

* API requests
* CMS requests
* Database reads

Avoid client-side fetching unless necessary.

---

# TypeScript Rules

## Strict Mode

Never use:

```ts
any
```

Forbidden:

```ts
const data: any
```

Required:

```ts
interface Props
type User
```

---

## Explicit Props

Every component must have:

```ts
interface Props
```

Example:

```ts
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
```

---

## No Implicit Types

Avoid:

```ts
({ title })
```

Prefer:

```ts
({ title }: Props)
```

---

# React Rules

## Hooks

Follow hook rules strictly.

Never place hooks:

* inside conditions
* inside loops
* inside nested functions

---

## Components

One component per file.

Do not declare unrelated components inside the same file.

---

# Tailwind Rules

## Semantic Styling

Prefer design tokens.

Avoid:

```tsx
bg-[#171717]
text-[#fafafa]
```

Prefer:

```tsx
bg-background
text-foreground
```

---

## Arbitrary Values

Use only when absolutely necessary.

Avoid excessive:

```tsx
w-[437px]
mt-[53px]
```

Create tokens instead.

---

# Accessibility Rules

Every interactive element must support:

* Keyboard navigation
* Focus states
* Screen readers

Required:

```tsx
aria-label
```

when appropriate.

Required:

```tsx
focus-visible
```

styles.

Never remove focus indicators.

---

# Component Architecture

Required structure:

```txt
Button/
├── Button.tsx
└── index.ts
```

---

## Barrel Export

```ts
export { default } from './Button';
export * from './Button';
```

---

# Utility Function

## cn.ts

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

# Required Project Structure

```txt
src
├── app
│   └── [locale]
├── assets
│   ├── fonts
│   ├── icons
│   └── images
├── components
├── constants
├── layouts
├── sections
├── styles
└── utils
```

Do not invent alternative structures.

---

# Code Quality Checklist

Before responding, verify:

* Exactly ONE file generated
* TypeScript strict
* No any
* No duplicated code
* Proper accessibility
* Semantic Tailwind usage
* Mobile-first layout
* Russian UI text
* Correct export structure
* Client component only if necessary

If any item fails, regenerate internally before responding.

---

# Definition of Done

A task is complete only when:

1. The file compiles.
2. Types are valid.
3. Accessibility is present.
4. Design matches the chosen visual direction.
5. The component is reusable.
6. The component follows atomic architecture.
7. No additional files were created.
8. User approval is received before continuing.

```
```
