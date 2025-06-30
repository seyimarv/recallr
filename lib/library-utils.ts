interface LearningResource {
  id: string;
  title: string;
  description: string;
  topic: string;
  tags: string[];
  flashcardCount: number;
  hasQuiz: boolean; // Only one quiz per resource
  nextReview?: string;
  createdAt: string;
  lastStudied?: string;
  accuracy?: number;
  sourceType?: "note" | "pdf" | "link"; // Source is less important now
  sourceUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  masteryLevel: number; // 0-100 percentage
}

export function filterAndSortResources(
  resources: LearningResource[],
  searchQuery: string,
  selectedDifficulty: string,
  selectedTag: string,
  sortBy: string
): LearningResource[] {
  return resources
    .filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
      const matchesTag = selectedTag === "all" || resource.tags.includes(selectedTag);
      
      return matchesSearch && matchesDifficulty && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-added":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "flashcards-count":
          return b.flashcardCount - a.flashcardCount;
        case "mastery-level":
          return b.masteryLevel - a.masteryLevel;
        case "next-review":
          if (!a.nextReview && !b.nextReview) return 0;
          if (!a.nextReview) return 1;
          if (!b.nextReview) return -1;
          return a.nextReview.localeCompare(b.nextReview);
        case "difficulty":
          const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });
}

export function extractUniqueTags(resources: LearningResource[]): string[] {
  return Array.from(new Set(resources.flatMap(resource => resource.tags)));
}

export function extractUniqueTopics(resources: LearningResource[]): string[] {
  return Array.from(new Set(resources.map(resource => resource.topic)));
}

// Mock data that would normally come from your API
export const mockResources: LearningResource[] = [
  {
    id: "1",
    title: "Cardiovascular Physiology",
    description: "Heart anatomy, blood circulation, and cardiac cycle mechanisms with interactive flashcards and quiz",
    topic: "Cardiovascular System",
    tags: ["Cardiology", "Physiology", "Medicine"],
    flashcardCount: 28,
    hasQuiz: true,
    nextReview: "Tomorrow",
    createdAt: "2024-01-15",
    lastStudied: "2024-01-18",
    accuracy: 87,
    sourceType: "note",
    difficulty: "intermediate",
    masteryLevel: 87
  },
  {
    id: "2", 
    title: "Neural Networks Fundamentals",
    description: "Deep learning architectures and applications with comprehensive study materials",
    topic: "Artificial Intelligence",
    tags: ["AI", "Deep Learning", "Research"],
    flashcardCount: 15,
    hasQuiz: true,
    nextReview: "In 3 days",
    createdAt: "2024-01-10",
    lastStudied: "2024-01-16",
    accuracy: 92,
    sourceType: "pdf",
    difficulty: "advanced",
    masteryLevel: 92
  },
  {
    id: "3",
    title: "Nervous System Basics",
    description: "Neuron structure, synapses, and neural communication fundamentals",
    topic: "Neuroscience",
    tags: ["Neuroscience", "Biology", "Interactive"],
    flashcardCount: 22,
    hasQuiz: true,
    nextReview: "Today",
    createdAt: "2024-01-12",
    lastStudied: "2024-01-17",
    sourceUrl: "https://khanacademy.org/nervous-system",
    sourceType: "link",
    accuracy: 95,
    difficulty: "beginner",
    masteryLevel: 95
  },
  {
    id: "4",
    title: "Biochemistry Pathways",
    description: "Metabolic pathways including glycolysis, TCA cycle, and electron transport",
    topic: "Biochemistry",
    tags: ["Biochemistry", "Metabolism", "Chemistry"],
    flashcardCount: 35,
    hasQuiz: true,
    createdAt: "2024-01-08",
    lastStudied: "2024-01-14",
    accuracy: 78,
    sourceType: "note",
    difficulty: "advanced",
    masteryLevel: 78
  },
  {
    id: "5",
    title: "Immunology Basics",
    description: "Adaptive immune responses and antibody structure/function",
    topic: "Immunology",
    tags: ["Immunology", "Medicine", "Biology"],
    flashcardCount: 19,
    hasQuiz: true,
    nextReview: "In 5 days",
    createdAt: "2024-01-05",
    accuracy: 84,
    sourceType: "pdf",
    difficulty: "intermediate",
    masteryLevel: 84
  }
]; 