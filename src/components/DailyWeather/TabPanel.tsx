import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  index: number;
  value: number;
  children: undefined | ReactNode;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2, minHeight: '200px' }}>{children}</Box>}
    </div>
  );
}
