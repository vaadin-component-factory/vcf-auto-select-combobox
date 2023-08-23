import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/iron-icon';
import '../vcf-auto-select-combobox.js';
import '@vaadin/combo-box';


window.addEventListener('WebComponentsReady', () => {
  const combo = document.getElementById("combo");
  combo.items = ['Chrome', 'Edge', 'Firefox', 'Safari'];
  const auto = document.getElementById("auto");
  auto.items = ['Chrome', 'Edge', 'Firefox', 'Safari'];
});
