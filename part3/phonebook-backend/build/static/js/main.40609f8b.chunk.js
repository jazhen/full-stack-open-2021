(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(16),c=t.n(r),a=t(5),i=t(7),o=t(4),u=t(2),s=t(3),l=t.n(s),d="/api/persons",j=function(){return l.a.get(d).then((function(e){return e.data}))},b=function(e){return l.a.post(d,e).then((function(e){return e.data}))},f=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},h=t(0),m=function(e){var n=e.filter,t=e.handleFilterChange;return Object(h.jsxs)("div",{children:["filter show with",Object(h.jsx)("input",{value:n,onChange:t})]})},O=function(e){var n=e.addPerson,t=e.newPerson,r=e.handlePersonFormChange;return Object(h.jsxs)("form",{onSubmit:n,children:[Object(h.jsxs)("div",{children:["name:",Object(h.jsx)("input",{name:"name",value:t.name,onChange:r})]}),Object(h.jsxs)("div",{children:["number:",Object(h.jsx)("input",{name:"number",value:t.number,onChange:r})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var n=e.persons,t=e.filter,r=e.handleDelete;return Object(h.jsx)("ul",{children:n.filter((function(e){return function(e){return e.name.toLowerCase().includes(t.toLowerCase())}(e)})).map((function(e){return Object(h.jsxs)("li",{children:[e.name," ",e.number,Object(h.jsx)("button",{onClick:function(){return r(e)},children:"delete"})]},e.id)}))})},x=function(e){var n=e.notification;return null===n?null:"error"===n.type?Object(h.jsx)("div",{className:"error",children:n.message}):Object(h.jsx)("div",{className:"success",children:n.message})},v=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)({name:"",number:""}),s=Object(o.a)(c,2),l=s[0],d=s[1],v=Object(u.useState)(""),g=Object(o.a)(v,2),w=g[0],C=g[1],y=Object(u.useState)(null),P=Object(o.a)(y,2),k=P[0],S=P[1];Object(u.useEffect)((function(){j().then((function(e){return r(e)}))}),[]);return Object(h.jsxs)("div",{children:[Object(h.jsx)(x,{notification:k}),Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(m,{filter:w,handleFilterChange:function(e){C(e.target.value)}}),Object(h.jsx)("h3",{children:"Add a new"}),Object(h.jsx)(O,{addPerson:function(e){e.preventDefault(),b(l).then((function(e){r(t.concat(e)),d({name:"",number:""}),S({type:"success",message:"Added ".concat(l.name)}),setTimeout((function(){S(null)}),3e3)})).catch((function(e){S({type:"error",message:e.response.data.error}),setTimeout((function(){S(null)}),3e3)}))},newPerson:l,handlePersonFormChange:function(e){d(Object(i.a)(Object(i.a)({},l),{},Object(a.a)({},e.target.name,e.target.value)))}}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(p,{persons:t,filter:w,handleDelete:function(e){window.confirm("Delete ".concat(e.name))&&f(e.id).then((function(n){r(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){S({type:"error",message:"".concat(e.name," was already deleted from the server")}),r(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){S(null)}),3e3)}))}})]})};t(40);c.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.40609f8b.chunk.js.map