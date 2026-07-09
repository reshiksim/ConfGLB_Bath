# Colour Pipeline Notes

Date: 2026-07-08

## Code Audit

Search terms checked:

```text
srgbToLinear
hexToLinearRgb
hexToBaseColorFactor
setBaseColorFactor
baseColorFactor
setBaseColor
materials[0]
baseColorTexture
```

Findings:

- No `srgbToLinear` or `hexToLinearRgb` helper existed.
- A manual `hexToBaseColorFactor()` helper did exist in `src/components/ModelViewer.tsx`.
- Before this fix, normal app colour application called `setBaseColorFactor()` with a numeric `[r, g, b, a]` array.
- Alpha was included in that numeric array.
- The normal path now calls `setBaseColorFactor(hex)` with a CSS HEX string.
- No `viewer.model.materials[0]` usage exists.
- Materials are still targeted by stable names: `mat_bath_outer`, `mat_bath_inner`, `mat_hardware`.

## GLB Material Audit

Inspected files:

```text
public/models/libero.glb
public/models/selene.glb
```

Relevant findings:

```text
libero.glb mat_bath_outer baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
libero.glb mat_bath_inner baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
libero.glb mat_hardware baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
selene.glb mat_bath_outer baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
selene.glb mat_bath_inner baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
selene.glb mat_hardware baseColorFactor=[0.95736957,0.95736957,0.95736957,1] baseColorTexture=null
```

The configured GLB materials do not appear to use `baseColorTexture`, so current colour mismatch is more likely from material colour conversion, lighting, tone mapping, exposure, shadows, and roughness than from texture influence.

## Current Application Method

Exterior colour is now applied with:

```ts
material.pbrMetallicRoughness.setBaseColorFactor(hex);
material.pbrMetallicRoughness.setMetallicFactor(0);
material.pbrMetallicRoughness.setRoughnessFactor(selectedRoughness);
```

The same named-material path is reused for debug colour swatches.

## Remaining Limitations

The CSS swatch is a flat screen colour. The 3D surface is still affected by lighting, shadows, finish roughness, environment reflections, and tone mapping, so it will not be a perfect 1:1 match.
