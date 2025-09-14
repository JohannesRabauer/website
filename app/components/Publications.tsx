import React from 'react';
import ProjectCard from "./ProjectCard";

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
        <div className="publications items-center justify-center text-center">
            <h2 className="text-cyber-cyan text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">Publications</h2>
            <div className="publications-list flex space-x-4 py-6">
                {publications.map((pub, index) => (
                    <ProjectCard title={pub.title} description={pub.publisher} link={pub.link} />
                ))}
            </div>
        </div>
    );
};

export default Publications;