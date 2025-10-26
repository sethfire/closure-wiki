export default function StatsTable({ potentialRanks }: { potentialRanks: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-muted text-sm">
        <thead className="bg-gray-200 dark:bg-card">
        <tr>
          <th className="py-1 px-2">Potential&nbsp;1</th>
          <th className="py-1 px-2">Potential&nbsp;2</th>
          <th className="py-1 px-2">Potential&nbsp;3</th>
          <th className="py-1 px-2">Potential&nbsp;4</th>
          <th className="py-1 px-2">Potential&nbsp;5</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="border-t py-1 px-2 text-center">{potentialRanks[0].description}</td>
          <td className="border-t py-1 px-2 text-center">{potentialRanks[1].description}</td>
          <td className="border-t py-1 px-2 text-center">{potentialRanks[2].description}</td>
          <td className="border-t py-1 px-2 text-center">{potentialRanks[3].description}</td>
          <td className="border-t py-1 px-2 text-center">{potentialRanks[4].description}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}