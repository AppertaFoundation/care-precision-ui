import React, { useState, useEffect } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import uniqid from 'uniqid';
import { withStyles } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { Situation } from './isbarContent/Situation';
import { Background } from './isbarContent/Background';

import { Tab } from 'components';

const StyledTabs = withStyles({
  indicator: {
    visibility: 'hidden',
  },
})(MuiTabs);

const a11yProps = index => ({ id: `${index}` });

const ISBR = () => {
  const { tab, id } = useParams();
  const navigate = useNavigate();
  const activeTab = parseInt(tab);
  const [value, setValue] = useState(0);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {['S', 'B', 'A', 'R'].map((label, index) => (
          <Tab
            key={uniqid()}
            label={label}
            // disabled={tab.disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
      {
        {
          0: <Situation />,
          1: <Background />,
          2: <p>~assessment</p>,
          3: <p>Response </p>,
        }[activeTab]
      }
    </>
  );
};
export default ISBR;
