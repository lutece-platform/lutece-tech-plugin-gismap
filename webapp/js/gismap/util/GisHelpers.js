/**
 * GisHttp provides the HTTP calls of the Gis component: JSONP, synchronous GET and form POST.
 */
var GisHttp = (function () {
    'use strict';

    var counter = 0;

    /**
     * appendQuery adds a query string to an url
     * @param url the url
     * @param query the query string, without its leading separator
     * @returns {string} the url with the query string
     */
    function appendQuery(url, query) {
        if (query === undefined || query === null || query === '') {
            return url;
        }
        return url + (url.indexOf('?') < 0 ? '?' : '&') + query;
    }

    /**
     * toQuery encodes the data of a request
     * @param data an object of parameters or an already encoded string
     * @returns {string} the encoded parameters
     */
    function toQuery(data) {
        if (data === undefined || data === null) {
            return '';
        }
        if (typeof data === 'string') {
            return data;
        }
        return Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
    }

    /**
     * isSameOrigin tells whether an url targets the origin of the page
     * @param url the url
     * @returns {boolean} true when the url has the origin of the page
     */
    function isSameOrigin(url) {
        return new URL(url, document.baseURI).origin === window.location.origin;
    }

    /**
     * jsonp calls a JSONP service and gives its answer to options.success
     * @param options url, data, type, contentType, jsonpCallback, success, error
     */
    function jsonp(options) {
        var callbackName = options.jsonpCallback || ('gisJsonp_' + Date.now() + '_' + (counter++));
        var handler = function (data) {
            if (typeof options.success === 'function') {
                options.success(data);
            }
        };
        var fail = function (error) {
            if (typeof options.error === 'function') {
                options.error(null, 'error', error);
            }
        };
        var cleanup = function () {
            if (!options.jsonpCallback && window[callbackName] === handler) {
                delete window[callbackName];
            }
        };
        window[callbackName] = handler;

        if (options.type === 'POST' && isSameOrigin(options.url)) {
            fetch(appendQuery(options.url, 'callback=' + encodeURIComponent(callbackName)), {
                method: 'POST',
                headers: { 'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: toQuery(options.data),
                credentials: 'same-origin'
            }).then(function (response) {
                return response.text();
            }).then(function (text) {
                var script = document.createElement('script');
                script.text = text;
                document.head.appendChild(script).parentNode.removeChild(script);
                cleanup();
            }).catch(function (error) {
                cleanup();
                fail(error);
            });
            return;
        }

        var script = document.createElement('script');
        script.src = appendQuery(appendQuery(options.url, toQuery(options.data)), 'callback=' + encodeURIComponent(callbackName));
        script.async = true;
        script.onload = function () {
            script.parentNode.removeChild(script);
            cleanup();
        };
        script.onerror = function (error) {
            script.parentNode.removeChild(script);
            cleanup();
            fail(error);
        };
        document.head.appendChild(script);
    }

    /**
     * getSync reads an url synchronously
     * @param url the url
     * @returns {Document|string} the XML document when the answer is XML, its text otherwise, undefined on error
     */
    function getSync(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status < 200 || xhr.status >= 300) {
            return undefined;
        }
        return xhr.responseXML || xhr.responseText;
    }

    /**
     * post sends form parameters
     * @param url the url
     * @param data the parameters
     * @returns {Promise<string>} the text of the answer
     */
    function post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: toQuery(data)
        }).then(function (response) {
            return response.text();
        });
    }

    return {
        jsonp: jsonp,
        getSync: getSync,
        post: post
    };
})();

/**
 * GisSession keeps values for the browser tab, in the session storage.
 */
var GisSession = (function () {
    'use strict';

    /**
     * get reads a value
     * @param key the key
     * @returns {string|undefined} the value, undefined when absent
     */
    function get(key) {
        try {
            var value = window.sessionStorage.getItem(key);
            return value === null ? undefined : value;
        } catch (e) {
            return undefined;
        }
    }

    /**
     * set writes a value
     * @param key the key
     * @param value the value
     */
    function set(key, value) {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (e) {
            return;
        }
    }

    return {
        get: get,
        set: set
    };
})();

/**
 * GisAutocomplete shows under a text field the suggestions a source gives for what is typed.
 * @param input the text field
 * @param options source(term, response), select(item), minLength, delay
 */
var GisAutocomplete = function (input, options) {
    'use strict';

    if (input.gisAutocomplete) {
        return input.gisAutocomplete;
    }

    var minLength = options.minLength || 1;
    var delay = options.delay === undefined ? 300 : options.delay;
    var timer = null;
    var items = [];
    var active = -1;
    var list = document.createElement('ul');
    list.className = 'dropdown-menu gismap-autocomplete';
    list.setAttribute('role', 'listbox');
    document.body.appendChild(list);
    input.setAttribute('autocomplete', 'off');

    /**
     * close hides the suggestions
     */
    function close() {
        list.classList.remove('show');
        list.innerHTML = '';
        items = [];
        active = -1;
    }

    /**
     * choose applies a suggestion
     * @param index the index of the suggestion
     */
    function choose(index) {
        var item = items[index];
        if (!item) {
            return;
        }
        input.value = item.value;
        close();
        if (typeof options.select === 'function') {
            options.select(item);
        }
    }

    /**
     * highlight marks the active suggestion
     * @param index the index of the suggestion
     */
    function highlight(index) {
        var entries = list.querySelectorAll('.dropdown-item');
        entries.forEach(function (entry, i) {
            entry.classList.toggle('active', i === index);
        });
        active = index;
    }

    /**
     * show displays the suggestions under the field
     * @param result the suggestions, objects with label and value
     */
    function show(result) {
        list.innerHTML = '';
        items = result || [];
        active = -1;
        if (items.length === 0 || document.activeElement !== input) {
            list.classList.remove('show');
            return;
        }
        items.forEach(function (item, index) {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.className = 'dropdown-item';
            link.href = '#';
            link.setAttribute('role', 'option');
            link.textContent = item.label;
            link.addEventListener('mousedown', function (event) {
                event.preventDefault();
                choose(index);
            });
            li.appendChild(link);
            list.appendChild(li);
        });
        var rect = input.getBoundingClientRect();
        list.style.position = 'absolute';
        list.style.left = (rect.left + window.scrollX) + 'px';
        list.style.top = (rect.bottom + window.scrollY) + 'px';
        list.style.minWidth = rect.width + 'px';
        list.classList.add('show');
    }

    input.addEventListener('input', function () {
        clearTimeout(timer);
        var term = input.value;
        if (term.length < minLength) {
            close();
            return;
        }
        timer = setTimeout(function () {
            options.source(term, show);
        }, delay);
    });

    input.addEventListener('keydown', function (event) {
        if (!list.classList.contains('show')) {
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            highlight(Math.min(active + 1, items.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            highlight(Math.max(active - 1, 0));
        } else if (event.key === 'Enter' && active >= 0) {
            event.preventDefault();
            choose(active);
        } else if (event.key === 'Escape') {
            close();
        }
    });

    input.addEventListener('blur', close);

    input.gisAutocomplete = {
        close: close
    };
    return input.gisAutocomplete;
};
