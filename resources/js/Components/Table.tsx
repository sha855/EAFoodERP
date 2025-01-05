import React, { useState } from 'react';
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { router } from '@inertiajs/react';

interface PaginationData<T> {
  current_page: number;
  per_page: number;
  total: number;
  data: Array<T>;
}

interface TableColumn<T> {
  label: string;
  key: keyof T;
  renderCell?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  datas: PaginationData<T>;
  route: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  datas,
  route,
}: TableProps<T>) => {
  const [page, setPage] = useState(
    datas.current_page ? datas.current_page - 1 : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState(datas.per_page || 10);

  const totalRecords = datas.total || 0;
  const rawData = Array.isArray(datas.data) ? datas.data || [] : datas;

  const onPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    router.get(route, { page: newPage + 1, per_page: rowsPerPage });
  };

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    router.get(route, { page: page - 1, per_page: newRowsPerPage });
  };

  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (columnKey: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return rawData;
    const { key, direction } = sortConfig;
    return [...(rawData as [])].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rawData, sortConfig]);

  return (
    <div className="!max-w-[100vw]">
      <div className="bg-card rounded-lg border">
        <TableContainer className="!rounded-md" component={Paper}>
          <Datatable>
            <TableHead className="border-b bg-neutral-100">
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className="!font-semibold !text-sm capitalize"
                    key={index}
                    sortDirection={
                      sortConfig?.key === column.key
                        ? sortConfig.direction
                        : false
                    }
                  >
                    <TableSortLabel
                      active={sortConfig?.key === column.key}
                      direction={
                        sortConfig?.key === column.key
                          ? sortConfig.direction
                          : 'asc'
                      }
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(sortedData as []).map((rawData: any, rowIndex: any) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, idx) => (
                    <TableCell className="!text-sm" key={idx}>
                      {column.renderCell
                        ? column.renderCell(rawData)
                        : rawData[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Datatable>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Rows per page"
        />
      </div>
    </div>
  );
};

export default Table;
