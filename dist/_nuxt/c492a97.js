(window.webpackJsonp=window.webpackJsonp||[]).push([[13,2],{269:function(t,l,n){"use strict";n.r(l);var e={},c=n(27),component=Object(c.a)(e,(function(){var t=this,l=t.$createElement,n=t._self._c||l;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-6"},[n("b-img",{attrs:{src:"https://picsum.photos/400/400/?image=41","fluid-grow":"",alt:"Responsive image"}})],1),t._v(" "),t._m(0)])}),[function(){var t=this,l=t.$createElement,n=t._self._c||l;return n("div",{staticClass:"col-6"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("h3",[t._v("Artikel Header")])]),t._v(" "),n("div",{staticClass:"col-12"},[n("p",[t._v("Artikel body")])])])])}],!1,null,"4d92b4cd",null);l.default=component.exports},296:function(t,l,n){"use strict";n.r(l);var e={data:function(){return{slide:0,sliding:null}},methods:{onSlideStart:function(t){this.sliding=!0},onSlideEnd:function(t){this.sliding=!1}}},c=n(27),component=Object(c.a)(e,(function(){var t=this,l=t.$createElement,n=t._self._c||l;return n("div",{staticClass:"container",staticStyle:{"margin-top":"150px"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("b-carousel",{attrs:{interval:4e3,indicators:""},on:{"sliding-start":t.onSlideStart,"sliding-end":t.onSlideEnd},model:{value:t.slide,callback:function(l){t.slide=l},expression:"slide"}},t._l(5,(function(i){return n("b-carousel-slide",{key:i,scopedSlots:t._u([{key:"img",fn:function(){return[n("ArtikelThumbnail")]},proxy:!0}],null,!0)})})),1)],1)]),t._v(" "),n("hr",{staticClass:"my-5"}),t._v(" "),n("div",{staticClass:"row"},t._l(4,(function(i){return n("div",{key:i,staticClass:"col-6"},[n("ArtikelThumbnail")],1)})),0)])}),[],!1,null,"7cc9c704",null);l.default=component.exports;installComponents(component,{ArtikelThumbnail:n(269).default})}}]);