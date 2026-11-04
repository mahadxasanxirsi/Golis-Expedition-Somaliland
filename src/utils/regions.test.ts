import test from 'node:test';
import assert from 'node:assert/strict';
import { SOMALILAND_REGIONS } from '../data/regions';
import { DESTINATIONS_DATA } from '../data/destinations';
import { COMPANY_INFO } from '../data/company';

test('SOMALILAND_REGIONS contains all 6 constitutional regions', () => {
  assert.equal(SOMALILAND_REGIONS.length, 6);

  const regionNames = SOMALILAND_REGIONS.map((r) => r.name);
  assert.ok(regionNames.includes('Maroodi-Jeeh'));
  assert.ok(regionNames.includes('Awdal'));
  assert.ok(regionNames.includes('Sahil'));
  assert.ok(regionNames.includes('Togdheer'));
  assert.ok(regionNames.includes('Sanaag'));
  assert.ok(regionNames.includes('Sool'));
});

test('Maroodi-Jeeh is correctly designated with Hargeisa as national capital', () => {
  const maroodiJeeh = SOMALILAND_REGIONS.find((r) => r.name === 'Maroodi-Jeeh');
  assert.ok(maroodiJeeh);
  assert.match(maroodiJeeh.regionalCapital, /Hargeisa/);
  assert.match(maroodiJeeh.regionalCapital, /national capital/);
  assert.match(maroodiJeeh.keyCharacteristics, /most populous region/);
});

test('All 6 regions have regional capitals defined according to the constitution', () => {
  const capitals = {
    'Maroodi-Jeeh': 'Hargeisa',
    'Awdal': 'Borama',
    'Sahil': 'Berbera',
    'Togdheer': 'Burao',
    'Sanaag': 'Erigavo',
    'Sool': 'Laas Caanood',
  };

  for (const [regName, capitalPart] of Object.entries(capitals)) {
    const region = SOMALILAND_REGIONS.find((r) => r.name === regName);
    assert.ok(region, `Region ${regName} should exist`);
    assert.ok(
      region.regionalCapital.includes(capitalPart),
      `${regName} capital should include ${capitalPart}`
    );
  }
});

test('Destinations dataset covers all 6 regions', () => {
  const destRegions = new Set(DESTINATIONS_DATA.map((d) => d.region));
  assert.ok(destRegions.has('Maroodi-Jeeh Region'));
  assert.ok(destRegions.has('Awdal Region'));
  assert.ok(destRegions.has('Sahil Region'));
  assert.ok(destRegions.has('Togdheer Region'));
  assert.ok(destRegions.has('Sanaag Region'));
  assert.ok(destRegions.has('Sool Region'));
});

test('COMPANY_INFO reflects verified phone and email', () => {
  assert.equal(COMPANY_INFO.phone, '+252-63-6995562');
  assert.equal(COMPANY_INFO.email, 'mahdxasan0062z@gmail.com');
  assert.equal(COMPANY_INFO.address, 'Asha mall,Goljano,Hargeisa');
});
