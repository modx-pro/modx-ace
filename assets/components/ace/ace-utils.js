/**
 * Pure Ace helpers shared by manager JS and Node unit tests.
 * Browser: MODx.ux.AceUtils (survives Ext.extend) and MODx.ux.Ace.Utils when Ace exists
 * Node: module.exports
 */
(function (root, factory) {
    var utils = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = utils;
    }
    if (typeof Ext !== 'undefined') {
        Ext.namespace('MODx.ux');
        MODx.ux.AceUtils = utils;
        if (MODx.ux.Ace) {
            MODx.ux.Ace.Utils = utils;
        }
    } else if (root) {
        root.AceUtils = utils;
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    var COLOR_LITERAL_REGEX = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|rgba?\(\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)|hsla?\(\s*-?\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?%\s*,\s*\d+(?:\.\d+)?%(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)/g;

    function parseBoolSetting(value, defaultValue) {
        if (value === undefined || value === null || value === '') {
            return defaultValue === undefined ? false : !!defaultValue;
        }
        return value === true || value === '1' || value === 1;
    }

    function draftStorageKey(action, name, id) {
        var a = action ? String(action) : 'manager';
        var n = name ? String(name) : 'field';
        var i = (id === undefined || id === null || id === '') ? 'new' : String(id);
        return 'ace:draft:' + encodeURIComponent(a) + ':' + encodeURIComponent(n) + ':' + encodeURIComponent(i);
    }

    function shouldOfferDraftRestore(draftValue, initialValue) {
        return typeof draftValue === 'string'
            && draftValue !== ''
            && draftValue !== initialValue;
    }

    function normalizeCssColor(value) {
        if (!value || typeof value !== 'string') {
            return null;
        }
        if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
            return value;
        }
        if (/^rgba?\(/i.test(value) || /^hsla?\(/i.test(value)) {
            COLOR_LITERAL_REGEX.lastIndex = 0;
            var match = COLOR_LITERAL_REGEX.exec(value);
            if (match && match[0] === value) {
                return value;
            }
            return null;
        }
        return null;
    }

    function mimeSupportsColorPreview(mimeType) {
        if (!mimeType) {
            return false;
        }
        return /css|scss|less|html|smarty|twig|svg/i.test(mimeType);
    }

    function shouldWaitForAsyncBuffer(fieldId) {
        return fieldId === 'modx-rdata-buffer';
    }

    return {
        COLOR_LITERAL_REGEX: COLOR_LITERAL_REGEX,
        parseBoolSetting: parseBoolSetting,
        draftStorageKey: draftStorageKey,
        shouldOfferDraftRestore: shouldOfferDraftRestore,
        normalizeCssColor: normalizeCssColor,
        mimeSupportsColorPreview: mimeSupportsColorPreview,
        shouldWaitForAsyncBuffer: shouldWaitForAsyncBuffer
    };
}));
