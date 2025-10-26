import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import EntryTitle from "~/components/entry-title";
import CVTable from "~/components/operators/cv-table";
import OperatorFile from "~/components/operators/operator-file";
import OperatorGallery from "~/components/operators/operator-gallery";
import OverviewTable from "~/components/operators/overview-table";
import StatsTable from "~/components/operators/stats-table";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { getCharClass, getCharRarity } from "~/lib/char-utils";
import { fetchEntry, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import { getCharAvatar } from "~/lib/image-utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  if (!lang || !slug) throw new Response(null, { status: 400 });
  if (!SUPPORTED_LANGS.includes(lang)) throw new Response(null, { status: 404 });

  const data = await fetchEntry(lang, "operators", slug);
  if (!data) throw new Response(null, { status: 404 });

  return { lang, data };
}

export default function Page() {
  const { lang, data }: any = useLoaderData<typeof loader>();

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
                <BreadcrumbLink asChild><Link to={`/${lang}/operators`}>Operators</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{data.meta.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <EntryTitle
            title={data.meta.name}
            caption={`${getCharRarity(data.char.rarity)}★ ${getCharClass(data.char.profession)} Operator`}
            icon={getCharAvatar(`${data.meta.id}`)}
          />
          <Separator />
        </div>

        <section id="gallery">
          <OperatorGallery charSkins={data.charSkins} />
        </section>

        <section id="overview">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <Separator className="mb-4" />
          <OverviewTable character={data.char} />
          <CVTable charSkins={data.charSkins} voiceLangDict={data.voiceLangDict} />
        </section>
        
        <section id="attributes">
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <StatsTable phases={data.char.phases} favorKeyFrames={data.char.favorKeyFrames} />
        </section>

        {/* <section>
          <h2 className="text-xl font-semibold mb-2">Talents</h2>
          <Separator className="mb-4" />
          <TalentsTable talents={data.char.talents} />
        </section> */}

        {/* <section>
          <h2 className="text-xl font-semibold mb-2">Potentials</h2>
          <Separator className="mb-4" />
          <PotentialsTable potentialRanks={data.char.potentialRanks} />
        </section> */}

        {/* <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <Separator className="mb-4" />
          <SkillsTable skills={data.char.skills} charSkills={data.charSkills} allSkillLvlup={data.char.allSkillLvlup} items={items} />
        </section> */}

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

        <section>
          <h2 className="text-xl font-semibold mb-2">Operator File</h2>
          <Separator className="mb-4" />
          <OperatorFile storyTextAudio={data.charProfile.storyTextAudio} />
        </section>
      </div>
    </main>
  );
}