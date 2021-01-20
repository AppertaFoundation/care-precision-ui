import React, { useState, useEffect } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import uniqid from 'uniqid';
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { Situation } from './isbarContent/Situation';
import { Background } from './isbarContent/Background';
import { Assessments } from './isbarContent/Assessments';
import { Response } from './isbarContent/Response';
import { useSelector } from 'react-redux';
import { selectResult } from './selectors';
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
  const params = useParams();
  const tab = (params as any)?.tab;
  const id = (params as any)?.id;
  const obsType = (params as any)?.obsType;
  const history = useHistory();
  const classes = useStyles();

  const activeTab = parseInt(tab);
  const [value, setValue] = useState(0);
  const obsResult = useSelector(selectResult);
  const assessmentIsDone = Boolean(obsResult[obsType]);
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
      history.push(`/assessment/${id}/${activeTabVal}/${obsType}`, {
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
        {['S', 'B', 'A', 'R'].map((label, index) => {
          const disabled = index === 3 && !assessmentIsDone;
          return (
            <Tab
              key={uniqid()}
              label={label}
              disabled={disabled}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...a11yProps(index)}
            />
          );
        })}
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
