import React from 'react';
import { Formik, FormikConfig } from 'formik';
import { MenuItem, Select } from '@mui/material';

export type SortFormProps = {
  sort?: string;
};

export enum SORT_TYPE {
  NONE = 'None',
  PRICE_LOWEST = 'Price (Lowest)',
  PRICE_HIGHEST = 'Price (HIGHEST)',
  SALE_COUNT_LOWEST = 'Sale Count (Lowest)',
  SALE_COUNT_HIGHEST = 'Sale Count (Highest)',
}

const SortForm = (props: FormikConfig<SortFormProps>) => {
  return (
    <Formik {...props}>
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <Select
            fullWidth
            id="sort"
            value={values.sort}
            onChange={(e) => {
              setFieldValue('sort', e.target.value);
              handleSubmit();
            }}>
            {Object.values(SORT_TYPE).map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    </Formik>
  );
};

export default SortForm;
