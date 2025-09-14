import React from 'react';

interface Certification {
    title: string;
    badgeUrl: string;
    link: string;
}

const certifications: Certification[] = [
    // Add your certifications here
    { title: 'Kubernetes and Cloud Native Associate', badgeUrl: 'KCNA_badge.png', link: 'https://www.credly.com/badges/a0b03186-758b-4718-9791-24d2583a19fb/public_url' },
    { title: 'AWS Certified AI Practitioner', badgeUrl: 'AWS_AIP.png', link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/b75cd180eb8b46f2ae965f14faab0a8d' },
    { title: 'Certified Vaadin 24 Developer', badgeUrl: 'VaadinV24.png', link: 'https://vaadin.com/learn/certificate/5547711f-53c3-4f6d-b996-b9cec2487229' },
    { title: 'IBM Certified Advocate - Cloud v2', badgeUrl: 'IBM_Cloud.png', link: 'https://www.credly.com/badges/a5bbae9c-8f0b-43b8-ab57-d84cf0125afb' },
    { title: 'AWS Certified Cloud Practitioner', badgeUrl: 'AWS_CCP.png', link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/PDBZJLW1TNQ41ZSH' },
];

const Certifications: React.FC = () => {
    return (
        <div className="certifications items-center justify-center text-center">
            <h2 className="text-cyber-cyan text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">Certifications</h2>
            <div className="certification-list flex space-x-4 py-6">
                {certifications.map((cert, index) => (
                    <div key={index} className="certification-item">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            <img src={cert.badgeUrl} alt={cert.title} className="certification-badge" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certifications;