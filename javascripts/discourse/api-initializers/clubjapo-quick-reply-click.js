import { apiInitializer } from "discourse/lib/api";

// El botón "Responder" del indicador de progreso móvil
// (connectors/after-topic-progress/clubjapo-quick-reply.hbs) no puede
// usar onclick="" en línea: la CSP del sitio (script-src con nonce +
// strict-dynamic, sin 'unsafe-inline') bloquea los manejadores de
// eventos en línea silenciosamente -- el atributo queda en el DOM pero
// el navegador nunca lo ejecuta, sin ningún error en consola.
//
// En su lugar, enganchamos el click aquí mediante un listener delegado
// en document (cargado como script normal del tema, sí permitido por
// la CSP), que reutiliza el click del CTA nativo "Responder" -- oculto
// pero funcional -- para abrir el editor sin reimplementar esa lógica.
export default apiInitializer((api) => {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".clubjapo-mobile-quick-reply")) {
      document
        .querySelector("#topic-footer-buttons .btn.create.topic-footer-button")
        ?.click();
    }
  });
});
