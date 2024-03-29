import icons from 'url:../../img/icons.svg';

export default class View {

  _data;
  render(data, render = true) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;
    
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //Update Changed Text
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      //Update changed Attributes
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(att => curEl.setAttribute(att.name, att.value));
      }
    })

  }
  _clear() {
    this._parentElement.innerHTML = '';
  };
  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(message = this._errorMessage) {
    let markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderMessage(message = this._message) {
    let markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}