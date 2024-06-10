import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterWrapper = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);

`;

const FooterLink = styled.a`
  color: #adb5bd;
  text-decoration: none;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <p>&copy; 2024 Pokedex Application. All rights reserved.</p>
        <p>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          |
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          |
          <FooterLink href="/contact">Contact Us</FooterLink>
        </p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
