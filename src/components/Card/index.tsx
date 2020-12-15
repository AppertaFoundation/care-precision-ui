import React, { useState } from 'react';
import {
  CardHeader,
  CardActions,
  Box,
  IconButton,
  CardActionArea,
  Divider,
} from '@material-ui/core';
import MuiCardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './style';
import clsx from 'clsx';

import { IAssessmentIcons } from 'types';

import NewCareEventDialog from '../NewCareEventDialog';
import LatestResponse from './LatestResponse';

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
  children?: JSX.Element;
  assesments?: IAssessmentIcons;
  handleClick?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

const Card: React.FC<Props> = ({
  name,
  identifier,
  assesments,
  children,
  id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const latestResponseBar = (
    <LatestResponse sm={!sm} assessments={assesments} />
  );
  const redirectToPatientOverview = e => console.log('jest');
  return (
    <>
      <Box className={clsx(classes.card, classes.roundedCorners)}>
        <CardActionArea onDoubleClick={redirectToPatientOverview}>
          <CardHeader
            title={name}
            subheader={identifier}
            action={
              <CardActions disableSpacing>
                <Divider orientation="vertical" flexItem />
                <IconButton edge={'end'} onClick={handleOpen}>
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            }
          />

          <CardContent className={classes.rootContent}>{children}</CardContent>
        </CardActionArea>
        {children && (
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
