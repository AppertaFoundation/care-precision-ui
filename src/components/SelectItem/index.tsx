import React from 'react';

type Props = { children?: string; value: string; key?: string };

export type Ref = HTMLOptionElement;

export const SelectItem = React.forwardRef<Ref, Props>((props, ref) => (
  <option ref={ref} {...props} />
));
