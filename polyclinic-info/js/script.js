'use strict';

// Тимчасові дані. У лабораторній №3 їх замінить запит fetch('/api/doctors')
const doctors = [
  { id: 1, name: 'Коваленко Олена Іванівна',   specialty: 'Терапевт',   room: '101', schedule: 'Пн–Пт, 08:00–14:00' },
  { id: 2, name: 'Шевчук Андрій Петрович',     specialty: 'Кардіолог',  room: '214', schedule: 'Пн, Ср, Пт, 09:00–15:00' },
  { id: 3, name: 'Бондаренко Ірина Миколаївна', specialty: 'Невролог',   room: '208', schedule: 'Вт, Чт, 10:00–16:00' },
  { id: 4, name: 'Мельник Тарас Олегович',     specialty: 'Педіатр',    room: '115', schedule: 'Пн–Пт, 08:00–13:00' },
  { id: 5, name: 'Ткаченко Марія Василівна',   specialty: 'Лікар УЗД',  room: '302', schedule: 'Пн–Сб, 08:30–14:30' },
  { id: 6, name: 'Лисенко Віктор Сергійович',  specialty: 'Терапевт',   room: '103', schedule: 'Пн–Пт, 13:00–19:00' }
];

const container = document.getElementById('doctors-list');
const searchInput = document.getElementById('search');
const counter = document.getElementById('count');

// Захист від XSS: екрануємо дані перед вставкою в HTML
function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderDoctors(list) {
  counter.textContent = `Знайдено лікарів: ${list.length}`;

  if (list.length === 0) {
    container.innerHTML = '<p class="empty">Нічого не знайдено. Спробуйте іншу спеціальність або прізвище.</p>';
    return;
  }

  container.innerHTML = list.map(d => `
    <article class="card">
      <h3>${escapeHtml(d.name)}</h3>
      <p class="spec">${escapeHtml(d.specialty)}</p>
      <p>Кабінет: ${escapeHtml(d.room)}</p>
      <p>Прийом: ${escapeHtml(d.schedule)}</p>
    </article>`).join('');
}

searchInput.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  renderDoctors(doctors.filter(d =>
    d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
  ));
});

document.getElementById('year').textContent = new Date().getFullYear();
renderDoctors(doctors);
