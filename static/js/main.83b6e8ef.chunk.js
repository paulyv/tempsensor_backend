(this["webpackJsonptemperature-ui"]=this["webpackJsonptemperature-ui"]||[]).push([[0],{56:function(t,e,r){},83:function(t,e,r){"use strict";r.r(e);var n=r(2),a=r(1),i=r.n(a),s=r(12),c=r.n(s),h=r(43),l=r(44),u=r(48),o=r(47),d=(r(56),r(57),r(58),r(29)),j=r.n(d),m=r(9),x=r(46),b=r(31),O=r(30),p=r(16),f=function(t){Object(u.a)(r,t);var e=Object(o.a)(r);function r(t){var n;return Object(h.a)(this,r),(n=e.call(this,t)).getCurrentSensorData=function(){fetch("http://tempsensor.local:3000/api/sensors/house/current_data").then((function(t){return t.json()})).then((function(t){n.setState({humidity:t.humidity}),n.setState({temperature:t.temperature})})).catch((function(t){return console.error(t.toString())}))},n.getHistoryData=function(){fetch("http://tempsensor.local:3000/api/sensors/house/history_data").then((function(t){return t.json()})).then((function(t){n.setState({chart_temperatures:t.temperatures}),n.setState({chart_humidities:t.humidities})})).catch((function(t){return console.error(t.toString())}))},n.state={humidity:null,temperature:null,chart_temperatures:[],chart_humidities:[],delay:10090,chart_delay:6e4},n}return Object(l.a)(r,[{key:"componentDidMount",value:function(){this.getCurrentSensorData(),this.getHistoryData(),this.interval=setInterval(this.getCurrentSensorData,this.state.delay),this.interval=setInterval(this.getHistoryData,this.state.chart_delay)}},{key:"render",value:function(){var t=1,e=this.state.chart_temperatures,r=this.state.chart_humidities;e.length>=360&&(e=e.slice(Math.max(e.length-360,0))),e.length>15&&(t=Math.ceil(e.length/15));var a=e.reverse().map((function(t){return{x:j()(new Date(t.x)).format("HH:mm"),y:t.y}})).filter((function(e,r){return r%t===0}));this.state.chart_humidities.length>360&&(r=this.state.chart_humidities.slice(Math.max(this.state.chart_humidities.length-360,0)));var i=r.reverse().map((function(t){return{x:j()(new Date(t.x)).format("HH:mm"),y:t.y}})).filter((function(e,r){return r%t===0})).reverse();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(b.a,{bg:"dark",variant:"dark",children:Object(n.jsx)(b.a.Brand,{children:Object(n.jsx)("div",{className:"title-font"})})}),Object(n.jsxs)(x.a,{fluid:!0,style:{marginLeft:"10px",marginTop:"20px"},children:[Object(n.jsx)("div",{className:"title-area",children:Object(n.jsx)("h1",{children:"Asunnon sis\xe4ilma"})}),Object(n.jsxs)(O.a,{children:[Object(n.jsx)(p.a,{md:7,style:{maxWidth:"90%"},children:Object(n.jsxs)(m.c,{xType:"ordinal",height:200,width:750,children:[Object(n.jsx)(m.b,{title:""}),Object(n.jsx)(m.d,{title:"Celsius"}),Object(n.jsx)(m.a,{data:a,color:"#FFCCCB"})]})}),Object(n.jsx)(p.a,{md:4,children:Object(n.jsxs)("div",{className:"temperature-area",children:[Object(n.jsx)("h3",{children:"L\xe4mp\xf6tila"}),Object(n.jsxs)("h3",{children:[this.state.temperature,"\xb0C"]})]})})]}),Object(n.jsxs)(O.a,{children:[Object(n.jsx)(p.a,{md:7,style:{maxWidth:"90%"},children:Object(n.jsxs)(m.c,{xType:"ordinal",height:200,width:750,children:[Object(n.jsx)(m.b,{title:""}),Object(n.jsx)(m.d,{title:"Kosteus %"}),Object(n.jsx)(m.a,{data:i,color:"#ADD8E6"})]})}),Object(n.jsx)(p.a,{md:4,children:Object(n.jsxs)("div",{className:"humidity-area",children:[Object(n.jsx)("h3",{children:"Ilmankosteus"}),Object(n.jsxs)("h3",{children:[this.state.humidity,"%"]})]})})]})]})]})}}]),r}(a.Component),g=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,86)).then((function(e){var r=e.getCLS,n=e.getFID,a=e.getFCP,i=e.getLCP,s=e.getTTFB;r(t),n(t),a(t),i(t),s(t)}))};c.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(f,{})}),document.getElementById("root")),g()}},[[83,1,2]]]);
//# sourceMappingURL=main.83b6e8ef.chunk.js.map