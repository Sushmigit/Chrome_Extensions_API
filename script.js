let allExtensions = [];

fetch('/api/extensions') // Node.js endpoint returning JSON
  .then(res => res.json())
  .then(data => {
    allExtensions = data.extensions;
    displayExtensions('Productivity'); // Show default category
  })
  .catch(err => console.error(err));

const container = document.getElementById('extensions-container');
const buttons = document.querySelectorAll('.category-buttons button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    buttons.forEach(b => b.classList.remove('active'));
    // Add active to clicked button
    btn.classList.add('active');

    displayExtensions(btn.dataset.category);
  });
});

function displayExtensions(category) {
  container.innerHTML = '';
  const filtered = allExtensions.filter(ext => ext.category === category);

  filtered.forEach(ext => {
    const card = document.createElement('div');
    card.className = 'extension-card';

    const icon = document.createElement('i');
    icon.style.fontSize = '20px';
    icon.style.color = '#2980b9';
    switch(ext.category) {
      case 'Productivity': icon.className = 'fa-solid fa-briefcase'; break;
      case 'Focus': icon.className = 'fa-solid fa-bullseye'; break;
      case 'Study': icon.className = 'fa-solid fa-book'; break;
      case 'Coding': icon.className = 'fa-solid fa-code'; break;
      default: icon.className = 'fa-solid fa-chrome'; break;
    }

    const title = document.createElement('h2');
    title.appendChild(icon);
    title.append(` ${ext.name} `);

    const categorySpan = document.createElement('span');
    categorySpan.textContent = `(${ext.category})`;
    title.appendChild(categorySpan);

    const desc = document.createElement('p');
    desc.textContent = ext.description;

    const link = document.createElement('a');
    link.href = ext.link;
    link.target = '_blank';
    link.textContent = 'View Extension';

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(link);

    container.appendChild(card);
  });
}
