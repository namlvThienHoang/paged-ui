import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  addNewRoute?: string;
  initialPageSize?: number;
  initialPageIndex?: number;
  rowActions?: (row: TData) => React.ReactNode;
  onSearch?: (query: string) => void;
  onPageChange?: (pageIndex: number) => void;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  addNewRoute,
  initialPageSize = 10,
  initialPageIndex = 0,
  rowActions,
  onSearch,
  onPageChange,
}: DataTableProps<TData>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (onSearch) onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: initialPageSize,
        pageIndex: initialPageIndex,
      },
    },
  });

  useEffect(() => {
    if (onPageChange) onPageChange(table.getState().pagination.pageIndex);
  }, [table.getState().pagination.pageIndex, onPageChange]);

  return (
    <div className="w-full border rounded-lg shadow-sm">
      {/* Header: Tìm kiếm & Thêm mới */}
      <div className="p-4 flex justify-between items-center">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        {addNewRoute && (
          <Button asChild>
            <a href={addNewRoute}>Thêm mới</a>
          </Button>
        )}
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-2">
                    {header.column.columnDef.header}
                  </TableHead>
                ))}
                {rowActions && <TableHead className="px-4 py-2">Hành động</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: initialPageSize }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-2">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="px-4 py-2">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {cell.renderValue()}
                    </TableCell>
                  ))}
                  {rowActions && <TableCell className="px-4 py-2">{rowActions(row.original)}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (rowActions ? 1 : 0)} className="px-4 py-2 text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Phân trang */}
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm">
          Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Trang trước
          </Button>
          <Button size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Trang sau
          </Button>
        </div>
      </div>
    </div>
  );
}