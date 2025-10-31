import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { fetchEntries, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import {  getEnemyIconThumbnail } from "~/lib/image-utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Closure Wiki" },
    { name: "description", content: "Welcome to Closure's Wiki, Doctor!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang } = params;
  if (!lang) throw new Response(null, { status: 400 });
  if (!SUPPORTED_LANGS.includes(lang)) throw new Response(null, { status: 404 });

  const data = await fetchEntries(lang, "enemies");
  if (!data) throw new Response(null, { status: 404 });
  return { lang, data };
}

function getEnemyLevel(enemyLevel: any) {
  if (enemyLevel === "NORMAL") return "Normal";
  if (enemyLevel === "ELITE") return "Elite";
  if (enemyLevel === "BOSS") return "Boss";
  return "";
}

function getEnemyRarity(enemyLevel: any) {
  if (enemyLevel === "NORMAL") return "bg-[#A0A0A0]";
  if (enemyLevel === "ELITE") return "bg-[#FFFFA9]";
  if (enemyLevel === "BOSS") return "bg-[#FF0000]";
  return "bg-[#FFFFFF]";
}

function EnemyItem({ lang, enemy }: { lang: string; enemy: any }) {
  return (
    <Link
      key={enemy.slug}
      to={`/${lang}/enemies/${enemy.slug}`}
      discover="none"
    >
      <div className="group relative aspect-square bg-muted rounded overflow-hidden hover:opacity-80 transition-opacity">
        <img className="object-contain w-full h-full rounded scale-115"
          src={getEnemyIconThumbnail(enemy.slug)}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(0,0,0,1)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm">
          {enemy.isUnreleased && <span className="text-yellow-300">[CN] </span>}
          {enemy.name}<br />
          <span className="text-muted-foreground">{enemy.enemyLevel}</span>
        </div>
        <div className={`absolute left-0 right-0 bottom-0 h-1 ${getEnemyRarity(enemy.enemyLevel)}`} />
      </div>
    </Link>
  );
}

export default function Page() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  const filteredData = data.filter((entry: any) => !entry.hideInHandbook);
  const sortedData = [...filteredData].sort((a: any, b: any) => {
    if (a.isUnreleased !== b.isUnreleased) return a.isUnreleased ? -1 : 1;
    return 0;
  });

  return (
    <main className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to={`/${lang}`}>Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Enemies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold mb-2">Enemies</h1>
          <div className="text-sm mb-4">
            <span className="text-muted-foreground">Count:&nbsp;</span>
            {sortedData.length}
          </div>
          <Separator />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sortedData.map((entry: any) => (
            <EnemyItem key={entry.id} lang={lang} enemy={entry} />
          ))}
        </div>
      </div>
    </main>
  );
}