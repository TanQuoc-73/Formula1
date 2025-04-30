// components/Table.tsx
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Column, SortConfig } from '@/types';

type Props<T> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  sortConfig: SortConfig<T> | null;
  onSort: (key: keyof T) => void;
  getKey: (item: T) => string | number;
};

export default function Table<T>({ title, data, columns, sortConfig, onSort, getKey }: Props<T>) {
  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && onSort(col.key)}
                  className="px-4 py-2 text-left cursor-pointer"
                >
                  <div className="flex items-center">
                    {col.label}
                    {col.sortable && (
                      <span className="ml-1">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={getKey(item)} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">{String(item[col.key])}</td>
                ))}
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
