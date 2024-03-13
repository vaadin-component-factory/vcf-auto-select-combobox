import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import '@polymer/iron-demo-helpers/demo-snippet';
import '@polymer/iron-icon';
import '../vcf-auto-select-combobox.js';
import '@vaadin/combo-box';


window.addEventListener('WebComponentsReady', () => {
  const
    months = [
      {id:1, name:'January' },
      {id:2, name:'February' },
      {id:3, name:'March' },
      {id:4, name:'April' },
      {id:5, name:'May' },
      {id:6, name:'June' },
      {id:7, name:'July' },
      {id:8, name:'August' },
      {id:9, name:'September' },
      {id:10, name:'October' },
      {id:11, name:'November' },
      {id:12, name:'December' }
    ];
  const combo = document.getElementById("combo");
  combo.items = ['Chrome', 'Edge', 'Firefox', 'Safari'];
  const auto = document.getElementById("auto");
  auto.items = ['Chrome', 'Edge', 'Firefox', 'Safari'];
  const auto1 = document.getElementById("auto1");
  auto1.items = ['One'];
  const month = document.getElementById("month");
  month.items = months;
});
