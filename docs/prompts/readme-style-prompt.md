# README Style Prompt

Use this prompt when you want Codex or another AI assistant to generate a README with the same overall design language as the `vidyaraut` repository.

## Prompt

```text
You are an expert GitHub README designer.

Create a polished, scannable README.md for my project using the same style and structure as the best versions of the vidyaraut README.

Requirements:
- Use a strong project title at the top
- Add a centered badge block under the title
- Include a short bold tagline under the badges
- Add quick links such as Live Demo, Contact, GitHub, or Docs when available
- Use emoji-based section headings for scannability
- Keep sections concise, visual, and easy to skim
- Prefer grouped feature sections over long paragraphs
- Use Markdown tables where useful for tech stack or scripts
- Include a readable project tree
- Make the README feel modern, product-oriented, and deployment-ready

Required sections:
1. Project title with badges
2. Short project tagline / description
3. Key features grouped into 3-5 themed categories
4. Tech stack table with versions or notes
5. Project structure tree
6. Visual preview section with placeholders for screenshots or GIFs
7. Installation instructions with prerequisites
8. Environment/configuration section
9. Usage examples with code snippets
10. Available scripts
11. GitHub Actions / CI section if applicable
12. Deployment section (for example Vercel, Docker, etc.)
13. Contribution guidelines
14. License section
15. Contact / maintainer section

Style constraints:
- Keep it highly scannable
- Avoid generic filler text
- Prefer accurate, current project details over hype
- Use clean horizontal rules between major blocks
- Use bullet points and short subsections
- Use a centered intro section at the top

Design cues to preserve:
- Badge-heavy header
- Product-style “Key Features” section
- Clean “Tech Stack” table
- Strong “Project Structure” section
- Clear “Getting Started” / “Installation” flow
- Deployment-ready framing

When project data is incomplete:
- infer only the minimum necessary structure
- leave clear placeholders instead of inventing facts

Output:
- return only the final README.md content in Markdown
```

## Notes

- Replace the project facts with the real repository data before using the output.
- Add screenshot or GIF assets under a dedicated docs/images folder to keep the root clean.
- If the project has CI, deployment, or multiple runtimes, include those explicitly instead of using a generic stack description.
