import { FaGithub, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope, FaTwitch } from "react-icons/fa";
import { SiMastodon, SiBluesky, SiTiktok } from "react-icons/si";

interface SocialBadgesProps {
  variant?: "default" | "jcon";
}

const links = [
  { href: "https://github.com/JohannesRabauer",            label: "GitHub",    Icon: FaGithub,   defaultClass: "text-cyber-green hover:text-cyber-purple" },
  { href: "https://www.linkedin.com/in/johannes-rabauer",  label: "LinkedIn",  Icon: FaLinkedin, defaultClass: "text-cyber-cyan hover:text-cyber-green" },
  { href: "https://www.youtube.com/@johannesrabauer",      label: "YouTube",   Icon: FaYoutube,  defaultClass: "text-cyber-purple hover:text-cyber-cyan" },
  { href: "https://twitter.com/JohannesRabauer",           label: "Twitter",   Icon: FaTwitter,  defaultClass: "text-cyber-green hover:text-cyber-purple" },
  { href: "https://mastodon.online/@rabauer",              label: "Mastodon",  Icon: SiMastodon, defaultClass: "text-cyber-cyan hover:text-cyber-green" },
  { href: "https://bsky.app/profile/rabauer.dev",          label: "Bluesky",   Icon: SiBluesky,  defaultClass: "text-cyber-purple hover:text-cyber-cyan" },
  { href: "https://www.tiktok.com/@johannes.rabauer",      label: "TikTok",    Icon: SiTiktok,   defaultClass: "text-cyber-green hover:text-cyber-purple" },
  { href: "https://www.twitch.tv/johannesrabauer",         label: "Twitch",    Icon: FaTwitch,   defaultClass: "text-cyber-purple hover:text-cyber-cyan" },
  { href: "mailto:johannes@rabauer.dev",                   label: "E-Mail",    Icon: FaEnvelope, defaultClass: "text-cyber-cyan hover:text-cyber-green" },
];

export default function SocialBadges({ variant = "default" }: SocialBadgesProps) {
  const isJcon = variant === "jcon";

  return (
    <div
      className={
        isJcon
          ? "flex flex-wrap justify-center gap-5"
          : "flex flex-wrap justify-center gap-6 mb-10 animate-fade-in delay-300"
      }
    >
      {links.map(({ href, label, Icon, defaultClass }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={
            isJcon
              ? "text-cyber-cyan hover:text-cyber-purple text-3xl transition drop-shadow-cyber"
              : `${defaultClass} text-3xl transition drop-shadow-cyber`
          }
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
