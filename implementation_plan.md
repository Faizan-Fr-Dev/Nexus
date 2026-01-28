# Migration Plan: TypeScript to JavaScript

The goal is to convert the existing React codebase from TypeScript (`.ts`, `.tsx`) to JavaScript (`.js`, `.jsx`) without changing functionality.

## Proposed Changes

### 1. Configuration Changes
#### [MODIFY] [package.json](file:///f:/Nexus/Nexus/package.json)
- Remove `typescript`, `ts-node`, `@types/*` dependencies.
- Update build scripts if they rely on `tsc`.
- Remove `tsconfig.json`, `tsconfig.node.json`, `tsconfig.app.json`.
- Rename `vite.config.ts` to `vite.config.js`.

### 2. File Conversion Strategy
I will rename files and programmatically remove type annotations (interfaces, types, generics, `: Type`).

#### Components & Pages (`.tsx` -> `.jsx`)
- `src/main.tsx` -> `src/main.jsx`
- `src/App.tsx` -> `src/App.jsx`
- `src/components/**/*.tsx` -> `src/components/**/*.jsx`
- `src/pages/**/*.tsx` -> `src/pages/**/*.jsx`
- `src/context/**/*.tsx` -> `src/context/**/*.jsx`

#### Logic & Data (`.ts` -> `.js`)
- `src/data/**/*.ts` -> `src/data/**/*.js`
- `src/utils/**/*.ts` -> `src/utils/**/*.js` (if any)

#### Deletions
- `src/types/` (Folder containing only type definitions)
- `src/vite-env.d.ts`

### 3. Verification Plan
- Run `npm run dev` to ensure the app starts.
- Manual check of pages to ensure no regression.
