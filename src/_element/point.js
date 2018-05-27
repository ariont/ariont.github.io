import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
/**
 * @customElement
 * @polymer
 */
class DrawPoint extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        span {
          display: block;
          width: 5px;
          height: 5px;
          position: absolute;
        }
      </style>
      <span style$="left:[[point.x]]px;top:[[point.y]]px;background-color:[[point.color]];"></span>
    `;
  }
  static get properties() {
    return {
      point: {
        type: Object,
        value: function(){return {
          "x":0,
          "y":0,
          "color": "#fff"
        };}
      }
    };
  }

}

window.customElements.define('draw-point', DrawPoint);
