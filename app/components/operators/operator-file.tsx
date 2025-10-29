import { Separator } from "../ui/separator";

export default function OperatorFile({ handbookInfo }: { handbookInfo: any }) {
  if (!handbookInfo) return null;
  if (!handbookInfo.storyTextAudio) return null;

  if (!Array.isArray(handbookInfo.storyTextAudio)) return null;
  if (handbookInfo.storyTextAudio.length === 0) return null;

  return (
    <div className="grid gap-4">
      {handbookInfo.storyTextAudio.map((profile: any, idx: number) => (
        <div className="p-4 bg-muted dark:bg-card rounded-lg shadow wrap-break-word" key={idx}>
          <h3 className="font-semibold mb-2">{profile.storyTitle}</h3>
          <Separator className="mb-2" />
          {profile.stories && profile.stories[0]?.storyText &&
            <div className="whitespace-pre-line">
              {profile.stories[0].storyText}
            </div>
          }
        </div>
      ))}
    </div>
  );
}