import { parseRichText } from "~/lib/parse";

function getUnlockPhase(phase: string) {
  switch (phase) {
    case "PHASE_0": return "E0";
    case "PHASE_1": return "E1";
    case "PHASE_2": return "E2";
    default: return "";
  }
}

function getUnlockPotential(potential: number) {
  switch (potential) {
    case 0: return "";
    case 1: return " P1";
    case 2: return " P2";
    case 3: return " P3";
    case 4: return " P4";
    case 5: return " P5";
    default: return "";
  }
}

export default function TalentsTable({ talents }: { talents: any[] }) {
  return (
    <div className="flex flex-col gap-4">
      {talents.filter((talent: any) => !talent.candidates[0].isHideTalent).map((talent: any, idx: number) => (
        <div className="overflow-x-auto" key={idx}>
          <table className="w-full border-collapse bg-muted text-sm">
            <thead className="bg-gray-200 dark:bg-card">
              <tr>
                <th className="py-1 px-2">Name</th>
                <th className="py-1 px-2">Unlock</th>
                <th className="py-1 px-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {talent.candidates.map((candidate: any, idx: number) => (
                <tr key={idx}>
                  <td className="border-t py-1 px-2 text-center">
                    {candidate.name}
                  </td>
                  <td className="border-t py-1 px-2 text-center">
                    {getUnlockPhase(candidate.unlockCondition.phase)}
                    {getUnlockPotential(candidate.requiredPotentialRank)}
                  </td>
                  <td className="border-t py-1 px-2 text-left whitespace-pre-line">
                    <span dangerouslySetInnerHTML={{ __html: parseRichText(candidate.description.replace(/\\n/g, "\n")) }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    ))}
    </div>
  )
}