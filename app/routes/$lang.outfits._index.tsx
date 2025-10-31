import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { getCharRarity, getCharRarityColor } from "~/lib/char-utils";
import { fetchEntries, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import { getBranchIcon, getCharPortraitThumbnail, getClassIcon } from "~/lib/image-utils";

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

  const data = await fetchEntries(lang, "outfits");
  if (!data) throw new Response(null, { status: 404 });
  return { lang, data };
}

function OutfitItem({ lang, outfit }: { lang: string; outfit: any }) {
  return (
    <Link
      key={outfit.id}
      to={`/${lang}/outfits/${outfit.slug}`}
      discover="none"
    >
      <div className="group relative aspect-1/2 bg-muted rounded overflow-hidden hover:opacity-80 transition-opacity">
        <img className="object-contain w-full h-full rounded"
          src={getCharPortraitThumbnail(encodeURIComponent(outfit.portraitId.toLowerCase()))}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(0,0,0,1)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm">
          <span style={{
            textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
          }}>
            {outfit.isUnreleased && <span className="text-yellow-300">[CN] </span>}
            {outfit.name}
          </span>
          <br />
          <span className="text-muted-foreground">{outfit.modelName}</span>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-1" style={{ backgroundColor: outfit.color }}></div>
      </div>
    </Link>
  );
}

export default function Page() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  const sortedData = [...data].sort((a: any, b: any) => b.obtainDate - a.obtainDate);

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
                <BreadcrumbPage>Outfits</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold mb-2">Outfits</h1>
          <div className="text-sm mb-4">
            <span className="text-muted-foreground">Count:&nbsp;</span>
            {sortedData.length}
          </div>
          <Separator />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sortedData.map((entry: any) => (
            <OutfitItem key={entry.id} lang={lang} outfit={entry} />
          ))}
        </div>
      </div>
    </main>
  );
}