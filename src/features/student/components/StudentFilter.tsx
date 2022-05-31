import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { City, ListParams } from "models";
import React, { ChangeEvent, useRef } from "react";

export interface StudentFilterProps {
    filter: ListParams;
    cityList: City[];
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;

}
export default function StudentFilter({ filter, cityList, onSearchChange, onChange }: StudentFilterProps) {
    const searchRef = useRef<HTMLInputElement>();
    const onHandleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
        }
        onSearchChange(newFilter)
    }
    const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        }
        onChange(newFilter)
    }

    const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = (value as string).split('.');
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        };
        onChange(newFilter)
    }

    const handleClearFilter = () => {
        if (!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
        };
        onChange(newFilter)

        if (searchRef.current) {
            searchRef.current.value = '';
        }

    }
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName" >Search By Name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search By Name"
                            defaultValue={filter.name_like}
                            endAdornment={<Search />}
                            onChange={onHandleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="filterByCity">Filter By City</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                            label="Filter By City"
                        >
                            <MenuItem value="">
                                <em>All city</em>
                            </MenuItem>
                            {cityList.map((city: City) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="sortBy">Sort</InputLabel>
                        <Select
                            labelId="sortBy"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                            label="Sort"
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>
                            <MenuItem value="name.asc">
                                Name ASC
                            </MenuItem>
                            <MenuItem value="name.desc">
                                Name DESC
                            </MenuItem>
                            <MenuItem value="mark.asc">
                                Mark ASC
                            </MenuItem>
                            <MenuItem value="mark.desc">
                                Mark DESC
                            </MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>Clear</Button>
                </Grid>
            </Grid>
        </Box>
    )
}