"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, X, FileText, Presentation, BookOpen } from "lucide-react";

interface ResourceFormProps {
  resourceType: "note" | "file" | "direct";
  onCancel: () => void;
  onSubmit: (data: ResourceFormData) => void;
}

export interface ResourceFormData {
  title: string;
  description: string;
  topic: string;
  content?: string;
  fileName?: string;
  fileType?: "pdf" | "ppt";
  tags: string[];
}

export function ResourceForm({ resourceType, onCancel, onSubmit }: ResourceFormProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [content, setContent] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [fileType, setFileType] = React.useState<"pdf" | "ppt" | undefined>();
  const [tags, setTags] = React.useState<string[]>([]);
  const [currentTag, setCurrentTag] = React.useState("");
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (file: File) => {
    if (file.type === "application/pdf") {
      setFileType("pdf");
      setFileName(file.name);
    } else if (file.type.includes("presentation") || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) {
      setFileType("ppt");
      setFileName(file.name);
    } else {
      alert("Please upload a PDF or PowerPoint file.");
      return;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      topic,
      content: resourceType === "note" ? content : undefined,
      fileName: resourceType === "file" ? fileName : undefined,
      fileType: resourceType === "file" ? fileType : undefined,
      tags
    });
  };

  const renderContentField = () => {
    if (resourceType === "note") {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Notes Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here... You can include key concepts, summaries, definitions, or any content you want to create flashcards and quizzes from."
            className="w-full p-4 border border-gray-200 rounded-xl resize-none h-48 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500">
            Write detailed notes that can be used to generate meaningful flashcards and quiz questions.
          </p>
        </div>
      );
    }

    if (resourceType === "file") {
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Upload File</label>
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : fileName 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            {fileName ? (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-green-500 mx-auto flex items-center justify-center">
                  {fileType === "pdf" ? (
                    <FileText className="h-6 w-6 text-white" />
                  ) : (
                    <Presentation className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">{fileName}</p>
                  <p className="text-xs text-green-600">
                    {fileType === "pdf" ? "PDF document" : "PowerPoint presentation"} uploaded successfully
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFileName("");
                    setFileType(undefined);
                  }}
                  className="rounded-xl"
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Drop your file here or click to upload</p>
                  <p className="text-xs text-gray-400">PDF files or PowerPoint presentations (PPT, PPTX)</p>
                  <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
                </div>
                <div>
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    variant="outline" 
                    className="rounded-xl"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>
          {fileName && (
            <p className="text-xs text-gray-500">
              Content will be extracted from your file to generate flashcards and quizzes.
            </p>
          )}
        </div>
      );
    }

    if (resourceType === "direct") {
      return (
        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-green-900">Direct Creation Mode</h4>
              <p className="text-sm text-green-700">
                You'll create flashcards and quizzes manually or with AI assistance in the next step.
              </p>
            </div>
          </div>
          <p className="text-xs text-green-600">
            No content upload required - proceed to the creation step to build your learning materials.
          </p>
        </div>
      );
    }

    return null;
  };

  const isFormValid = () => {
    if (!title.trim() || !topic.trim()) return false;
    if (resourceType === "note" && !content.trim()) return false;
    if (resourceType === "file" && !fileName) return false;
    // For direct creation, only title and topic are required
    return true;
  };

  const getPlaceholderText = () => {
    switch (resourceType) {
      case "note":
        return "Enter notes title...";
      case "file":
        return "Enter content title...";
      case "direct":
        return "Enter learning topic title...";
      default:
        return "Enter title...";
    }
  };

  const getDescriptionPlaceholder = () => {
    switch (resourceType) {
      case "note":
        return "Brief description of your notes and learning objectives...";
      case "file":
        return "Brief description of the file content and learning objectives...";
      case "direct":
        return "Brief description of what you want to learn and practice...";
      default:
        return "Brief description...";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 rounded-2xl border-0 shadow-sm">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={getPlaceholderText()}
              className="rounded-xl"
            />
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Topic/Subject</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Biology, Chemistry, History, Mathematics..."
              className="rounded-xl"
            />
            <p className="text-xs text-gray-500">
              Specify the main subject or topic area for better organization and AI generation.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={getDescriptionPlaceholder()}
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Content Field (varies by type) */}
          {renderContentField()}

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag (e.g., concepts, definitions, formulas, etc.)..."
                className="rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddTag}
                className="rounded-xl"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary" 
                    className="rounded-full flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 