# Coordinación entre conversaciones de Claude · ritmoathome

Antes de subir nada: mira el último commit y añade aquí tu huella (quién eres, qué vas a tocar). Una subida cada vez; marca EN CURSO / HECHO.
(Empieza por «_»: la web no lo publica.)

## Huellas
- 2026-11-20 12:30 · Conversación «Estudio por fases · Ritmo at home (GE)» (enjambre «Estudio por fases unificado», coordinadora «Piloto lección 57 digital») · HECHO 12:33 · commit fa9d15a (Iago: «Publica en Rhythm at Home»), en vivo en ritmo.ge.lmathome.es
  - Solo index.html: estudio por fases de GE según iagonaron/lmpro/_ESTUDIO-POR-FASES-UNIFICADO.md §3–§6, reutilizando el código de ritmopro (234aa92): fases 1 Percusión y 2 Ritmo con notas con 5 min compartidos (se va de una a otra con los botones 1 y 2), ejecución (máx. 2 intentos por lección, metrónomo a pulso, figura actual en verde, sin sonido de notas, caritas solo para el alumno, fila «marca el pulso con la mano»), «¿Quieres seguir con la entonación? Es opcional» → 3 Entonación (3 min) y 4 Realización final (micrófono). Anotar sin △/U, sin «Revelar patrón», a pulso, «Dificultad» solo Tester/Protester. Carteles visuales como los de Entonación at home. Tiempo válido: todo suma a Ritmo at home (ritmo-ge).
  - Deshacer: index.html de 29565b2 (en GitHub, abrir fa9d15a → Revert).
- 2026-11-21 17:25 · Conversación «Examen ampliación 2GP» (Claude) · HECHO 17:30 · commit 2dc0b2c · Iago 17:19: «Publica ritmo entonado y ritmo At Home». dado.js y matices.js (nuevos, los mismos que en ritmopro: el dado para todos los alumnos y «Prueba directa» solo para Iago; matices y mucha articulación en las lecciones generadas) + index.html (2 líneas <script> al final y volumen/picado en play()). Último commit visto: 0efc8a0. Deshacer: borrar las dos líneas <script> o «Revert» del commit.
- 2026-11-21 17:50 · Conversación «Examen ampliación 2GP» (Claude) · HECHO (esta subida) · Iago 17:50: «Publica ritmo At Home».
  - reparto-ge.js (nuevo) + index.html (genLessonComb usa geCombPlan2 si existe; cartas por pentagrama; claves y «miga» del mundo 2 los decide el reparto).
  - Al combinar mundos (no toca el examen 1+2): 2 mundos 3+2 · 3 → 2+2+1 · 4 → 2+1+1+1 · 5 → 1 cada uno · 6 → el 1 y el 3 comparten; extras para el 1 y el 5; cada pentagrama con las cartas de su mundo (4.3 en los 6/8 del 1 y el 3 si está el 4); fa sencilla si no es el mundo 2; mundo 2 en sol con miga; máx. 2 pentagramas por compás; si la melodía falla, siguiente semilla.
  - Pendiente (provisional): carta 6.3 (cambio de compás dentro de un pentagrama).
  - Deshacer: borrar la línea <script src="reparto-ge.js?v=1"> del index.html (vuelve el reparto de antes).
- 2026-11-21 18:45 · Conversación «Examen ampliación 2GP» (Claude) · HECHO (esta subida) · Iago 18:38: «Publica las ligaduras en las dos apps».
  - matices.js (el mismo que ritmopro 47d0a1f, con la cabecera de GE): LIGADURAS DE EXPRESIÓN por ideas musicales (frases, semifrases, motivos), como en Ritmo 4 y Ritmo 6 de Tordesillas; no tapan los números/corchetes de grupos de valoración especial. index.html: matices.js?v=2.
  - Deshacer: matices.js e index.html del commit d4df6ea (o «Revert» del commit).
- 2026-11-21 19:05 · Conversación «Examen ampliación 2GP» (Claude) · HECHO (esta subida) · Iago 19:01: «Publica las síncopas en las dos apps».
  - matices.js (el mismo que ritmopro d233077, con la cabecera de GE): cada síncopa con su propia ligadura y sin ligaduras de frase que la corten. index.html: matices.js?v=3. Deshacer: matices.js e index.html del commit ec12d81.
- 2026-11-21 19:25 · Conversación «Examen ampliación 2GP» (Claude) · HECHO (esta subida) · Iago 19:11 y 19:21: «Publica la clave de do y el arreglo de ligaduras».
  - reparto-ge.js: CLAVE DE DO — con el mundo 6, en el 30 % de las lecciones uno de sus pentagramas pasa a clave de Do (3.ª o 4.ª), 4/4, ritmos muy básicos (geDoMeasure), sustituye a uno de los de fa y va junto a él. index.html: genLessonComb usa geDoMeasure en clave de Do y le da 2 compases de lectura + final; reparto-ge.js?v=2, matices.js?v=4.
  - matices.js (el mismo que ritmopro 2f2d3bc, con la cabecera de GE): arreglo de ligaduras (solo su pentagrama, grupos enteros, control final).
  - Deshacer: index.html, reparto-ge.js y matices.js del commit 0dc1b01.
