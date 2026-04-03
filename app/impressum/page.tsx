import type { Metadata } from 'next';
import LegalPageShell from '@/app/components/LegalPageShell';
import { legalContact } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Impressum | Johannes Rabauer',
  description: 'Impressum und Anbieterkennzeichnung für rabauer.dev.',
};

export default function ImpressumPage() {
  return (
    <LegalPageShell
      title="Impressum"
      intro="Pflichtangaben für diese Website nach deutschem Recht in einer bewusst schlanken, auf das Projekt zugeschnittenen Fassung."
    >
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {legalContact.fullName}
        <br />
        {legalContact.streetAddress}
        <br />
        {legalContact.postalCodeCity}
        <br />
        {legalContact.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{' '}
        <a href={`mailto:${legalContact.email}`}>
          {legalContact.email}
        </a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {legalContact.fullName}
        <br />
        {legalContact.streetAddress}
        <br />
        {legalContact.postalCodeCity}
        <br />
        {legalContact.country}
      </p>

      <h2>Hinweis</h2>
      <p>
        Diese Website dient der persönlichen und beruflichen Selbstdarstellung,
        enthält redaktionelle Inhalte in Form eines Blogs und verzichtet bewusst
        auf zusätzliche Pflichtangaben, sofern sie auf die hier betriebene Website
        nicht zutreffen, etwa Handelsregister-, Umsatzsteuer- oder Berufsrechtsangaben.
      </p>
    </LegalPageShell>
  );
}
