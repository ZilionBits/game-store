import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";


export const ControlCart = () => {
  return (
    <Badge
      overlap="circular"
      color="secondary"
      max={9}
      badgeContent={1}
      sx={{
        '& .MuiBadge-badge': {
          minWidth: '0px',
          height: '15px',
          width: '15px',
        },
      }}
    >
      <ShoppingCart color="primary" sx={{ height: '25px', width: '25px' }} />
    </Badge>
  );
};
