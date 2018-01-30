import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import config from '../constants'

import '../sass/screen.scss'

const menuLinks = [
  { url: '/', title: 'Home' },
  { url: '/tag/javascript', title: 'JavaScript' },
  { url: '/tag/elixir', title: 'Elixir' },
  { url: '/tag/security', title: 'Security' },
]

const TemplateWrapper = ({ children }) => (
  <div>
    {/* TODO: Remove page specific parts from meta for og and twitter. Move them to home page layout & blog page layout */}
    <Helmet
      link={[
        {
          rel: 'stylesheet',
          type: 'text/css',
          href:
            '//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400',
        },
      ]}
      meta={[
        { name: "HandheldFriendly", content: "True" },
        { property: "og:site_name", content: config.SITE_TITLE },
        { name: "twitter:site", content: "@" + config.TWITTER },

      ]}
    />
    <Header siteTitle={config.SITE_TITLE} tagList={menuLinks} />
    <main id="content" className="content clearfix" role="main">
      {children()}
    </main>
    <Footer title={config.SITE_TITLE} />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
