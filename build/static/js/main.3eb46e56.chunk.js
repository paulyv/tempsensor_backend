(this["webpackJsonptemperature-ui"]=this["webpackJsonptemperature-ui"]||[]).push([[0],{56:function(t,e,r){},83:function(t,e,r){"use strict";r.r(e);var a=r(2),i=r(1),n=r.n(i),s=r(12),c=r.n(s),h=r(43),l=r(44),u=r(48),o=r(47),d=(r(56),r(57),r(58),r(29)),j=r.n(d),m=r(9),x=r(46),b=r(31),O=r(30),f=r(16),p=function(t){Object(u.a)(r,t);var e=Object(o.a)(r);function r(t){var a;return Object(h.a)(this,r),(a=e.call(this,t)).getCurrentSensorData=function(){fetch("http://localhost:3000/api/sensors/house/current_data").then((function(t){return t.json()})).then((function(t){a.setState({humidity:t.humidity}),a.setState({temperature:t.temperature})})).catch((function(t){return console.error(t.toString())}))},a.getHistoryData=function(){fetch("http://localhost:3000/api/sensors/house/history_data").then((function(t){return t.json()})).then((function(t){a.setState({chart_temperatures:t.temperatures}),a.setState({chart_humidities:t.humidities})})).catch((function(t){return console.error(t.toString())}))},a.state={humidity:null,temperature:null,chart_temperatures:[],chart_humidities:[],delay:10090,chart_delay:6e4},a}return Object(l.a)(r,[{key:"componentDidMount",value:function(){this.getCurrentSensorData(),this.getHistoryData(),this.interval=setInterval(this.getCurrentSensorData,this.state.delay),this.interval=setInterval(this.getHistoryData,this.state.chart_delay)}},{key:"render",value:function(){var t=1,e=this.state.chart_temperatures,r=this.state.chart_humidities;e.length>=360&&(e=e.slice(Math.max(e.length-360,0))),e.length>15&&(t=Math.ceil(e.length/15));var i=e.reverse().map((function(t){return{x:j()(new Date(t.x)).format("HH:mm"),y:t.y}})).filter((function(e,r){return r%t===0}));this.state.chart_humidities.length>360&&(r=this.state.chart_humidities.slice(Math.max(this.state.chart_humidities.length-360,0)));var n=r.reverse().map((function(t){return{x:j()(new Date(t.x)).format("HH:mm"),y:t.y}})).filter((function(e,r){return r%t===0})).reverse();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(b.a,{bg:"dark",variant:"dark",children:Object(a.jsx)(b.a.Brand,{children:Object(a.jsx)("div",{className:"title-font"})})}),Object(a.jsxs)(x.a,{fluid:!0,style:{marginLeft:"10px",marginTop:"20px"},children:[Object(a.jsx)("div",{className:"title-area",children:Object(a.jsx)("h1",{children:"Asunnon sis\xe4ilma"})}),Object(a.jsxs)(O.a,{children:[Object(a.jsx)(f.a,{md:7,style:{maxWidth:"90%"},children:Object(a.jsxs)(m.c,{xType:"ordinal",height:200,width:750,children:[Object(a.jsx)(m.b,{title:""}),Object(a.jsx)(m.d,{title:"Celsius"}),Object(a.jsx)(m.a,{data:i,color:"#FFCCCB"})]})}),Object(a.jsx)(f.a,{md:4,children:Object(a.jsxs)("div",{className:"temperature-area",children:[Object(a.jsx)("h3",{children:"L\xe4mp\xf6tila"}),Object(a.jsxs)("h3",{children:[this.state.temperature,"\xb0C"]})]})})]}),Object(a.jsxs)(O.a,{children:[Object(a.jsx)(f.a,{md:7,style:{maxWidth:"90%"},children:Object(a.jsxs)(m.c,{xType:"ordinal",height:200,width:750,children:[Object(a.jsx)(m.b,{title:""}),Object(a.jsx)(m.d,{title:"Kosteus %"}),Object(a.jsx)(m.a,{data:n,color:"#ADD8E6"})]})}),Object(a.jsx)(f.a,{md:4,children:Object(a.jsxs)("div",{className:"humidity-area",children:[Object(a.jsx)("h3",{children:"Ilmankosteus"}),Object(a.jsxs)("h3",{children:[this.state.humidity,"%"]})]})})]})]})]})}}]),r}(i.Component),g=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,86)).then((function(e){var r=e.getCLS,a=e.getFID,i=e.getFCP,n=e.getLCP,s=e.getTTFB;r(t),a(t),i(t),n(t),s(t)}))};c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(p,{})}),document.getElementById("root")),g()}},[[83,1,2]]]);
//# sourceMappingURL=main.3eb46e56.chunk.js.map