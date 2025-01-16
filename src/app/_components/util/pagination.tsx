import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { paginationProps } from "@/lib/interface";

export const PaginationControl = ({ handleNextPage, handlePrevPage, currentPage, totalPages, setCurrentPage }: paginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePrevPage}  />
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page} className="lg:w-full md:w-full w-5 overflow-hidden md:overflow-auto lg:overflow-auto flex">
                        <PaginationLink href="#" isActive={page === currentPage} onClick={() => handlePageClick(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};