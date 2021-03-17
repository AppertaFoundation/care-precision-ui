import React from 'react';
import AwaitOutcome from './AwaitOutcome';
import Completed from './Completed';
import Pending from './Pending';
import Accepted from './Accepted';
import Rejected from './Rejected';
import Cancelled from './Cancelled';
import { StatusButton, Label } from './StatusButton';

const Status = ({ status, onClick }) => {
  return {
    ACCEPTED: (
      <StatusButton onClick={onClick}>
        <Accepted />
        <Label>ACCEPTED</Label>
      </StatusButton>
    ),
    AWAITING: (
      <StatusButton onClick={onClick}>
        <AwaitOutcome />
        <Label>AWAITING</Label>
        <Label>OUTCOME</Label>
      </StatusButton>
    ),
    PENDING: (
      <StatusButton onClick={onClick}>
        <Pending />
        <Label>PENDING</Label>
      </StatusButton>
    ),
    COMPLETED: (
      <StatusButton onClick={onClick}>
        <Completed />
        <Label>COMPLETED</Label>
      </StatusButton>
    ),
    CANCELLED: (
      <StatusButton onClick={onClick}>
        <Cancelled />
        <Label>CANCELLED</Label>
      </StatusButton>
    ),
    REJECTED: (
      <StatusButton onClick={onClick}>
        <Rejected />
        <Label>REJECTED</Label>
      </StatusButton>
    ),
  }[status];
};

export default Status;
