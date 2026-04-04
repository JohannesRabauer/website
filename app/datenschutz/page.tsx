import type { Metadata } from 'next';
import LegalPageShell from '@/app/components/LegalPageShell';
import { giscusDiscussionUrl, legalContact } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Datenschutz | Johannes Rabauer',
  description: 'Datenschutzerklärung für rabauer.dev.',
};

export default function DatenschutzPage() {
  return (
    <LegalPageShell
      title="Datenschutzerklärung"
      intro="Diese Datenschutzerklärung ist auf die aktuell technische Umsetzung von rabauer.dev zugeschnitten und bewusst auf die tatsächlich verwendeten Dienste beschränkt."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:
      </p>
      <p>
        {legalContact.fullName}
        <br />
        {legalContact.streetAddress}
        <br />
        {legalContact.postalCodeCity}
        <br />
        {legalContact.country}
        <br />
        E-Mail:{' '}
        <a href={`mailto:${legalContact.email}`}>{legalContact.email}</a>
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird als statische Website über GitHub Pages bereitgestellt.
        Beim Aufruf der Website werden technisch erforderliche Verbindungsdaten verarbeitet,
        insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Datei,
        Referrer-URL, Browsertyp und Betriebssystem.
      </p>
      <p>
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        Mein berechtigtes Interesse besteht in der sicheren und stabilen Bereitstellung
        dieser Website.
      </p>

      <h2>3. Kontaktaufnahme</h2>
      <p>
        Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre Angaben zur Bearbeitung
        der Anfrage und für eventuelle Anschlussfragen. Die Verarbeitung erfolgt je nach
        Anlass auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>4. Externe Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites und Plattformen. Für Inhalte und
        Datenverarbeitung auf diesen externen Websites sind ausschließlich deren Betreiber
        verantwortlich.
      </p>

      <h2>5. Externe Bilder von GitHub und YouTube</h2>
      <p>
        Auf dieser Website werden einzelne Bilder direkt von externen Servern geladen.
        Dazu gehören insbesondere Profil- und Avatarbilder von GitHub beziehungsweise
        GitHub-CDNs, zum Beispiel über <strong>avatars.githubusercontent.com</strong>, sowie
        Video-Vorschaubilder von YouTube, zum Beispiel über <strong>img.youtube.com</strong>.
      </p>
      <p>
        Beim Laden dieser Bilder wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt.
        Außerdem können technische Verbindungsdaten verarbeitet werden. Die Verarbeitung erfolgt
        auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse besteht in
        einer ansprechenden und funktionalen Darstellung der Inhalte.
      </p>
      <p>
        Dabei kann eine Übermittlung personenbezogener Daten in Drittländer, insbesondere in
        die USA, nicht ausgeschlossen werden.
      </p>

      <h2>6. YouTube-Inhalte</h2>
      <p>
        Auf der Startseite werden YouTube-Playlists nicht eingebettet. Stattdessen werden dort
        Vorschaubilder angezeigt, die auf die jeweiligen Inhalte bei YouTube verlinken.
      </p>
      <p>
        In Blogbeiträgen werden einzelne YouTube-Videos ebenfalls nicht automatisch geladen. Eine
        Verbindung zu YouTube beziehungsweise Google wird erst hergestellt, wenn Sie das jeweilige
        Video aktiv freigeben und laden.
      </p>
      <p>
        Erst nach dieser Freigabe wird der eingebettete Inhalt von YouTube beziehungsweise Google
        geladen. Dabei können personenbezogene Daten, insbesondere Ihre IP-Adresse und technische
        Nutzungsdaten, an YouTube oder Google übermittelt werden. Außerdem können Cookies oder
        ähnliche Technologien eingesetzt werden.
      </p>
      <p>
        Die Verarbeitung des eingebetteten Players erfolgt erst nach Ihrer Einwilligung auf
        Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die Vorschaubilder selbst werden bereits beim
        Aufruf der Seite geladen; die damit verbundene Datenverarbeitung ist im Abschnitt zu
        externen Bildern beschrieben.
      </p>

      <h2>7. Kommentarfunktion mit Giscus</h2>
      <p>
        Die Kommentarfunktion wird auf dieser Website nicht automatisch geladen. Eine Verbindung
        zu Giscus beziehungsweise GitHub wird erst hergestellt, wenn Sie die Kommentarfunktion
        aktiv freigeben, indem Sie die Einwilligungsoption auswählen und anschließend die
        Kommentare laden.
      </p>
      <p>
        Nach der Freigabe können personenbezogene Daten, insbesondere Ihre IP-Adresse und
        technische Nutzungsdaten, an GitHub übermittelt werden. Wenn Sie selbst kommentieren,
        werden außerdem die von Ihnen eingegebenen Inhalte sowie gegebenenfalls Ihr GitHub-
        Benutzername und weitere mit Ihrem GitHub-Konto verbundene Informationen verarbeitet und
        öffentlich angezeigt.
      </p>
      <p>
        Die Verarbeitung erfolgt erst nach Ihrer Einwilligung auf Grundlage von Art. 6 Abs. 1
        lit. a DSGVO. Die Kommentare basieren technisch auf GitHub Discussions und werden unter
        <a href={giscusDiscussionUrl} target="_blank" rel="noopener noreferrer"> GitHub Discussions </a>
        verwaltet.
      </p>
      <p>
        Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Bereits
        erfolgte Datenverarbeitungen bleiben von einem Widerruf unberührt.
      </p>

      <h2>8. Cookies und Reichweitenmessung</h2>
      <p>
        Diese Website verwendet selbst keine Cookies zu Analyse-, Tracking- oder Marketingzwecken
        und setzt keine Webanalyse-Tools ein.
      </p>
      <p>
        Wenn Sie eingebettete YouTube-Videos in Blogbeiträgen oder die Kommentarfunktion mit
        Giscus aktiv freigeben, können die jeweiligen Drittanbieter eigene Cookies oder ähnliche
        Technologien einsetzen. Darauf habe ich keinen Einfluss.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>
        Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft über die Sie
        betreffenden personenbezogenen Daten sowie auf Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Widerspruch gegen die Verarbeitung und auf Datenübertragbarkeit.
      </p>
      <p>
        Wenn eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese Einwilligung
        jederzeit mit Wirkung für die Zukunft widerrufen.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
      </p>

      <h2>10. Stand</h2>
      <p>Stand: {legalContact.updatedAt}</p>
    </LegalPageShell>
  );
}
