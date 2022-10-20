import IMask from 'imask';

import './css/index.css';

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) > img');

const securityCode = document.querySelector('#security-code');
const securityCodeMask = {
  mask: '0000',
}
const securityCodeMasked = IMask(securityCode, securityCodeMask);

const expirationDate = document.querySelector('#expiration-date');
const expirationDateMask = {
  mask: 'MM{/}YY',
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDateMask);

const cardNumber = document.querySelector('#card-number');
const cardNumberMask = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (append, dynamicMasked) {
    const number = (dynamicMasked.value + append).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });

    console.log(foundMask.regex)

    return foundMask;
  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberMask);

function setCardType(type) {
  const colors = {
    "visa": ["#2D57F2", "#436D99"],
    "mastercard": ["#C69347", "#DF6F29"],
    "default": ["black", "gray"],
  }

  ccBgColor01.setAttribute('fill', colors[type][0]);
  ccBgColor02.setAttribute('fill', colors[type][1]);
  ccLogo.setAttribute('src', `cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

