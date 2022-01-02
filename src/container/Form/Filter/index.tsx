import React from 'react';
import { Formik, FormikConfig } from 'formik';
import { MenuItem, Select, InputLabel } from '@mui/material';
import { FormSearch } from './Filter.styled';
import data from '@container/Layout/Marketplace/data';

export type FilterFormProps = {
  name: string;
  age: string;
  country: string;
};

const FilterForm = (props: FormikConfig<FilterFormProps>) => {
  return (
    <Formik {...props}>
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <>
            <FormSearch>
              <InputLabel id="labelName">Name</InputLabel>
              <Select
                labelId="labelName"
                fullWidth
                id="name"
                label="Name"
                onChange={(e) => {
                  setFieldValue('name', e.target.value);
                  handleSubmit();
                }}
                variant="outlined"
                value={values.name}>
                {data.map((item) => (
                  <MenuItem value={item.name} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormSearch>
            <FormSearch>
              <InputLabel id="labelAge">Age</InputLabel>
              <Select
                labelId="labelAge"
                label="Age"
                fullWidth
                id="age"
                onChange={(e) => {
                  setFieldValue('age', e.target.value);
                  handleSubmit();
                }}
                value={values.age}>
                {data.map((item) => (
                  <MenuItem value={item.age} key={item.id}>
                    {item.age}
                  </MenuItem>
                ))}
              </Select>
            </FormSearch>
            <FormSearch>
              <InputLabel id="labelCountry">Country</InputLabel>
              <Select
                labelId="labelCountry"
                label="Country"
                fullWidth
                id="country"
                onChange={(e) => {
                  setFieldValue('country', e.target.value);
                  handleSubmit();
                }}
                value={values.country}>
                {data.map((item) => (
                  <MenuItem value={item.country} key={item.id}>
                    {item.country}
                  </MenuItem>
                ))}
              </Select>
            </FormSearch>
          </>
        );
      }}
    </Formik>
  );
};

export default FilterForm;
