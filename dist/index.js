import React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Component which will abstract intersection observer behaviour
 * @param props
 */
var Observe = function (props) {
    var _a = props.as, Component = _a === void 0 ? "div" : _a, children = props.children, _b = props.isIntersecting, isIntersecting = _b === void 0 ? function () { } : _b, _c = props.isNotIntersecting, isNotIntersecting = _c === void 0 ? function () { } : _c, _d = props.onEndObserving, onEndObserving = _d === void 0 ? function () { } : _d, options = props.options, _e = props.triggersOnce, triggersOnce = _e === void 0 ? false : _e, _f = props.unobserve, unobserve = _f === void 0 ? function () { return false; } : _f, restProps = __rest(props, ["as", "children", "isIntersecting", "isNotIntersecting", "onEndObserving", "options", "triggersOnce", "unobserve"]);
    /**
     * Reference which will contain element to observe
     */
    var elementRef = React.useRef(null);
    /**
     * Callback to listen for changes in element intersection state
     * @param entries
     * @param observer
     */
    function onIntersectionObserverEvent(entries, observer) {
        var entry = entries[0];
        if (entry.isIntersecting) {
            isIntersecting(entry);
            // Give a truthy triggersOnce we disconnect observer after first isIntersecting call
            if (triggersOnce) {
                onEndObserving(entry);
                observer.disconnect();
            }
        }
        else {
            isNotIntersecting(entry);
        }
        // If unobserve function returns true we disconnect observer
        if (unobserve(entry)) {
            onEndObserving(entry);
            observer.disconnect();
        }
    }
    React.useEffect(function () {
        var observer = new IntersectionObserver(onIntersectionObserverEvent, options);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        /**
         * Disconnect observer as soon as component unmount
         */
        return function () {
            observer.disconnect();
        };
    }, []);
    return React.createElement(Component, __assign({ ref: elementRef }, restProps), children);
};

export { Observe };
//# sourceMappingURL=index.js.map
