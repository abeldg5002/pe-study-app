
export const topics = [
    {
        id: "topic-1",
        title: "TEMA 1: Concepciones pedagógicas de la motricidad",
        color: "bg-teal-50",
        borderColor: "border-teal-200",
        textColor: "text-teal-900",
        flashcards: [
            {
                front: "Educación Física (Definición actual)",
                back: "«Educación integral a través de las conductas motrices para la transformación personal y social» (Gómez-Rijo, 2021)."
            },
            {
                front: "Conducta Motriz (Parlebas, 2008)",
                back: "«Comportamiento motor en cuanto portador de significación». Implica intencionalidad, emoción y cognición, a diferencia del simple movimiento mecánico."
            },
            {
                front: "Psicomotricidad",
                back: "Educación dirigida al cuerpo como entidad psicosomática, donde las estructuras motrices se desarrollan en interacción entre el yo y el medio."
            },
            {
                front: "Escuela Sueca (P.H. Ling)",
                back: "Analítica, buscaba la salud corporal y corrección de defectos. Ejercicios construidos, estáticos y con orden rígido."
            },
            {
                front: "Escuela Alemana (F.L. Jahn)",
                back: "Patriótica, uso de aparatos, esfuerzo físico, riesgo y dificultad. Origen de la gimnasia artística."
            },
            {
                front: "Escuela Británica (Thomas Arnold)",
                back: "Introducción del Deporte, Fair Play, reglas, competición regulada y responsabilidad social."
            },
            {
                front: "Escuela Francesa (Amorós / Hébert)",
                back: "Utilitaria (preparar para la vida). Movimiento natural, marcha, carrera. Antecedente del entrenamiento militar."
            },
            {
                front: "Modelo de Arnold (3 Dimensiones)",
                back: "1. Educación ACERCA del movimiento (Teórica). 2. Educación EN el movimiento (Práctica/Disfrute). 3. Educación A TRAVÉS del movimiento (Instrumental/Valores)."
            },
            {
                front: "Sociomotricidad (Parlebas)",
                back: "El movimiento siempre se da en relación con otros (compañeros/adversarios) y el entorno (incertidumbre)."
            }
        ],
        quiz: [
            {
                question: "¿Qué autor define la Conducta Motriz como 'comportamiento motor portador de significación'?",
                options: ["Gómez-Rijo", "Parlebas", "Arnold", "Ling"],
                correct: 1,
                explanation: "Parlebas (2008) acuñó el término para diferenciarlo del simple movimiento mecánico."
            },
            {
                question: "¿Qué Escuela Gimnástica introdujo el Fair Play y el deporte en la escuela?",
                options: ["Escuela Sueca", "Escuela Alemana", "Escuela Británica", "Escuela Francesa"],
                correct: 2,
                explanation: "Thomas Arnold, de la Escuela Británica, introdujo el deporte y sus valores."
            },
            {
                question: "Según el modelo de Arnold, ¿a qué dimensión corresponde la 'Educación A TRAVÉS del movimiento'?",
                options: ["Dimensión Teórica", "Dimensión Práctica", "Dimensión Instrumental", "Dimensión Competitiva"],
                correct: 2,
                explanation: "Es la dimensión instrumental: usar la EF para fines externos como salud o socialización."
            },
            {
                question: "¿Qué hito legal hizo obligatoria la EF en todos los niveles en España?",
                options: ["Constitución 1978", "Ley General 1970", "LOGSE (1990)", "LOMLOE (2020)"],
                correct: 2,
                explanation: "La LOGSE (1990) fue el hito clave que la hizo obligatoria y le dio rango universitario."
            },
            {
                question: "¿Qué caracteriza a la Escuela Sueca?",
                options: ["Movimiento natural", "Riesgo y aparatos", "Analítica y corrección postural", "Deporte reglado"],
                correct: 2,
                explanation: "La Escuela Sueca de Ling era analítica, estática y buscaba la corrección física."
            }
        ],
        practicalTips: [
            "Justificación Teórica: La sesión no busca 'adiestrar' (mecanicista), sino desarrollar la Conducta Motriz (Parlebas).",
            "Modelo de Arnold: Mencionar que trabajamos 'EN' el movimiento (práctica), 'ACERCA' (reglas/salud) y 'A TRAVÉS' (valores).",
            "Alfabetización Física: El objetivo final es crear cultura motriz para la salud futura."
        ]
    },
    {
        id: "topic-2",
        title: "TEMA 2: Marco Curricular y Programación",
        color: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-900",
        flashcards: [
            {
                front: "Currículo (LOMLOE)",
                back: "Conjunto de objetivos, competencias, contenidos, métodos pedagógicos y criterios de evaluación."
            },
            {
                front: "Competencias Clave",
                back: "Desempeños imprescindibles para progresar con éxito. Adaptación española de las recomendaciones de la UE."
            },
            {
                front: "Competencias Específicas",
                back: "Puente entre el Perfil de Salida (competencias clave) y los Saberes Básicos. Desempeños en situaciones del área."
            },
            {
                front: "Saberes Básicos",
                back: "Conocimientos, destrezas y actitudes necesarios para adquirir las competencias específicas."
            },
            {
                front: "Situaciones de Aprendizaje (SdA)",
                back: "Situaciones y actividades que implican el despliegue de competencias clave y específicas."
            },
            {
                front: "Niveles de Concreción Curricular",
                back: "1º: Gobierno (Leyes/RD). 2º: Centro (PE/PD). 3º: Aula (SdA). 4º: Alumno (Adaptaciones/DUA)."
            },
            {
                front: "Competencia Motriz",
                back: "Capacita para el desarrollo de la motricidad humana en dimensiones biológica, afectiva, cognitiva y social."
            }
        ],
        quiz: [
            {
                question: "¿Qué elemento curricular conecta el Perfil de Salida con los Saberes Básicos?",
                options: ["Objetivos", "Criterios de Evaluación", "Competencias Específicas", "Situaciones de Aprendizaje"],
                correct: 2,
                explanation: "Las Competencias Específicas son el puente entre las Clave y los Saberes."
            },
            {
                question: "¿A qué nivel de concreción curricular corresponde la Programación Didáctica?",
                options: ["Primer Nivel", "Segundo Nivel", "Tercer Nivel", "Cuarto Nivel"],
                correct: 1,
                explanation: "El Segundo Nivel corresponde al Centro Educativo (PE y PD)."
            },
            {
                question: "¿Cuál NO es una de las 5 Competencias Específicas de EF?",
                options: ["Estilo de vida activo", "Resolución de problemas motores", "Rendimiento deportivo máximo", "Autorregulación emocional"],
                correct: 2,
                explanation: "El rendimiento máximo no es una competencia escolar; la EF es educativa."
            },
            {
                question: "¿Qué define a una Situación de Aprendizaje?",
                options: ["Una lista de temas", "Un examen final", "Actividades que implican despliegue de competencias", "Un recreo libre"],
                correct: 2,
                explanation: "Son situaciones que contribuyen al desarrollo competencial mediante la acción."
            },
            {
                question: "¿Qué enfoque organiza el currículo interrelacionando contenidos para evitar la fragmentación?",
                options: ["Globalización", "Interdisciplinariedad", "Especialización", "Competición"],
                correct: 1,
                explanation: "La Interdisciplinariedad es el modelo pedagógico para conectar disciplinas."
            }
        ],
        practicalTips: [
            "Estructura SdA: Título, Justificación, Objetivos (Verbo+Contenido+Criterio), Reto Final.",
            "Secuenciación: Movilizar -> Activar -> Explorar -> Estructurar -> Aplicar -> Concluir.",
            "Objetivos Motores: Usar clasificación de Troya (Situar móvil, Traslaciones, Combatir, Reproducir, Interoceptivas, Crear)."
        ]
    },
    {
        id: "topic-3",
        title: "TEMA 3: Atención a la diversidad",
        color: "bg-indigo-50",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-900",
        flashcards: [
            {
                front: "Equidad vs Igualdad",
                back: "Igualdad es dar a todos lo mismo. Equidad es dar a cada uno lo que necesita para llegar al mismo objetivo."
            },
            {
                front: "Inclusión (UNESCO)",
                back: "Proceso de ayuda a superar los obstáculos que limitan la presencia, participación y logros."
            },
            {
                front: "Paradigma del Éxito Competencial",
                back: "Centrado en fortalezas y potencialidades, abandonando el 'paradigma del déficit'."
            },
            {
                front: "Criterios de Intervención (Arráez)",
                back: "1. Igualdad (sin cambios). 2. Ayuda/Apoyo (info extra). 3. Modificación (cambio de estructura)."
            },
            {
                front: "DUA (Diseño Universal para el Aprendizaje)",
                back: "Minimizar barreras desde el inicio. 3 Principios: Compromiso (por qué), Representación (qué), Acción/Expresión (cómo)."
            },
            {
                front: "Zona de Desarrollo Próximo (Vygotski)",
                back: "Distancia entre lo que el alumno hace solo (nivel real) y lo que hace con ayuda (potencial)."
            }
        ],
        quiz: [
            {
                question: "¿Qué principio del DUA se refiere al 'por qué' del aprendizaje (motivación)?",
                options: ["Múltiples formas de Representación", "Múltiples formas de Acción", "Múltiples formas de Implicación/Compromiso", "Ninguna es correcta"],
                correct: 2,
                explanation: "La Implicación o Compromiso busca captar el interés y motivar."
            },
            {
                question: "Si modificamos las normas o el material de una tarea para un alumno, ¿qué criterio de intervención usamos según Arráez?",
                options: ["Igualdad", "Ayuda", "Modificación", "Exclusión"],
                correct: 2,
                explanation: "La Modificación implica cambiar la estructura de la tarea."
            },
            {
                question: "¿Cuál es la adaptación clave para un alumno con TEA?",
                options: ["Gritos fuertes", "Anticipación y pictogramas", "Contacto físico constante", "Cambios sorpresa"],
                correct: 1,
                explanation: "La anticipación y el apoyo visual (pictogramas) son fundamentales para TEA."
            },
            {
                question: "¿Qué caracteriza al alumnado con TDAH en la intervención didáctica?",
                options: ["Necesitan tareas largas", "Tareas cortas y éxito rápido", "Estar quietos mucho tiempo", "No darles responsabilidades"],
                correct: 1,
                explanation: "Requieren tareas cortas, éxito rápido y roles activos para canalizar energía."
            },
            {
                question: "¿Qué es la Equidad?",
                options: ["Dar a todos lo mismo", "Dar a cada uno lo que necesita", "Separar a los alumnos", "Ignorar las diferencias"],
                correct: 1,
                explanation: "Equidad es justicia: dar los recursos necesarios según la necesidad individual."
            }
        ],
        practicalTips: [
            "Síndrome de Down: Refuerzo positivo, imitación, explicaciones lentas.",
            "TEA: Anticipación, rutinas, pictogramas, evitar contacto forzado.",
            "TDAH: Tareas cortas, roles activos (ayudante), relajación.",
            "Altas Capacidades: Retos intelectuales, roles de liderazgo.",
            "Dificultades Motoras: Eliminar barreras, material adaptado (espuma), empatía (vóley sentado)."
        ]
    },
    {
        id: "topic-4",
        title: "TEMA 4: Contenidos Curriculares",
        color: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-900",
        flashcards: [
            {
                front: "Habilidad Motriz",
                back: "Acción observable referida a la acción (correr, saltar). Es el grado de competencia."
            },
            {
                front: "Conductas Perceptivo-Motrices",
                back: "Integran a la persona con el entorno: Corporalidad, Espacialidad y Temporalidad."
            },
            {
                front: "Significación Motriz (Parlebas)",
                back: "Implica Intención, Decisión y Ajuste motor. Diferencia el juego motor del simple movimiento."
            },
            {
                front: "Clasificación CAI (Juegos Deportivos)",
                back: "Basada en la Incertidumbre: Compañero (C), Adversario (A), Entorno (I)."
            },
            {
                front: "Modelo Comprensivo",
                back: "Enseña primero la táctica (juego simplificado) y luego la técnica. Fomenta la cognición."
            },
            {
                front: "Frecuencia cardíaca niños 6-8 años",
                back: "100-115 puls/min (Referencia de seguridad)."
            }
        ],
        quiz: [
            {
                question: "¿Dónde reside la incertidumbre en un deporte Sociomotor de Oposición (ej: Judo)?",
                options: ["En el medio", "En el compañero", "En el adversario", "No hay incertidumbre"],
                correct: 2,
                explanation: "En la oposición, la incertidumbre viene de las acciones del rival."
            },
            {
                question: "¿Qué tipo de resistencia es la saludable para Primaria?",
                options: ["Anaeróbica láctica", "Anaeróbica aláctica", "Aeróbica", "Ninguna"],
                correct: 2,
                explanation: "La aeróbica (baja/media intensidad) es la adecuada. La anaeróbica está contraindicada sistemáticamente."
            },
            {
                question: "¿Qué modelo de enseñanza deportiva prioriza la táctica sobre la técnica?",
                options: ["Modelo Técnico", "Modelo Comprensivo", "Modelo Militar", "Modelo Analítico"],
                correct: 1,
                explanation: "El Modelo Comprensivo empieza por el juego y la comprensión táctica."
            },
            {
                question: "¿Cuál es una habilidad locomotriz?",
                options: ["Giro", "Lanzamiento", "Carrera", "Equilibrio"],
                correct: 2,
                explanation: "La carrera implica desplazamiento, por tanto es locomotriz."
            },
            {
                question: "¿Qué define al Juego Motor según Parlebas?",
                options: ["Reglas estrictas", "Significación motriz", "Competición federada", "Uso de material"],
                correct: 1,
                explanation: "La significación motriz (intención, decisión) es lo que le da carácter de juego motor."
            }
        ],
        practicalTips: [
            "Habilidades: Definir tipo (ej: coordinación óculo-manual).",
            "Deportes: Usar Modelo Comprensivo (juegos modificados, 3x3), evitar filas.",
            "Condición Física: NO hablar de 'entrenamiento'. Usar 'Juegos de persecución' (resistencia) o 'trepa' (fuerza).",
            "Expresión: Empezar con desinhibición (ocupar espacios) antes de actuar."
        ]
    },
    {
        id: "topic-5",
        title: "TEMA 5: La Evaluación",
        color: "bg-pink-50",
        borderColor: "border-pink-200",
        textColor: "text-pink-900",
        flashcards: [
            {
                front: "Diferencia Medir vs Evaluar",
                back: "Medir es cuantificar (objetivo). Evaluar es emitir un juicio de valor para tomar decisiones (cualitativo)."
            },
            {
                front: "Evaluación Formativa",
                back: "Se realiza DURANTE el proceso. Su fin es educar, motivar y corregir errores."
            },
            {
                front: "Evaluación Compartida",
                back: "Diálogo entre profesor y alumno para consensuar la valoración."
            },
            {
                front: "Diferencia Instrumento vs Técnica",
                back: "Técnica es la estrategia (observación). Instrumento es la herramienta física (lista de control, rúbrica)."
            },
            {
                front: "Rúbrica",
                back: "Matriz que cruza criterios con niveles de desempeño descritos detalladamente. Ideal para competencias."
            },
            {
                front: "Triangulación de Evidencias",
                back: "Usar Respuestas (saber), Productos (saber hacer/crear) y Desempeños (saber hacer/actitud)."
            }
        ],
        quiz: [
            {
                question: "¿Cuál es la finalidad principal de la evaluación según la LOMLOE?",
                options: ["Calificar al alumno", "Clasificar por nivel", "Mejorar los procesos de enseñanza-aprendizaje", "Sancionar errores"],
                correct: 2,
                explanation: "Es una actividad formativa centrada en la mejora del aprendizaje."
            },
            {
                question: "¿Qué instrumento es una lista de Sí/No?",
                options: ["Rúbrica", "Escala numérica", "Lista de Control", "Registro anecdótico"],
                correct: 2,
                explanation: "La Lista de Control registra presencia o ausencia (Sí/No)."
            },
            {
                question: "Si el alumno se evalúa a sí mismo, hablamos de...",
                options: ["Heteroevaluación", "Coevaluación", "Autoevaluación", "Evaluación recíproca"],
                correct: 2,
                explanation: "Autoevaluación es la valoración del propio desempeño."
            },
            {
                question: "¿Qué evalúa un 'Desempeño'?",
                options: ["Solo conocimientos", "Conocimientos + Destrezas + Actitudes", "Solo destrezas físicas", "La memoria"],
                correct: 1,
                explanation: "Los desempeños (ej: jugar un partido) integran saber, saber hacer y saber ser."
            },
            {
                question: "¿Qué tipo de evaluación se realiza al final para calificar?",
                options: ["Inicial", "Formativa", "Sumativa", "Diagnóstica"],
                correct: 2,
                explanation: "La Sumativa verifica el nivel alcanzado al final del proceso."
            }
        ],
        practicalTips: [
            "Enfoque: Evaluación continua y formativa, no solo calificadora.",
            "Instrumentos: Cuestionario (Saber), Rúbrica (Saber Hacer), Lista de Control (Actitud).",
            "Autonomía: Incluir hoja de Autoevaluación para reflexión.",
            "Transparencia: Criterios explicados al inicio."
        ]
    },
    {
        id: "topic-6",
        title: "TEMA 6: Modelos y Estilos de Enseñanza",
        color: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-900",
        flashcards: [
            {
                front: "Jerarquía Conceptual",
                back: "Modelo Didáctico > Estrategia > Estilo > Técnica."
            },
            {
                front: "Estrategia Instructiva",
                back: "Profesor decide. Objetivo: seguridad y control. Estilos: Mando Directo, Asignación de Tareas."
            },
            {
                front: "Estrategia Participativa",
                back: "Cede responsabilidad al alumno. Estilos: Enseñanza Recíproca, Grupos Reducidos."
            },
            {
                front: "Estrategia Emancipativa",
                back: "Alumno asume el proceso. Estilos: Descubrimiento Guiado, Resolución de Problemas."
            },
            {
                front: "Mando Directo",
                back: "Profesor toma todas las decisiones. Ejecución masiva. Esquema: Estímulo -> Respuesta."
            },
            {
                front: "Descubrimiento Guiado",
                back: "Profesor plantea preguntas (disonancia cognitiva) para llevar al alumno a una única respuesta correcta."
            },
            {
                front: "Resolución de Problemas",
                back: "Profesor plantea un problema abierto. Alumno busca múltiples soluciones válidas. Fomenta creatividad."
            }
        ],
        quiz: [
            {
                question: "¿En qué estilo de enseñanza el profesor plantea preguntas para guiar hacia una respuesta?",
                options: ["Resolución de Problemas", "Mando Directo", "Descubrimiento Guiado", "Enseñanza Recíproca"],
                correct: 2,
                explanation: "El Descubrimiento Guiado usa la interrogación para guiar al alumno."
            },
            {
                question: "¿Qué estrategia busca la autonomía total y 'aprender a aprender'?",
                options: ["Instructiva", "Participativa", "Emancipativa", "Militar"],
                correct: 2,
                explanation: "La Emancipativa (o Cognoscitiva) busca la máxima autonomía cognitiva."
            },
            {
                question: "En la Enseñanza Recíproca, ¿quién corrige al ejecutante?",
                options: ["El profesor", "El observador (compañero)", "Nadie", "El director"],
                correct: 1,
                explanation: "El compañero observador es quien da el feedback usando la hoja de tareas."
            },
            {
                question: "¿Para qué es útil el Mando Directo?",
                options: ["Fomentar creatividad", "Tareas peligrosas o de orden cerrado", "Trabajo en equipo", "Relajación"],
                correct: 1,
                explanation: "Se usa para control total, seguridad en tareas peligrosas o técnica estricta."
            },
            {
                question: "¿Qué diferencia la Resolución de Problemas del Descubrimiento Guiado?",
                options: ["No hay diferencia", "RP busca una solución, DG muchas", "RP busca múltiples soluciones, DG una", "DG es directivo"],
                correct: 2,
                explanation: "La Resolución de Problemas admite múltiples soluciones válidas (divergencia)."
            }
        ],
        practicalTips: [
            "Metodología Mixta: Justificar que se adaptan los estilos a la tarea (Mosston y Ashworth).",
            "Calentamiento: Mando Directo/Asignación (seguridad/rapidez).",
            "Parte Principal: Enseñanza Recíproca (técnica) o Resolución Problemas (táctica).",
            "NEAE: Asignación de Tareas adaptada o Tutoría entre iguales."
        ]
    }
];
