"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ResourceTypeSelector } from "@/components/library/resource-type-selector";
import { ResourceForm, ResourceFormData } from "@/components/library/resource-form";
import { AIGenerationStep, GenerationOptions } from "@/components/library/ai-generation-step";
import { ContentPreview } from "@/components/library/content-preview";
import { Flashcard } from "@/components/library/flashcard-editor";
import { QuizQuestion } from "@/components/library/quiz-editor";

type WorkflowStep = "type-selection" | "resource-form" | "ai-generation" | "content-preview";

export default function NewResourcePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<WorkflowStep>("type-selection");
  const [selectedType, setSelectedType] = React.useState<"note" | "file" | "direct" | null>(null);
  const [resourceData, setResourceData] = React.useState<ResourceFormData | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState<{
    stage: string;
    progress: number;
    estimatedTime: string;
  } | null>(null);
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>([]);

  const handleTypeSelect = (type: "note" | "file" | "direct") => {
    setSelectedType(type);
    setCurrentStep("resource-form");
  };

  const handleFormSubmit = (data: ResourceFormData) => {
    setResourceData(data);
    setCurrentStep("ai-generation");
  };

  const handleAIGeneration = async (options: GenerationOptions) => {
    setIsGenerating(true);
    
    // Simulate AI generation with progress updates
    const stages = [
      { 
        stage: selectedType === "direct" ? "Analyzing topic..." : "Analyzing content...", 
        progress: 20, 
        estimatedTime: "2 minutes" 
      },
      { stage: "Generating flashcards...", progress: 50, estimatedTime: "1 minute" },
      { stage: "Creating quiz questions...", progress: 80, estimatedTime: "30 seconds" },
      { stage: "Finalizing content...", progress: 100, estimatedTime: "Complete" }
    ];

    for (const stage of stages) {
      setGenerationProgress(stage);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    }

    // Generate mock content based on options and resource type
    if (options.generateFlashcards) {
      const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
      const mockFlashcards: Flashcard[] = Array.from({ length: options.flashcardCount }, (_, i) => ({
        id: `flashcard-${i + 1}`,
        front: getFlashcardFront(i + 1),
        back: getFlashcardBack(i + 1),
        difficulty: difficulties[Math.floor(Math.random() * 3)],
        tags: resourceData?.tags.slice(0, 2) || []
      }));
      setFlashcards(mockFlashcards);
    }

    if (options.generateQuizzes) {
      const questionTypes: ("multiple-choice" | "true-false" | "fill-in-blank")[] = ["multiple-choice", "true-false", "fill-in-blank"];
      const difficultyMap: Record<string, "easy" | "medium" | "hard"> = {
        "beginner": "easy",
        "intermediate": "medium", 
        "advanced": "hard"
      };
      const mockQuestions: QuizQuestion[] = Array.from({ length: options.quizQuestionCount }, (_, i) => ({
        id: `quiz-${i + 1}`,
        type: questionTypes[Math.floor(Math.random() * 3)],
        question: getQuizQuestion(i + 1),
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: getQuizExplanation(),
        difficulty: difficultyMap[options.difficulty] || "medium",
        tags: resourceData?.tags.slice(0, 2) || []
      }));
      setQuizQuestions(mockQuestions);
    }

    setIsGenerating(false);
    setGenerationProgress(null);
    setCurrentStep("content-preview");
  };

  const getFlashcardFront = (index: number) => {
    switch (selectedType) {
      case "note":
        return `What is the key concept ${index} from your notes on "${resourceData?.title}"?`;
      case "file":
        return `What is the key concept ${index} from the ${resourceData?.fileType?.toUpperCase()} "${resourceData?.title}"?`;
      case "direct":
        return `What is key concept ${index} in ${resourceData?.topic}?`;
      default:
        return `What is the key concept ${index}?`;
    }
  };

  const getFlashcardBack = (index: number) => {
    switch (selectedType) {
      case "note":
        return `This is the answer explaining concept ${index} based on your notes. It covers the important aspects that students need to understand.`;
      case "file":
        return `This is the answer explaining concept ${index} based on the uploaded file. It covers the important aspects that students need to understand.`;
      case "direct":
        return `This is the answer explaining concept ${index} in ${resourceData?.topic}. It covers the important aspects that students need to understand about this topic.`;
      default:
        return `This is the answer explaining concept ${index}.`;
    }
  };

  const getQuizQuestion = (index: number) => {
    switch (selectedType) {
      case "note":
        return `Question ${index}: What is the main principle discussed in your notes about "${resourceData?.title}"?`;
      case "file":
        return `Question ${index}: What is the main principle discussed in "${resourceData?.title}"?`;
      case "direct":
        return `Question ${index}: What is the main principle of ${resourceData?.topic}?`;
      default:
        return `Question ${index}: What is the main principle?`;
    }
  };

  const getQuizExplanation = () => {
    switch (selectedType) {
      case "note":
        return `This is correct because it aligns with the core concepts presented in your notes.`;
      case "file":
        return `This is correct because it aligns with the core concepts presented in the uploaded file.`;
      case "direct":
        return `This is correct because it aligns with the fundamental principles of ${resourceData?.topic}.`;
      default:
        return `This is the correct answer.`;
    }
  };

  const handleSkipAI = () => {
    // Initialize empty arrays if skipping AI generation
    setFlashcards([]);
    setQuizQuestions([]);
    setCurrentStep("content-preview");
  };

  const handleFlashcardSave = (flashcard: Flashcard) => {
    setFlashcards(prev => prev.map(f => f.id === flashcard.id ? flashcard : f));
  };

  const handleFlashcardDelete = (id: string) => {
    setFlashcards(prev => prev.filter(f => f.id !== id));
  };

  const handleQuizQuestionSave = (question: QuizQuestion) => {
    setQuizQuestions(prev => prev.map(q => q.id === question.id ? question : q));
  };

  const handleQuizQuestionDelete = (id: string) => {
    setQuizQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleAddFlashcard = () => {
    const newFlashcard: Flashcard = {
      id: `flashcard-${flashcards.length + 1}`,
      front: "",
      back: "",
      difficulty: "medium",
      tags: [],
      isEditing: true
    };
    setFlashcards(prev => [...prev, newFlashcard]);
  };

  const handleAddQuizQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `quiz-${quizQuestions.length + 1}`,
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      difficulty: "medium",
      tags: [],
      isEditing: true
    };
    setQuizQuestions(prev => [...prev, newQuestion]);
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", {
      type: selectedType,
      resourceData,
      flashcards,
      quizQuestions,
      status: "draft"
    });
    router.push('/library?status=draft-saved');
  };

  const handlePublish = () => {
    console.log("Publishing to library:", {
      type: selectedType,
      resourceData,
      flashcards,
      quizQuestions,
      status: "published"
    });
    router.push('/library?status=published');
  };

  const handleBack = () => {
    switch (currentStep) {
      case "resource-form":
        setCurrentStep("type-selection");
        setSelectedType(null);
        break;
      case "ai-generation":
        setCurrentStep("resource-form");
        break;
      case "content-preview":
        setCurrentStep("ai-generation");
        break;
      default:
        router.push('/library');
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "type-selection":
        return "Create Learning Content";
      case "resource-form":
        switch (selectedType) {
          case "note":
            return "Write Notes";
          case "file":
            return "Upload File";
          case "direct":
            return "Setup Learning Topic";
          default:
            return "Add Details";
        }
      case "ai-generation":
        return "AI Content Generation (Optional)";
      case "content-preview":
        return "Review & Edit Content";
      default:
        return "Create Learning Content";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "type-selection":
        return "Choose how you want to create your learning content";
      case "resource-form":
        switch (selectedType) {
          case "note":
            return "Write your notes and add details for your learning content";
          case "file":
            return "Upload your file and add details for content extraction";
          case "direct":
            return "Set up your learning topic and objectives for direct content creation";
          default:
            return "Add details for your learning content";
        }
      case "ai-generation":
        return "Optionally use AI to generate flashcards and quiz questions from your content";
      case "content-preview":
        return "Review and customize your flashcards and quiz questions before saving";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {getStepTitle()}
          </h1>
          <p className="text-sm text-muted-foreground">
            {getStepDescription()}
          </p>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === "type-selection" && (
        <ResourceTypeSelector
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
        />
      )}

      {currentStep === "resource-form" && selectedType && (
        <ResourceForm
          resourceType={selectedType}
          onCancel={handleBack}
          onSubmit={handleFormSubmit}
        />
      )}

      {currentStep === "ai-generation" && resourceData && selectedType && (
        <AIGenerationStep
          resourceType={selectedType}
          resourceData={resourceData}
          onGenerate={handleAIGeneration}
          onSkip={handleSkipAI}
          isGenerating={isGenerating}
          generationProgress={generationProgress}
        />
      )}

      {currentStep === "content-preview" && resourceData && (
        <ContentPreview
          flashcards={flashcards}
          quizQuestions={quizQuestions}
          onFlashcardSave={handleFlashcardSave}
          onFlashcardDelete={handleFlashcardDelete}
          onQuizQuestionSave={handleQuizQuestionSave}
          onQuizQuestionDelete={handleQuizQuestionDelete}
          onAddFlashcard={handleAddFlashcard}
          onAddQuizQuestion={handleAddQuizQuestion}
          onSaveAsDraft={handleSaveAsDraft}
          onPublish={handlePublish}
          resourceTitle={resourceData?.title || ""}
        />
      )}
    </div>
  );
} 