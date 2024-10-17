# 🎮 Steam Games SSR search, using Typesense, Next.js App Router and Instantsearch

![image](https://github.com/user-attachments/assets/cb51a00e-00b9-4f79-9fb3-303345b2ad35)

A blazingly fast, server-side rendered search application for Steam games, powered by Typesense, Next.js App Router, and React InstantSearch.

## Features

- Server-side rendering using Next.js App Router for improved performance and SEO
- Instant search functionality with Typesense
- Faceted search with dynamic filters
- Custom UI components using shadcn/ui

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/typesense-instantsearch-next-ssr.git
   cd typesense-instantsearch-next-ssr
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up Typesense:

   - Make sure you have Docker installed
   - Update the Typesense configuration in `src/lib/typesense.ts` if needed

4. Index the data:

   ```
   pnpm run index-typesense
   ```

5. Start the development server:
   ```
   pnpm run dev
   ```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You can now search for Steam games, apply filters, and explore the catalog.

## Configuration

The main configuration files are:

- `src/lib/typesense.ts`: Typesense client configuration
- `src/lib/schema.ts`: Data schema and attribute labels
- `docker-compose.yml`: Typesense Docker configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `components.json`: shadcn/ui configuration

You can modify these files to adjust the search behavior, data structure, Typesense setup, or UI styling.

## Custom Components

This project uses custom-styled React Instantsearch components built with shadcn/ui, which combines the accessibility of Radix UI with the utility-first approach of Tailwind CSS. These components are located in the `src/components/instantsearch` directory and include:

- Current Refinements
- A Card component for Hits
- Hits Per Page
- Sort By Dropdown Menu
- Facet Menu
- Range Menu with a Slider and a Form
- Numeric Menu with Radio Groups

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## Credits

The dataset used in this showcase is from Terenci Claramunt's ([@terencicp](https://github.com/terencicp)) public dataset of Steam Games released from 2013 up to 2023 listed here: https://www.kaggle.com/datasets/terencicp/steam-games-december-2023

## Acknowledgements

- [Typesense](https://typesense.org/) for the search engine
- [Next.js](https://nextjs.org/) for the React framework with App Router
- [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/) for search UI components
- [ShadcnUI](https://ui.shadcn.com/) for beautifully designed components
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Zod](https://zod.dev/) for schema validation
