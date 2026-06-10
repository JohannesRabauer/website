import React from 'react';
import ProjectCard from "./ProjectCard";
import SectionHeading from './SectionHeading';

interface Publication {
    title: string;
    publisher: string;
    link: string;
}

const publications: Publication[] = [
    { title: 'Exploring Cost-Effective Solutions for Stateful Rest Services', publisher: 'foojay.io', link: 'https://foojay.io/today/exploring-cost-effective-solutions-for-stateful-rest-services/' },
    { title: 'Minimize Costs by Utilizing Cloud Storage with Spring-Data-Eclipse-Store', publisher: 'javapro.io', link: 'https://javapro.io/2024/07/29/minimize-costs-by-utilizing-cloud-storage-with-spring-data-eclipse-store/' },
];

const Publications: React.FC = () => {
    return (
        <section aria-labelledby="publications-heading" className="w-full max-w-4xl px-4 pb-20 text-center">
            <SectionHeading
                id="publications-heading"
                kicker="// writing"
                title="Publications"
                colorClass="text-cyber-cyan"
                dividerColor="#00f2fe"
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {publications.map((pub) => (
                    <ProjectCard key={pub.link} title={pub.title} description={pub.publisher} link={pub.link} />
                ))}
            </div>
        </section>
    );
};

export default Publications;