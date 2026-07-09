# Stage 0 Audit

Date: 2026-07-08

## Initial Folder Contents

The target folder was inspected before scaffolding:

```text
C:\Users\serge\Documents\Конфигуратор
```

Existing entries:

```text
.agents
.codex
.git
```

No `package.json`, `src`, `public`, or existing application files were present. The scaffold was added in place and the existing folders were preserved.

## Framework and Build Setup

- React
- TypeScript
- Vite
- `@google/model-viewer`
- Plain CSS

Node/npm observed during audit:

```text
node v24.14.0
npm 11.9.0
```

## Stage 1 Scope Implemented

- Typed `BathConfiguration` model.
- Standard colour options.
- Exterior and interior finish options.
- Hardware finish options.
- Popup/modal configurator shell.
- Basic `<model-viewer>` shell.
- Controls panel.
- Summary panel.
- Required preview disclaimer.
- Development browser hook: `window.openBathConfigurator(...)`.
- Model folder README.

## Deferred By Scope

- Custom NCS input.
- Local NCS lookup table.
- URL serialization.
- Screenshot.
- Print form.
- PDF generation.
- Email sending.
- Backend/serverless endpoint.

Stage 2 now adds named GLB material lookup and material mutation for:

```text
mat_bath_outer
mat_bath_inner
mat_hardware
```

The app does not use `materials[0]`.

## Model Notes

Default model config:

```ts
{
  modelId: 'libero',
  modelName: 'Libero',
  glbUrl: '/models/libero.glb'
}
```

Current model files observed:

```text
libero.glb
selene.glb
```

Embedded material names:

```text
libero.glb: mat_bath_outer, (unnamed), 0128_White, mat_hardware, mat_bath_inner
selene.glb: mat_bath_inner, mat_bath_outer, mat_hardware
```

## Non-ASCII Path Risk

The workspace path contains Cyrillic characters. Initial shell execution in the sandbox repeatedly failed with:

```text
windows sandbox: runner error: CreateProcessAsUserW failed: 5
```

Read-only and setup commands were run through the approved escalated path where necessary. If dependency installation, Vite, or TypeScript tooling fails later with path-related errors, use this recommended ASCII-only location:

```text
C:\Projects\bath-configurator
```

Files were not moved automatically.

## Verification Log

Dependency installation completed successfully:

```text
npm install
added 82 packages
found 0 vulnerabilities
```

Production build completed successfully:

```text
npm run build
tsc -b && vite build
vite v7.3.6 built successfully
```

Vite reported a large chunk warning after bundling `@google/model-viewer`. This is not a Stage 1 failure, but Stage 2+ can consider code-splitting if bundle size becomes a concern.

Development server started successfully with:

```text
npm run dev -- --host 127.0.0.1 --port 5173
```

Localhost check returned HTTP 200:

```text
http://127.0.0.1:5173
```

The `ModelViewer` preflights model URLs and does not mount `<model-viewer>` if a missing model path returns Vite's HTML fallback.

Scope check result:

```text
No source usage of materials[0], PDF, email, URL serialization, or NCS lookup files was found.
```

## Stage 2.1 Render Tuning

Render settings are centralized in `src/config/viewerScene.ts`.

Default scene:

```text
Neutral Product View
environment-image: neutral
exposure: 0.88
shadow-intensity: 1.1
shadow-softness: 0.6
tone-mapping: agx
camera-orbit: 25deg 72deg 2.5m
background: #f2f2f2
```

Secondary scene:

```text
Sales Presentation View
environment-image: neutral
exposure: 0.95
shadow-intensity: 1.25
shadow-softness: 0.45
tone-mapping: agx
camera-orbit: 30deg 70deg 2.35m
background: #eeeeec
```

Material display tuning:

```text
DISPLAY_BLACK: #111410
matte roughness: 0.9
matte metallic: 0
gloss roughness: 0.15
gloss metallic: 0.2
black hardware roughness: 0.28
white hardware: #f2f2f0
gold hardware roughness: 0.14
```

The Render Debug panel is development-only and uses `import.meta.env.DEV`.

Finish Check View:

```text
environment-image: /environments/neutral-reflection-studio.svg
exposure: 1
shadow-intensity: 1.15
shadow-softness: 0.5
tone-mapping: agx
camera-orbit: 30deg 70deg 2.35m
background: #f2f2f2
```

If the current model-viewer/browser combination does not accept SVG as `environment-image`, export `public/environments/neutral-reflection-studio.svg` to a 2:1 PNG or JPG and point the `finishCheck` preset to that file.

## NCS Import

Imported local NCS colour data from:

```text
C:\Users\serge\Documents\NCS - HEX.xlsx
```

Generated app data:

```text
src/data/ncs-colors.json
1950 colours
columns used: Цвет NCS, C, M, Y, K, HTML, R, G, B
```

Custom NCS behaviour:

- Accepts formats such as `NCS S 3050-Y80R`, `S 3050-Y80R`, `s3050-y80r`, `3050-Y80R`, `S 0500-N`, and `0500-N`.
- Normalizes production code to `S 3050-Y80R` / `S 0500-N`.
- If the code exists in the local table, the app stores the NCS code and applies its HEX preview to `mat_bath_outer`.
- If the code is valid but missing from the table, the app stores the NCS code with `hex: null` and shows a preview-unavailable warning.

`git status` could not be run in this shell because `git` was not available on PATH.

Manual checks:

- Popup opens and closes.
- Each control updates the summary.
- Missing model URLs show a non-crashing error.
- `<model-viewer>` JSX compiles.
