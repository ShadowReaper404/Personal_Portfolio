import { Portfolio } from '@/components/features/portfolio';
import { site } from '@/lib/site';

export default function Home() {
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${site.url}/`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: `${site.url}/`,
      description: site.description,
      image: `${site.url}/portrait.jpg`,
      sameAs: [site.github, site.linkedin],
      knowsAbout: ['Cybersecurity', 'Software development', 'Management'],
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, '\\u003c') }} /><Portfolio /></>;
}
