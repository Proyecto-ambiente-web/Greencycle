import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};

export function SelectMaterial({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection();
  };

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
          onChange={handleChange} // Agregado el evento onChange
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id} value={material.id} precio={material.precio}>
                {`${material.descripcion}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
