import { ComboBox } from '@vaadin/combo-box';

class AutoSelectComboBoxElement extends ComboBox {
  constructor() {
    super();
    this.previousInputLabel = '';
  }

  static get is() {
    return 'vcf-auto-select-combo-box';
  }

  ready() {
    super.ready();
    this.allowCustomValue = true;
    this.addEventListener('custom-value-set', this._onCustomValueSet);
    this.addEventListener('value-changed', this._onValueSet);
  }

  _onValueSet(e) {
    if (e.detail.value) {
      this.invalid = false;
    }
  }

  _onCustomValueSet(e) {
    if (this.previousInputLabel === e.detail) {
      return;
    }

    this.previousInputLabel = e.detail;

    if (this._focusedIndex < 0) {
      this.selectedItem = { key: null, label: e.detail };
    }

    this.checkValidity();
  }

  _detectAndDispatchChange() {
    if (this.value !== this._lastCommittedValue) {
      this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      this._lastCommittedValue = this.value;
      // keep track of latest input label
      this.previousInputLabel = this._getItemLabel(this.selectedItem);
    }
  }

  _filteredItemsChanged(filteredItems, oldFilteredItems) {
    // if filteredItems has a single item then return index 0 else do standard behaviour
    if (this.filteredItems && this.filteredItems.length === 1) {
      this._focusedIndex = 0;
    } else if (this.opened || this.autoOpenDisabled) {
      this._focusedIndex = this.__getItemIndexByLabel(this.filteredItems, this.filter);
    } else {
      this._focusedIndex = this.__getItemIndexByLabel(this.filteredItems, this.value);
    }
  }

  checkValidity() {
    let validity = super.checkValidity();
    // if filter is not empty and not in items then trigger client-side validation
    if (validity && this.filteredItems && !this.filteredItems.length) {
      validity = false;
      this.invalid = !validity;
    }
    return validity;
  }
}

customElements.define(AutoSelectComboBoxElement.is, AutoSelectComboBoxElement);
