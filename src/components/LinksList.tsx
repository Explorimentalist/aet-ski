// src/components/LinksList.tsx
import React from 'react';
import { Grid } from './Grid';
import { LinkListItem } from './LinkListItem';

interface LinkData {
  /** Unique identifier for the link */
  id: string;
  /** Company logo as Cloudinary public ID or fallback URL */
  logo: string;
  /** Company name */
  companyName: string;
  /** Website URL */
  url: string;
  /** Optional description or additional info */
  description?: string;
}

interface LinksListProps {
  /** Section heading */
  heading: string;
  /** Section description */
  description: string;
  /** Array of links to display */
  links: LinkData[];
  /** Optional CSS class name */
  className?: string;
}

export const LinksList: React.FC<LinksListProps> = ({
  heading,
  description,
  links,
  className = '',
}) => {
  return (
    <section className={`py-8xl ${className}`}>
      <div className="container mx-auto">
        <Grid>
          {/* Heading - 3 columns desktop, 3 tablet, 4 mobile */}
          <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3">
            <h2 className="font-heading font-bold text-3xl leading-tight tracking-tight text-text-primary">
              {heading}
            </h2>
          </div>

          {/* Description - 6 columns desktop starting col 7, 5 columns tablet starting col 4, 4 columns mobile */}
          <div className="col-mobile-4 tablet:col-tablet-5 tablet:col-start-tablet-4 desktop:col-desktop-6 desktop:col-start-desktop-7 mt-6xl tablet:mt-0">
            <p className="font-body font-normal text-base leading-relaxed tracking-normal text-text-primary">
              {description}
            </p>
          </div>
        </Grid>

        {/* Links List - Full width container for list items */}
        <div className="mt-8xl">
          <Grid>
            {links.map((link) => (
              <LinkListItem
                key={link.id}
                logo={link.logo}
                companyName={link.companyName}
                url={link.url}
                description={link.description}
              />
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};