import { FunctionComponent } from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';

interface Props {
  options: string[];
  value: number;
  onChange: (value: number) => void;
}

export const TabsButtons: FunctionComponent<Props> = ({
  options,
  value,
  onChange,
}) => {
  const handleChange = (_: any, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Paper elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
        >
          {options.map((option) => (
            <Tab key={option} label={option} />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};
