import React, { useState, useEffect } from 'react';
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAppDispatch } from '@/_hooks/useStore';
import { openDrawer } from '@/store/slice/stateSlice';
interface TableColumn<T> {
  label: string;
  key: keyof T;
  renderCell?: (row: T) => React.ReactNode;
}
interface TeamDataTableProps<T> {
  columns: Array<TableColumn<T>>;
  datas: Array<T>;
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  options?: { edit?: boolean; deactivate?: boolean; delete?: boolean };
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (id: number) => void;
  onEdit: (data: any) => void;
  translations: any;
  action: any;
}

const TeamDataTable = <T extends Record<string, any>>({
  columns,
  datas,
  page,
  rowsPerPage,
  totalRecords,
  options,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  onEdit,
  translations,
  action,
}: TeamDataTableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const [rows, setRows] = useState<Array<Record<string, any>>>(datas);

  useEffect(() => {
    setRows(datas);
  }, [datas]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const dispatch = useAppDispatch();

  const handleEdit = async (rowId: number) => {
    handleMenuClose();
    try {
      const url = '/' + action + '/' + rowId;
      const response = await axios.get(`${url}`);
      const rowData = response.data;
      onEdit(rowData);
      dispatch(openDrawer());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeactivate = (rowId: number) => {
    handleMenuClose();
  };

  const handleDeleteClick = (rowId: number) => {
    setRowToDelete(rowId);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    try {
      const url = '/' + action + '/' + rowToDelete;
      const response = await axios.delete(`${url}`);
      const updatedRows = rows.map((row) =>
        row.id === rowToDelete ? { ...row, hidden: true } : row
      );
      setRows(updatedRows);
      setOpenDeleteDialog(false);
      setRowToDelete(null);
    } catch (error: any) {
      console.error(
        'Error deleting the row:',
        error.response?.data || error.message
      );
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setRowToDelete(null);
  };

  const hasOptions =
    options && (options.edit || options.deactivate || options.delete);
  const defaultOptions = {
    edit: false,
    deactivate: false,
    delete: false,
  };
  const menuOptions = { ...defaultOptions, ...options };

  return (
    <div className="p-4">
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
                    {column.label}
                  </TableCell>
                ))}
                {hasOptions && (
                  <TableCell className="!font-semibold !text-base">
                    {translations.table.action}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                (data: any, rowIndex) =>
                  !data.hidden && (
                    <TableRow
                      key={data.user_id || rowIndex}
                      onClick={() => onRowClick && onRowClick(data.user_id)}
                    >
                      {columns.map((column, idx) => (
                        <TableCell key={idx}>
                          {column.renderCell ? (
                            column.renderCell(data)
                          ) : data[column.key] ? (
                            data[column.key]
                          ) : (
                            <span className="bg-red-100 text-black px-2 py-1 rounded-lg">
                              {translations.certificate.missing}
                            </span>
                          )}
                        </TableCell>
                      ))}
                      {hasOptions && (
                        <TableCell>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, data.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            slotProps={{
                              paper: {
                                elevation: 0,
                                sx: {
                                  overflow: 'visible',
                                  filter:
                                    'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                  padding: '0 8px',
                                  mt: 1.5,
                                  '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                  },
                                },
                              },
                            }}
                            transformOrigin={{
                              horizontal: 'right',
                              vertical: 'top',
                            }}
                            anchorOrigin={{
                              horizontal: 'right',
                              vertical: 'bottom',
                            }}
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) && selectedRowId === data.id
                            }
                            onClose={handleMenuClose}
                          >
                            {menuOptions.edit && (
                              <MenuItem
                                onClick={() => handleEdit(data.id)}
                                className="!bg-green-200 !mb-2 !rounded-md"
                              >
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={translations.actions.edit}
                                />
                              </MenuItem>
                            )}
                            {menuOptions.deactivate && (
                              <MenuItem
                                onClick={() => handleDeactivate(data.id)}
                                className="!bg-yellow-200 !mb-2 !rounded-md"
                              >
                                <ListItemIcon>
                                  <BlockIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={translations.actions.deactivate}
                                />
                              </MenuItem>
                            )}
                            {menuOptions.delete && (
                              <MenuItem
                                onClick={() => handleDeleteClick(data.id)}
                                className="!bg-red-200 !rounded-md"
                              >
                                <ListItemIcon>
                                  <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={translations.delete.yes}
                                />
                              </MenuItem>
                            )}
                          </Menu>
                        </TableCell>
                      )}
                    </TableRow>
                  )
              )}
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
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>{translations.delete.confirmDelete}</DialogTitle>
        <DialogContent>
          <DialogContentText>{translations.delete.confirm}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            {translations.cancelBtnText}
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            {translations.deleteBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamDataTable;
