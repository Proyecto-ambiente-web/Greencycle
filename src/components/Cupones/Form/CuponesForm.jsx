import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Tooltip from '@mui/material/Tooltip';
import { SelectCupones } from './SelectCupones';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

CuponesForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onInputChange: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};

export function CuponesForm({
  data,
  control,
  index,
  onRemove,
  disableRemoveButton,
  onInputChange,
  onSelection,
  // eslint-disable-next-line no-unused-vars
  field,
}) {
  return (
    <section key={index}>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Tooltip title={`Cupón ${index + 1}`}>
                <IconButton>
                  <ConfirmationNumberIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText style={{ paddingRight: "5%" }}>
              <Controller
                key={index}
                name={`cupones.${index}.cupon_id`}
                control={control}
                render={({ field }) => (
                  <SelectCupones field={field} data={data} onSelection={onSelection}
                  />
                )}

              />

            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cupones.${index}.cantidad`}
                control={control}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label='Cantidad'
                    onChange={(e) =>
                      onInputChange(index, `cupones.${index}.cantidad`, e.target.value)}
                  />}
              />
            </ListItemText>

            <ListItemIcon>
              <Tooltip title={`Eliminar cupón ${index + 1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge='end'
                    disabled={disableRemoveButton}
                    onClick={() => onRemove(index)}
                    aria-label='Eliminar'
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  );
}
