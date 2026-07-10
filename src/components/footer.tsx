import type React from 'react';

interface FooterProps {
  totalPages: number;
  filterParams: Map<string, string | number>;
}

const Footer: React.FC<FooterProps> = ({ totalPages, filterParams }) => {
  return (
    <footer className="mt-4 text-center text-sm text-muted">
      {filterParams.get('page') ?? 1} / {totalPages}
    </footer>
  );
};

export default Footer;
