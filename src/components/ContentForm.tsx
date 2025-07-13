
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";

interface ContentFormProps {
  onGenerate: (formData: {
    topic: string;
    contentType: string;
    tone: string;
    length: string;
  }) => void;
  isGenerating: boolean;
}

const ContentForm = ({ onGenerate, isGenerating }: ContentFormProps) => {
  const [formData, setFormData] = useState({
    topic: "",
    contentType: "",
    tone: "",
    length: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic && formData.contentType && formData.tone && formData.length) {
      onGenerate(formData);
    }
  };

  const isFormValid = formData.topic && formData.contentType && formData.tone && formData.length;

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-purple-400" />
          Create Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-slate-200 font-medium">
              Topic or Subject
            </Label>
            <Textarea
              id="topic"
              placeholder="Enter your topic or main idea..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 min-h-[80px] resize-none"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <Label className="text-slate-200 font-medium">Content Type</Label>
            <Select
              value={formData.contentType}
              onValueChange={(value) => setFormData({ ...formData, contentType: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="blog-post" className="text-white hover:bg-slate-700">Blog Post</SelectItem>
                <SelectItem value="tweet" className="text-white hover:bg-slate-700">Tweet</SelectItem>
                <SelectItem value="email" className="text-white hover:bg-slate-700">Email</SelectItem>
                <SelectItem value="social-media-post" className="text-white hover:bg-slate-700">Social Media Post</SelectItem>
                <SelectItem value="product-description" className="text-white hover:bg-slate-700">Product Description</SelectItem>
                <SelectItem value="article" className="text-white hover:bg-slate-700">Article</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <Label className="text-slate-200 font-medium">Tone</Label>
            <Select
              value={formData.tone}
              onValueChange={(value) => setFormData({ ...formData, tone: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="professional" className="text-white hover:bg-slate-700">Professional</SelectItem>
                <SelectItem value="casual" className="text-white hover:bg-slate-700">Casual</SelectItem>
                <SelectItem value="friendly" className="text-white hover:bg-slate-700">Friendly</SelectItem>
                <SelectItem value="formal" className="text-white hover:bg-slate-700">Formal</SelectItem>
                <SelectItem value="humorous" className="text-white hover:bg-slate-700">Humorous</SelectItem>
                <SelectItem value="persuasive" className="text-white hover:bg-slate-700">Persuasive</SelectItem>
                <SelectItem value="informative" className="text-white hover:bg-slate-700">Informative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Length */}
          <div className="space-y-2">
            <Label className="text-slate-200 font-medium">Length</Label>
            <Select
              value={formData.length}
              onValueChange={(value) => setFormData({ ...formData, length: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20">
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="short" className="text-white hover:bg-slate-700">Short (50-150 words)</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-slate-700">Medium (150-300 words)</SelectItem>
                <SelectItem value="long" className="text-white hover:bg-slate-700">Long (300-500 words)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentForm;
