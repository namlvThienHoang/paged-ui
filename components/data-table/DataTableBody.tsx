import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { ColumnDef } from "./DataTable"

interface DataTableBodyProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
}

export function DataTableBody<T>({ columns, data }: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {data.map((item, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.id}>{column.cell({ getValue: () => item[column.accessorKey] })}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

