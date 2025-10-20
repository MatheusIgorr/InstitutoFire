const coursesData = {
  brigadista: {
    title: "Curso Brigada de Incêndio",
    lessons: [
      { id: 1, title: "Introdução à Brigada de Incêndio", duration: "20 min", completed: true, level: "Básico" },
      { id: 2, title: "Princípios Básicos de Incêndio", duration: "25 min", completed: true, level: "Básico" },
      {
        id: 3,
        title: "Equipamentos de Proteção Individual (EPI)",
        duration: "18 min",
        completed: false,
        level: "Básico",
      },
      { id: 4, title: "Primeiros Socorros - Conceitos Básicos", duration: "30 min", completed: false, level: "Básico" },
      { id: 5, title: "Plano de Evacuação", duration: "22 min", completed: false, level: "Básico" },
      { id: 6, title: "Comunicação em Emergências", duration: "15 min", completed: false, level: "Básico" },
      { id: 7, title: "Triângulo do Fogo e Combustão", duration: "28 min", completed: false, level: "Avançado" },
      {
        id: 8,
        title: "Tipos de Incêndio (Classe A, B, C, D, K)",
        duration: "32 min",
        completed: false,
        level: "Avançado",
      },
      { id: 9, title: "Uso de Extintores de Incêndio", duration: "25 min", completed: false, level: "Avançado" },
      { id: 10, title: "Técnica ABCDE de Primeiros Socorros", duration: "35 min", completed: false, level: "Avançado" },
      { id: 11, title: "Reanimação Cardiopulmonar (RCP)", duration: "40 min", completed: false, level: "Avançado" },
      { id: 12, title: "Evacuação Avançada e Rotas de Fuga", duration: "28 min", completed: false, level: "Avançado" },
      { id: 13, title: "Gestão de Crise e Comunicação", duration: "30 min", completed: false, level: "Avançado" },
      { id: 14, title: "Legislação e Normas de Segurança", duration: "22 min", completed: false, level: "Avançado" },
      { id: 15, title: "Liderança em Situações de Crise", duration: "35 min", completed: false, level: "Avançado" },
      { id: 16, title: "Análise de Risco e Prevenção", duration: "40 min", completed: false, level: "Avançado" },
      { id: 17, title: "Combate a Incêndios Estruturais", duration: "45 min", completed: false, level: "Avançado" },
      { id: 18, title: "Atendimento Pré-Hospitalar Avançado", duration: "50 min", completed: false, level: "Avançado" },
      {
        id: 19,
        title: "Evacuação de Pessoas com Deficiência",
        duration: "30 min",
        completed: false,
        level: "Avançado",
      },
      { id: 20, title: "Gestão de Recursos e Equipamentos", duration: "28 min", completed: false, level: "Avançado" },
      { id: 21, title: "Treinamento de Equipes", duration: "35 min", completed: false, level: "Avançado" },
      { id: 22, title: "Investigação de Incêndios", duration: "40 min", completed: false, level: "Avançado" },
      { id: 23, title: "Legislação Avançada e Certificações", duration: "25 min", completed: false, level: "Avançado" },
      { id: 24, title: "Psicologia em Emergências", duration: "30 min", completed: false, level: "Avançado" },
      { id: 25, title: "Mentoria com Especialistas", duration: "45 min", completed: false, level: "Avançado" },
      {
        id: 26,
        title: "Projeto Prático: Plano de Emergência",
        duration: "60 min",
        completed: false,
        level: "Avançado",
      },
      { id: 27, title: "Certificação Final e Avaliação", duration: "90 min", completed: false, level: "Avançado" },
    ],
    exercises: [
      { id: 1, title: "Quiz: Princípios de Incêndio", type: "quiz" },
      { id: 2, title: "Prática: Identificar Riscos", type: "practical" },
      { id: 3, title: "Quiz: Tipos de Incêndio", type: "quiz" },
      { id: 4, title: "Prática: Uso de Extintores", type: "practical" },
      { id: 5, title: "Desafio: Simulação de Emergência", type: "challenge" },
      { id: 6, title: "Plano Completo de Segurança", type: "project" },
      { id: 7, title: "Análise de Caso Real", type: "research" },
      { id: 8, title: "Simulado: Evacuação Avançada", type: "evaluation" },
      { id: 9, title: "Apresentação de Projeto", type: "presentation" },
    ],
  },
}

// Initialize course
const course = coursesData.brigadista
let selectedLessonId = 1

// Render lessons
function renderLessons() {
  const lessonsList = document.getElementById("lessonsList")
  lessonsList.innerHTML = course.lessons
    .map(
      (lesson) => `
        <div class="lesson-item ${lesson.completed ? "completed" : ""} ${lesson.id === selectedLessonId ? "active" : ""}" data-id="${lesson.id}">
            <div class="lesson-title">
                ${lesson.completed ? "✓" : "○"} ${lesson.title}
            </div>
            <div class="lesson-meta">${lesson.duration} • ${lesson.level}</div>
        </div>
    `,
    )
    .join("")

  document.querySelectorAll(".lesson-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectedLessonId = Number.parseInt(item.dataset.id)
      const lesson = course.lessons.find((l) => l.id === selectedLessonId)
      document.getElementById("lessonTitle").textContent = lesson.title
      renderLessons()
      updateProgress()
    })
  })
}

// Render exercises
function renderExercises() {
  const exercisesList = document.getElementById("exercisesList")
  exercisesList.innerHTML = course.exercises
    .map(
      (exercise) => `
        <div class="exercise-item">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-meta">${exercise.type}</div>
        </div>
    `,
    )
    .join("")
}

// Update progress
function updateProgress() {
  const completedLessons = course.lessons.filter((l) => l.completed).length
  const progress = Math.round((completedLessons / course.lessons.length) * 100)

  document.getElementById("progressFill").style.width = progress + "%"
  document.getElementById("progressText").textContent = progress + "% completo"
  document.getElementById("progressFillSmall").style.width = progress + "%"
  document.getElementById("progressPercentage").textContent = progress + "% completo"
  document.getElementById("progressCount").textContent = completedLessons + "/" + course.lessons.length
}

// Tab switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab

    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))

    btn.classList.add("active")
    document.getElementById(tabName + "-tab").classList.add("active")
  })
})

// Initialize
renderLessons()
renderExercises()
updateProgress()
