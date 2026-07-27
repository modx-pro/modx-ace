const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const utils = require(path.join(__dirname, '../../assets/components/ace/ace-utils.js'));

describe('parseBoolSetting', () => {
  it('uses default for empty values', () => {
    assert.equal(utils.parseBoolSetting(undefined, true), true);
    assert.equal(utils.parseBoolSetting(null, true), true);
    assert.equal(utils.parseBoolSetting('', true), true);
    assert.equal(utils.parseBoolSetting(undefined, false), false);
  });

  it('parses truthy MODX setting values', () => {
    assert.equal(utils.parseBoolSetting(true, false), true);
    assert.equal(utils.parseBoolSetting('1', false), true);
    assert.equal(utils.parseBoolSetting(1, false), true);
  });

  it('parses falsy MODX setting values', () => {
    assert.equal(utils.parseBoolSetting(false, true), false);
    assert.equal(utils.parseBoolSetting('0', true), false);
    assert.equal(utils.parseBoolSetting(0, true), false);
  });
});

describe('draftStorageKey', () => {
  it('builds stable encoded keys', () => {
    assert.equal(
      utils.draftStorageKey('element/chunk/update', 'modx-chunk-snippet', '12'),
      'ace:draft:element%2Fchunk%2Fupdate:modx-chunk-snippet:12'
    );
  });

  it('defaults missing parts without colliding with id 0', () => {
    assert.equal(utils.draftStorageKey('', '', ''), 'ace:draft:manager:field:new');
    assert.equal(utils.draftStorageKey('a', 'n', 0), 'ace:draft:a:n:0');
  });
});

describe('shouldOfferDraftRestore', () => {
  it('offers only non-empty differing drafts', () => {
    assert.equal(utils.shouldOfferDraftRestore('new', 'old'), true);
    assert.equal(utils.shouldOfferDraftRestore('same', 'same'), false);
    assert.equal(utils.shouldOfferDraftRestore('', 'old'), false);
    assert.equal(utils.shouldOfferDraftRestore(null, 'old'), false);
  });
});

describe('normalizeCssColor', () => {
  it('accepts hex colors', () => {
    assert.equal(utils.normalizeCssColor('#fff'), '#fff');
    assert.equal(utils.normalizeCssColor('#ffffff'), '#ffffff');
    assert.equal(utils.normalizeCssColor('#ffffffff'), '#ffffffff');
  });

  it('accepts valid rgb/hsl', () => {
    assert.equal(utils.normalizeCssColor('rgb(0,0,0)'), 'rgb(0,0,0)');
    assert.equal(utils.normalizeCssColor('rgba(255, 128, 0, 0.5)'), 'rgba(255, 128, 0, 0.5)');
    assert.equal(utils.normalizeCssColor('hsl(120, 50%, 50%)'), 'hsl(120, 50%, 50%)');
  });

  it('rejects invalid colors', () => {
    assert.equal(utils.normalizeCssColor('red'), null);
    assert.equal(utils.normalizeCssColor('#gg'), null);
    assert.equal(utils.normalizeCssColor('rgb(999,0,0)'), null);
    assert.equal(utils.normalizeCssColor(''), null);
  });
});

describe('mimeSupportsColorPreview', () => {
  it('allows css/html family mimes', () => {
    assert.equal(utils.mimeSupportsColorPreview('text/css'), true);
    assert.equal(utils.mimeSupportsColorPreview('text/x-scss'), true);
    assert.equal(utils.mimeSupportsColorPreview('text/html'), true);
  });

  it('rejects php/json/empty', () => {
    assert.equal(utils.mimeSupportsColorPreview('application/x-php'), false);
    assert.equal(utils.mimeSupportsColorPreview('application/json'), false);
    assert.equal(utils.mimeSupportsColorPreview(''), false);
  });
});

describe('shouldWaitForAsyncBuffer', () => {
  it('waits only for resource cache buffer field', () => {
    assert.equal(utils.shouldWaitForAsyncBuffer('modx-rdata-buffer'), true);
    assert.equal(utils.shouldWaitForAsyncBuffer('modx-chunk-snippet'), false);
    assert.equal(utils.shouldWaitForAsyncBuffer('ta'), false);
  });
});
