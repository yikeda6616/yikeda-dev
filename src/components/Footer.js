import React from 'react';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import logo from '../img/logo.svg';
import facebook from '../img/social/facebook.svg';
import instagram from '../img/social/instagram.svg';
import twitter from '../img/social/twitter.svg';
import linkedin from '../img/social/linkedin.svg';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className='footer has-background-black has-text-white-ter'>
        <div className='content has-text-centered'>
          <img
            src={logo}
            alt='Kaldi'
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <div className='content has-text-centered has-background-black has-text-white-ter'>
          <div className='container has-background-black has-text-white-ter'>
            <div className='columns'>
              <div className='column is-4'>
                <section className='menu'>
                  <ul className='menu-list'>
                    <li>
                      <Link to='/' className='navbar-item'>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className='navbar-item' to='/about'>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className='navbar-item' to='/products'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className='navbar-item' to='/contact/examples'>
                        Form Examples
                      </Link>
                    </li>
                    <li>
                      <a
                        className='navbar-item'
                        href='/admin/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className='column is-4'>
                <section>
                  <ul className='menu-list'>
                    <li>
                      <Link className='navbar-item' to='/blog'>
                        Latest Stories
                      </Link>
                    </li>
                    <li>
                      <Link className='navbar-item' to='/contact'>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className='column is-4 social'>
                <OutboundLink href='https://www.linkedin.com/in/yasushi-ikeda-0aa72b153/'>
                  <img
                    src={linkedin}
                    alt='LinkedIn'
                    style={{ width: '1rem', height: '1rem' }}
                  />
                </OutboundLink>
                <OutboundLink href='https://www.facebook.com/yasushi.ikeda.3910'>
                  <img
                    src={facebook}
                    alt='Facebook'
                    style={{ width: '1em', height: '1em' }}
                  />
                </OutboundLink>
                <OutboundLink href='https://twitter.com/yikeda6616'>
                  <img
                    className='fas fa-lg'
                    src={twitter}
                    alt='Twitter'
                    style={{ width: '1em', height: '1em' }}
                  />
                </OutboundLink>
                <OutboundLink href='https://instagram.com/yikeda6616'>
                  <img
                    src={instagram}
                    alt='Instagram'
                    style={{ width: '1em', height: '1em' }}
                  />
                </OutboundLink>
                {/* <a title='vimeo' href='https://vimeo.com'>
                  <img
                    src={vimeo}
                    alt='Vimeo'
                    style={{ width: '1em', height: '1em' }}
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
