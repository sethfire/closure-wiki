import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import EntryTitle from "~/components/entry-title";
import CVTable from "~/components/operators/cv-table";
import OperatorFile from "~/components/operators/operator-file";
import OperatorGallery from "~/components/operators/operator-gallery";
import OverviewTable from "~/components/operators/overview-table";
import PotentialsTable from "~/components/operators/potentials-table";
import SkillsTable from "~/components/operators/skills-table";
import StatsTable from "~/components/operators/stats-table";
import TalentsTable from "~/components/operators/talent-table";
import { getCharClass, getCharRarity } from "~/lib/char-utils";
import { fetchEntry, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import { getCharAvatar } from "~/lib/image-utils";
import Notice from "~/components/notice";

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  if (!lang || !slug) throw new Response(null, { status: 400 });
  if (!SUPPORTED_LANGS.includes(lang)) throw new Response(null, { status: 404 });

  const data = await fetchEntry(lang, "operators", slug);
  if (!data) throw new Response(null, { status: 404 });

  return { lang, data };
}

export const meta = ({ data }: any) => {
  const { lang, data: char } = data;

  const title = char.summary.name;
  const description = char.summary.desc;
  const image = char.summary.image;

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
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-4">
            <h3 className="font-semibold mb-3">Navigation</h3>
            <nav className="space-y-1">
              <a href="/en" className="block px-3 py-2 text-sm rounded hover:bg-accent">Home</a>
              <a href="/en/operators" className="block px-3 py-2 text-sm rounded hover:bg-accent">Operators</a>
              <a href="/en/enemies" className="block px-3 py-2 text-sm rounded hover:bg-accent">Enemies</a>
            </nav>
          </div>
        </aside>

        <div className="w-full max-w-5xl flex flex-col gap-4">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to={`/${lang}`} discover="none">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to={`/${lang}/operators`} discover="none">Operators</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.summary.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <EntryTitle
              title={data.summary.name}
              caption={`${getCharRarity(data.character.rarity)}★ ${getCharClass(data.character.profession)} Operator`}
              icon={getCharAvatar(`${data.summary.id}`)}
            />
            <Separator />
          </div>
          {data.summary.isUnreleased && <Notice title="Note" message="This operator has not yet been released on the Global server of Arknights." />}

          <section id="gallery">
            <OperatorGallery charSkins={data.charSkins} />
          </section>

          <section id="overview">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <Separator className="mb-4" />
            <OverviewTable character={data.character} />
            <CVTable charSkins={data.charSkins} voiceLangDict={data.voiceLangDict} />
          </section>
          
          <section id="attributes">
            <h2 className="text-xl font-semibold mb-2">Attributes</h2>
            <Separator className="mb-4" />
            <StatsTable phases={data.character.phases} favorKeyFrames={data.character.favorKeyFrames} />
          </section>

          <section id="talents">
            <h2 className="text-xl font-semibold mb-2">Talents</h2>
            <Separator className="mb-4" />
            <TalentsTable talents={data.character.talents} />
          </section>

          <section id="potentials">
            <h2 className="text-xl font-semibold mb-2">Potentials</h2>
            <Separator className="mb-4" />
            <PotentialsTable potentialRanks={data.character.potentialRanks} />
          </section>

          <section id="skills">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <Separator className="mb-4" />
            <SkillsTable skills={data.character.skills} charSkills={data.charSkills} allSkillLvlup={data.character.allSkillLvlup} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Base Skills</h2>
            <Separator className="mb-4" />
            <div className="text-muted-foreground italic">TBD</div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Modules</h2>
            <Separator className="mb-4" />
            <div className="text-muted-foreground italic">TBD</div>
          </section>

          <section id="files">
            <h2 className="text-xl font-semibold mb-2">Operator File</h2>
            <Separator className="mb-4" />
            <OperatorFile handbookInfo={data.handbookInfo} />
          </section>
        </div>

        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-4">
            <h3 className="font-semibold mb-3">Table of Contents</h3>
            <nav className="space-y-1">
              <a href="#overview" className="block px-3 py-2 text-sm rounded hover:bg-accent">Overview</a>
              <a href="#attributes" className="block px-3 py-2 text-sm rounded hover:bg-accent">Attributes</a>
              <a href="#talents" className="block px-3 py-2 text-sm rounded hover:bg-accent">Talents</a>
              <a href="#potentials" className="block px-3 py-2 text-sm rounded hover:bg-accent">Potentials</a>
              <a href="#skills" className="block px-3 py-2 text-sm rounded hover:bg-accent">Skills</a>
              <a href="#files" className="block px-3 py-2 text-sm rounded hover:bg-accent">Files</a>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}