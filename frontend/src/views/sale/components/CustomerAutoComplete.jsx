import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function CustomerAutoComplete({ customers, onSelectCustomer }) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      options={customers}
      getOptionLabel={(option) => option.name ?? ""}
      sx={{
        width: 250,
        "& .MuiAutocomplete-inputRoot": {
          fontSize: "0.85rem",
          paddingTop: "2px",
          paddingBottom: "2px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.8rem",
        },
      }}
      size="small"
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (onSelectCustomer && newValue) {
          onSelectCustomer(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          size="small"
          margin="dense"
          label="Search Customer"
          sx={{
            "& .MuiInputBase-input": { fontSize: "0.85rem" },
            "& .MuiInputLabel-root": { fontSize: "0.8rem" },
          }}
        />
      )}
    />
  );
}
