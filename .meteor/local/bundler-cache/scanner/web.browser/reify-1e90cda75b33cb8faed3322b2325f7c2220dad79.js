module.export({CollapsibleList:()=>CollapsibleList});let __assign,__extends;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let Boundary;module.link("../../common/boundary",{Boundary(v){Boundary=v}},3);let Classes;module.link("../../common/classes",{"*"(v){Classes=v}},4);let Errors;module.link("../../common/errors",{"*"(v){Errors=v}},5);let Position;module.link("../../common/position",{Position(v){Position=v}},6);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},7);let isElementOfType;module.link("../../common/utils",{isElementOfType(v){isElementOfType=v}},8);let Menu;module.link("../menu/menu",{Menu(v){Menu=v}},9);let MenuItem;module.link("../menu/menuItem",{MenuItem(v){MenuItem=v}},10);let Popover;module.link("../popover/popover",{Popover(v){Popover=v}},11);/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to OverflowList instead.
 */
/* eslint-disable deprecation/deprecation */











/** @deprecated use `<OverflowList>` for automatic overflow based on available space. */
var CollapsibleList = /** @class */ (function (_super) {
    __extends(CollapsibleList, _super);
    function CollapsibleList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapsibleList.prototype.render = function () {
        var _this = this;
        var collapseFrom = this.props.collapseFrom;
        var childrenLength = React.Children.count(this.props.children);
        var _a = this.partitionChildren(), visibleChildren = _a[0], collapsedChildren = _a[1];
        var visibleItems = visibleChildren.map(function (child, index) {
            var absoluteIndex = collapseFrom === Boundary.START ? childrenLength - 1 - index : index;
            return (React.createElement("li", { className: _this.props.visibleItemClassName, key: absoluteIndex }, _this.props.visibleItemRenderer(child.props, absoluteIndex)));
        });
        if (collapseFrom === Boundary.START) {
            // reverse START list so separators appear before items
            visibleItems.reverse();
        }
        // construct dropdown menu for collapsed items
        var collapsedPopover;
        if (collapsedChildren.length > 0) {
            var position = collapseFrom === Boundary.END ? Position.BOTTOM_RIGHT : Position.BOTTOM_LEFT;
            collapsedPopover = (React.createElement("li", { className: this.props.visibleItemClassName },
                React.createElement(Popover, __assign({ content: React.createElement(Menu, null, collapsedChildren), position: position }, this.props.dropdownProps), this.props.dropdownTarget)));
        }
        return (React.createElement("ul", { className: classNames(Classes.COLLAPSIBLE_LIST, this.props.className) },
            collapseFrom === Boundary.START ? collapsedPopover : null,
            visibleItems,
            collapseFrom === Boundary.END ? collapsedPopover : null));
    };
    // splits the list of children into two arrays: visible and collapsed
    CollapsibleList.prototype.partitionChildren = function () {
        var childrenArray = React.Children.map(this.props.children, function (child, index) {
            if (!isElementOfType(child, MenuItem)) {
                throw new Error(Errors.COLLAPSIBLE_LIST_INVALID_CHILD);
            }
            return React.cloneElement(child, { key: "visible-".concat(index) });
        });
        if (childrenArray == null) {
            return [[], []];
        }
        if (this.props.collapseFrom === Boundary.START) {
            // reverse START list so we can always slice visible items from the front of the list
            childrenArray.reverse();
        }
        var visibleItemCount = this.props.visibleItemCount;
        return [childrenArray.slice(0, visibleItemCount), childrenArray.slice(visibleItemCount)];
    };
    CollapsibleList.displayName = "".concat(DISPLAYNAME_PREFIX, ".CollapsibleList");
    CollapsibleList.defaultProps = {
        collapseFrom: Boundary.START,
        visibleItemCount: 3,
    };
    return CollapsibleList;
}(React.Component));

//# sourceMappingURL=collapsibleList.js.map