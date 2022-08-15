import { h, mount, patch } from 'virtual-dom-library'

function createDom (el, props, ...children) {
    return h(el, props, children);
}

class DivButton {
    active = false;
    element;
    jsx;

    constructor() {
        //Находим элемент
        this.element = document.querySelector('[data-divbutton="1"]')
    }

    handleClick = () => {
        //Меняем состояние active
        this.active = !this.active
        //И ререндеримся
        this.render()
    }

    getJsx() {
        //Шаблон компонента
        return <div>MyDiv - {this.active ? 'active' : 'not active'}
            <button events={{click: () => this.handleClick()}}>Change State</button>
        </div>
    }

    render() {
        //Получаем шаблон компонента
        const newJsx = this.getJsx()
        //Если это первый рендерер
        if (this.jsx === undefined) {
            //Сохраняем его
            this.jsx = newJsx
            //Рендерим компонент в HTML
            mount(this.jsx, this.element)
            //Выходим
            return
        }
        //Если это второй или далее рендерер
        //Находим разницу между старым и новым JSX и патчим HTML DOM
        patch(this.jsx, newJsx)
        //Сохраняем новый JSX в переменную
        this.jsx = newJsx
    }
}

//Экспортируем компонент
window.DivButton = DivButton
