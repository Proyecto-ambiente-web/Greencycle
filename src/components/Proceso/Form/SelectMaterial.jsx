import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectMaterial({ field, data }) {
  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='material'>Material</InputLabel>
        <Select
          {...field}
          labelId='material'
          label='material'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id} value={material.id} precio={material.precio}>
                {`${material.descripcion}` }
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
