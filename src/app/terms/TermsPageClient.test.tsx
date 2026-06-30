import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import TermsPageClient from './TermsPageClient'
import {PDFGenerator} from '@/lib/pdfGenerator'
import type {TermsData} from '@/types/terms'

jest.mock('@/components/Navigation', () => ({
  Navigation: () => <nav>Navigation</nav>,
}))
jest.mock('@/components/Footer', () => ({
  Footer: () => <footer>Footer</footer>,
}))
jest.mock('@/components/LazyMultiStepForm', () => ({
  LazyMultiStepForm: () => null,
}))
jest.mock('@/components/SideNavigation', () => ({
  __esModule: true,
  default: () => <aside>Sections</aside>,
}))
jest.mock('@/motion/PageWrapper', () => ({
  PageWrapper: ({children}: {children: React.ReactNode}) => <main>{children}</main>,
}))
jest.mock('@/lib/pdfGenerator', () => ({
  PDFGenerator: {
    generateTermsPDF: jest.fn().mockResolvedValue(undefined),
  },
}))

const termsData: TermsData = {
  _id: 'terms',
  title: 'Terms and conditions',
  lastUpdated: '2026-06-29T14:02:13Z',
  version: '1.0',
  sections: [
    {
      id: 'flight-delays',
      number: 5,
      title: 'Flight delays',
      content: 'Waiting time is charged at 60€ per hour.',
      isActive: true,
    },
    {
      id: 'retired-policy',
      number: 6,
      title: 'Retired policy',
      content: 'This text must not be displayed or downloaded.',
      isActive: false,
    },
  ],
}

describe('TermsPageClient', () => {
  it('uses the same active published content for the page and PDF', async () => {
    render(<TermsPageClient termsData={termsData} />)

    expect(screen.getByText('Waiting time is charged at 60€ per hour.')).toBeInTheDocument()
    expect(screen.queryByText('This text must not be displayed or downloaded.')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name: 'Download T&Cs in PDF'}))

    await waitFor(() =>
      expect(PDFGenerator.generateTermsPDF).toHaveBeenCalledWith(
        [
          {
            number: '5',
            title: 'Flight delays',
            content: 'Waiting time is charged at 60€ per hour.',
          },
        ],
        {
          filename: 'aet-terms-and-conditions.pdf',
          format: 'a4',
          orientation: 'portrait',
        },
      ),
    )
  })
})
