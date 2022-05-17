import styled from 'styled-components';

import React from 'react';

const PrevParagraph = ({ desc }) => {
   return <Content>{desc}</Content>;
};

export default PrevParagraph;

const Content = styled.p`
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
   overflow: hidden;
`;
