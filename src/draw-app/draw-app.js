import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../_element/point.js';

/**
 * @customElement
 * @polymer
 */
class DrawApp extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .canvas {
          position: relative;
          width: 100vw;
          height: 60vh;

          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        }
        h1 {
          margin: 0;
        }
        .header,
        .footer {
          background-color: #d9d9d9;
          padding-bottom: 20px;
        }

        h2 {
          margin-bottom:  0;
          margin-top:10px;
        }
        p paper-button {
          float: left;
        }
        p {
          margin: 0;
        }
        paper-swatch-picker {
          margin: 0;
          padding: 0;
        }
      </style>
        <div class="header">
        <h1>涂抹战争 </h1>
        <p>涂抹战争是基于区块链的去中心化的策略游戏，你可以在画布上涂抹任意颜色。可以覆盖掉已有颜色。完整所有颜色将胜利。</p>
      </div>
      <div on-tap="getPoint" class="canvas">
      <template is="dom-repeat" items="[[points]]">
          <draw-point point='[[item]]'></draw-point>
      </template>
      </div>
      <div class = "footer">
        power by <a href="https://www.polymer-project.org">polymer </a>
      </div>

      <paper-dialog id="overlay" modal >
      <h2>pick你喜欢的颜色 </h2>
      <p>
        <paper-swatch-picker noink id="picker" color='{{mycolor}}'></paper-swatch-picker>
        {{mycolor}}
        </p>
        <p style="text-align: right;">
        <paper-icon-button icon="close" dialog-dismiss></paper-icon-button>
         <paper-icon-button icon="done" title="done" dialog-confirm style="color: green;"></paper-icon-button>
          </p>
      </paper-dialog>

    `;
  }
constructor() {
  super();
  var self = this;
  this.points = [{"x": 10,"y":10,"color": "red"},];
  this. checkPoint = {};
  this._getPionts();
  setInterval(function () {
      self._getPionts();
  }, 15000);
  }

  getPoint(e) {
    this.checkPoint.x = e.detail.x;
    this.checkPoint.y = e.detail.y;
    var dialog = this.$.overlay;
    dialog.open();
  }

  _getPionts() {
      var self = this;
       var value = "0";
       var callFunction = "getPoints"
       var callArgs = [];
       nebPay.simulateCall(nebTo, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的call接口去调用合约,
           callback:callbackUrl,
           listener: function (resp) {
             let r = resp['result'];
             self.points  = JSON.parse(r);
           }
       });
  }

  _rndNum(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

  _pushPoint(x, y, c) {
    var self = this;
     var value = "0";
     var callFunction = "savePoint"
     var callArgs = [x, y, c];
     nebPay.call(nebTo, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的call接口去调用合约,
         callback:callbackUrl,
         listener: function (resp) {
           console.log(resp);
         }
     });
  }

  ready(){
    super.ready();
    var self = this;
    this.$.overlay.addEventListener("iron-overlay-closed", function (e) {
      if (e.detail.confirmed && self.mycolor ) {
        self.checkPoint.color = self.mycolor;
        self.push('points', self.checkPoint);
        self.mycolor = undefined;
          self.$.overlay.close();
        self._pushPoint(self.checkPoint.x, self.checkPoint.y, self.checkPoint.color);
      }
    })
  }
}

window.customElements.define('draw-app', DrawApp);
