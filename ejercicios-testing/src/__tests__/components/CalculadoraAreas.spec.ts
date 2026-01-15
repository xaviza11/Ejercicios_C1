import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CalculadoraAreas from '@/components/CalculadoraArea.vue';

describe('CalculadoraAreas.vue', () => {
  it('debe mostrar un input cuando se selecciona Cuadrado', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('cuadrado');
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(1);
    expect(inputs[0].attributes('placeholder')).toBe('Lado');
  });

  it('debe calcular correctamente el área del Cuadrado', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('cuadrado');
    const inputLado = wrapper.get('input');
    await inputLado.setValue(5);
    const resultado = wrapper.get('.resultado').text();
    expect(resultado).toContain('25.00'); // 5*5
  });

  it('debe mostrar la fórmula correcta del Cuadrado', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('cuadrado');
    const inputLado = wrapper.get('input');
    await inputLado.setValue(2);
    const formula = wrapper.get('.formula').text();
    expect(formula).toBe('Fórmula: lado × lado');
  });

  it('debe mostrar dos inputs cuando se selecciona Rectángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('rectangulo');
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('placeholder')).toBe('Base');
    expect(inputs[1].attributes('placeholder')).toBe('Altura');
  });

  it('debe calcular correctamente el área del Rectángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('rectangulo');
    const [inputBase, inputAltura] = wrapper.findAll('input');
    await inputBase.setValue(4);
    await inputAltura.setValue(6);
    const resultado = wrapper.get('.resultado').text();
    expect(resultado).toContain('24.00'); // 4*6
  });

  it('debe mostrar la fórmula correcta del Rectángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('rectangulo');
    const [inputBase, inputAltura] = wrapper.findAll('input');
    await inputBase.setValue(3);
    await inputAltura.setValue(2);
    const formula = wrapper.get('.formula').text();
    expect(formula).toBe('Fórmula: base × altura');
  });

  it('debe mostrar un input cuando se selecciona Círculo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('circulo');
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(1);
    expect(inputs[0].attributes('placeholder')).toBe('Radio');
  });

  it('debe calcular correctamente el área del Círculo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('circulo');
    const inputRadio = wrapper.get('input');
    await inputRadio.setValue(3);
    const resultado = wrapper.get('.resultado').text();
    expect(resultado).toContain((Math.PI * 3 * 3).toFixed(2));
  });

  it('debe mostrar la fórmula correcta del Círculo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('circulo');
    const inputRadio = wrapper.get('input');
    await inputRadio.setValue(1);
    const formula = wrapper.get('.formula').text();
    expect(formula).toBe('Fórmula: π × radio²');
  });

  it('debe mostrar dos inputs cuando se selecciona Triángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('triangulo');
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('placeholder')).toBe('Base');
    expect(inputs[1].attributes('placeholder')).toBe('Altura');
  });

  it('debe calcular correctamente el área del Triángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('triangulo');
    const [inputBase, inputAltura] = wrapper.findAll('input');
    await inputBase.setValue(4);
    await inputAltura.setValue(5);
    const resultado = wrapper.get('.resultado').text();
    expect(resultado).toContain('10.00'); // (4*5)/2
  });

  it('debe mostrar la fórmula correcta del Triángulo', async () => {
    const wrapper = mount(CalculadoraAreas);
    await wrapper.get('select').setValue('triangulo');
    const [inputBase, inputAltura] = wrapper.findAll('input');
    await inputBase.setValue(2);
    await inputAltura.setValue(3);
    const formula = wrapper.get('.formula').text();
    expect(formula).toBe('Fórmula: (base × altura) / 2');
  });
});
