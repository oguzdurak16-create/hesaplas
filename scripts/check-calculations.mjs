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

const { weekdaysBetween, isCalendarDate } = await import('../src/data/tool-utils.js');
assert.equal(weekdaysBetween('2026-11-02', '2026-11-09'), 5);
assert.equal(weekdaysBetween('2000-01-01', '2020-01-01'), 5217, 'Long intervals must not collapse to zero');
assert.equal(weekdaysBetween('2026-11-07', '2026-11-09'), 0, 'Weekend-only interval');
assert.equal(weekdaysBetween('2026-11-02', '2026-11-02'), 0);
assert.throws(() => weekdaysBetween('2026-11-09', '2026-11-02'), RangeError);
assert.equal(isCalendarDate('2024-02-29'), true);
for (const bad of ['', '2026-02-29', '2026-02-30', 'not-a-date']) assert.equal(isCalendarDate(bad), false);
const zeroBase = toolMap['yuzde-hesaplama'].calculate({ base: 0, rate: 20, second: 125 });
assert.equal(zeroBase.summary[0].value, '0');
assert.match(zeroBase.summary[1].value, /Tanımsız/);
assert.match(zeroBase.summary[2].value, /Tanımsız/);
assert.equal(value('yuzde-hesaplama', { base: 100, rate: 20, second: 0 }, 'Yüzde değişim'), -100);
assert.equal(value('tarih-farki-hesaplama', { start: '2000-01-01', end: '2020-01-01' }, 'Hafta içi gün tahmini'), 5217);
for (const timezone of ['UTC', 'America/Los_Angeles', 'Europe/Istanbul']) {
  process.env.TZ = timezone;
  assert.equal(weekdaysBetween('2026-11-02', '2026-11-09'), 5);
  const birthday = toolMap['yas-hesaplama'].calculate({ birth: '1990-11-02', today: '2026-11-02' });
  assert.equal(birthday.summary[0].value, '36 yaş');
  assert.equal(birthday.details.find((row) => row.label === 'Kalan gün').value, '0 gün');
}
console.log('Date/percentage regressions passed, including 20-year range, calendar validity and multiple time zones.');
