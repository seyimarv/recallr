"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, Type, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const appearanceSchema = z.object({
  colorScheme: z.string(),
  fontSize: z.string(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
});

type AppearanceForm = z.infer<typeof appearanceSchema>;

const colorSchemes = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
];

export function AppearanceSettings() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<AppearanceForm>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      colorScheme: "blue",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
    },
  });

  async function onSubmit(data: AppearanceForm) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </h2>
        <p className="text-gray-600 mt-1">
          Customize the look and feel of your interface
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Color Scheme */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Color Scheme</h3>
              </div>
              
              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your preferred color scheme</FormLabel>
                    <div className="grid grid-cols-5 gap-3">
                      {colorSchemes.map((scheme) => (
                        <button
                          key={scheme.value}
                          type="button"
                          onClick={() => field.onChange(scheme.value)}
                          className={`
                            flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
                            ${field.value === scheme.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <div className={`w-8 h-8 rounded-full ${scheme.color}`} />
                          <span className="text-xs font-medium">{scheme.label}</span>
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Font Size */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Font Size</h3>
              </div>
              
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your preferred font size</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="extra-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Accessibility */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Accessibility</h3>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="reducedMotion"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Reduce motion
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Minimize animations and transitions
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="highContrast"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          High contrast
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Increase contrast for better visibility
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 