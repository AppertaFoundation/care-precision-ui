import React, { useState } from 'react';
import {
  CardHeader,
  CardActions,
  Box,
  IconButton,
  CardActionArea,
  Divider,
  Typography,
} from '@material-ui/core';
import MuiCardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './style';
import { Text } from 'components';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { IAssessmentIcons } from 'types';

import NewCareEventDialog from '../NewCareEventDialog';
import LatestResponse from './LatestResponse';
// import LatestResponseTable from './LatestResponseTable';

const CardContent = withStyles({
  root: {
    paddingTop: 0,
    paddingRight: '16px',
    paddingBottom: '16px',
  },
})(MuiCardContent);

interface Props {
  name?: string;
  identifier?: string;
  id?: string;
  // isDashboard?: boolean;
  children?: JSX.Element;
  assesments?: IAssessmentIcons;
  handleClick?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  location?: any;
}

const Card: React.FC<Props> = ({
  name,
  identifier,
  assesments,
  children,
  id,
  // isDashboard,
  location,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const latestResponseBar = (
    <LatestResponse sm={!sm} assessments={assesments} id={id} />
  );
  // const latestResponseTable = (
  //   <LatestResponseTable sm={!sm} assessments={assesments} id={id} />
  // );
  const redirectToPatientOverview = e => navigate(`/patient-overview/${id}`);
  return (
    <>
      <Box className={clsx(classes.card, classes.roundedCorners)}>
        <CardHeader
          title={
            <CardActionArea onDoubleClick={redirectToPatientOverview}>
              <Typography variant="h5" display="block">
                {name}
              </Typography>
            </CardActionArea>
          }
          subheader={
            <CardActionArea onDoubleClick={redirectToPatientOverview}>
              <Typography variant="body1" color="textSecondary">
                {identifier}
              </Typography>
              {location && <Text label="Location">{location}</Text>}
            </CardActionArea>
          }
          action={
            <CardActions disableSpacing>
              {sm && latestResponseBar}
              {/* {isDashboard && sm && latestResponseTable} */}

              <Divider orientation="vertical" flexItem />
              <IconButton edge={'end'} onClick={handleOpen}>
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          }
        />
        {children && (
          <CardActionArea onDoubleClick={redirectToPatientOverview}>
            <CardContent className={classes.rootContent}>
              {children}
            </CardContent>
          </CardActionArea>
        )}
        {!sm && (
          <>
            <Divider variant="middle" />

            <CardActions>{latestResponseBar}</CardActions>
          </>
        )}
      </Box>
      {open && (
        <NewCareEventDialog
          open={open}
          handleClose={handleClose}
          title={name}
          identifier={identifier || ''}
          id={id || ''}
        />
      )}
    </>
  );
};

let areEqual = function (prevProps, nextProps) {
  const handleClick =
    prevProps?.handleClick && nextProps?.hanldeClick
      ? prevProps.handleClick.toString() === nextProps.handleClick.toString()
      : false;

  return handleClick && true;
};

export default React.memo(Card, areEqual);
