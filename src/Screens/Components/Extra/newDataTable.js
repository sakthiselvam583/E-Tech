import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

const DataTables = ({ columns, data }) => {
  const tableData = {
    columns,
    data
  };
  return (
    <React.Fragment>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        // selectableRows
        // onSelectedRowsChange={e => console.log(e)}
        />
      </DataTableExtensions>
    </React.Fragment>
  );
};

export default DataTables;