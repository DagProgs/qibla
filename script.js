class PoemsApp {
  constructor() {
    this.poems = [];
    this.selectedPoem = null;
    this.appElement = document.getElementById('app');

    this.loadPoems();
  }

  async loadPoems() {
    try {
      const res = await fetch('poems.json');
      if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
      this.poems = await res.json();
      this.render();
    } catch (err) {
      this.appElement.innerHTML = `<div class="error">Ошибка: ${err.message}</div>`;
    }
  }

  render() {
    if (this.selectedPoem) {
      this.renderFullPoem(this.selectedPoem);
      return;
    }

    let html = `<h1 class="header">Мавлид</h1>`;

    if (this.poems.length === 0) {
      html += `<p class="message">Нет стихов для отображения.</p>`;
    } else {
      this.poems.forEach(poem => {
        html += `
          <div class="poem-card" data-id="${poem.id}">
            <h2 class="title">${poem.title}</h2>
            <p class="author">Автор: ${poem.author || 'Неизвестен'}</p>
          </div>
        `;
      });
    }

    this.appElement.innerHTML = html;

    // Открытие стиха
    this.appElement.querySelectorAll('.poem-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        const poem = this.poems.find(p => p.id === id);
        this.selectedPoem = poem;
        this.render();
      });
    });
  }

  renderFullPoem(poem) {
    const lines = poem.content.split('/').join('\n');
    const shareText = `"${poem.title}"\n\n${lines}\n\n— из приложения "Мавлид"`;

    const html = `
      <div>
        <button id="back-button">← Назад</button>
        <div class="poem-card">
          <h2 class="title">${poem.title}</h2>
          <p class="author">Автор: ${poem.author || 'Неизвестен'}</p>
          <div class="content" style="white-space: pre-line; margin: 15px 0;">
            ${lines}
          </div>
          <button id="share-button">Поделиться</button>
        </div>
      </div>
    `;

    this.appElement.innerHTML = html;

    // Назад
    this.appElement.querySelector('#back-button').addEventListener('click', () => {
      this.selectedPoem = null;
      this.render();
    });

    // Поделиться
    this.appElement.querySelector('#share-button').addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: poem.title,
          text: shareText,
          url: window.location.href,
        }).catch(err => {
          console.error('Не удалось поделиться:', err);
          this.fallbackShare(shareText);
        });
      } else {
        this.fallbackShare(shareText);
      }
    });
  }

  fallbackShare(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Текст скопирован: можно вставить в сообщение');
    }).catch(() => {
      prompt('Скопируйте текст вручную:', text);
    });
  }
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  new PoemsApp();
});