import { MarkdownCards } from '../components/Markdown'
import MemberCard from '../components/MemberCard'
import { aboutPage, teamCardsAfter } from '../content/pages'
import { site } from '../content/site'
import { team } from '../content/team'
import { pageTitle } from '../lib/site-url'

export default function AboutPage() {
  const members = (
    <ul className="members">
      {team.map((member) => (
        <li key={member.name}>
          <MemberCard member={member} />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="page">
      <title>{pageTitle(aboutPage.title, site.title)}</title>
      <h1 className="visually-hidden">{aboutPage.title}</h1>
      <MarkdownCards source={aboutPage.body} cards={aboutPage.cards} after={{ [teamCardsAfter]: members }} />
    </div>
  )
}
