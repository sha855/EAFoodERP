import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

interface DataTableProps {
  columns: GridColDef[];
  data: Array<Record<string, any>>;
  onRowClick?: GridEventListener<'rowClick'>;
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div style={{ minHeight: 300, maxHeight: 600, overflowY: 'auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{
          '.MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '.MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '.MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
          },
          '.MuiDataGrid-row--borderBottom': {
            backgroundColor: '#f0f0f0 !important',
            fontSize: '16px',
          },
          '.MuiDataGrid-cell': {
            padding: '0px 20px !important',
          },
          '.MuiDataGrid-columnHeader': {
            padding: '0px 20px !important',
          },
          '.MuiDataGrid-footerContainer': {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    </div>
  );
}

// import { DataGrid, GridColDef } from '@mui/x-data-grid';

// interface DataTableProps {
//   columns: GridColDef[];
//   data: Array<Record<string, any>>;
// }

// export default function DataTable({ columns, data } : DataTableProps){
//   return (
//       <div style={{ minHeight: 300, maxHeight: 600, overflowY: 'auto' }}>
//           <DataGrid rows={data} columns={columns} />
//       </div>
//   );
// }
