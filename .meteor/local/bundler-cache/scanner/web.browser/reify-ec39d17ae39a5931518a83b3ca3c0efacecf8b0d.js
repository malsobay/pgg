module.export({Breadcrumb:()=>Breadcrumb});let classNames;module.link("classnames",{default(v){classNames=v}},0);let React;module.link("react",{"*"(v){React=v}},1);let Classes;module.link("../../common/classes",{"*"(v){Classes=v}},2);let Icon;module.link("../icon/icon",{Icon(v){Icon=v}},3);/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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




var Breadcrumb = function (props) {
    var _a;
    var classes = classNames(Classes.BREADCRUMB, (_a = {},
        _a[Classes.BREADCRUMB_CURRENT] = props.current,
        _a[Classes.DISABLED] = props.disabled,
        _a), props.className);
    var icon = props.icon != null ? React.createElement(Icon, { title: props.iconTitle, icon: props.icon }) : undefined;
    if (props.href == null && props.onClick == null) {
        return (React.createElement("span", { className: classes },
            icon,
            props.text,
            props.children));
    }
    return (React.createElement("a", { className: classes, href: props.href, onClick: props.disabled ? undefined : props.onClick, tabIndex: props.disabled ? undefined : 0, target: props.target },
        icon,
        props.text,
        props.children));
};
//# sourceMappingURL=breadcrumb.js.map