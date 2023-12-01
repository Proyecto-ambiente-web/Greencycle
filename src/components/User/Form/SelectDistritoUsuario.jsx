import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectDistrito.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,

};

export function SelectDistrito({ field, data }) {
 
  return (
    <>
      <>
        <InputLabel id='distrito'>Distrito</InputLabel>
        <Select style={{marginTop:"15px"}}
          {...field}
          labelId='distrito'
          label='distrito'
          defaultValue=''
          value={field.value}

        >
          {data &&
            data.map((distrito) => (
              <MenuItem key={distrito.id} value={distrito.id}>
                {distrito.descripcion}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}