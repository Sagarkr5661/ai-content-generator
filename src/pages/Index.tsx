
import { useState } from "react";
import ContentForm from "@/components/ContentForm";
import GeneratedContent from "@/components/GeneratedContent";
import HistoryPanel from "@/components/HistoryPanel";
import { Sparkles, Zap } from "lucide-react";

export interface GeneratedItem {
  id: string;
  topic: string;
  contentType: string;
  tone: string;
  length: string;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedItem[]>([]);

  const handleGenerate = async (formData: {
    topic: string;
    contentType: string;
    tone: string;
    length: string;
  }) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 4s3prr3WffgfPaVXqrgsoCqdZO7Vd0snIZW1mUwY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command',
          prompt: `Create a ${formData.contentType} about ${formData.topic}. The tone should be ${formData.tone} and the length should be ${formData.length}. Make it engaging and well-structured.`,
          max_tokens: formData.length === 'short' ? 150 : formData.length === 'medium' ? 300 : 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      const content = data.generations[0].text.trim();
      
      setGeneratedContent(content);
      
      // Add to history
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        ...formData,
        content,
        timestamp: new Date(),
      };
      
      setHistory(prev => [newItem, ...prev]);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent("Sorry, there was an error generating content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHistorySelect = (item: GeneratedItem) => {
    setGeneratedContent(item.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-8 w-8 text-blue-400 opacity-50" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Content Generator
            </h1>
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transform your ideas into compelling content with the power of AI. 
            Generate blog posts, tweets, emails, and more in seconds.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Form */}
          <div className="lg:col-span-1">
            <ContentForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating}
            />
          </div>

          {/* Generated Content */}
          <div className="lg:col-span-2">
            <div className="grid gap-8">
              <GeneratedContent 
                content={generatedContent}
                isGenerating={isGenerating}
              />
              
              {/* History Panel */}
              {history.length > 0 && (
                <HistoryPanel 
                  history={history}
                  onSelect={handleHistorySelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
