import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export const AccordionTitle = styled(AccordionSummary)`
  background-color: ${({ theme }) => theme.palette.common.black};
`;

export const AccordionContent = styled(AccordionDetails)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding-inline: 0;
`;

export const AccordionItem = styled(Accordion)`
  margin-block: ${({ theme }) => theme.spacing(2)};
`;
