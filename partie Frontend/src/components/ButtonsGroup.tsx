import { FunctionComponent } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Props {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

export const ButtonsGroup: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
}) => {
  const handleChange = (_: any, newAlignment: string) => {
    onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={value}
      exclusive
      onChange={handleChange}
    >
      {options.map((option) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
