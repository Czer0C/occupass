import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

interface TextFieldDebounceProps extends Omit<TextFieldProps, 'onChange'> {
    onChange: (value: string) => void;
    debounceTime?: number;
}

export const TextFieldDebounce = ({ onChange, ...rest }: TextFieldDebounceProps) => {
    const [val, setVal] = useState('');

    const debouncedVal = useDebounce(val, 1000);

    useEffect(() => {
        onChange(debouncedVal);
    }, [debouncedVal]);

    return <TextField value={val} onChange={(e) => setVal(e.target.value)} {...rest} />;
};
