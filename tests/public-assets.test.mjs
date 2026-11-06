import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const siteUrl = 'https://mangeshraut712.github.io/vidyaraut'
const socialImageUrl = `${siteUrl}/home%20picture.jpeg`

test('the locale homepage links to the checked-in resume asset', async () => {
  const homepage = await readFile(new URL('../out/en/index.html', import.meta.url), 'utf8')

  assert.ok(
    homepage.includes('href="/vidyaraut/Vidya_Raut_Resume.md"'),
    'the resume CTA should not point to a missing PDF',
  )
})

test('root and locale pages expose a reachable social-preview image', async () => {
  const [rootPage, localePage] = await Promise.all([
    readFile(new URL('../out/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../out/en/index.html', import.meta.url), 'utf8'),
  ])

  for (const [name, page] of [['root page', rootPage], ['locale homepage', localePage]]) {
    assert.ok(
      page.includes(`property="og:image" content="${socialImageUrl}"`),
      `the ${name} should expose the checked-in social-preview image`,
    )
    assert.ok(
      page.includes(`name="twitter:image" content="${socialImageUrl}"`),
      `the ${name} should expose the checked-in Twitter image`,
    )
  }
})

test('the locale homepage keeps rendered image assets inside the static-site base path', async () => {
  const homepage = await readFile(new URL('../out/en/index.html', import.meta.url), 'utf8')

  assert.ok(
    homepage.includes('href="/vidyaraut/home picture.jpeg"'),
    'the priority homepage image should retain the GitHub Pages base path',
  )
  assert.ok(
    !homepage.includes('href="/home picture.jpeg"'),
    'the priority homepage image should not request from the domain root',
  )
  assert.ok(
    homepage.includes('src="/vidyaraut/logo.png"'),
    'site logos should retain the GitHub Pages base path',
  )
})

test('header section links on locale subpages retain the static-site base path', async () => {
  const projectsPage = await readFile(new URL('../out/en/projects/index.html', import.meta.url), 'utf8')

  assert.ok(
    projectsPage.includes('href="/vidyaraut/en#home"'),
    'the Home section link should stay within the deployed site',
  )
  assert.ok(
    !projectsPage.includes('href="/en#home"'),
    'the Home section link should not resolve from the domain root',
  )
})
