import React, { useState } from 'react';
import {
  Paper,
  Table as Datatable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { router } from '@inertiajs/react';
import { TableResponse } from '@/types/global';

interface TableColumn<RowType = any> {
  label: string;
  key: string;
  renderCell?: (row: RowType) => React.ReactNode;
  sortable?: boolean; // New property to enable sorting
}

interface CommonTableProps {
  columns: TableColumn[];
  data: TableResponse;
  dataRoute: string;
  routeKeys?: { [key: string]: any };
  onRowClick?: (data: any) => void;
}

const CommonTable = ({
  columns,
  data,
  dataRoute = '',
  onRowClick,
  routeKeys,
}: CommonTableProps) => {
  const [page, setPage] = useState(data.current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(data.per_page);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const totalRecords = data.total || 0;

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    router.get(route(dataRoute, routeKeys), {
      page: newPage + 1,
      per_page: rowsPerPage,
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    router.get(route(dataRoute, routeKeys), {
      page: page - 1,
      per_page: newRowsPerPage,
    });
  };

  const handleSort = (key: string) => {
    const isAsc = sortKey === key && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortKey(key);
  };

  const sortedData = [...data.data].sort((a, b) => {
    if (!sortKey) return 0;
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-0">
      <div className="bg-card rounded-lg border">
        <TableContainer className="!rounded-md" component={Paper}>
          <Datatable>
            <TableHead className="border-b bg-neutral-100">
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className="!font-semibold !text-sm capitalize"
                    key={index}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={sortKey === column.key}
                        direction={
                          sortKey === column.key ? sortDirection : 'asc'
                        }
                        onClick={() => handleSort(column.key)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((rowData, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(rowData)}
                >
                  {columns.map((column, idx) => (
                    <TableCell className="!text-sm" key={idx}>
                      {column.renderCell
                        ? column.renderCell(rowData)
                        : rowData[column.key]}
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
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="Rows per page"
        />
      </div>
    </div>
  );
};

export default CommonTable;
