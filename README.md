
# Stellarsonic

## Description
Stellarsonic is a blog website template for showcasing music mixes in a similar fashion to Mixcloud, except you get to have full control both over your content as well as styling if you choose to modify the code.

The project is built using Astro with some client-side code in Svelte. This means that you will get an incredibly fast, mostly statically generated site with a minimal footprint.

## Getting started
To get started, simply clone this repo and install dependencies:

```bash
npm install
```
### Development mode
When writing content and/or making changes to the code you can simply start the server in development mode.

```bash
npm run dev
```

### Building
When you are ready to build the site run:
```bash
npm run build
```
Once that is complete you can preview the result:
```bash
npm run preview
```

## Writing content
Content is written in markdown and stored in the `src/content` folder.
If you choose too host your images and audio tracks along with the site, they go into the `public/assets` folder.

### Mixes


```yaml
---
title: A new mix
subtitle: Optional subtitle
description: A short description
image: /assets/cover.jpg
tracks:
  - name: First track
    artist: Name of artist
    year: 2023
    duration: PT3M29S
  -
    ...
---

An article written in markdown
```
