import { site } from '../content/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {site.year} {site.course} - {site.team} | Hosted @ GitHub Pages |{' '}
        <a href={site.repoUrl}>Project repository</a>
      </p>
    </footer>
  )
}
