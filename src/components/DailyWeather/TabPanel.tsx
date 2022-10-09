import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  index: number;
  value: number;
  children: undefined | ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2, minHeight: '200px' }}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
