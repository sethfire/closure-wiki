import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import EntryTitle from "~/components/entry-title";
import { fetchEntry, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import { getEnemyIcon } from "~/lib/image-utils";
import Notice from "~/components/notice";
import EnemyOverview from "~/components/enemies/enemy-overview";
import { getEnemyLevelType } from "~/lib/enemy-utils";
import { parseRichText } from "~/lib/parse";

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  if (!lang || !slug) throw new Response(null, { status: 400 });
  if (!SUPPORTED_LANGS.includes(lang)) throw new Response(null, { status: 404 });

  const data = await fetchEntry(lang, "enemies", slug);
  if (!data) throw new Response(null, { status: 404 });

  return { lang, data };
}

export const meta = ({ data }: any) => {
  const { lang, data: enemy } = data;

  const title = enemy.summary.name;
  const description = enemy.summary.desc;
  const image = enemy.summary.image;

  return [
    { title: title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Closure Wiki" },
    { property: "og:image", content: image },

    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
};

export default function Page() {
  const { lang, data }: any = useLoaderData<typeof loader>();

  return (
    <main className="w-full">
      <div className="flex justify-center gap-6 p-4">
        <div className="w-full max-w-5xl flex flex-col gap-4">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to={`/${lang}`} discover="none">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to={`/${lang}/enemies`} discover="none">Enemies</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.summary.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <EntryTitle
              title={data.summary.name}
              caption={`${getEnemyLevelType(data.enemyHandbook.enemyLevel)} Enemy`}
              icon={getEnemyIcon(`${data.summary.id}`)}
            />
            <Separator />
          </div>
          {data.summary.isUnreleased && <Notice title="Note" message="This enemy has not yet been released on the Global server of Arknights." />}

          <section id="overview">
            {/* <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <Separator className="mb-4" /> */}
            <EnemyOverview enemyHandbook={data.enemyHandbook} enemyDatabase={data.enemyDatabase} />
          </section>

          {data.enemyHandbook.abilityList && Array.isArray(data.enemyHandbook.abilityList) && data.enemyHandbook.abilityList.length > 0 && (
            <section id="traits">
              <h2 className="text-xl font-semibold mb-2">Traits</h2>
              <Separator className="mb-2" />
              <ul className="list-disc pl-6">
                {data.enemyHandbook.abilityList.map((ability: any, index: number) =>
                  ability.textFormat === "TITLE" 
                  ? (<li key={index} className="font-bold text-lg mt-4 mb-1 list-none">{ability.text}</li>) 
                  : (
                      <li key={index} dangerouslySetInnerHTML={{ __html: parseRichText(ability.text) }} />
                    )
                )}
            </ul>
          </section>
          )}
        </div>
      </div>
    </main>
  );
}