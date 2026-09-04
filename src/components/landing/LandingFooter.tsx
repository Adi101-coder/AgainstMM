import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Reveal from './Reveal'
import { fadeUp } from './motion'

interface FooterLink {
  label: string
  to?: string
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Protocol',
    links: [
      { label: 'Methodology', to: '/methodology' },
      { label: 'Distribution', to: '/distribution' },
      { label: 'Capital architecture', to: '/methodology#capital-architecture' },
      { label: 'Operating parameters', to: '/methodology#operating-parameters' },
      { label: 'Security invariants', to: '/methodology#security-invariants' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About' },
      { label: 'Governance' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation' },
      { label: 'Audits' },
      { label: 'Risk disclosures' },
      { label: 'Status' },
      { label: 'Changelog' },
    ],
  },
]

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__inner">
        <Reveal variants={fadeUp}>
          <div className="landing-footer__top">
            <div className="landing-footer__brand">
              <Logo size={24} />
              <p>
                Autonomous liquidity infrastructure for tokenized equities. Price the
                venues, finance the inventory, compound the surplus.
              </p>
            </div>

            <div className="landing-footer__columns">
              {columns.map((col) => (
                <div key={col.title} className="landing-footer__col">
                  <h3>{col.title}</h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <motion.span
                          className="landing-footer__link-wrap"
                          whileHover={{ x: 3, opacity: 0.65 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.to ? (
                            <Link to={link.to}>{link.label}</Link>
                          ) : (
                            <a href="#">{link.label}</a>
                          )}
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="landing-footer__bottom">
            <p>&copy; {new Date().getFullYear()} KEEL. All rights reserved.</p>
            <div className="landing-footer__legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Disclosures</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
