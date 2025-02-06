import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../global-context/AppContext';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ModalContentCard = () => {
  const { basketItems, removeBasketItem } = useContext(GlobalContext);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    let sum = 0.00;

    basketItems.forEach((item) => {
      sum += item.price;
    });

    setTotalSum(sum);
  }, [basketItems]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Remove</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from(basketItems).map((game) => (
          <TableRow key={game.id} hover>
            <TableCell>{game.name}</TableCell>
            <TableCell align="right">{game.price}&nbsp;€</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">
              <DeleteIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  removeBasketItem(game.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan="4" align="right">
            Total:&nbsp;{totalSum.toFixed(2)}&nbsp;€
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
