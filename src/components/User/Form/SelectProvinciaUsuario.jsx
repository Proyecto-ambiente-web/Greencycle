import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectProvincia.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,

};
export function SelectProvincia({ field, data, onSelection   }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection(event.target.value);
  };
    return (
      <>
        <>
          <InputLabel id='provincia'>Provincia</InputLabel>
          <Select
            {...field}
            labelId='provincia'
            label='provincia'
            value={field.value}
            onChange={handleChange} // Agregado el evento onChange
          >
            {data &&
              data.map((provincia) => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.descripcion}

                </MenuItem>
              ))}
          </Select>
        </>
      </>
    );
  }
