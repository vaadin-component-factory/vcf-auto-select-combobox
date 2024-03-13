import { ComboBox } from '@vaadin/combo-box';
import { ComboBoxPlaceholder } from '@vaadin/combo-box/src/vaadin-combo-box-placeholder.js';

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
      if (this.items && this.isValidValue(e.detail.value) < 0) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
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
    super._filteredItemsChanged(filteredItems, oldFilteredItems);
    if (this.filteredItems && this.filteredItems.length === 1) {
      this._focusedIndex = 0;
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

  _closeOrCommit() {
    // Double check that the combobox placeholder is not the focused item
    let focusedItem = null;
    if (this._focusedIndex == 0 && this.filteredItems.length == 1) {
      focusedItem = this.filteredItems[this._focusedIndex];
    }
    if (focusedItem != null && typeof focusedItem == 'object' && focusedItem instanceof ComboBoxPlaceholder) {
      this.close();
    } else {
      super._closeOrCommit();
    }
  }
}

customElements.define(AutoSelectComboBoxElement.is, AutoSelectComboBoxElement);
