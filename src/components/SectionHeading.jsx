import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-white sm:text-4xl lg:text-[3rem]">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-mist sm:text-lg">{description}</p>
    </Reveal>
  );
}
