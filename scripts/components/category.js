export class Category {
    constructor(name, items) {
        this.name = name
        this.items = ko.observableArray(items)
        this.isOpened = ko.observable(false)
        this.isDraggable = ko.observable(false)
    }

    toggleCategory() {
        this.isOpened(this.isOpened() !== true)
    }

    toggleCategoryDraggable() {
        this.isDraggable(this.isDraggable() !== true)
    }
}