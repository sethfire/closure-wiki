import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import OperatorGallery from "~/components/operators/operator-gallery";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { getCharClass, getCharRarity } from "~/lib/char-utils";
import { fetchEntry } from "~/lib/fetch-utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Closure Wiki" },
    { name: "description", content: "Welcome to Closure's Wiki, Doctor!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const data = await fetchEntry(lang!, "operators", slug!);
  if (!data) throw new Response("Not Found", { status: 404 });
  return { lang, data };
}

export default function Page() {
  const { lang, data }: any = useLoaderData<typeof loader>();

  return (
    <main className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href={`/${lang}/operators`}>Operators</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>{data.meta.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold mb-2">{data.meta.name}</h1>
          <div className="text-sm text-muted-foreground mb-4">{getCharRarity(data.char.rarity)}★ {getCharClass(data.char.profession)} Operator</div>
          <Separator />
        </div>

        <section id="gallery" className="scroll-mt-16">
          <OperatorGallery charSkins={data.charSkins} />
        </section>
      </div>
    </main>
  );
}