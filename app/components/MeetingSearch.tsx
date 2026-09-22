'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // always reset to page 1 on a new search
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);

  const handleDateSearch = useDebouncedCallback((date: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (date) {
      params.set('date', date);
    } else {
      params.delete('date');
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search meetings"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
      />
      <input
        type="date"
        defaultValue={searchParams.get('date')?.toString()}
        onChange={(e) => handleDateSearch(e.target.value)}
        aria-label="Filter meetings by date"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
      />
    </div>
  );
}