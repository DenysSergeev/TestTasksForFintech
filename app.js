/* ========== TASK-1 ==========
Чистый JS: написать функцию форматирования для суммы, пример: "3123123.00" -> "3 123 123.00" */

function formatNumber() {
    const number = 3123123.00;
    const numberFormatter = new Intl.NumberFormat("ru", {
        minimumFractionDigits: 2,
    }).format(number);

    const re = /(?=\B(?:\d{3})+(?!\d))/g;
    const outputNumber = `${numberFormatter}`.replace(re, ' ').replace(',', '.');
    const outputTarget = document.querySelector('.out-1');

    outputTarget.innerHTML = outputNumber;
}

/* ========== TASK-2 ==========
Чистый JS: сделать маску ввода на инпуте например для суммы с копейками *.00 (если отличается от маски то не вводится ничего) Вместо * любое количество цифр, там где 00 (это две любые цифры) */

// ВАРИАНТ №1
const maskFormatter = (e) => {
    e.preventDefault();

    const { value: money } = document.getElementById("money");
    const moneyUSD = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD"
    });
    const outputValue = `Amount is: ${moneyUSD.format(money)}`;
    const outputTarget = document.getElementById("out-2");

    outputTarget.innerHTML = outputValue;
}

// Helpers
const findNode = (selector) => {
  const node = document.querySelector(selector);

  return node;
}

const subscribe = ({ target, eventName, listener }) => {
    target.addEventListener(eventName, listener);
}

const unsubscribe = ({ target, eventName, listener }) => {
    target.removeEventListener(eventName, listener);
}

const manageEventListeners = (action = null) => () => {
    if (!action) {
        return;
    }

    const nodes = [
        {
            target: findNode('.b-1'),
            eventName: 'click',
            listener: formatNumber
        },
        {
            target: findNode('.secondTaskForm'),
            eventName: 'submit',
            listener: maskFormatter
        }
    ];

    switch (action) {
        case 'subscribe':
            nodes.forEach(subscribe);
            break;
    
        default:
            nodes.forEach(unsubscribe)
            break;
    }
}

window.addEventListener('load', manageEventListeners('subscribe'));
window.addEventListener('unload', manageEventListeners('unsubscribe'));