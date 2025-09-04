import { cn } from "../../utils/utils";
interface Column<T> {
  key: string;
  header?: React.ReactNode;
  render: (row: T) => React.ReactNode;
  headerRowclassName?: string;
  rowClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  rowKey: (row: T, index: number) => string;
}

const DataTable = <T,>({
  data,
  columns,
  loading,
  rowKey,
}: DataTableProps<T>) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className={cn("px-4 py-3 text-start text-xs font-medium text-gray-500 bg-gray-100 uppercase", column.headerRowclassName)}>
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      className="px-4 py-6 text-xs text-gray-500"
                      colSpan={columns.length}
                    >
                      Đang tải...
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={rowKey(row, index)}>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={cn("px-4 py-3 whitespace-nowrap text-xs text-gray-600", col.rowClassName)}
                        >
                          {col.render(row)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
