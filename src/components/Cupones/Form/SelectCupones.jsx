import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

SelectCupones.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};

export function SelectCupones({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection();
  };

  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='cupon'>Cupón</InputLabel>
        <Select
          {...field}
          labelId='cupon'
          label='upon'
          defaultValue=''
          value={field.value}
          onChange={handleChange} // Agregado el evento onChange
        >
          {data &&
            data.map((cupon) => (
              <MenuItem key={cupon.id} value={cupon.id}>
                {`${cupon.descripcion}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
