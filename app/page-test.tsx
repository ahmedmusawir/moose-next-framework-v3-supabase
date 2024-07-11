import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Dashboard</h1>

      <Button variant="outline" size={"xl"} className="border-4 border-red-600">
        Click me
      </Button>

      <div className="border-4 border-red-600">Test Border Color</div>
    </main>
  );
}
