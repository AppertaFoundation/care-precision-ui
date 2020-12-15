import React, { memo } from 'react';
// import { useNavigate } from 'react-router-dom';

import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
// import BarCode from './BarCode.png';

interface Props {
  onSearch: any;
}
const Search: React.FC<TextFieldProps & Props> = memo(
  ({ value, onSearch, defaultValue, ...rest }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // const navigate = useNavigate();
    const handleSearch = e => {
      onSearch(inputRef?.current?.value);
    };
    const handleClear = e => onSearch(null);
    // const handleBarCode = e => {
    //   navigate(`bar-code`, { replace: true });
    // };
    return (
      <TextField
        label="Search"
        variant="outlined"
        type="text"
        fullWidth
        size="small"
        defaultValue={defaultValue}
        inputRef={inputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    );
  },
);

export default Search;
