import { Box } from '@mui/material';
import React from 'react';
import { SearchTitle, SearchButton, SearchInput, Search } from './Filter.styled';
import FilterForm, { FilterFormProps } from '@container/Form/Filter';
import SearchIcon from '@mui/icons-material/Search';
import { theme } from '@theme';

const FilterBar = ({ handleSubmit }: { handleSubmit?: (values: FilterFormProps) => void }) => {
  const initialValues = {
    name: '',
    age: '',
    country: '',
  };

  return (
    <Box display="grid" rowGap={1.25}>
      <Box width={280}>
        <SearchTitle py={1} color={theme.palette.grey[500]}>
          NFT SEARCH
        </SearchTitle>
      </Box>
      <Search position="relative" height={45} width={280}>
        <SearchInput id="search" variant="outlined" label="NFT Search" fullWidth />
        <SearchButton width={3} height={6}>
          <SearchIcon color="action" fontSize="medium" />
        </SearchButton>
      </Search>
    </Box>
  );
};

export default FilterBar;
