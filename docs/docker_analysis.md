# Docker Build Performance Analysis

## Root Cause Analysis

Your Docker build is taking 15 minutes primarily because of how the environment is structured for **development**. Currently, you are treating your local machine like a production server, which is the "slow mode" for Docker.

### 1. Production Builds in Development
The `web` service is using a `Dockerfile` that runs `npm run build` (Next.js production compilation) every time you run `--build`. Production builds are computationally expensive and slow by design. In local development, we should use `npm run dev` which only compiles the pages you are actually visiting.

### 2. Lack of Source Code Mounting (Bind Mounts)
Currently, your code is copied into the image (`COPY . .`). This means any 1-character change in your code invalidates the Docker cache for all subsequent steps. To fix this, we should **mount** your source folder as a volume. This enables **Fast Refresh** (HMR): you change a file on your Mac, and it updates instantly in Docker without any rebuild.

### 3. Missing Layer Caching for Dependencies
In your log:
- `[web deps 3/4] COPY package.json package-lock.json ./` was NOT cached.
- This triggered a fresh `npm install` which took **7 minutes**.
This happens if `package.json` changes, but also if you use `docker compose down` and `docker compose up --build` too aggressively without a persistent cache.

### 4. Mirrored Pip Inefficiency
The `api` Dockerfile is currently using a Chinese mirror (`tsinghua.edu.cn`). Unless you are in China, this is likely bottlenecking your Python dependency installation.

### 5. Slow Metadata Checks
`[web internal] load metadata for node:18-alpine` took **177s**. Docker is checking the internet to see if there's a new `18-alpine` patch. This can be bypassed by pinning the specific image hash or using the `pull_policy: if_not_present`.

## Proposed Optimization Plan

1.  **Modify `docker-compose.yml`**:
    - Add `volumes` to mount `apps/web` and `apps/api` for instant code updates.
    - Set `command` to `npm run dev` for web.
2.  **Optimize `Dockerfile`**:
    - Pin base image versions.
    - Remove the `tsinghua` mirror from the API.
3.  **Local Dev Workflow**:
    - You will only need to run `--build` when you change `package.json` or `requirements.txt`. For code changes, the update happens in **under 1 second**.

Would you like me to implement these changes now? ❤️
