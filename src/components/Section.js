export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }


  renderNewItem(item, creating) {
    this._renderer(item, creating);
  }


  addItem(item, creating) {
    creating ? this._container.prepend(item) : this._container.append(item);
  }
}