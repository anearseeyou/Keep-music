/**
 * 判断是否有ClassName
 * @param el
 * @param className
 */

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

/**
 * 取值和设置
 * @param el 元素
 * @param name 属性名
 * @param val 扩展 是否有值
 */
export function getAttrOrSetAttr(el, name, val) {
    const prefix = 'data-';
    name = prefix + name;

    if (val) {
        return el.setAttribute(name, val);
    }
    else {
        return el.getAttribute(name);
    }
}

/**
 * CSS3私有前缀 兼容性封装
 */

let elementStyle = document.createElement('div').style;

let vender = (() => {
    let transformNames = {
        webkit: 'WebkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'webkitTransform',
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})()

export function prefixStyle(style) {
    if (vender === false) {
        return false;
    }

    if (vender === 'standard') {
        return style
    }

    return vender + style.charAt(0).toUpperCase() + style.substr(1);
}
