import React, { memo } from 'react';

import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
interface Props {
  onSearch: any;
}
const Search: React.FC<TextFieldProps & Props> = memo(
  ({ value, onSearch, defaultValue, ...rest }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleSearch = e => {
      onSearch(inputRef?.current?.value);
    };
    const handleClear = () => onSearch(null);

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
              <IconButton
                data-testid="search-clear"
                size="small"
                onClick={handleClear}
              >
                <ClearIcon />
              </IconButton>
              <IconButton data-testid="search-search" onClick={handleSearch}>
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
