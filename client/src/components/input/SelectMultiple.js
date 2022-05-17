import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { oilsList } from '../../utils/optionLists';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const names = [...oilsList];

function getStyles(name, selectOption, theme) {
   return {
      fontWeight:
         selectOption.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   };
}

export default function MultipleSelectChip({ changeStateValues, initValue }) {
   const theme = useTheme();
   const [selectOption, setSelectOption] = useState(initValue);

   useEffect(() => {
      changeStateValues({ name: 'oilsList', value: selectOption });
   }, [selectOption]);

   const handleChange = event => {
      const {
         target: { value },
      } = event;
      setSelectOption(
         // On autofill we get a stringified value.
         typeof value === 'string' ? value.split(',') : value
      );
   };

   return (
      <FormControl
         sx={{
            flex: 1,
            width: { xs: '100%', sm: 'auto' },
         }}
      >
         <InputLabel id="multipleOilsLabel">Aceitito</InputLabel>
         <Select
            labelId="multipleOilsLabel"
            id="multipleOils"
            multiple
            value={initValue}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Aceitito" />}
            renderValue={selected => (
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                     <Chip key={value} label={value} />
                  ))}
               </Box>
            )}
            MenuProps={MenuProps}
         >
            {names.map(name => (
               <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, selectOption, theme)}
               >
                  {name}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
}
