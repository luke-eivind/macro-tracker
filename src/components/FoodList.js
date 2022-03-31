import './FoodList.css';
/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';*/
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 120,
    editable: true
  },
  {
    field: 'food',
    headerName: 'Food',
    width: 200 },
  {
    field: 'protein',
    headerName: 'Protein',
    width: 150,
    editable: true,
  },
  {
    field: 'carbs',
    headerName: 'Carbs',
    width: 150,
    editable: true,
  },
  {
    field: 'fat',
    headerName: 'Fat',
    type: 'number',
    width: 110,
    editable: true,
  },
];

/*
const rows = [
  {id: 1, food: 'brocoli', protein: 33, carbs: 2, fat: 4 },
];
*/




const FoodList = (props) => {

  const rows = props.components.map((e,i) =>
    {
      return {id: i, quantity: e.quantity, food: e.name, protein: e.totalProtein, carbs: e.totalCarbs, fat: e.totalFat}
    })

  return (
    <div className='food-list'>
      <h2>
        <b>Foods</b>
      </h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      {/*<TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.components.map((row) =>
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.totalCalories}</TableCell>
                <TableCell align="right">{row.totalProtein}</TableCell>
                <TableCell align="right">{row.totalCarbs}</TableCell>
                <TableCell align="right">{row.totalFat}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>*/}
    </div>
  );
};

export default FoodList;
