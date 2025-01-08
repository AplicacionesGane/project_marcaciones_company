import{j as e,r as n,d as j,U as b,b as C,f as v,u as w,I as N,B as f,S as y}from"./index-ByYEY0NG.js";import{T as E,a as L,b as g,c as o,d as k,e as i}from"./table-CUBcxQuQ.js";import{W as S}from"./WarningIcons-D3b4nccH.js";import{L as B}from"./label-bYpcweDo.js";import"./index-DKJkQS74.js";const I=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})});function T(){const[a,l]=n.useState([]),[r,d]=n.useState(""),[u,c]=n.useState(!0),[s,x]=n.useState(null),[h,m]=n.useState(!1),p=()=>{m(!1)};return n.useEffect(()=>{h||(c(!0),x(null),j.get(`${b}/personas`).then(t=>{l(t.data),m(!0)}).catch(t=>{x(t.message)}).finally(()=>{c(!1)}))},[h]),{personas:n.useMemo(()=>a.filter(t=>r?t.identificacion.includes(r)||t.nombres.toLowerCase().includes(r.toLowerCase())||t.apellidos.toLowerCase().includes(r.toLowerCase()):a),[a,r]),search:r,setSearch:d,loading:u,error:s,fechtDataAgain:p}}const D=({children:a})=>e.jsxs("button",{disabled:!0,type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center",children:[e.jsxs("svg",{"aria-hidden":"true",role:"status",className:"inline w-4 h-4 me-3 text-white animate-spin",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"#E5E7EB"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentColor"})]}),a]}),M=v("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function A({className:a,variant:l,...r}){return e.jsx("div",{className:C(M({variant:l}),a),...r})}function H(){const{personas:a,setSearch:l,search:r,loading:d,fechtDataAgain:u}=T(),c=w();return e.jsxs("section",{children:[e.jsxs("header",{className:"flex items-center justify-around p-1 px-4",children:[e.jsxs("form",{className:"flex items-center gap-2",children:[e.jsx(B,{className:"min-w-36",children:"Buscar empleado:"}),e.jsx(N,{type:"text",id:"search",value:r,className:"w-96",placeholder:"N° Documento / Nombres",onChange:s=>l(s.target.value)})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-semibold",children:"N° Empleados Activos:"}),e.jsx(A,{className:"text-base font-semibold",children:a.length})]}),e.jsx(f,{onClick:()=>u(),children:"Recargar Empleados"})]}),e.jsx(y,{}),d?e.jsx("section",{className:"h-[92vh] flex items-center justify-center pb-12",children:e.jsx(D,{children:"Cargando lista empleados"})}):e.jsxs(E,{children:[e.jsx(L,{children:e.jsxs(g,{children:[e.jsx(o,{className:"w-[40px]",children:"ID"}),e.jsx(o,{children:"N° Identificación"}),e.jsx(o,{children:"Apellidos"}),e.jsx(o,{children:"Nombres"}),e.jsx(o,{children:"Estado"}),e.jsx(o,{children:"Opciones"})]})}),e.jsx(k,{children:a.map(s=>e.jsxs(g,{children:[e.jsx(i,{children:s.id}),e.jsx(i,{children:s.identificacion}),e.jsx(i,{children:s.nombres}),e.jsx(i,{children:s.apellidos}),e.jsx(i,{children:s.identificacion===s.apellidos&&s.apellidos===s.nombres?e.jsx("p",{className:"text-red-600",title:"El empleado le faltan datos básicos. Edite la información para agregarlos",children:e.jsx(S,{})}):e.jsx("p",{className:"text-green-600",children:e.jsx(I,{})})}),e.jsx(i,{children:e.jsx(f,{onClick:()=>c(`/empleado/${s.id}`),children:"Editar"})})]},s.id))})]})]})}export{H as default};
