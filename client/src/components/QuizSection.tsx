import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "O que é Realidade Aumentada?",
      options: [
        "Um ambiente completamente digital",
        "Sobreposição de elementos digitais no mundo real",
        "Uma tecnologia de impressão 3D",
        "Um tipo de inteligência artificial",
      ],
      correct: 1,
      explanation: "Realidade Aumentada mistura elementos digitais com o mundo real, permitindo interação em tempo real.",
    },
    {
      id: 2,
      question: "Qual sensor mede a velocidade angular de rotação?",
      options: ["Acelerômetro", "Giroscópio", "Magnetômetro", "Barômetro"],
      correct: 1,
      explanation: "O giroscópio mede a rotação nos eixos X, Y e Z.",
    },
    {
      id: 3,
      question: "Qual fórmula calcula a distância entre dois pontos em 3D?",
      options: [
        "d = x + y + z",
        "d = sqrt((x2-x1)² + (y2-y1)² + (z2-z1)²)",
        "d = (x * y * z)",
        "d = |x - y - z|",
      ],
      correct: 1,
      explanation: "A distância euclidiana usa o teorema de Pitágoras em três dimensões.",
    },
    {
      id: 4,
      question: "Quantos eixos de coordenadas existem no espaço 3D?",
      options: ["2 eixos", "3 eixos", "4 eixos", "5 eixos"],
      correct: 1,
      explanation: "O espaço 3D tem três eixos: X (horizontal), Y (vertical) e Z (profundidade).",
    },
    {
      id: 5,
      question: "Qual é uma aplicação prática de AR?",
      options: [
        "Apenas jogos de vídeo",
        "Educação, medicina, engenharia e navegação",
        "Apenas para smartphones",
        "Nenhuma aplicação prática",
      ],
      correct: 1,
      explanation: "AR tem aplicações em educação, medicina, engenharia, navegação, arquitetura e muitos outros campos.",
    },
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 bg-card border border-border/50">
              <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-full">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Quiz Completo!</h2>
              <p className="text-5xl font-bold text-primary mb-4">{percentage}%</p>
              <p className="text-lg text-muted-foreground mb-8">
                Você acertou {score} de {questions.length} questões
              </p>
              <Button
                onClick={resetQuiz}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Tentar Novamente
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <section className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Quiz</span> Interativo
          </h2>
          <p className="text-lg text-muted-foreground">
            Teste seus conhecimentos sobre Realidade Aumentada e Matemática
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border border-border/50">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Questão {currentQuestion + 1} de {questions.length}
                </p>
                <p className="text-sm text-muted-foreground">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</p>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-8">{question.question}</h3>

            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = "border-border hover:border-primary hover:bg-primary/5 cursor-pointer";
                if (answered) {
                  if (selectedAnswer === index) {
                    buttonClass = isCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950";
                  } else if (index === question.correct) {
                    buttonClass = "border-green-500 bg-green-50 dark:bg-green-950";
                  } else {
                    buttonClass = "border-border";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !answered && handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${buttonClass}`}
                  >
                    <div className="flex items-center gap-3">
                      {answered && selectedAnswer === index && (
                        isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )
                      )}
                      {answered && index === question.correct && selectedAnswer !== index && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-foreground">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`p-4 rounded-lg mb-8 border ${isCorrect ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"}`}>
                <p className={`text-sm font-semibold mb-2 ${isCorrect ? "text-green-700 dark:text-green-300" : "text-blue-700 dark:text-blue-300"}`}>
                  {isCorrect ? "Correto!" : "Resposta correta:"}
                </p>
                <p className={`text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}>
                  {question.explanation}
                </p>
              </div>
            )}

            {answered && (
              <Button
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold"
              >
                {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima Questão"}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
