import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '../../../views/CaseStudy';
import { caseStudies, getCaseStudy } from '../../../constants/caseStudies';

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug);
  return study ? { title: `${study.title} - Samuvel Johnson`, description: study.summary } : {};
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  return <CaseStudy study={study} />;
}
