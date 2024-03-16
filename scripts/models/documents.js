import {Category} from "../components/category.js";
import {Document} from "../components/document.js";
import {closest} from "../utils.js";

export function documentsModel() {
    this.categories = ko.observableArray([
        new Category('Обязательные для всех', [new Document('Паспорт', true), new Document('Инн')]),
        new Category('Обязательные для трудоустройства', [
            new Document('Трудовой договор'),
            new Document('Справка 2-НДФЛ'),
            new Document('Дополнительное оглашение'),
        ]),
        new Category('Специальные', [new Document('Свидетельство о рождении')])
    ])

    this.draggedElement = ko.observable()

    this.dragStart = (ctx, event) => {
        event.target.classList.add('dragged')
        this.draggedElement(event.target)
        return true
    }

    this.dragEnd = function (ctx, event) {
        event.target.classList.remove('dragged')
        return true
    }

    this.categoryDragover = function (ctx, event) {
        event.preventDefault()
        const dragged = this.draggedElement();
        dragged.classList.remove('dragged')
        let element = closest(event.target, 'js-list-item');
        const isNestedTextElement = dragged.classList.contains('js-list-document')
        if (isNestedTextElement) {
            element = closest(event.target, 'js-list-document');
            if (!element) {
                element = closest(event.target, 'js-list-item')?.querySelector(".list__text");
            }
        }
        if (!element) return
        dragged.classList.add('dragged')
        const currentElementCoord = element.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        let nextElement
        if ((event.clientY < currentElementCenter)) {
            nextElement = element
            element.parentNode.insertBefore(dragged, nextElement);
        } else {
            nextElement = element.nextElementSibling
            if (nextElement) {
                element.parentNode.insertBefore(dragged, nextElement);
            } else {
                element.parentNode.appendChild(dragged);
            }
        }
    }
}