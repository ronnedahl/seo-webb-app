import KeywordSearch from "./components/KeywordSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            SEO Sökordsanalys
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Analysera sökvolym och konkurrens för dina nyckelord.
            Få insikter om hur många som söker på specifika termer.
          </p>
        </div>

        <KeywordSearch />
      </main>
    </div>
  );
}
