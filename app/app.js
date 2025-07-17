// Created by Dayu Wang (dwang@stchas.edu) on 2025-07-16

// Last updated by Dayu Wang (dwang@stchas.edu) on 2025-07-17


/* User-defined blocks */

/** Renders the 'div.scc-logo' element on the top of the page. */
const renderSccLogo = () => {
    const node = document.querySelector('body > div.scc-logo:first-child');
    if (!node) { return; }
    const sccLogoElement = document.createElement('img');
    Object.assign(sccLogoElement, {
        src: '../img/Downloaded_2020-08-15_-_SCC_Logo_(Black)_-_SVG.svg',
        alt: 'SCC Logo'
    });
    Object.assign(sccLogoElement.style, {
        display: 'block',
        border: 'none',
        margin: '10pt auto 0 auto',
        padding: '0',
        width: '150px',
        'max-width': '100%',
        height: 'auto'
    });
    node.replaceWith(sccLogoElement);
};

/** Renders the inline code blocks. */
const renderCodeInline = () => {
    document.querySelectorAll('span.code-inline, strong.code-inline').forEach(element => {
        let fontSize = '11pt';
        element.classList.forEach(className => {
            const match = /(?<=^font-size-).+$/.exec(className);
            if (match) { fontSize = match[0]; }
        });
        Object.assign(element.style, {
            'font-family': 'Consolas,Menlo,monospace',
            'font-size': `${fontSize === '10pt' ? '11pt' : '12pt'}`
        });
    });
};

/** Renders the 'p.bullet-list' elements. */
const renderBulletList = () => {
    document.querySelectorAll('p.bullet-list').forEach(element => {
        if (/^\s|\s$/.test(element.textContent)) { element.innerHTML = element.innerHTML.trim(); }
        let fontSize = '11pt';
        element.classList.forEach(className => {
            const match = /(?<=^font-size-).+$/.exec(className);
            if (match) { fontSize = match[0]; }
        });
        Object.assign(element.style, {
            'margin-left': `${fontSize === '10pt' ? '11pt' : '12pt'}`,
            padding: '0',
            'font-size': `${fontSize}`,
            'text-indent': `${fontSize === '10pt' ? '-5.5pt' : '-6pt'}`
        });
        const bulletSpan = document.createElement('span');
        Object.assign(bulletSpan.style, {
            display: 'inline-block',
            width: `${fontSize === '10pt' ? '5.5pt' : '6pt'}`
        });
        bulletSpan.innerHTML = String.raw`&bull;`;
        element.insertBefore(bulletSpan, element.firstChild);
    });
};

/** Renders the 'p.numbered-list' elements. */
const renderNumberedList = () => {
    document.querySelectorAll('p.numbered-list').forEach(element => {
        if (/^\s|\s$/.test(element.textContent)) { element.innerHTML = element.innerHTML.trim(); }
        let fontSize = '11pt';
        element.classList.forEach(className => {
            const match = /(?<=^font-size-).+$/.exec(className);
            if (match) { fontSize = match[0]; }
        });
        let numberString = '1';
        const numberRegex = /^\d+[). \t\n\r\f\v]/g;
        let numberMatch = numberRegex.exec(element.innerHTML);
        if (numberMatch) {
            numberString = numberMatch[0].replaceAll(/\D/g, '');
            console.log(numberRegex.lastIndex);
            element.innerHTML = element.innerHTML.substring(numberRegex.lastIndex).trim();
        }
        Object.assign(element.style, {
            'margin-left': `${fontSize === '10pt' ? (numberString.length === 2 ? '22.4pt' : '16.2pt') : (numberString.length === 2 ? '24.8pt' : '17.8pt')}`,
            padding: '0',
            'font-size': `${fontSize}`,
            'text-indent': `${fontSize === '10pt' ? (numberString.length === 2 ? '-11.2pt' : '-8.1pt') : (numberString.length === 2 ? '-12.4pt' : '-8.9pt')}`,
        });
        const numberSpan = document.createElement('span');
        Object.assign(numberSpan.style, {
            display: 'inline-block',
            width: `${fontSize === '10pt' ? (numberString.length === 2 ? '11.2pt' : '8.1pt') : (numberString.length === 2 ? '12.4pt' : '8.9pt')}`
        });
        numberSpan.textContent = parseInt(numberString).toString() + ')';
        element.insertBefore(numberSpan, element.firstChild);
    });
};

/** Renders the 'margin-top' style. */
const renderMarginTop = () => {
    const regex = /(?<=^margin-top-).+$/;
    document.querySelectorAll('*[class*=margin-top]').forEach(element => {
        element.classList.forEach(className => {
            const match = regex.exec(className);
            if (match) { element.style.setProperty('margin-top', `${match[0]}`, 'important'); }
        });
    });
};

/** Renders the 'margin-left' style. */
const renderMarginLeft = () => {
    const regex = /(?<=^margin-left-).+$/;
    document.querySelectorAll('*[class*=margin-left]').forEach(element => {
        element.classList.forEach(className => {
            const match = regex.exec(className);
            if (match) { element.style.setProperty('margin-left',`${match[0]}`, 'important'); }
        });
    });
};

/** Renders the 'font-size' style. */
const renderFontSize = () => {
    const regex = /(?<=^font-size-).+$/;
    document.querySelectorAll('*[class*=font-size]').forEach(element => {
        element.classList.forEach(className => {
            const match = regex.exec(className);
            if (match) { element.style.setProperty('font-Size', `${match[0]}`, 'important'); }
        });
    });
};

// The words to be presented in red color (case-insensitive).
const RED_COLORED_WORDS = [
    'no', 'not', 'cannot', 'due', 'incorrect', String.raw`[pitfall]`
];

/** Applies a red color to certain elements that contain exactly one of the words to color. */
const renderRedColor = () => {
    document.querySelectorAll('span:not(.escape), strong:not(.escape)').forEach(element => {
        RED_COLORED_WORDS.forEach(word => {
            const regex = new RegExp(`^\\s*${word}\\s*$`, 'i');
            if (regex.test(element.textContent) && !element.style.color) {
                element.style.setProperty('color', '#b60200', 'important');
            }
        });
    });
};

// The words to be presented in green color (case-insensitive).
const GREEN_COLORED_WORDS = [
    'allowed', 'correct', 'accepted'
];

/** Applies a green color to certain elements that contain exactly one of the words to color. */
const renderGreenColor = () => {
    document.querySelectorAll('span:not(.escape), strong:not(.escape)').forEach(element => {
        GREEN_COLORED_WORDS.forEach(word => {
            const regex = new RegExp(`^\\s*${word}\\s*$`, 'i');
            if (regex.test(element.textContent) && !element.style.color) {
                element.style.setProperty('color', '#2c634c', 'important');
            }
        });
    });
};

// The words to be presented in blue color (case-insensitive).
const BLUE_COLORED_WORDS = [
    String.raw`[important]`,
    String.raw`[.*? resources?]`,
    String.raw`[deadline]`,
    String.raw`[sample code]`,
    String.raw`[(lecture)?\s*slides?]`,
    String.raw`[assessment]`
];

/** Applies a blue color to certain elements that contain exactly one of the words to color. */
const renderBlueColor = () => {
    document.querySelectorAll('span:not(.escape), strong:not(.escape)').forEach(element => {
        BLUE_COLORED_WORDS.forEach(word => {
            const regex = new RegExp(`^\\s*${word}\\s*$`, 'i');
            if (regex.test(element.textContent) && !element.style.color) {
                element.style.setProperty('color', 'blue', 'important');
            }
        });
    });
};

// A list storing all the 'render' functions
const renderFunctions = [
    () => renderSccLogo(),
    () => renderCodeInline(),
    () => renderBulletList(),
    () => renderNumberedList(),
    () => renderMarginTop(),
    () => renderMarginLeft(),
    () => renderFontSize(),
    () => renderRedColor(),
    () => renderGreenColor(),
    () => renderBlueColor()
];

/** Completes the HTML document. */
document.addEventListener('DOMContentLoaded', () => {
    renderFunctions.forEach(func => { func(); });
});