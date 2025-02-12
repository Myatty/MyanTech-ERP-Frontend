import React, { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

export default function ProductAutocomplete({ products, onSelectProduct }) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      options={products}
      getOptionLabel={(option) => option.name ?? ""}
      sx={{
        width: 180,
        "& .MuiAutocomplete-inputRoot": {
          fontSize: "0.75rem",
          paddingTop: "2px",
          paddingBottom: "2px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.7rem",
        },
      }}
      size="small"
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (onSelectProduct && newValue) {
          onSelectProduct(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          size="small"
          margin="dense"
          required
          label="Search Product"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "0.75rem",
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.75rem",
            },
          }}
        />
      )}
    />
  );
}
