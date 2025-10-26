export default function OverviewTable({ character }: { character: any }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse bg-muted text-sm">
        <colgroup>
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <tbody>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Name</th>
            <td className="px-2 py-1 text-center">{character.name}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Display No.</th>
            <td className="px-2 py-1 text-center">{character.displayNumber}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Description</th>
            <td className="border-t px-2 py-1 text-center" colSpan={3}>
              <p>{character.itemUsage}</p>
              <p>{character.itemDesc}</p>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Trait</th>
            <td className="border-t px-2 py-1 text-center" colSpan={3}>
              {character.description}
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Position</th>
            <td className="border-t px-2 py-1 text-center">
              {character.position ? character.position.charAt(0).toUpperCase() + character.position.slice(1).toLowerCase() : "N/A"}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Tags</th>
            <td className="border-t px-2 py-1 text-center">{character.tagList.join(", ")}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Class</th>
            <td className="border-t px-2 py-1 text-center">
              {character.profession}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Subbranch</th>
            <td className="border-t px-2 py-1 text-center">
              {character.subProfessionId}
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Nation</th>
            <td className="border-t px-2 py-1 text-center">
              {character.nationId}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Faction</th>
            <td className="border-t px-2 py-1 text-center">
              {character.groupId}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}