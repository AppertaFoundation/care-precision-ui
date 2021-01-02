import React, { useState, useEffect } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import uniqid from 'uniqid';
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { Situation } from './isbarContent/Situation';
import { Background } from './isbarContent/Background';
import { Assessments } from './isbarContent/Assessments';
import { Response } from './isbarContent/Response';

import { Tab } from 'components';

const StyledTabs = withStyles({
  indicator: {
    visibility: 'hidden',
  },
})(MuiTabs);

const useStyles = makeStyles((theme: Theme) => ({
  panel: {
    borderTopColor: theme.palette.primary.main,
    borderTopWidth: 2,
    borderTopStyle: 'solid',
  },
  tabDivider: {
    height: '5px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const a11yProps = index => ({ id: `${index}` });

const ISBR = () => {
  const { tab, id, obsType } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

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
      navigate(`/assessment/${id}/${activeTabVal}/${obsType}`, {
        replace: true,
      });
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
      <div className={classes.tabDivider} />

      {
        {
          0: <Situation />,
          1: <Background />,
          2: <Assessments obsType={obsType} id={id} />,
          3: <Response />,
        }[activeTab]
      }
    </>
  );
};
export default ISBR;
