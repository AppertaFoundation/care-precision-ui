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
  id?: string;
  onFilterSort: any;
  defaultValues: {
    sort: null | { key: string; value: string };
    filter: { key: string; value: string };
  };
}
const ACTIVE_BTN = '#29375d';
const Sort: React.FC<Props> = React.forwardRef(
  ({ id, onFilterSort, defaultValues }, ref) => {
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
      const name = e.target.name;
      setState(oldState => ({
        ...oldState,
        filter: {
          ...oldState.filter,
          [name]: { key: `${name}`, value },
        },
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
      setState(oldState => ({
        ...oldState,
        sort: { value: 'DESC', key: 'news2' },
      }));
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
      onFilterSort({ sort: { value: 'DESC', key: 'news2' }, filter: null });
    };
    const clearFilters = name => {
      setState(oldState => ({
        ...oldState,
        filter: {
          ...oldState.filter,
          [name]: null,
        },
      }));
    };
    const clearSepsis = () => clearFilters('sepsis');
    const clearDenwis = () => clearFilters('denwis');
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
                  name={'sepsis'}
                  value={state.filter?.sepsis ? state.filter.sepsis.value : ''}
                  onChange={handleChangeSelect}
                  row
                >
                  {FILTER_SEPSIS.map(item => {
                    const { id, name } = item;
                    return <RadioItem key={uniqid()} value={id} label={name} />;
                  })}
                  <IconButton size="small" onClick={clearSepsis}>
                    <DeleteIcon htmlColor={ACTIVE_BTN} />
                  </IconButton>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl component="fieldset">
                <FormLabel disabled component="legend">
                  DENWIS output:
                </FormLabel>
                <RadioGroup
                  name={'denwis'}
                  value={state.filter?.denwis ? state.filter.denwis.value : ''}
                  onChange={handleChangeSelect}
                  row
                >
                  <RadioItem key={uniqid()} value={'denwis'} label={'DENWIS'} />
                  <IconButton size="small" onClick={clearDenwis}>
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
            <Button.Secondary variant="contained" onClick={handleFilterSort}>
              Apply
            </Button.Secondary>
          </Box>
          <Box p={1}>
            <Button.Primary variant="contained" onClick={clearAll}>
              Clear all
            </Button.Primary>
          </Box>
        </Box>
      </Box>
    );
  },
);
export default Sort;
