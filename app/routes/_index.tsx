
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  IconArrowUpRight,
  IconExternalLink,
  IconWorld,
} from "@tabler/icons-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunitySeedBoard } from "@/components/CommunitySeedBoard";
import { MembershipCenter } from "@/components/MembershipCenter";
import { PlanComparison } from "@/components/PlanComparison";
import { SeedSearchBridge } from "@/components/SeedSearchBridge";
import { SeedMapExplorer } from "@/components/SeedMapExplorer";

export function meta() {
  return [
    { title: "Seed Scout — Minecraft seed finder" },
    {
      name: "description",
      content: "Search Minecraft worlds by biome, structure, edition, and version.",
    },
  ];
}

export default function HomeRoute() {
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");

  const initialTab = ["find", "explore", "community", "account", "plans"].includes(requestedTab ?? "")
    ? requestedTab!
    : "find";

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (["find", "explore", "community", "account", "plans"].includes(requestedTab ?? "")) {
      setActiveTab(requestedTab!);
    }
  }, [requestedTab]);

  const activeToolUrl = activeTab === "explore" ? "/?tab=explore" : "/seedforge/index.html";
  const activeToolLabel = activeTab === "explore" ? "Open map" : "Open full finder";

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Seed Scout home">
          <span className="size-10 overflow-hidden rounded-2xl shadow-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F23075e961ced4bff93c6831b59f2b1c8%2F21ebe961a8a34f66b05c8d064fce08d9?format=webp&width=800&height=1200"
              alt="Seed Scout logo"
              className="size-full object-cover"
            />
          </span>
          <span>
            <span className="block text-base font-extrabold tracking-tight">Seed Scout</span>
            <span className="block text-xs text-muted-foreground">Your next world starts here</span>
          </span>
        </a>

        <a
          href={activeToolUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-semibold transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {activeToolLabel} <IconExternalLink size={16} />
        </a>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
        <section className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-xs font-bold text-accent-foreground">
              <IconWorld size={15} /> Java &amp; Bedrock
            </div>

            <h1 className="text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl">
              Find a world <span className="text-primary">worth exploring.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Search for the biomes, structures, and terrain you want. Choose your Minecraft edition and latest version in the finder below.
            </p>
          </div>

          <p className="max-w-xs text-xs leading-5 text-muted-foreground sm:text-right">
            Searches run in your browser. Seed results are estimates—check a world in-game before relying on it.
          </p>
        </section>

        <SeedSearchBridge />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-7">
          <TabsList aria-label="Seed tools" className="h-auto gap-1 rounded-xl border border-border bg-secondary p-1">
            <TabsTrigger value="find" className="rounded-lg px-4 py-2.5">Find seeds</TabsTrigger>
            <TabsTrigger value="explore" className="rounded-lg px-4 py-2.5">Explore a seed</TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg px-4 py-2.5">Community</TabsTrigger>
            <TabsTrigger value="account" className="rounded-lg px-4 py-2.5">Account &amp; Pro</TabsTrigger>
            <TabsTrigger value="plans" className="rounded-lg px-4 py-2.5">Pro plan</TabsTrigger>
          </TabsList>

          <TabsContent value="find">
            <section aria-label="Minecraft seed finder" className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_55px_-35px_hsl(var(--foreground)/0.28)]">
              <iframe
                title="SeedForge Minecraft seed finder"
                src="/seedforge/index.html"
                className="block h-[78vh] min-h-[760px] w-full bg-background sm:h-[1000px] lg:h-[1120px]"
                allow="fullscreen"
                referrerPolicy="no-referrer"
              />
            </section>
          </TabsContent>

          <TabsContent value="explore">
            <SeedMapExplorer />
          </TabsContent>

          <TabsContent value="community">
            <CommunitySeedBoard />
          </TabsContent>

          <TabsContent value="account">
            <MembershipCenter />
          </TabsContent>

          <TabsContent value="plans">
            <PlanComparison />
          </TabsContent>
        </Tabs>

        <footer className="mx-auto mt-5 flex max-w-6xl flex-col gap-2 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Seed discovery uses <a className="font-semibold text-primary underline-offset-4 hover:underline" href="https://github.com/fwsoapy/seedforge" target="_blank" rel="noreferrer">SeedForge</a>; world maps use <a className="font-semibold text-primary underline-offset-4 hover:underline" href="https://mcseedmap.net/" target="_blank" rel="noreferrer">MC Seed Map</a>.
          </p>
          <a className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline" href={activeToolUrl} target="_blank" rel="noreferrer">
            Open current tool in a new tab <IconArrowUpRight size={14} />
          </a>
        </footer>
      </main>
    </div>
  );
}
