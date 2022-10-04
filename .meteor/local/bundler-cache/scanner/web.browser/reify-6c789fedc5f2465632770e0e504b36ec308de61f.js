module.export({PortalContext:()=>PortalContext,PortalProvider:()=>PortalProvider});let __rest;module.link("tslib",{__rest(v){__rest=v}},0);let React;module.link("react",{"*"(v){React=v}},1);/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A React context to set options for all portals in a given subtree.
 * Do not use this PortalContext directly, instead use PortalProvider to set the options.
 */
var PortalContext = React.createContext({});
var PortalProvider = function (_a) {
    var children = _a.children, options = __rest(_a, ["children"]);
    return React.createElement(PortalContext.Provider, { value: options }, children);
};
//# sourceMappingURL=portalProvider.js.map