export  class Document {
    constructor(name) {
        this.name = name
        this.isDraggable = ko.observable(false)
    }
    toggleDocumentDraggable() {
        this.isDraggable(this.isDraggable() !== true)
    }
}