# Svelte Web UI Template

This is a template for building web applications using Svelte. It includes a basic setup with authentication, a responsive navbar, and a sidebar.

## Fork or Copy this Project

You can fork this repository or copy the code to start your own Svelte project. Make sure to install the necessary dependencies before running the application.

## Developing

- Install dependencies:

```bash
npm i
```

- Create `.env` file to setup auth0 and API server variables:

```env
VITE_API_SERVER=<your API server base URL>
VITE_AUTH0_DOMAIN=<your Auth0 domain>
VITE_AUTH0_CLIENT_ID=<your Auth0 client ID>
```

- Start a development server:

```bash
npm run dev
```

### Add Page

To add a new page to your Svelte application:

- Create a new folder in `src/routes/` with the name of your new page.
- Inside that folder, create a `+page.svelte` file.
- Add your Svelte component code in the `+page.svelte` file.
- Add a new menu in the menu settings file `src/lib/menu.js`, add menu icon file into folder `src/lib/svgs/`

***profile page is a good example***

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Build Static Dist
Controls the build type for the SvelteKit application. Set to `static` to build a static site with pre-rendered pages.

**Usage:**
```bash
export SVELTEKIT_BUILD_TYPE=static 
npm run build
```

## Deploying

This project supports deployment to vercel as default, you can also build a static dist to deploy to nginx or other static file servers.

## Dockerize the application

- Build Static files

```bash
npm run build
```

- Build Docker image

```bash
docker build -t svelte-ui-template:latest .
```

- Run Docker container

***Change port number if needed***

```bash
docker run -d -p 80:80 svelte-ui-template
```

### GitHub Action

GitHub action `docker-publish.yml` will build and push the Docker image to GitHub Container Registry (ghcr.io) when you push changes to the main branch or create a new tag, you can also manually trigger a workflow run.

## Open Source

- Frame: [Svelte](https://svelte.dev/)
- UI: [DaisyUI](https://daisyui.com/)
- Auth: [Auth0](https://auth0.com/)
- Toast: [Svelte French Toast](https://svelte-french-toast.com/)
- ICON: [heroicons](https://heroicons.com/outline)