# Glosario — qué significa cada palabreja que usa Claude

Tony: aquí te apunto en cristiano las palabras técnicas que voy soltando, para que las aprendas y me preguntes lo que quieras. Si ves/oyes una que no está, dímela y la añado. (Voy actualizando esto cada vez que use una palabra rara nueva.)

## Lo básico de internet / programación
- **API** = una "puerta" por la que un programa le pide algo a otro o hace una acción SOLO, sin que tú entres a mano. Ej: con la API de una web, un programa publica un artículo sin que abras la página.
- **GitHub** = una web donde se guarda y comparte código. Cada proyecto guardado ahí es un **repo** (la carpeta del proyecto).
- **token / API key** = una contraseña especial que le das a un programa para que actúe EN TU NOMBRE (ej: publicar por ti). Como prestarle la llave de tu casa a alguien.
- **npm / PyPI / Hugging Face** = "almacenes" públicos donde se publican trozos de programa para que otros los usen (npm = mundo JavaScript, PyPI = mundo Python, Hugging Face = mundo IA).
- **cwd** = "carpeta actual" donde un programa está trabajando en ese momento. (El bug de hoy fue que la rutina trabajaba en la carpeta equivocada → por eso no guardaba nada.)
- **runtime** = "mientras el programa se ejecuta". Un "fallo de runtime" = se rompió al estar funcionando, no por estar mal escrito.

## Cosas de MADRE
- **destilado** = uno de los resúmenes que MADRE YA hace: le sueltas un vídeo o enlace y te saca las ideas clave en limpio. (Viven en VIDEO_DESTILADO.txt.)
- **el loop / Cowork** = el "cerebro" de MADRE que corre solo cada ~30 minutos y va mejorando el sistema.
- **rutina / tarea programada / cron** = un trabajito que se ejecuta SOLO a una hora fija (ej: "aprende-github" corre lunes y jueves). "cron" es solo el reloj que decide cuándo.
- **SKILL** = el archivo de instrucciones que una rutina lee para saber qué hacer. Es su "guion".
- **marcador (de frontera)** = una nota que una rutina se deja a SÍ MISMA para que la próxima vez siga donde lo dejó (empieza sin memoria cada vez, así que el marcador es su recordatorio).
- **BUZON / DESDE_CLAUDE** = el "buzón de cartas" de MADRE. Yo dejo ahí notas (archivos que empiezan por DESDE_CLAUDE_...) y el loop las lee y decide solo.
- **L4, L7, Lx** = solo nombres/números que MADRE le pone a sus límites apuntados. Ej: **L4 = "no consigo mis primeros seguidores yo solo"**. Es una lista de "cosas que aún no sé hacer", para vigilar si algún día ya se pueden.
- **selector externo** = la señal del mundo real de que algo vale: que alguien lo USE, le dé estrella, lo comparta o pague. Es lo que MADRE persigue.
- **autonomía B/A** = jerga interna: cuánto puede hacer MADRE SOLA (B) vs cuánto necesita que actúes tú (A). "Subir la autonomía" = que haga más cosas sin ti.

## Lo de publicar / vender en automático
- **dev.to / Hashnode / Medium** = webs GRATIS donde la gente publica artículos (sobre todo de tecnología). Tienen API → un programa puede publicar ahí solo.
- **Trusted Publishing / OIDC** = una forma nueva (2026) de publicar en los almacenes (npm/PyPI/Hugging Face) SIN tener que prestar tu token/contraseña. Más seguro, y deja que MADRE publique sola.
- **KYC** = el trámite legal de identificarte (DNI, cuenta de banco) que piden las plataformas para PAGARTE. Esto sí lo haces tú una vez; un programa no puede.

## Lo de las decisiones (cómo decide Claude si te pregunta o no)
- **gate** = un "filtro de aprobación" antes de hacer un cambio.
- **verde** = cambio pequeño y que se puede deshacer → lo hago y te aviso. **rojo** = algo que NO se puede deshacer, o toca dinero / algo público → te pregunto antes.
- **watchdog / detector** = un vigilante automático que mira si algo se rompió.

---
*Pregúntame cualquiera de estas y te la explico con más calma o con un ejemplo.*
