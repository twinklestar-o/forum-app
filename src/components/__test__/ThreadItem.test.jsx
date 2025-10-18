import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadList from '../ThreadList';
import ThreadItem from '../ThreadItem';
import { vi } from 'vitest';

// Contoh data API
const threads = [
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong...',
    owner: { name: 'User1' },
    createdAt: '2023-05-29T07:55:52.266Z',
    totalComments: 1,
    upvoters: [],
    downvoters: [],
  },
  {
    id: 'thread-91KocEqYPRz68MhD',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu?</div>',
    owner: { name: 'User2' },
    createdAt: '2023-05-29T07:54:35.746Z',
    totalComments: 1,
    upvoters: [],
    downvoters: [],
  },
];

// Skenario: Menguji komponen ThreadList & ThreadItem
// 1. Semua thread dari API harus dirender di layar.
// 2. Klik tombol upvote menambah jumlah upvote.
// 3. Klik tombol downvote menambah jumlah downvote.
// 4. Judul thread harus menjadi link ke URL yang benar.

describe('ThreadList / ThreadItem', () => {
  it('renders all threads from API', () => {
    render(
      <MemoryRouter>
        <ThreadList threads={threads} />
      </MemoryRouter>
    );

    // cek judul muncul
    threads.forEach((t) => {
      expect(screen.getByText(new RegExp(t.title, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(t.owner.name, 'i'))).toBeInTheDocument();
    });
  });

  it('increments upvote when upvote button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ThreadItem thread={threads[0]} />
      </MemoryRouter>
    );

    const upvoteBtn = screen.getAllByRole('button', { name: /thumbs up/i })[0];
    await user.click(upvoteBtn);

    // Setelah klik, jumlah upvoters bertambah
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('increments downvote when downvote button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ThreadItem thread={threads[0]} />
      </MemoryRouter>
    );

    const downvoteBtn = screen.getAllByRole('button', { name: /thumbs down/i })[0];
    await user.click(downvoteBtn);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Link navigates to correct thread URL', () => {
    render(
      <MemoryRouter>
        <ThreadItem thread={threads[0]} />
      </MemoryRouter>
    );

    const link = screen.getByText(/Bagaimana pengalamanmu belajar Redux\?/i);
    expect(link.closest('a')).toHaveAttribute('href', `/thread/${threads[0].id}`);
  });
});
