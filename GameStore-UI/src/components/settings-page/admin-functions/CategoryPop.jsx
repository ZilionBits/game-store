import { Alert, Popover } from '@mui/material';

export const CategoryPop = ({ anchorEl, handleClose, response, category }) => {
  const open = Boolean(response);
  const id = open ? 'remove-pop' : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {response?.config.method === 'delete' ? (
        response?.status === 204 ? (
          <Alert severity="success">Category {category} successfully deleted.</Alert>
        ) : (
          <Alert severity="error">Category {category} not found.</Alert>
        )
      ) : response?.status === 201 ? (
        <Alert severity="success">Category {category} successfully created.</Alert>
      ) : (
        <Alert severity="error">Category {category} already exists.</Alert>
      )}
    </Popover>
  );
};
