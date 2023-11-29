import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Tooltip from '@mui/material/Tooltip';
import { SelectMaterial } from './SelectMaterial';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

MaterialForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onInputChange: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};

export function MaterialForm({
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
              <Tooltip title={`Material ${index + 1}`}>
                <IconButton>
                  <ViewInArIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText style={{ paddingRight: "5%" }}>
              <Controller
                key={index}
                name={`materiales.${index}.material_id`}
                control={control}
                render={({ field }) => (
                  <SelectMaterial field={field} data={data} onSelection={onSelection}
                  />
                )}

              />

            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`materiales.${index}.cantidad`}
                control={control}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label='Cantidad'
                    onChange={(e) =>
                      onInputChange(index, `materiales.${index}.cantidad`, e.target.value)}
                  />}
              />
            </ListItemText>

            <ListItemIcon>
              <Tooltip title={`Eliminar material ${index + 1}`}>
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
