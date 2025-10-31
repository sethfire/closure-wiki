import { getEnemyAttackType, getEnemyDamageType, getEnemyLevelType, getEnemyMotionType } from "~/lib/enemy-utils";

export default function EnemyOverview({ enemyHandbook, enemyDatabase }: { enemyHandbook: any, enemyDatabase: any }) {
  if (!enemyHandbook) return null;

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
            <td className="px-2 py-1 text-center">{enemyHandbook.name}</td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Code</th>
            <td className="px-2 py-1 text-center">{enemyHandbook.enemyIndex}</td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Description</th>
            <td className="border-t px-2 py-1 text-center" colSpan={3}>
              <p>{enemyHandbook.description}</p>
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Type</th>
            <td className="border-t px-2 py-1 text-center">
              {getEnemyLevelType(enemyHandbook.enemyLevel)}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Location</th>
            <td className="border-t px-2 py-1 text-center">
              {getEnemyMotionType(enemyDatabase[0]?.enemyData?.motion.m_value)}
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Attack Pattern</th>
            <td className="border-t px-2 py-1 text-center">
              {getEnemyAttackType(enemyDatabase[0]?.enemyData?.applyWay?.m_value)}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Damage Type</th>
            <td className="border-t px-2 py-1 text-center">
              {enemyHandbook.damageType.map((type: string) => getEnemyDamageType(type)).join("/")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}