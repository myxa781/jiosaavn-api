# JioSaavn API

![GitHub License](https://img.shields.io/github/license/sumitkolhe/jiosaavn-api)
![GitHub Release](https://img.shields.io/github/v/release/sumitkolhe/jiosaavn-api)

An Unofficial API for downloading high-quality songs, albums, playlists, and more from [JioSaavn](https://jiosaavn.com).

> [!IMPORTANT]
> **Fork Disclaimer & Upstream Sync**
> This repository is a customized fork of the original [sumitkolhe/jiosaavn-api](https://github.com/sumitkolhe/jiosaavn-api).
> 
> **How this fork differs:**
> - **Radio Module Integration:** Adds support for radio endpoints (featured, genre, and artist stations), allowing the creation of radio stations and fetching song list streams.
> - **Build & Deployment Adjustments:** Custom build configurations, improved Docker support, and optimized routing adjustments for Vercel.
>
> **Repository Updates (Upstream Sync):**
> - The repository is configured to automatically sync with the upstream repository every Sunday at 03:00 UTC via the [Sync with upstream](.github/workflows/upstream-sync.yaml) GitHub Actions workflow (which can also be triggered manually).
> - During synchronization, a `--strategy-option=ours` merge is used. This automatically resolves any conflicts by prioritizing our custom changes, ensuring our features (like the Radio module) are not overwritten, while seamlessly pulling new upstream features and fixes.

## 📚 Documentation

Check out the [API documentation](https://saavn.dev/docs) for detailed information on how to use the API.

## 📰 Changelog

For a detailed list of changes, see the [CHANGELOG](CHANGELOG.md).

## 🔌 Running Locally

1. Clone the repository:

   ```sh
   git clone https://github.com/lampame/jiosaavn-api
   cd jiosaavn-api
   ```

### Using Docker

```sh
docker-compose up
```

OR

### Manually

> [!NOTE]
> You need `Bun(1.0.29+)` or `Node.js(v20+)`

2. Install the required dependencies:

   ```sh
   bun install
   ```

3. Launch the development server:

   ```sh
   bun run dev
   ```

## ☁️ Deploying Your Own Instance

JioSaavn API can be deployed to either Cloudflare Workers or Vercel. Below are the instructions for deploying to each platform.

### Cloudflare Workers

[![Deploy with Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lampame/jiosaavn-api)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lampame/jiosaavn-api)

## 📜 License

This project is distributed under the [MIT License](https://opensource.org/licenses/MIT). For more information, see the [LICENSE](LICENSE) file included in this repository.
