# CHANGELOG — Cuaderno MADRE

Registro de cambios aplicados al cuaderno por la rutina **cuaderno-feedback** (y a mano).
Cada línea: fecha · qué cambió · por qué (qué feedback) · cómo revertir (`git revert <hash>`).

---

- 2026-06-21 · El repo `cuaderno-madre` pasa a ser la FUENTE ÚNICA DE VERDAD del cuaderno (sembrado con la última versión del PC) · base inicial · revertir: `git revert 0a2b75b`
- 2026-06-21 · **Bloque A**: modo lectura público + desbloqueo de Tony (contraseña `Jabado`, client-side); post-it explicando "feedback"; banner web corregido; y **refresco automático de números** (snapshot de `CUADERNO_ESTADO.tsv` horneado en el HTML para que la web sin Drive no muestre datos viejos) · por: petición de Tony (capa social Bloque A + "que no queden números viejos") · revertir: `git revert 8d7c729`
