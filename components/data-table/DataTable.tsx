"use client"

import type React from "react"
import { Table } from "@/components/ui/table"
import { DataTableHeader } from "./DataTableHeader"
import { DataTableBody } from "./DataTableBody"
import { DataTablePagination } from "./DataTablePagination"
import { Loader2 } from "lucide-react"
import { Skeleton } from "../ui/skeleton"

export interface ColumnDef<T> {
  id: string
  header: string
  accessorKey: keyof T
  cell: ({ getValue }: { getValue: () => any }) => React.ReactNode
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  onSort: (columnId: string) => void
  sortBy?: string
  order: "asc" | "desc"
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

export function DataTable<T>({
  columns,
  data,
  onSort,
  sortBy,
  order,
  page,
  totalPages,
  totalItems,
  onPageChange,
  isLoading,
}: DataTableProps<T>) {
    if (isLoading) {
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="border rounded-lg">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border-b">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        )
      }

  return (
    <div className="space-y-4">

      <Table>
        <DataTableHeader columns={columns} sortBy={sortBy} order={order} onSort={onSort} />
        <DataTableBody columns={columns} data={data} />
      </Table>

      <DataTablePagination page={page} totalPages={totalPages} totalItems={totalItems} onPageChange={onPageChange} />
    </div>
  )
}

