import React from 'react';
import { FooterLayout, FooterCopyRightParagraph } from './Styles';

function Footer() {
  return (
    <FooterLayout>
      <FooterCopyRightParagraph>
        © JeongHyeon Park. All rights reserved.
        <br />
        Powered by Gatsby.
      </FooterCopyRightParagraph>
    </FooterLayout>
  );
}

export default Footer;
