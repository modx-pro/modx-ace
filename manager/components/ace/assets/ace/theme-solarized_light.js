ace.define("ace/theme/solarized_light",["require","exports","module","ace/lib/dom"],function(e,t,n){t.isDark=!1,t.cssClass="ace-solarized-light",t.cssText=".ace-solarized-light .ace_gutter {\nbackground: #fbf1d3;\ncolor: #333\n}\n.ace-solarized-light .ace_print-margin {\nwidth: 1px;\nbackground: #e8e8e8\n}\n.ace-solarized-light .ace_scroller {\nbackground-color: #FDF6E3\n}\n.ace-solarized-light .ace_text-layer {\ncolor: #586E75\n}\n.ace-solarized-light .ace_cursor {\nborder-left: 2px solid #000000\n}\n.ace-solarized-light .ace_overwrite-cursors .ace_cursor {\nborder-left: 0px;\nborder-bottom: 1px solid #000000\n}\n.ace-solarized-light .ace_marker-layer .ace_selection {\nbackground: #073642\n}\n.ace-solarized-light.ace_multiselect .ace_selection.ace_start {\nbox-shadow: 0 0 3px 0px #FDF6E3;\nborder-radius: 2px\n}\n.ace-solarized-light .ace_marker-layer .ace_step {\nbackground: rgb(255, 255, 0)\n}\n.ace-solarized-light .ace_marker-layer .ace_bracket {\nmargin: -1px 0 0 -1px;\nborder: 1px solid rgba(147, 161, 161, 0.50)\n}\n.ace-solarized-light .ace_marker-layer .ace_active-line {\nbackground: #EEE8D5\n}\n.ace-solarized-light .ace_gutter-active-line {\nbackground-color : #dcdcdc\n}\n.ace-solarized-light .ace_marker-layer .ace_selected-word {\nborder: 1px solid #073642\n}\n.ace-solarized-light .ace_invisible {\ncolor: rgba(147, 161, 161, 0.50)\n}\n.ace-solarized-light .ace_keyword,\n.ace-solarized-light .ace_meta,\n.ace-solarized-light .ace_support.ace_class,\n.ace-solarized-light .ace_support.ace_type {\ncolor: #859900\n}\n.ace-solarized-light .ace_constant.ace_character,\n.ace-solarized-light .ace_constant.ace_other {\ncolor: #CB4B16\n}\n.ace-solarized-light .ace_constant.ace_language {\ncolor: #B58900\n}\n.ace-solarized-light .ace_constant.ace_numeric {\ncolor: #D33682\n}\n.ace-solarized-light .ace_fold {\nbackground-color: #268BD2;\nborder-color: #586E75\n}\n.ace-solarized-light .ace_entity.ace_name.ace_function,\n.ace-solarized-light .ace_entity.ace_name.ace_tag,\n.ace-solarized-light .ace_support.ace_function,\n.ace-solarized-light .ace_variable,\n.ace-solarized-light .ace_variable.ace_language {\ncolor: #268BD2\n}\n.ace-solarized-light .ace_storage {\ncolor: #073642\n}\n.ace-solarized-light .ace_string {\ncolor: #2AA198\n}\n.ace-solarized-light .ace_string.ace_regexp {\ncolor: #D30102\n}\n.ace-solarized-light .ace_comment,\n.ace-solarized-light .ace_entity.ace_other.ace_attribute-name {\ncolor: #93A1A1\n}\n.ace-solarized-light .ace_markup.ace_underline {\ntext-decoration: underline\n}\n.ace-solarized-light .ace_indent-guide {\nbackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4++3xf4ZVq1b9BwAjxwbT1g3hiwAAAABJRU5ErkJggg==) right repeat-y\n}";var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)})