export interface TermsSection {
  id: string;
  number: number;
  title: string;
  content: string;
}

export interface TermsData {
  _id: string;
  title: string;
  lastUpdated: string;
  version: string;
  sections: TermsSection[];
}
