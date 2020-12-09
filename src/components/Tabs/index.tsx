import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import MuiTabs from '@material-ui/core/Tabs';
import { Tab } from '../Tab';
import uniqid from 'uniqid';
import { withStyles } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';

const StyledTabs = withStyles({
  indicator: {
    visibility: 'hidden',
  },
})(MuiTabs);

const a11yProps = index => ({ id: `${index}` });

const Tabs: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
  labels: string[];
}> = ({ children, labels }) => {
  const { tab, id } = useParams();
  const navigate = useNavigate();
  const activeTab = parseInt(tab);
  const [value, setValue] = useState(0);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [activeTab]);
  };
  useEffectOnMount(() => {
    if (value !== activeTab) {
      setValue(activeTab);
    }
  });
  const handleChange = (e, activeTabVal) => {
    if (value !== activeTabVal) {
      setValue(activeTabVal);
      navigate(`/assessment/${id}/${activeTabVal}`, { replace: true });
    }
  };

  return (
    <>
      <StyledTabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        textColor="primary"
      >
        {labels.map((label, index) => (
          <Tab
            key={uniqid()}
            label={label}
            // disabled={tab.disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
      {children}
      {/* {children.map((child, index) =>
        value === index ? <Box key={uniqid()}>{child}</Box> : null,
      )} */}
    </>
  );
};
export default Tabs;
