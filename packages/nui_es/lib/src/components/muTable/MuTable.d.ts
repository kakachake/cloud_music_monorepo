import { FunctionComponent } from 'react';
export interface TableColumnType<DataType = any> {
    title: string;
    dataIndex?: string;
    key?: string;
    render?: (data: DataType, idx: number) => JSX.Element;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    sorter?: (a: any, b: any) => number;
}
interface TableProps {
    columns: TableColumnType[];
    data: any[];
    showIdx?: boolean;
    onColDoubleClick?: (data: any, idx: number) => void;
    onColClick?: (data: any, idx: number) => void;
    hideHeader?: boolean;
    height?: number;
}
declare const MuTable: FunctionComponent<TableProps>;
export default MuTable;
