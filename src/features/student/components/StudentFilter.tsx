import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { City, ListParams } from "models";
import React, { ChangeEvent } from "react";

export interface StudentFilterProps {
    filter: ListParams;
    cityList: City[];
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;

}
export default function StudentFilter({ filter, cityList, onSearchChange, onChange }: StudentFilterProps) {
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
            </Grid>
        </Box>
    )
}