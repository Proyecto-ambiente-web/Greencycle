import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
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
};

export function MaterialForm({
  data,
  control,
  index,
  onRemove,
  disableRemoveButton,
  onInputChange,
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
                  <DirectionsRunIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText>
              <Controller
                key={index}
                name={`materiales.${index}.material_id`}
                control={control}
                render={({ field }) => (
                  <SelectMaterial field={field} data={data}  
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
                 onChange={(e)=>
                  onInputChange(index,`materiales.${index}.cantidad`,e.target.value)} 
                 />}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`materiales.${index}.precio`}
                control={control}
                render={({ field }) => 
                <TextField 
                {...field}
                label='precio'
                 onChange={(e)=>
                  onInputChange(index,`materiales.${index}.precio`,e.target.value)} 
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
