import Autocomplete from "@mui/material/Autocomplete"
import { TextInput } from "./textInput"

const AutocompleteComponent = ({ data, label, getLabel, input, ...props }) => {
  const getOption = (value) => {
    return (
      data.find((o) =>
        typeof value === "string"
          ? getLabel(o) === value
          : getLabel(o) === getLabel(value)
      ) || null
    )
  }
  return (
    <Autocomplete
      autoComplete
      options={data}
      value={getOption(input.value)}
      getOptionLabel={(option) => {
        return getLabel(option) || ""
      }}
      isOptionEqualToValue={(option, value) => {
        return getLabel(option) === getLabel(value)
      }}
      onChange={(event, value) => input.onChange(value)}
      renderInput={(props) => {
        return (
          <TextInput className="name-input" variant="outlined" {...props} />
        )
      }}
      {...props}
    />
  )
}

export default AutocompleteComponent
