import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import { SelectItem } from '../SelectItem';
import Button from '../Button';

import uniqid from 'uniqid';

const SORT_BY = [
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'birthdate',
    name: 'Age',
  },
  {
    id: 'news2',
    name: 'News2',
  },
  {
    id: 'denwis',
    name: 'DENWIS',
  },
];

const FILTER_SEPSIS = [
  {
    id: 'grey',
    name: 'Grey',
  },
  {
    id: 'amber',
    name: 'Amber',
  },
  {
    id: 'red',
    name: 'Red',
  },
];
export const RadioItem: React.FC<{
  value: string;
  label: string;
  disabled?: boolean;
}> = ({ value, label, disabled }) => (
  <FormControlLabel
    value={value}
    control={<Radio size="small" color="primary" disabled={disabled} />}
    label={label}
  />
);

interface Props {
  onFilterSort: any;
  defaultValues: {
    sort: null | { key: string; value: string };
    filter: { key: string; value: string };
  };
}
const ACTIVE_BTN = '#3f51b5';
const Sort: React.FC<Props> = React.forwardRef(
  ({ onFilterSort, defaultValues }, ref) => {
    const [state, setState] = React.useState<any>({
      sort: null,
      filter: null,
    });
    const [arrows, setArrows] = React.useState({ asc: '', desc: '' });

    const useEffectOnMount = (effect: React.EffectCallback) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(effect, []);
    };
    useEffectOnMount(() => {
      setState(defaultValues);
      if (!defaultValues?.sort?.value) {
        setAsc();
      } else {
        setArrows(
          defaultValues?.sort?.value === 'ASC'
            ? { asc: ACTIVE_BTN, desc: '' }
            : { asc: '', desc: ACTIVE_BTN },
        );
      }
    });
    const handleChangeSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const value = e.target.value;
      setState(oldState => ({
        ...oldState,
        filter: { key: 'sepsis', value },
      }));
    };

    const handleChange = event => {
      setState(oldState => ({
        ...oldState,
        sort: { ...oldState.sort, key: event.target.value },
      }));
    };
    const setOrder = order =>
      setState(oldState => ({
        ...oldState,
        sort: { ...oldState.sort, value: order },
      }));
    const clearOrder = () =>
      setState(oldState => ({ ...oldState, sort: null }));
    const clearFilter = () =>
      setState(oldState => ({ ...oldState, filter: null }));

    const setAsc = () => {
      setArrows({ asc: ACTIVE_BTN, desc: '' });
      setOrder('ASC');
    };
    const setDesc = e => {
      setArrows({ asc: '', desc: ACTIVE_BTN });
      setOrder('DESC');
    };
    const handleFilterSort = e => {
      onFilterSort(state);
    };
    const clearAll = e => {
      clearOrder();
      clearFilter();
      onFilterSort({ sort: null, filter: null });
    };
    return (
      <Box p={1} m={1}>
        <Box
          width={300}
          display="flex"
          flexDirection="row"
          bgcolor="background.paper"
        >
          <Box p={1} flexShrink={1}>
            <FormControl>
              <FormLabel component="legend">Sort by:</FormLabel>
              <Select
                native
                value={state.sort ? state.sort.key : ''}
                onChange={handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <SelectItem value="" aria-label="None" />
                {SORT_BY.map(({ id, name }) => (
                  <SelectItem key={uniqid()} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box p={1}>
            <IconButton onClick={setAsc}>
              <ArrowUpwardIcon htmlColor={arrows.asc} />
            </IconButton>
            <IconButton onClick={setDesc}>
              <ArrowDownwardIcon htmlColor={arrows.desc} />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={clearOrder}>
              <DeleteIcon htmlColor={ACTIVE_BTN} />
            </IconButton>
          </Box>
        </Box>
        <Box
          width={300}
          display="flex"
          flexDirection="row"
          bgcolor="background.paper"
        >
          <Box p={1} flexShrink={1}>
            <FormControl>
              <FormLabel component="legend">Filters:</FormLabel>
            </FormControl>

            <Box mt={2}>
              <FormControl component="fieldset">
                <FormLabel disabled component="legend">
                  Sepsis Flag:
                </FormLabel>
                <RadioGroup
                  name={'sortBy'}
                  value={state.filter ? state.filter.value : ''}
                  onChange={handleChangeSelect}
                  row
                >
                  {FILTER_SEPSIS.map(item => {
                    const { id, name } = item;
                    return <RadioItem key={uniqid()} value={id} label={name} />;
                  })}
                  <IconButton size="small" onClick={setDesc}>
                    <DeleteIcon htmlColor={ACTIVE_BTN} />
                  </IconButton>
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={1}>
            {' '}
            <Button.Primary variant="contained" onClick={handleFilterSort}>
              Applay
            </Button.Primary>
          </Box>
          <Box p={1}>
            <Button.Secondary variant="contained" onClick={clearAll}>
              Clear all
            </Button.Secondary>
          </Box>
        </Box>
      </Box>
    );
  },
);
export default Sort;
