# JCI Continental Lagos Website

A modern website for Junior Chamber International Continental Lagos built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Iconsax React
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Code Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run the development server:

```bash
 pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building

Build the application for production:

```bash
pnpm build
```

### Running Production Build

```bash
pnpm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
└── ...
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

## Notes

- Images are currently placeholder spaces - actual images will be added during development
- The project is set up with a clean slate for development based on Figma designs
