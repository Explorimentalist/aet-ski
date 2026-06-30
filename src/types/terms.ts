export interface TermsSection {
  id: string;
  number: number;
  title: string;
  content: string;
  isActive: boolean;
}

export interface TermsData {
  _id: string;
  title: string;
  lastUpdated: string;
  version: string;
  sections: TermsSection[];
}
