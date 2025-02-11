import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "./DataTable"

interface DataTableHeaderProps<T> {
  columns: ColumnDef<T>[]
  sortBy?: string
  order: "asc" | "desc"
  onSort: (columnId: string) => void
}

export function DataTableHeader<T>({ columns, sortBy, order, onSort }: DataTableHeaderProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead key={column.id} onClick={() => onSort(column.id)} className="cursor-pointer">
            <div className="flex items-center">
              {column.header}
              {sortBy === column.id && (
                <ArrowUpDown className={`ml-2 h-4 w-4 ${order === "desc" ? "transform rotate-180" : ""}`} />
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

