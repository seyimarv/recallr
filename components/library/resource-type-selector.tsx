"use client";

import { Card } from "@/components/ui/card";
import { FileText, Upload, Plus } from "lucide-react";

interface ResourceTypeSelectorProps {
  selectedType: "note" | "file" | "direct" | null;
  onTypeSelect: (type: "note" | "file" | "direct") => void;
}

export function ResourceTypeSelector({ selectedType, onTypeSelect }: ResourceTypeSelectorProps) {
  const ResourceTypeCard = ({ 
    type, 
    icon: Icon, 
    title, 
    description,
    color 
  }: {
    type: "note" | "file" | "direct";
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    color: string;
  }) => (
    <Card 
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md ${
        selectedType === type 
          ? `border-blue-500 bg-blue-50` 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onTypeSelect(type)}
    >
      <div className="text-center space-y-3">
        <div className={`w-12 h-12 rounded-xl ${color} mx-auto flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResourceTypeCard
          type="note"
          icon={FileText}
          title="Write Notes"
          description="Create content by writing notes directly. Perfect for summarizing concepts or creating original study material."
          color="bg-blue-500"
        />
        
        <ResourceTypeCard
          type="file"
          icon={Upload}
          title="Upload File"
          description="Upload PDF documents or PowerPoint presentations to extract content for learning."
          color="bg-purple-500"
        />

        <ResourceTypeCard
          type="direct"
          icon={Plus}
          title="Create Directly"
          description="Jump straight to creating flashcards and quizzes without any source content. Perfect for manual creation."
          color="bg-green-500"
        />
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
        <p>Choose how you want to create your learning content. You can optionally use AI to generate flashcards and quizzes from your content, or create them manually.</p>
      </div>
    </div>
  );
} 