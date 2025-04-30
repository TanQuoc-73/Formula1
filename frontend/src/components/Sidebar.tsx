// components/Sidebar.tsx

// Sidebar của phần Admin DashBoard
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Admin Menu</h2>
        <ul className="mt-4 space-y-2">
          {['Dashboard', 'teams', 'drivers', 'races', 'race-results'].map((item) => (
            <li key={item}>
              <Link
                href={`/admin/${item === 'Dashboard' ? '' : item}`}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
              >
                {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
