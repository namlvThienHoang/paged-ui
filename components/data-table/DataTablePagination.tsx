import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number; // Thêm prop mới
  onPageChange: (page: number) => void;
}

export function DataTablePagination({ page, totalPages, totalItems, onPageChange }: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between w-full p-4 border-t">
      <span className="text-sm text-gray-500">
        Tổng số: <strong>{totalItems}</strong>
      </span>
      <div className="flex items-center gap-4">
        <Button onClick={() => onPageChange(page - 1)} disabled={page === 1} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Trang trước
        </Button>
        <span className="text-sm">
          Trang <strong>{page}</strong> / {totalPages}
        </span>
        <Button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} variant="outline">
          Trang sau
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
