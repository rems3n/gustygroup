**KeepItem** — one cell of the deliverables grid. Place in a 2-col grid with a top ink rule and hairline dividers between cells (the grid supplies the borders, not the item).

```jsx
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderTop:'1px solid var(--ink)'}}>
  <KeepItem title="A financial model that updates itself.">Wired to your accounting system…</KeepItem>
</div>
```
