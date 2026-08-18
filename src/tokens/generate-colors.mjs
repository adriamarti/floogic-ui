import fs from 'fs';

const hsb = (h, s, b, a) => {
  s /= 100;
  b /= 100;
  const k = n => (n + h / 60) % 6;
  const f = n => b - b * s * Math.max(0, Math.min(k(n), 4 - k(n), 1));
  const R = Math.round(f(5) * 255), G = Math.round(f(3) * 255), B = Math.round(f(1) * 255);
  return a === undefined ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${a})`;
};

const P = {
  grey: { l: { 1000: hsb(230, 100, 15, .90), 700: hsb(230, 100, 20, .65), 500: hsb(230, 100, 30, .45), 100: hsb(230, 100, 40, .10), 50: hsb(230, 100, 50, .04), 25: hsb(230, 100, 50, .02) }, d: { 1000: hsb(0, 0, 100, 1), 700: hsb(0, 0, 100, .78), 500: hsb(0, 0, 100, .60), 100: hsb(0, 0, 100, .12), 50: hsb(0, 0, 100, .06), 25: hsb(0, 0, 100, .03) } },
  brand: { l: { 1000: hsb(196, 85, 80, 1), 800: hsb(196, 85, 80, .80), 200: hsb(196, 85, 80, .20), 50: hsb(196, 85, 100, .06) }, d: { 1000: hsb(196, 55, 100, 1), 800: hsb(196, 55, 100, .80), 200: hsb(196, 55, 100, .20), 50: hsb(196, 55, 100, .08) } },
  red: { l: { 1000: hsb(0, 71, 78, 1), 800: hsb(0, 71, 78, .80), 200: hsb(0, 71, 78, .14), 50: hsb(0, 71, 78, .05) }, d: { 1000: hsb(0, 39, 100, 1), 800: hsb(0, 39, 100, .80), 200: hsb(0, 39, 100, .20), 50: hsb(0, 39, 100, .08) } },
  amber: { l: { 1000: hsb(42, 82, 56, 1), 800: hsb(42, 82, 56, .80), 200: hsb(42, 82, 56, .20), 50: hsb(42, 82, 100, .05) }, d: { 1000: hsb(42, 50, 88, 1), 800: hsb(42, 50, 88, .80), 200: hsb(42, 50, 88, .20), 50: hsb(42, 50, 88, .08) } },
  green: { l: { 1000: hsb(162, 95, 48, 1), 800: hsb(162, 95, 48, .80), 200: hsb(162, 95, 48, .20), 50: hsb(162, 95, 80, .05) }, d: { 1000: hsb(162, 40, 78, 1), 800: hsb(162, 40, 78, .80), 200: hsb(162, 40, 78, .20), 50: hsb(162, 40, 78, .08) } },
  teal: { l: { 1000: hsb(202, 85, 66, 1), 800: hsb(202, 85, 66, .80), 200: hsb(202, 85, 66, .20), 50: hsb(202, 85, 90, .05) }, d: { 1000: hsb(202, 45, 90, 1), 800: hsb(202, 45, 90, .80), 200: hsb(202, 45, 90, .20), 50: hsb(202, 45, 90, .08) } },
};
const Ps = { 0: hsb(0, 0, 100), 50: hsb(230, 2, 98), 800: hsb(230, 20, 20), 850: hsb(230, 25, 15), 900: hsb(230, 30, 10), 1000: hsb(0, 0, 0) };
const pillL = { pbg: '#ffffff', pfg: '#1a2030', pbd: 'rgba(0,0,0,0.10)' };
const pillD = { pbg: '#12131a', pfg: 'rgba(255,255,255,0.92)', pbd: 'rgba(255,255,255,0.14)' };
const R = (fam, mode, step, pillMode) => ({ ref: `${fam}.${mode}.${step}`, val: P[fam][mode === 'dark' ? 'd' : 'l'][step], ...(((pillMode || mode) === 'dark') ? pillD : pillL) });
const Rc = (ref, val, colMode) => ({ ref, val, ...(colMode === 'dark' ? pillD : pillL) });
const yellow = hsb(44, 82, 100);
const Rs = (colMode, step) => ({ ref: `grey.solid.${step}`, val: Ps[step], ...(colMode === 'dark' ? pillD : pillL) });
const T = (name, usage, l, d) => ({ name, usage, l, d });

const elements = [
  ...[
    T('text.strong', 'Texto principal: titulares, cuerpo y form labels, para que sea prominente y legible.', R('grey', 'light', 1000), R('grey', 'dark', 1000)),
    T('text.weak', 'Texto secundario, para hacerlo menos prominente.', R('grey', 'light', 700), R('grey', 'dark', 700)),
    T('text.brand', 'Enlaces de texto para indicar que son interactivos.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('text.disabled', 'Texto en elementos con estado deshabilitado, como botones inactivos.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('text.error', 'Texto de mensaje negativo, como un error que requiere atención urgente.', R('red', 'light', 1000), R('red', 'dark', 1000)),
    T('text.warning', 'Texto que advierte de precaución; tomar la acción podría ser arriesgado.', R('amber', 'light', 1000), R('amber', 'dark', 1000)),
    T('text.success', 'Texto de mensaje positivo o acción completada con éxito.', R('green', 'light', 1000), R('green', 'dark', 1000)),
    T('text.information', 'Texto que transmite información neutral en un badge o alerta.', R('teal', 'light', 1000), R('teal', 'dark', 1000)),
    T('text.inverse.strong', 'Texto principal sobre fondos de alto contraste.', R('grey', 'dark', 1000), R('grey', 'light', 1000)),
    T('text.inverse.weak', 'Texto secundario sobre fondos de alto contraste.', R('grey', 'dark', 700), R('grey', 'light', 700)),
    T('text.inverse.disabled', 'Texto deshabilitado sobre fondos de alto contraste.', R('grey', 'dark', 100), R('grey', 'light', 100)),
  ],
  ...[
    T('icon.neutral', 'Color de icono por defecto, cuando acompaña a text.strong.', R('grey', 'light', 500), R('grey', 'dark', 500)),
    T('icon.brand', 'Iconos en elementos interactivos, como botones, que transmiten la personalidad de marca.', R('brand', 'light', 800), R('brand', 'dark', 800)),
    T('icon.disabled', 'Iconos en elementos con estado deshabilitado.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('icon.error', 'Iconos que indican un mensaje negativo, como un error que requiere atención.', R('red', 'light', 800), R('red', 'dark', 800)),
    T('icon.warning', 'Iconos en elementos que advierten precaución.', R('amber', 'light', 800), R('amber', 'dark', 800)),
    T('icon.success', 'Iconos en elementos que indican un mensaje positivo, como alertas de éxito.', R('green', 'light', 800), R('green', 'dark', 800)),
    T('icon.information', 'Iconos en elementos que transmiten información neutral, como un badge o alerta.', R('teal', 'light', 800), R('teal', 'dark', 800)),
    T('icon.inverse', 'Iconos sobre fondos de alto contraste.', R('grey', 'dark', 500), R('grey', 'light', 500)),
    T('icon.inverse.strong', 'Iconos de alto contraste sobre fondos de alto contraste.', R('grey', 'dark', 1000), R('grey', 'light', 1000)),
    T('icon.inverse.disabled', 'Iconos deshabilitados sobre fondos de alto contraste.', R('grey', 'dark', 100), R('grey', 'light', 100)),
  ],
  ...[
    T('stroke.strong', 'Bordes no decorativos de elementos como campos de formulario.', R('grey', 'light', 500), R('grey', 'dark', 500)),
    T('stroke.weak', 'Bordes decorativos, como líneas divisorias, no críticos para identificar elementos.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('stroke.selected', 'Bordes de elementos seleccionados, como pestañas.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('stroke.focus', 'Anillo de foco de elementos en estado de foco.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('stroke.disabled', 'Bordes de elementos en estado deshabilitado, como botones inactivos.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('stroke.brand.strong', 'Bordes de elementos interactivos como botones.', R('brand', 'light', 800), R('brand', 'dark', 800)),
    T('stroke.brand.weak', 'Bordes decorativos de elementos interactivos.', R('brand', 'light', 200), R('brand', 'dark', 200)),
    T('stroke.error.strong', 'Bordes en botones destructivos.', R('red', 'light', 800), R('red', 'dark', 800)),
    T('stroke.error.weak', 'Bordes decorativos en mensajes urgentes o negativos, como alertas de error.', R('red', 'light', 200), R('red', 'dark', 200)),
    T('stroke.warning.strong', 'Bordes en elementos que advierten precaución.', R('amber', 'light', 800), R('amber', 'dark', 800)),
    T('stroke.warning.weak', 'Bordes decorativos en elementos de precaución, como alertas de aviso.', R('amber', 'light', 200), R('amber', 'dark', 200)),
    T('stroke.success.strong', 'Bordes en elementos que indican un mensaje positivo, como alertas de éxito.', R('green', 'light', 800), R('green', 'dark', 800)),
    T('stroke.success.weak', 'Bordes decorativos en mensajes positivos, como alertas de éxito.', R('green', 'light', 200), R('green', 'dark', 200)),
    T('stroke.information.strong', 'Bordes en elementos que transmiten información neutral, como un badge o alerta.', R('teal', 'light', 800), R('teal', 'dark', 800)),
    T('stroke.information.weak', 'Bordes decorativos en elementos con información neutral, como un badge o alerta.', R('teal', 'light', 200), R('teal', 'dark', 200)),
    T('stroke.inverse.strong', 'Bordes no decorativos sobre fondos de alto contraste.', R('grey', 'dark', 500), R('grey', 'light', 500)),
    T('stroke.inverse.weak', 'Bordes decorativos sobre fondos de alto contraste.', R('grey', 'dark', 100), R('grey', 'light', 100)),
    T('stroke.inverse.disabled', 'Bordes de elementos deshabilitados sobre fondos de alto contraste.', R('grey', 'dark', 100), R('grey', 'light', 100)),
  ],
  ...[
    T('fill.strong', 'Fill neutral de alto contraste para componentes de primer plano, como botones.', R('grey', 'light', 1000), R('grey', 'dark', 1000)),
    T('fill.weak', 'Fill neutral de bajo contraste, como badges.', R('grey', 'light', 50), R('grey', 'dark', 50)),
    T('fill.weaker', 'Fill neutral para componentes grandes, para que no sean demasiado prominentes.', R('grey', 'light', 25), R('grey', 'dark', 25)),
    T('fill.hover', 'Fill para elementos interactivos en estado hover.', R('grey', 'light', 50), R('grey', 'dark', 50)),
    T('fill.press', 'Fill para elementos interactivos en estado press.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('fill.selected', 'Fill para elementos interactivos en estado seleccionado.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('fill.disabled', 'Fill para elementos interactivos en estado deshabilitado.', R('grey', 'light', 100), R('grey', 'dark', 100)),
    T('fill.overlay', 'Fill para overlays de página transparentes tras diálogos modales.', R('grey', 'light', 500), R('grey', 'light', 1000, 'dark')),
    T('fill.brand.strong', 'Fill de alto contraste para elementos interactivos como botones.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('fill.brand.weak', 'Fill de bajo contraste para elementos interactivos como badges.', R('brand', 'light', 50), R('brand', 'dark', 50)),
    T('fill.error.strong', 'Fill de alto contraste para elementos destructivos como botones.', R('red', 'light', 1000), R('red', 'dark', 1000)),
    T('fill.error.weak', 'Fill de bajo contraste para mensajes negativos, como alertas de error y badges.', R('red', 'light', 50), R('red', 'dark', 50)),
    T('fill.warning.strong', 'Fill de alto contraste para elementos que advierten precaución.', R('amber', 'light', 1000), R('amber', 'dark', 1000)),
    T('fill.warning.weak', 'Fill de bajo contraste para avisos, como alertas y badges.', R('amber', 'light', 50), R('amber', 'dark', 50)),
    T('fill.success.strong', 'Fill de alto contraste para elementos que indican un mensaje positivo.', R('green', 'light', 1000), R('green', 'dark', 1000)),
    T('fill.success.weak', 'Fill de bajo contraste para mensajes positivos, como alertas de éxito.', R('green', 'light', 50), R('green', 'dark', 50)),
    T('fill.information.strong', 'Fill de alto contraste para elementos que transmiten información neutral.', R('teal', 'light', 1000), R('teal', 'dark', 1000)),
    T('fill.information.weak', 'Fill de bajo contraste para información neutral, como un badge o alerta.', R('teal', 'light', 50), R('teal', 'dark', 50)),
    T('fill.inverse.strong', 'Fill neutral de alto contraste para componentes sobre fondos de alto contraste.', Rc('grey.solid.0', Ps[0], 'dark'), Rc('grey.solid.900', Ps[900], 'light')),
    T('fill.inverse.weak', 'Fill neutral de bajo contraste para componentes sobre fondos de alto contraste.', R('grey', 'dark', 50), R('grey', 'light', 50)),
    T('fill.inverse.hover', 'Fill para elementos interactivos sobre fondos de alto contraste en estado hover.', R('grey', 'dark', 50), R('grey', 'light', 50)),
    T('fill.inverse.press', 'Fill para elementos interactivos sobre fondos de alto contraste en estado press.', R('grey', 'dark', 100), R('grey', 'light', 100)),
    T('fill.inverse.disabled', 'Fill para elementos interactivos sobre fondos de alto contraste en estado deshabilitado.', R('grey', 'dark', 100), R('grey', 'light', 100)),
    T('fill.white', 'Fill que permanece blanco en modo claro y oscuro.', Rc('grey.solid.0', Ps[0], 'light'), Rc('grey.solid.0', Ps[0], 'dark')),
    T('fill.yellow', 'Fill que permanece amarillo en modo claro y oscuro.', Rc('yellow.solid.1000', yellow, 'light'), Rc('yellow.solid.1000', yellow, 'dark')),
  ],
  ...[
    T('background.base', 'Fondo por defecto, sin elevación.', Rs('light', 0), Rs('dark', 900)),
    T('background.raised', 'Fondo ligeramente elevado, justo encima de la base, para componentes como cards.', Rs('light', 0), Rs('dark', 850)),
    T('background.overlay', 'Fondo que flota alto sobre la página, para componentes como menús desplegables.', Rs('light', 0), Rs('dark', 800)),
    T('background.sunken', 'Fondo que se sitúa por debajo de la base.', Rs('light', 50), Rs('dark', 1000)),
    T('background.alternate', 'Fondo de bajo contraste para diferenciar ciertas áreas de una página.', Rs('light', 50), Rs('dark', 850)),
    T('background.brand', 'Fondo de alto contraste que transmite la personalidad de marca.', R('brand', 'light', 1000), R('brand', 'dark', 1000)),
    T('background.inverse', 'Fondo de alto contraste para diferenciar ciertas áreas de una página.', Rs('light', 900), Rs('dark', 0)),
  ]
];

// Generar el contenido del archivo
let stylexContent = `import * as stylex from '@stylexjs/stylex';\n\n`;
stylexContent += `// Mapeo semántico generado automáticamente (Practical UI)\n`;
stylexContent += `export const colors = stylex.defineVars({\n`;

elements.forEach(el => {
  const camelCaseName = el.name.split('.').map((part, index) => {
    if (index === 0) return part;
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');

  stylexContent += `  ${camelCaseName}: '${el.l.val}',\n`;
});

stylexContent += `  accent: 'rgba(31, 158, 204, 1)',\n`;
stylexContent += `  focus: 'rgba(31, 158, 204, 1)',\n`;
stylexContent += `});\n\n`;

stylexContent += `export const darkTheme = stylex.createTheme(colors, {\n`;

elements.forEach(el => {
  const camelCaseName = el.name.split('.').map((part, index) => {
    if (index === 0) return part;
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');

  stylexContent += `  ${camelCaseName}: '${el.d.val}',\n`;
});

stylexContent += `  accent: 'rgba(115, 218, 255, 1)',\n`;
stylexContent += `  focus: 'rgba(115, 218, 255, 1)',\n`;
stylexContent += `});\n`;

fs.writeFileSync('src/tokens/colors.stylex.ts', stylexContent);
console.log('colors.stylex.ts generated successfully with ' + elements.length + ' tokens.');
