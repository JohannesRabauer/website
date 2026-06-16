import React from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';

interface Certification {
    title: string;
    badgeUrl: string;
    link: string;
}

const certifications: Certification[] = [
    { title: 'Kubernetes and Cloud Native Associate', badgeUrl: '/badges/KCNA_badge.png', link: 'https://www.credly.com/badges/a0b03186-758b-4718-9791-24d2583a19fb/public_url' },
    { title: 'AWS Certified AI Practitioner', badgeUrl: '/badges/AWS_AIP.png', link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/b75cd180eb8b46f2ae965f14faab0a8d' },
    { title: 'Certified Vaadin 24 Developer', badgeUrl: '/badges/VaadinV24.png', link: 'https://vaadin.com/learn/certificate/5547711f-53c3-4f6d-b996-b9cec2487229' },
    { title: 'Oracle ACE Associate', badgeUrl: '/badges/OracleAce_badge_2026.png', link: 'https://ace.oracle.com/ords/ace/profile/johannes' },
    { title: 'Microsoft MVP', badgeUrl: '/badges/MVP_badge.jpg', link: 'https://mvp.microsoft.com/en-US/MVP/profile/021645ec-0219-43b1-9d22-f46801a146fc' },
    { title: 'Docker Community Leader', badgeUrl: '/badges/docker_badge.png', link: 'https://www.docker.com/contributors/johannes-rabauer/' },
    { title: 'IBM Certified Advocate - Cloud v2', badgeUrl: '/badges/IBM_Cloud.png', link: 'https://www.credly.com/badges/a5bbae9c-8f0b-43b8-ab57-d84cf0125afb' },
    { title: 'AWS Certified Cloud Practitioner', badgeUrl: '/badges/AWS_CCP.png', link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/PDBZJLW1TNQ41ZSH' },
];

const Certifications: React.FC = () => {
    return (
        <section aria-labelledby="certifications-heading" className="w-full max-w-5xl px-4 pb-16 text-center">
            <SectionHeading
                id="certifications-heading"
                kicker="// credentials"
                title="Certifications"
                colorClass="text-cyber-green"
                dividerColor="#00ff9d"
            />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                    {certifications.map((cert, index) => (
                        <div key={index} className="group">
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${cert.title} certification`}
                                className="block transition-transform duration-300 group-hover:scale-110"
                            >
                                <Image
                                    src={cert.badgeUrl}
                                    alt={cert.title}
                                    width={90}
                                    height={90}
                                    className="w-[54px] h-[54px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] object-contain relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,255,157,0.55)]"
                                />
                            </a>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Certifications;