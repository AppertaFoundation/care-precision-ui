/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  assessmentsTypesArraySelector,
  assessmentTypeSelector,
} from 'store/assessmentTypeReducer';
import { Grid, Typography, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../slice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BottomBar,
  Button,
} from 'components';
import { News2 } from './News2';
import { Sepsis } from './Sepsis';
import { Denwis } from './Denwis';
import { Covid } from './Covid';
import Summary from './Summary';
export const Assessments = ({ obsType, id }) => {
  const choosenAssessmentType = useSelector(assessmentTypeSelector) || obsType;
  const assessmentsTypesArray: [] = useSelector(assessmentsTypesArraySelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState({
    news2: '',
    sepsis: '',
    denwis: '',
    covid: '',
  });
  const [openSummary, setOpenSummary] = React.useState(false);
  const handleCloseSummary = () => setOpenSummary(false);
  const handleOpenSummary = React.useCallback(() => {
    setOpenSummary(true);
  }, []);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    const newExpanded = { ...expanded };
    newExpanded[`${choosenAssessmentType}`] = choosenAssessmentType;
    setExpanded(newExpanded);
  });

  const handleChange = panel => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded ? panel : false });
  };

  const handleConfirmAssessment = () => {
    handleCloseSummary();
    dispatch(actions.cleanAssessment());
    navigate(`/assessment/${id}/${3}/${obsType}`, { replace: true });
  };

  const renderAssessment = (
    assessmentsTypesArray: Array<string>,
    key: string,
  ) => assessmentsTypesArray.includes(key);
  const renderNews2 = renderAssessment(assessmentsTypesArray, 'news2');

  const renderSepsis = renderAssessment(assessmentsTypesArray, 'sepsis');
  const renderCOVID = renderAssessment(assessmentsTypesArray, 'covid');
  const renderDenwis = renderAssessment(assessmentsTypesArray, 'denwis');
  return (
    <>
      <Grid container justify="center">
        {renderNews2 && (
          <Grid item xs={12}>
            <Accordion
              expanded={expanded.news2 === 'news2'}
              onChange={handleChange('news2')}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                IconButtonProps={{ color: 'inherit' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography align="center" variant="body1" component="h5">
                  <Box fontWeight={900}>{`NEWS2`}</Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <News2
                  disabled={choosenAssessmentType !== 'news2'}
                  onOpenSummary={handleOpenSummary}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
        {renderSepsis && (
          <Grid item xs={12}>
            <Accordion
              expanded={expanded.sepsis === 'sepsis'}
              onChange={handleChange('sepsis')}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                IconButtonProps={{ color: 'inherit' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography align="center" variant="body1" component="h6">
                  <Box fontWeight={900}>SEPSIS Assessment</Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Sepsis
                  disabled={choosenAssessmentType !== 'sepsis'}
                  onOpenSummary={handleOpenSummary}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {renderCOVID && (
          <Grid item xs={12}>
            <Accordion
              expanded={expanded.covid === 'covid'}
              onChange={handleChange('covid')}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                IconButtonProps={{ color: 'inherit' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography align="center" variant="body1" component="h6">
                  <Box fontWeight={900}>COVID Assessment</Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Covid
                  disabled={choosenAssessmentType !== 'covid'}
                  onOpenSummary={handleOpenSummary}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {renderDenwis && (
          <Grid item xs={12}>
            <Accordion
              expanded={expanded.denwis === 'denwis'}
              onChange={handleChange('denwis')}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                IconButtonProps={{ color: 'inherit' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography align="center" variant="body1" component="h6">
                  <Box fontWeight={900}>Concern Assessment</Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Denwis
                  disabled={choosenAssessmentType !== 'denwis'}
                  onOpenSummary={handleOpenSummary}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
      <BottomBar>
        <Button.Success
          variant="contained"
          form={`isbar-2-${obsType}`}
          type="submit"
        >
          Submit Assessment
        </Button.Success>
      </BottomBar>
      <Summary
        open={openSummary}
        handleClose={handleCloseSummary}
        handleConfirm={handleConfirmAssessment}
        obsType={choosenAssessmentType}
      />
    </>
  );
};
