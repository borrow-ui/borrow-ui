type alignType = string;
type verticalAlignType = string;

export type TableColumnType = {
    /** Name of property of the entry */
    prop: string;
    /** Title of the column */
    title?: string;
    align?: alignType;
    verticalAlign?: verticalAlignType;
    width?: number | string;
    padding?: number;
};

export type TableConfigType = {
    borderType?: 'none' | 'row' | 'cell';
    verticalAlign?: verticalAlignType;
    align?: alignType;
    zebra?: boolean;
};

export type TableStateType = {
    columns: Array<TableColumnType>;
    page: number;
    pageSize: number;
};

export type TableSetStateType = React.Dispatch<React.SetStateAction<TableStateType>>;

export type TableEntryType = { [key: string]: any };

type TableSetPageType = (page: number) => void; // React.Dispatch<React.SetStateAction<number>>;

interface TableContainerProps extends React.ComponentPropsWithoutRef<React.ElementType> {}

export type TableCellElementsPropsType = {
    /** Props added to the cell element (th, td).
     * If `getProps` function is passed, it will be called with two arguments,
     * `column` and `entry`, which represents the current column and the current
     * entry. In the header, `entry` is not passed.
     */
    cellProps?: TableCellContainerPropsValueType;
    /** Props added to the cell content element (the div inside th or td).
     * If `getProps` function is passed, it will be called with two arguments,
     * `column` and `entry`, which represents the current column and the current
     * entry. In the header, `entry` is not passed.
     */
    cellContentProps?: TableCellContainerPropsValueType;
    containerProps?: TableContainerProps;
};

export interface TableProps {
    columns: Array<TableColumnType>;
    entries: Array<TableEntryType>;
    config?: TableConfigType;
    pagination?: {
        pageSize: number;
    };
    statusBar?: {
        visible: boolean;
    };
    className?: string;
    elementsProps?: TableCellElementsPropsType;
}

export interface TableWrapperProps {
    className?: string;
    tableConfig: TableConfigType;
    tableState: TableStateType;
    entries: Array<TableEntryType>;
    elementsProps: TableCellElementsPropsType;
}

export interface TableHeadProps {
    className?: string;
    tableConfig: TableConfigType;
    tableState: TableStateType;
    elementsProps: TableCellElementsPropsType;
}

export interface TableBodyProps {
    className?: string;
    tableConfig: TableConfigType;
    tableState: TableStateType;
    entries: Array<TableEntryType>;
    elementsProps: TableCellElementsPropsType;
}

export type TableCellContainerNameType = 'cellProps' | 'cellContentProps';
export type TableCellContainerPropsType = {
    className?: string;
    verticalAlign?: verticalAlignType;
    align?: alignType;
};

export type TableCellContainerPropsValueType = {
    getProps?: (column: TableColumnType, entry?: TableEntryType) => TableConfigType;
    verticalAlign?: verticalAlignType;
    align?: alignType;
};

export interface TableCellProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children?: React.ReactNode;
    className?: string;
    Tag?: 'td' | 'th';
    tableConfig: TableConfigType;
    elementsProps: TableCellElementsPropsType;
    column: TableColumnType;
    entry?: TableEntryType;
}

export interface TableStatusBarProps {
    tableState: TableStateType;
    totEntries: number;
}

export interface TablePaginationProps {
    tableState: TableStateType;
    setTableState: TableSetStateType;
    totEntries: number;
}

export interface TablePaginationPageProps {
    label?: React.ReactNode;
    pageNumber: number;
    page?: number;
    setPage: TableSetPageType;
}
