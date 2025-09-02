import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          JCI Continental Lagos
        </h1>
        <p className="text-center mt-4 text-gray-600">Welcome to our website</p>

        {/* Button Examples */}
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-semibold mb-4">Button Components</h2>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
