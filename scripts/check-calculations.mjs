import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
// Production uses Next's extension resolution; reproduce it only for this Node test.
registerHooks({ resolve(specifier, context, next) {
  try { return next(specifier, context); }
  catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND' && specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) return next(`${specifier}.js`, context);
    throw error;
  }
}});
const { toolMap } = await import('../src/data/tools.js');
const { payment } = await import('../src/data/tool-utils.js');
const amount = (value) => Number(value.replace(/[^0-9,.-]/g, '').replaceAll('.', '').replace(',', '.'));
function value(slug, values, label) {
  const output = toolMap[slug].calculate(values);
  const row = [...output.summary, ...output.details].find((item) => item.label === label);
  assert.ok(row, `${slug}: missing ${label}`);
  return amount(row.value);
}
assert.equal(value('kdv-hesaplama', { amount: 1000, rate: 20, mode: 'excluded' }, 'KDV dahil toplam'), 1200);
assert.equal(value('kdv-hesaplama', { amount: 1200, rate: 20, mode: 'included' }, 'KDV hariç matrah'), 1000);
assert.equal(value('kredi-hesaplama', { principal: 12000, rate: 0, months: 12, fees: 120 }, 'Toplam geri ödeme'), 12120);
assert.equal(value('kredi-hesaplama', { principal: 12000, rate: 1, months: 12, fees: 0 }, 'Aylık taksit'), 1066.19);
assert.ok(Math.abs(payment(12000, 1e-12, 12) - 1000) < 1e-8, 'A near-zero rate must converge to the zero-rate installment');
assert.equal(value('mevduat-faiz-hesaplama', { principal: 100000, annualRate: 36.5, days: 30, withholding: 10 }, 'Net kazanç'), 2700);
assert.equal(value('bilesik-faiz-hesaplama', { initial: 1000, monthly: 0, annualRate: 12, years: 1 }, 'Tahmini toplam'), 1126.83);
assert.equal(value('bilesik-faiz-hesaplama', { initial: 1000, monthly: 100, annualRate: 0, years: 1 }, 'Tahmini toplam'), 2200);
assert.equal(value('zam-hesaplama', { old: 50000, rate: 25 }, 'Yeni tutar'), 62500);
assert.equal(value('zam-hesaplama', { old: 50000, rate: -10 }, 'Yeni tutar'), 45000);
assert.equal(toolMap['mevduat-faiz-hesaplama'].fields.find((field) => field.key === 'withholding').default, '', 'A period-dependent tax must not be guessed');
assert.equal(toolMap['kira-artis-hesaplama'].fields.find((field) => field.key === 'rate').default, '');
console.log('Calculator fixtures passed: VAT round trip, loan with fees, near-zero interest, simple deposit, compound contributions and salary change.');
