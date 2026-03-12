# README Designer

Use this skill when you need to create or refresh a GitHub README in the same style as the `vidyaraut` project.

## Goal

Produce a README that is:
- visually strong on GitHub
- easy to scan
- accurate to the current repository
- structured for product understanding, setup, and deployment

## Style Rules

Always prefer this structure unless the repository clearly needs less:

1. Centered title block
2. Badge row
3. Short bold tagline
4. Quick links row
5. Key Features grouped into themed subsections
6. Tech Stack table
7. Project Structure tree
8. Installation and prerequisites
9. Environment/configuration section
10. Usage examples with real code snippets
11. Scripts section
12. CI / GitHub Actions section if present
13. Deployment section
14. Contribution section
15. License and contact section

## Design Language

- Use emoji-based headings for scanability
- Prefer short grouped bullets over long paragraphs
- Use Markdown tables where it improves clarity
- Use horizontal rules between major blocks when helpful
- Keep the top section visually strong and centered
- Make the README feel deployment-ready and product-oriented

## Accuracy Rules

- Do not invent features, deployment flows, routes, or environment variables
- Read `package.json`, app routes, deployment config, and workflow files first
- If screenshots or GIFs do not exist, provide a `docs/images/` placeholder plan instead of fake links
- Keep versions aligned to the actual current project

## Files To Inspect First

- `package.json`
- `README.md`
- `next.config.ts` or framework config
- deployment config such as `vercel.json`
- `.github/workflows/*`
- route/layout files under `src/app/`
- any repo-level `AGENTS.md`

## Reusable Prompt

If another assistant needs a direct prompt, reuse `docs/prompts/readme-style-prompt.md`.

## Done When

- README is visually polished
- structure is consistent
- setup and deployment info are current
- examples are real
- GitHub badges and workflow references are correct
