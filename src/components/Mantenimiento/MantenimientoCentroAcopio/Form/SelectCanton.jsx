import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectCanton.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectCanton({ field, data }) {
  return (
    <>
      <>
      <InputLabel id='canton'>Cantón</InputLabel>
        <Select
          {...field}
          labelId='canton'
          label='canton'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((canton) => (
              <MenuItem key={canton.id} value={canton.id}>
                {canton.descripcion}
              </MenuItem> 
            ))}
        </Select>
      </>
    </>
  );
}
