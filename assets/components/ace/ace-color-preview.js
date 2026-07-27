Ext.namespace('MODx.ux');

MODx.ux.Ace.isColorPreviewEnabled = function() {
    var value = MODx.config['ace.color_preview'];
    return value == true || value === '1' || value === 1;
};

MODx.ux.Ace.supportsColorPreview = function(mimeType) {
    if (!mimeType) {
        return false;
    }
    return /css|scss|less|html|smarty|twig|svg/i.test(mimeType);
};

MODx.ux.Ace.ColorPreview = {
    markerClassPrefix: 'ace-modx-color-marker-',
    markerStyleEl: null,
    markerSeq: 0,

    init: function(editor, mimeType) {
        if (!MODx.ux.Ace.isColorPreviewEnabled() || !MODx.ux.Ace.supportsColorPreview(mimeType)) {
            return;
        }

        this.markerIds = [];
        this.markerSeq = 0;
        this.editor = editor;
        var session = editor.getSession();
        var refresh = this.debounce(this.refresh.bind(this), 150);
        session.on('change', refresh);
        editor.on('changeMode', refresh);
        this.refresh();
    },

    refresh: function() {
        var editor = this.editor;
        if (!editor) {
            return;
        }

        var session = editor.getSession();
        var Range = ace.require('ace/range').Range;
        var self = this;

        this.markerIds.forEach(function(id) {
            session.removeMarker(id);
        });
        this.markerIds = [];

        if (!this.markerStyleEl) {
            this.markerStyleEl = document.createElement('style');
            this.markerStyleEl.id = 'ace-modx-color-preview-styles';
            document.head.appendChild(this.markerStyleEl);
        }

        var rules = [];
        var lines = session.doc.getAllLines();
        var regex = /#([0-9a-fA-F]{3,8})\b|rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*[\d.]+)?\s*\)|hsla?\(\s*[\d.]+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+)?\s*\)/g;

        for (var row = 0; row < lines.length; row++) {
            var line = lines[row];
            var match;
            regex.lastIndex = 0;
            while ((match = regex.exec(line)) !== null) {
                var color = self.normalizeColor(match[0]);
                if (!color) {
                    continue;
                }
                var className = self.markerClassPrefix + (self.markerSeq++);
                rules.push('.' + className + ' { background-color: ' + color + ' !important; opacity: 0.35; border-radius: 2px; }');
                var markerId = session.addMarker(
                    new Range(row, match.index, row, match.index + match[0].length),
                    className,
                    'text',
                    false
                );
                self.markerIds.push(markerId);
            }
        }

        this.markerStyleEl.textContent = rules.join('\n');
    },

    normalizeColor: function(value) {
        if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
            return value;
        }
        if (/^rgba?\(/i.test(value) || /^hsla?\(/i.test(value)) {
            return value;
        }
        return null;
    },

    debounce: function(fn, ms) {
        var timer;
        return function() {
            var args = arguments;
            var ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(ctx, args);
            }, ms);
        };
    }
};
