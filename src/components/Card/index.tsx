import React, { useState } from 'react';
import {
  CardHeader,
  CardActions,
  Box,
  Grid,
  Typography,
  IconButton,
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
import { ClickableElement } from '../ClickableElement';

const CardContent = withStyles({
  root: {
    paddingTop: 0,
    paddingRight: '16px',
    paddingBottom: 0,
  },
})(MuiCardContent);

interface Props {
  name: string;
  identifier: string;
  id: string;
  children: JSX.Element;
  assesments: IAssessmentIcons;
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
  handleClick,
  children,
  id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  if (open) {
    console.log('');
  }
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  console.log(id);
  const latestResponseBar = (
    <LatestResponse sm={!sm} assessments={assesments} id={id} />
  );
  return (
    <>
      <Box className={clsx(classes.card, classes.roundedCorners)}>
        <CardHeader
          className={classes.headerRoot}
          disableTypography
          title={
            <ClickableElement onClick={handleClick}>
              <Box>
                <Grid container direction="row">
                  <Grid item>
                    <Typography component="div" className={classes.subheader}>
                      <Box mr={1} fontWeight="fontWeightBold">
                        {name}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </ClickableElement>
          }
          subheader={
            <Box>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <ClickableElement onClick={handleClick}>
                    <Grid item>
                      <Typography component="div" color="textSecondary">
                        <Box mr={1} fontWeight="fontWeightBold">
                          {identifier}
                        </Box>
                      </Typography>
                    </Grid>
                  </ClickableElement>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {!sm && latestResponseBar}
                </Grid>
              </Grid>
            </Box>
          }
          action={
            <CardActions disableSpacing>
              {sm && latestResponseBar}
              <Divider orientation="vertical" flexItem />
              <IconButton edge={'end'} onClick={handleOpen}>
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          }
        />
        {handleClick ? (
          <ClickableElement onClick={handleClick}>
            <CardContent className={classes.rootContent}>
              {children}
            </CardContent>
          </ClickableElement>
        ) : (
          <CardContent>{children}</CardContent>
        )}
      </Box>
      {open && (
        <NewCareEventDialog
          open={open}
          handleClose={handleClose}
          title={name}
          identifier={identifier}
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
