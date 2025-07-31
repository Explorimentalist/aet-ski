// src/components/Footer.tsx
import Link from 'next/link';
import { Grid } from './Grid';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link 
    href={href}
    className="text-white hover:text-gray-200 transition-colors duration-200 text-base leading-relaxed tracking-[-0.011em]"
  >
    {children}
  </Link>
);

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h2 className="font-bold text-base leading-relaxed tracking-[-0.011em] text-white">
      {title}
    </h2>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </div>
);

export const Footer = () => {
  return (
    <footer 
      className="bg-[#4F5B62] w-full relative"
      role="contentinfo"
    >
      <Grid container className="py-12 tablet:py-16" data-animate="true">
        {/* Navigation Links - Using our grid system */}
        <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 mb-16">
          <Grid>
            <div className="col-mobile-2 tablet:col-tablet-4 desktop:col-desktop-6">
              <FooterSection title="Menu">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/routes">Routes</FooterLink>
                <FooterLink href="/quote">Quote</FooterLink>
              </FooterSection>
            </div>

            <div className="col-mobile-2 tablet:col-tablet-4 desktop:col-desktop-6">
              <FooterSection title="Support">
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/travel-info">Helpful travel information</FooterLink>
                <FooterLink href="/terms">Terms & Conditions</FooterLink>
              </FooterSection>
            </div>
          </Grid>
        </div>

        {/* Logo and Text Container - Using our grid system */}
        <Grid className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12">
          {/* Logo - Using grid system for responsive layout */}
          <div className="col-mobile-4 tablet:col-tablet-4 desktop:col-desktop-4 order-1 tablet:order-2 flex justify-center tablet:justify-end">
            <svg width="288" height="71" viewBox="0 0 288 71" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-[74px]" aria-label="AET Logo">
              <path d="M52.8076 45.8514C52.8076 45.8514 3.01512 38.9388 27.9114 32.7539C27.9114 32.7539 -17.9293 39.6665 8.94279 46.579C35.8149 53.4916 61.8967 60.0403 31.468 66.2252C31.468 66.2252 114.851 56.7659 52.8076 45.8514Z" fill="white"/>
              <path d="M88.3736 41.849C82.0508 38.2108 70.9858 27.2962 65.0581 14.5626C59.1304 1.82893 57.9449 4.37566 51.2269 13.1073C44.5088 21.839 46.0896 25.841 40.1619 19.656C34.2342 13.4711 32.6535 32.0259 32.6535 32.0259C32.6535 32.0259 9.33796 36.7555 52.0172 42.5766C80.4112 46.4493 84.4926 48.5507 84.0439 49.5235C87.1366 48.0775 93.2273 44.6418 88.3736 41.849Z" fill="white"/>
              <path d="M143.921 0L166.046 54.4696H152.539L148.064 42.3398H125.94L121.299 54.4696H108.124L130.58 0H143.921ZM137.043 13.4267L129.337 33.4141H144.667L137.209 13.4267H137.043ZM224.827 0V10.07H193.588V21.7421H222.258V31.0492H193.588V44.3996H225.49V54.4696H180.578V0H224.827ZM287.503 0V10.07H269.77V54.4696H256.761V10.07H239.028V0H287.503Z" fill="white"/>
              <path d="M111.657 63.772L111.209 62.8455H112.521L116.448 70.4889H115.114L114.578 69.3913H112.095C111.628 69.3913 111.209 69.4316 110.837 69.5121C110.509 69.586 110.235 69.6833 110.016 69.8042C109.819 69.9116 109.688 70.0224 109.623 70.1365L109.415 70.4889H108.124L111.657 63.772ZM112.532 68.2835H114.042L112.259 65.1114L110.454 68.7065C110.614 68.5789 110.859 68.4782 111.187 68.4044C111.559 68.3238 112.007 68.2835 112.532 68.2835ZM123.7 70.4889H117.98V62.9764H119.172V69.3913H123.7V70.4889ZM127.868 66.1889H129.312C130.114 66.1889 130.515 65.8331 130.515 65.1214C130.515 64.7522 130.415 64.4853 130.214 64.3208C130.014 64.1563 129.713 64.0741 129.312 64.0741H126.315V66.491C126.541 66.3702 126.796 66.2862 127.08 66.2392C127.292 66.2057 127.554 66.1889 127.868 66.1889ZM126.315 70.4889H125.122V62.9764H129.312C129.793 62.9764 130.212 63.062 130.57 63.2332C130.927 63.4044 131.204 63.6511 131.401 63.9734C131.598 64.2957 131.696 64.6766 131.696 65.1164C131.696 65.5561 131.598 65.9405 131.401 66.2695C131.204 66.5984 130.925 66.8519 130.564 67.0298C130.203 67.2077 129.786 67.2966 129.312 67.2966H127.868C127.241 67.2966 126.723 67.3973 126.315 67.5987V70.4889ZM139.791 68.203C139.791 68.6931 139.63 69.1294 139.309 69.5121C138.996 69.8747 138.564 70.1566 138.013 70.358C137.463 70.5594 136.841 70.6601 136.148 70.6601C135.514 70.6601 134.898 70.5242 134.3 70.2523C133.702 69.9804 133.199 69.6028 132.79 69.1194L133.643 68.3842C134.351 69.1697 135.186 69.5625 136.148 69.5625C136.571 69.5625 136.958 69.5155 137.308 69.4215C137.694 69.3141 137.993 69.163 138.205 68.9683C138.445 68.7535 138.566 68.4984 138.566 68.203C138.566 67.8471 138.445 67.5786 138.205 67.3973C138.001 67.2429 137.698 67.1422 137.297 67.0952C137.063 67.0684 136.681 67.0549 136.148 67.0549C135.171 67.0549 134.425 66.8905 133.911 66.5615C133.397 66.2325 133.14 65.7491 133.14 65.1114C133.14 64.7085 133.27 64.3259 133.529 63.9633C133.787 63.6008 134.143 63.3121 134.595 63.0973C135.062 62.869 135.579 62.7549 136.148 62.7549C136.79 62.7549 137.37 62.8455 137.887 63.0268C138.442 63.2215 138.956 63.5269 139.43 63.9432L138.686 64.7488C138.241 64.4199 137.836 64.1899 137.472 64.059C137.107 63.9281 136.666 63.8626 136.148 63.8626C135.849 63.8626 135.57 63.9197 135.311 64.0338C135.053 64.148 134.847 64.3007 134.693 64.492C134.54 64.6834 134.464 64.8865 134.464 65.1013C134.464 65.6787 135.043 65.9673 136.203 65.9673C137.129 65.9673 137.862 66.0546 138.402 66.2292C138.912 66.397 139.277 66.6521 139.495 66.9945C139.692 67.2966 139.791 67.6994 139.791 68.203Z" fill="white"/>
            </svg>
          </div>

          {/* Text Content - Using grid system for responsive layout */}
          <div className="col-mobile-4 tablet:col-tablet-4 desktop:col-desktop-8 order-2 tablet:order-1">
            <div className="text-[#D9D9D9] text-xs leading-relaxed tracking-[-0.011em]">
              <p className="mb-2">© 2025 Alps en route Transfers SARL</p>
              <p>
                Alps en route Transfers SARL is registered in France - No. RCS 2022B02282 - Chambery.
                55 Rue Derrière le Château, 73600, Salins-Fontaine, France - Siret 921 741 328 00014.
                IBAN FR76 1810 6008 1096 7784 1495 087 - Code NAF (APE) 4932Z.
                SARL au capital social de 3000€.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};