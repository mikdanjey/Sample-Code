// TextField.tsx
import React from "react";
import { split } from "lodash";
import { TextField as MuiTextField } from "@material-ui/core";

export function TextField({ formik, field, label, ...otherProps }) {
  let value = formik.values[field];
  let error = formik.touched[field] && Boolean(formik.errors[field]);
  let helperText = formik.touched[field] && formik.errors[field];
  if (field.includes(".")) {
    const fields = split(field, ".");
    value = formik.values[fields[0]][fields[1]];
    const touched = formik.touched[fields[0]];
    const errors = formik.errors[fields[0]];
    console.log({ touched, errors });
    if (touched && errors) {
      error = touched[fields[1]] && Boolean(errors[fields[1]]);
      helperText = [fields[1]] && errors[fields[1]];
    }
  }

  return (
    <MuiTextField
      fullWidth
      required
      id={field}
      name={field}
      label={label}
      value={value}
      onChange={formik.handleChange}
      error={error}
      helperText={helperText}
      {...otherProps}
    />
  );
}

//

import { useFormik } from "formik";

const formik = useFormik({
  initialValues: {
    title: "",
  },
  validationSchema,
  onSubmit: (data) => {},
});

<form noValidate onSubmit={formik.handleSubmit}>
  <TextField
    formik={formik}
    fullWidth
    required
    field="title"
    label="Title"
    autoComplete="off"
  />
</form>;
