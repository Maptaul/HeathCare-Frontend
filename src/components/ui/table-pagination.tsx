import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getButtonArray = (totalPages: number) => {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};

export default function TablePagination() {
  const [page, setPage] = useState(1);
  const totalPages = 7;

  const goToPage = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => goToPage(page - 1)} area-d>
            Previous
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {getButtonArray(totalPages).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setPage(page)}
              isActive={page === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext>Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
