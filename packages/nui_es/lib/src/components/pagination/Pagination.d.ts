import { FC } from 'react';
interface PaginationProps {
    total: number;
    pageCurrent?: number;
    defaultCurrent?: number;
    onChangeCurrentPage?: (page: number) => void;
}
declare const Pagination: FC<PaginationProps>;
export default Pagination;
