import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<any>();

type Props = {
    onChange: (value: any) => void;
    label: string;
    value: any;
};

export default function FreeSoloCreateOption({ onChange, label, value }: Props) {
    const defaultValues = value
        ? value.map((i: any) => ({
              label: typeof i === 'string' ? i : i.label,
              value: typeof i === 'string' ? i : i.value,
          }))
        : [];

    const [values, setValues] = React.useState(defaultValues);

    React.useEffect(() => {
        onChange(values);
    }, [values]);

    const handleChange = (event: any, newValues: any) => {
        let updating;

        if (typeof newValues === 'string') {
            // setValues(newValues)
            updating = newValues;
        } else if (newValues && newValues?.inputValue) {
            // setValues((p) => [
            //   ...p,
            //   {
            //     title: newValues?.inputValue,
            //   },
            // ])
            updating = [
                ...values,
                {
                    title: newValues?.inputValue,
                },
            ];
        } else {
            // setValues(newValues)
            updating = newValues;
        }

        setValues(updating);

        // onChange(updating);
    };

    return (
        <Autocomplete
            multiple
            value={defaultValues || values}
            onChange={handleChange}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option: any) => inputValue === option.title);

                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        value: inputValue,
                        title: `${inputValue}`,
                        // disabled: values.length >= max,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={[]}
            getOptionLabel={(option: any) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option?.value) {
                    return option?.value;
                }
                // Regular option
                return option?.title;
            }}
            // getOptionDisabled={(o) => o.disabled}
            // limitTags={limitTags}
            renderOption={(props, option: any) => <li {...props}>{option?.title || option}</li>}
            freeSolo
            fullWidth
            renderInput={(params) => (
                <TextField {...params} label={label} size={'small'} variant="standard" fullWidth />
            )}
        />
    );
}
