import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 6.75 + ITEM_PADDING_TOP,
         // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 'auto',
         // width: 300,
      },
   },
};

export default function SelectSingle({
   title,
   name,
   selectOptions,
   value,
   changeValueInState,
   sx,
}) {
   return (
      <Box sx={sx}>
         <FormControl fullWidth>
            <InputLabel id="id-for-label">{title}</InputLabel>
            <Select
               labelId="id-for-label"
               id="single-select"
               value={value}
               label={title}
               onChange={e => changeValueInState(e)}
               //
               name={name}
               MenuProps={MenuProps}
            >
               {selectOptions.map(item => (
                  <MenuItem value={item} key={item}>
                     {item}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   );
}
