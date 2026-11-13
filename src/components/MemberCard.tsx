import type { ReactNode } from 'react'
import type { Member } from '../content/types'
import Watermark from './Watermark'
import './MemberCard.css'

const PLACEHOLDER = 'content here'

function Field({ label, children, variant }: { label: string; children?: ReactNode; variant?: 'name' | 'small' }) {
  const empty = children === undefined || children === '' || (Array.isArray(children) && children.length === 0)
  return (
    <div className={`field${variant ? ` field--${variant}` : ''}`}>
      <dt>{label}</dt>
      <dd>{empty ? <span className="field__placeholder">{PLACEHOLDER}</span> : children}</dd>
    </div>
  )
}

/** Passport-style team member card (Figma "Member Card"). */
export default function MemberCard({ member }: { member: Member }) {
  const links = member.contact?.map((link) => (
    <li key={link.href}>
      <a href={link.href}>{link.label ?? link.href}</a>
    </li>
  ))

  return (
    <article className="member" aria-label={member.name}>
      <Watermark className="member__watermark" />
      <div className="member__top">
        <div className="member__portrait">
          {member.photo && <img src={member.photo} alt={`Portrait of ${member.name}`} />}
        </div>
        <dl className="member__info">
          <Field label="Name" variant="name">
            {member.name}
          </Field>
          <Field label="Major">{member.major}</Field>
          <Field label="Role">{member.role}</Field>
        </dl>
      </div>
      <dl className="member__bottom">
        <Field label="Details" variant="small">
          {member.details}
        </Field>
        <Field label="Contact" variant="small">
          {links && links.length > 0 ? <ul className="field__links">{links}</ul> : undefined}
        </Field>
      </dl>
    </article>
  )
}
