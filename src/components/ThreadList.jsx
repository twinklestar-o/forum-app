import React from 'react';
import PropTypes from 'prop-types';               // ✅ Tambah: validasi props
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads }) {
  // ✅ Fokus untuk screen reader: area utama daftar thread
  return (
    <section
      aria-labelledby="threads-heading"
      className="thread-list-container"
    >
      {/* ✅ Judul semantik & untuk a11y */}
      <h2 id="threads-heading" className="sr-only">
        Discussion Threads
      </h2>

      {/* ✅ Tampilkan pesan bila kosong, dengan role alert agar screen reader membacanya */}
      {!threads?.length ? (
        <p className="text-gray-600" role="status">
          No threads yet.
        </p>
      ) : (
        <ul className="thread-list" aria-live="polite">
          {threads.map((thread) => (
            // ✅ Gunakan <li> agar semantik list terjaga
            <li key={thread.id} className="thread-list-item">
              <ThreadItem thread={thread} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ✅ PropTypes untuk memastikan data yang diterima sesuai
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};

// ✅ Nilai default agar komponen tidak error bila props belum ada
ThreadList.defaultProps = {
  threads: [],
};
