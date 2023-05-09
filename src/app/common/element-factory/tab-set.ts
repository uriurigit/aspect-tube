import { deploy } from './props';
import { join } from '../modules/utility/string-utility';

interface Tab {
  title: string;
  selector: string;
  props?: {};
}

interface TabSetProps {
  justify: string;
  type: string;
}

const ngbTab = ({ title, selector, props }: Tab): string => {
    return `
      <ngb-tab>
        <ng-template ngbTabTitle>
          <span class="font-sizeC">
            ${title}
          </span>
        </ng-template>
        <ng-template ngbTabContent>
          <${selector} ${deploy(props)}></${selector}>
        </ng-template>
      </ngb-tab>
    `;
  };

const tabSet = (tabList: Array<Tab>, inputProps?: TabSetProps): string => {
    const props = {
        justify: 'center',
        type: 'pills',
        ...inputProps
    };

    return `
        <ngb-tabset ${deploy(props)}>
            ${join(tabList, (tab) => ngbTab(tab))}
        </ngb-tabset>
    `;
};
export default tabSet;
