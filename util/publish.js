import path from 'path';
import { fileURLToPath } from 'url';
import { publish } from '@vaadin-component-factory/vcf-element-util';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
publish('vcf-auto-select-combobox', __dirname, 'src', 'js');
