# @kutsolutions/cli

A CLI tool for automatically generating route files and directory structures for Astro pages and Express routers.

## Installation

```bash
npm install -g @kutsolutions/cli
```

## Usage

After installation, you can run the CLI tool using:

```bash
kut-cli
```

The tool will prompt you with options to create:

1. **Astro Page Route** - Creates an Astro page in `src/pages/<name>/index.astro`
2. **Express Router** - Creates an Express router in `functions/src/routes/<name>/<name>.ts`

## Example

```bash
$ kut-cli

? What type of route do you want to create? (Use arrow keys)
> Astro-Page-Route
  Express-Router

? What is the name of the route? about

Astro-Page-Route route created: src/pages/about/index.astro
```

## Generated Files

### Astro Page Route

When you select "Astro-Page-Route", the tool will generate a file at `src/pages/<name>/index.astro` with the following structure:

```astro
---
import Layout from "../../layouts/Layout.astro";
---

<Layout title="name">
  <div>name</div>
</Layout>

<script>  document.addEventListener("astro:page-load", () => {
  })
</script>
```

### Express Router

When you select "Express-Router", the tool will generate a file at `functions/src/routes/<name>/<name>.ts` with the following structure:

```typescript
import { Router } from 'express';

const nameRouter = Router();

nameRouter.get('/', (req, res) => {
  res.send('{{name}} endpoint');
});

nameRouter.post("/", async (request, response) => {
  const data = request?.body;

    if () {
    response.status(200).send(({ success: true, response: "yes"  }));
  } else response.status(400).send({ success: false, response: "no" });
})

export default nameRouter;
```

## Requirements

- Node.js 14.x or higher
- npm 6.x or higher

## Development

To modify or extend this CLI tool:

1. Clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test locally: `npm start`
5. Set executable permissions:
   - On Unix/Linux/Mac: `chmod +x index.js`
   - On Windows: `icacls index.js /grant Everyone:F`

## License

ISC

## Author

CJ Karkut
