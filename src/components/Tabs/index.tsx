/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import { Tab } from '../Tab';

import uniqid from 'uniqid';
import { withStyles, Theme } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';

const StyledTabs = withStyles((theme: Theme) => ({}))(MuiTabs);

const a11yProps = index => ({ id: `${index}` });

const Tabs: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
  labels: string[];
}> = ({ children, labels }) => {
  const params = useParams();
  const id = (params as any)?.id;
  const tab = (params as any)?.tab;
  const history = useHistory();
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
      history.push(`/assessment/${id}/${activeTabVal}`, { replace: true });
    }
  };

  return (
    <>
      <StyledTabs
        value={value}
        onChange={handleChange}
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
    </>
  );
};
export default Tabs;
