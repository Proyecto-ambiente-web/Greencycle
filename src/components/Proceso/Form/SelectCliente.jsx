import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectCliente.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};

export function SelectCliente({ field, data }) {
  return (
    <>
      <>
      <InputLabel id='NombreCompleto'>Cliente</InputLabel>
        <Select
          {...field}
          labelId='NombreCompleto'
          label='NombreCompleto'
          defaultValue=''
          value={field.value}
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