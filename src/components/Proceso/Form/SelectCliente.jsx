import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectCliente.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,

};

export function SelectCliente({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection(event.target.value);
  };
  return (
    <>
      <>
        <InputLabel id='NombreCompleto'>Cliente</InputLabel>
        <Select style={{marginTop:"15px"}}
          {...field}
          labelId='NombreCompleto'
          label='NombreCompleto'
          defaultValue=''
          value={field.value}
          onChange={handleChange} // Agregado el evento onChange

        >
          {data &&
            data.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.NombreCompleto}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}