import React from 'react';
import {
  FooterLayout,
  FooterCopyRightParagraph,
  FooterContentsBox,
} from './Styles';

function Footer() {
  return (
    <FooterLayout>
      <FooterContentsBox>
        <FooterCopyRightParagraph>
          © JeongHyeon Park. All rights reserved.
          <br />
          Powered by Gatsby.
        </FooterCopyRightParagraph>
      </FooterContentsBox>
    </FooterLayout>
  );
}

export default Footer;
