import type { Metadata } from 'next';
import LegalPageShell from '@/app/components/LegalPageShell';
import { legalContact } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen | Johannes Rabauer',
  description: 'Nutzungsbedingungen für rabauer.dev und das Werkzeug „Social Publisher“.',
};

export default function NutzungsbedingungenPage() {
  return (
    <LegalPageShell
      title="Nutzungsbedingungen"
      intro="Bedingungen für die Nutzung dieser Website und des privat betriebenen Veröffentlichungswerkzeugs „Social Publisher“."
    >
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Bedingungen gelten für die Website rabauer.dev und für das Werkzeug „Social
        Publisher“, mit dem ich, {legalContact.fullName}, eigene Inhalte (insbesondere kurze
        Videos aus meinen Live-Coding-Sessions) auf meinen eigenen Konten bei sozialen
        Netzwerken wie YouTube und TikTok veröffentliche.
      </p>

      <h2>2. Website</h2>
      <p>
        Die Inhalte dieser Website dienen der Information. Ich erstelle sie mit Sorgfalt,
        übernehme aber keine Gewähr für Vollständigkeit, Richtigkeit und Aktualität. Texte,
        Bilder und Videos sind urheberrechtlich geschützt; eine Verwendung über das gesetzlich
        Erlaubte hinaus bedarf meiner Zustimmung. Für Inhalte verlinkter externer Websites sind
        ausschließlich deren Betreiber verantwortlich.
      </p>

      <h2>3. Social Publisher</h2>
      <p>
        Der Social Publisher ist eine selbst betriebene Instanz der Open-Source-Software Postiz.
        Er wird ausschließlich von mir für meine eigenen Konten genutzt, ist nicht öffentlich
        zugänglich und wird Dritten nicht als Dienst angeboten. Es werden keine Konten anderer
        Personen verbunden und keine Inhalte im Namen anderer veröffentlicht.
      </p>
      <p>
        Bei der Nutzung der Schnittstellen der jeweiligen Plattformen gelten zusätzlich deren
        Bedingungen, insbesondere die{' '}
        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
          Nutzungsbedingungen von YouTube
        </a>{' '}
        und die{' '}
        <a href="https://www.tiktok.com/legal/terms-of-service" target="_blank" rel="noopener noreferrer">
          Nutzungsbedingungen von TikTok
        </a>
        . Welche Daten dabei verarbeitet werden, beschreibt die{' '}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>4. Haftung</h2>
      <p>
        Ich hafte unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den zwingenden
        gesetzlichen Vorschriften. Im Übrigen ist die Haftung ausgeschlossen, soweit gesetzlich
        zulässig.
      </p>

      <h2>5. Kontakt</h2>
      <p>
        Fragen zu diesen Bedingungen bitte an{' '}
        <a href={`mailto:${legalContact.email}`}>{legalContact.email}</a>.
      </p>

      <h2>6. Stand</h2>
      <p>Stand: {legalContact.updatedAt}</p>
    </LegalPageShell>
  );
}
