const iframe = document.getElementById('app');

iframe.onload = async () => {
  const doc = iframe.contentDocument;

  function test(nombre, condicion) {
    console.log(`${condicion ? '✔' : '✘'} ${nombre}`);
  }

  function wait(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const select = doc.querySelector('select');

  /* ================= CUADRADO ================= */

  select.value = 'cuadrado';
  select.dispatchEvent(new Event('change'));
  await wait();

  let inputs = doc.querySelectorAll('input');
  test('Cuadrado: muestra un input', inputs.length === 1);

  inputs[0].value = 4;
  inputs[0].dispatchEvent(new Event('input'));
  await wait();

  test(
    'Cuadrado: calcula área correctamente',
    doc.querySelector('.resultado').textContent.includes('16.00')
  );

  test(
    'Cuadrado: muestra fórmula correcta',
    doc.querySelector('.formula').textContent === 'Fórmula: lado × lado'
  );

  /* ================= RECTÁNGULO ================= */

  select.value = 'rectangulo';
  select.dispatchEvent(new Event('change'));
  await wait();

  inputs = doc.querySelectorAll('input');
  test('Rectángulo: muestra dos inputs', inputs.length === 2);

  inputs[0].value = 5;
  inputs[1].value = 3;
  inputs.forEach(i => i.dispatchEvent(new Event('input')));
  await wait();

  test(
    'Rectángulo: calcula área correctamente',
    doc.querySelector('.resultado').textContent.includes('15.00')
  );

  test(
    'Rectángulo: muestra fórmula correcta',
    doc.querySelector('.formula').textContent === 'Fórmula: base × altura'
  );

  /* ================= CÍRCULO ================= */

  select.value = 'circulo';
  select.dispatchEvent(new Event('change'));
  await wait();

  inputs = doc.querySelectorAll('input');
  test('Círculo: muestra un input', inputs.length === 1);

  inputs[0].value = 2;
  inputs[0].dispatchEvent(new Event('input'));
  await wait();

  test(
    'Círculo: calcula área correctamente',
    doc.querySelector('.resultado').textContent.includes((Math.PI * 4).toFixed(2))
  );

  test(
    'Círculo: muestra fórmula correcta',
    doc.querySelector('.formula').textContent === 'Fórmula: π × radio²'
  );

  /* ================= TRIÁNGULO ================= */

  select.value = 'triangulo';
  select.dispatchEvent(new Event('change'));
  await wait();

  inputs = doc.querySelectorAll('input');
  test('Triángulo: muestra dos inputs', inputs.length === 2);

  inputs[0].value = 6;
  inputs[1].value = 4;
  inputs.forEach(i => i.dispatchEvent(new Event('input')));
  await wait();

  test(
    'Triángulo: calcula área correctamente',
    doc.querySelector('.resultado').textContent.includes('12.00')
  );

  test(
    'Triángulo: muestra fórmula correcta',
    doc.querySelector('.formula').textContent === 'Fórmula: (base × altura) / 2'
  );

  console.log('✅ Tests finalizados');
};
