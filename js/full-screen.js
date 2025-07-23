const title = document.getElementById('title');
  const headerShape = document.getElementById('headerShape');
  const firstScreen = document.getElementById('fullPages');
  const cloud = document.querySelector('.cloud');

  // Получаем высоту первого экрана
  const firstScreenHeight = firstScreen.offsetHeight;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Плавное исчезновение заголовка на первом экране
    if (scrollY < firstScreenHeight) {
      const opacity = 1 - scrollY / firstScreenHeight;
      title.style.opacity = opacity;
      title.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.5}px))`;
    } else {
      // Заголовок скрыт после ухода с первого экрана
      title.style.opacity = 0;
    }

    // Появление шапки, когда первый экран уходит вверх
    if (scrollY >= firstScreenHeight - 80) {
      // Когда скролл достиг границы
      headerShape.style.opacity = 1;
      headerShape.style.pointerEvents = 'auto';
    } else {
      // Возврат к исходному состоянию
      headerShape.style.opacity = 0;
      headerShape.style.pointerEvents = 'none';
    }

    // Анимация облака: движение слева направо при скролле
    const maxOffset = 300; // Максимальное смещение в px
    const offset = Math.min(scrollY * 0.5, maxOffset); // регулируйте множитель по желанию
    cloud.style.transform = `translateX(-${offset}px)`;
  });