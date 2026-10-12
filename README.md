# RRFOLIO

Rishabh Raj's cinematic portfolio: research, markets, and systems.

A separate portfolio built with Next.js static export, React, TypeScript and a custom Three.js scene. Six linked chapters move from a crimson signal field through a blue architectural scene into selected work, experiments, trajectory and contact. The visual palette follows the supplied crimson, blue, cyan and magenta reference images.

## Develop

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run build
node --test tests/*.test.cjs
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds on pushes to `main` and deploys the static `out/` directory. The production base path is `/RRFOLIO`.

Site: https://aerraj.github.io/RRFOLIO/

Content: `content/portfolio.ts`. Main experience: `components/living-portfolio.tsx`. Procedural art: `components/signal-sculpture.tsx`.

Motion pauses offscreen and in hidden tabs, supports `prefers-reduced-motion`, and has a visible pause button. No audio, scroll hijacking, tracking or account requirements.

## Visual credits

- Retro computer photograph: Lorenzo Herrera, Unsplash (user-supplied).
- Crimson and blue illustrations: user-supplied images.
- Narrative and motion inspiration: https://ysuriadesign.co/ and the user's selections on https://vibrant.design/. The implementation and procedural scene are original.
