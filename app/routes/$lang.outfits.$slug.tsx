import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import EntryTitle from "~/components/entry-title";
import { fetchEntry, SUPPORTED_LANGS } from "~/lib/fetch-utils";
import Notice from "~/components/notice";
import CarouselGallery from "~/components/carousel-gallery";
import { getCharacter, getCharAvatar } from "~/lib/image-utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  if (!lang || !slug) throw new Response(null, { status: 400 });
  if (!SUPPORTED_LANGS.includes(lang)) throw new Response(null, { status: 404 });

  const data = await fetchEntry(lang, "outfits", slug);
  if (!data) throw new Response(null, { status: 404 });

  return { lang, data };
}

export const meta = ({ data }: any) => {
  const { lang, data: outfit } = data;

  const title = outfit.summary.name;
  const description = outfit.summary.desc;
  // const image = outfit.summary.image;

  return [
    { title: title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Closure Wiki" },
    // { property: "og:image", content: image },

    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    // { name: "twitter:image", content: image },
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
                  <BreadcrumbLink asChild><Link to={`/${lang}/outfits`} discover="none">Outfits</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.summary.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <EntryTitle
              title={data.summary.name}
              caption={`Outfit`}
              // icon={getCharAvatar(`${data.summary.id}`)}
            />
            <Separator />
          </div>
          {data.summary.isUnreleased && <Notice title="Note" message="This outfit has not yet been released on the Global server of Arknights." />}

          <section id="gallery">
            <CarouselGallery images={[{
              src: getCharacter(encodeURIComponent(data.skin.portraitId.toLowerCase())),
              thumb: getCharAvatar(encodeURIComponent(data.skin.avatarId.toLowerCase())),
              download: getCharacter(encodeURIComponent(data.skin.portraitId.toLowerCase())),
              title: data.skin.displaySkin.skinGroupName,
              desc: data.skin.displaySkin.usage,
              display: "object-cover",
            }]} changeAspectonMobile={true} />
          </section>

          <section id="description">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <Separator className="mb-4" />
            <p>{data.skin.displaySkin.dialog}</p>
          </section>
        </div>
      </div>
    </main>
  );
}