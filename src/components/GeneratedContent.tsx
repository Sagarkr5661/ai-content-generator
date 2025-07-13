
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Loader2, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedContentProps {
  content: string;
  isGenerating: boolean;
}

const GeneratedContent = ({ content, isGenerating }: GeneratedContentProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Content copied!",
        description: "The generated content has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your content is being downloaded as a text file.",
    });
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-400" />
          Generated Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
              <div className="absolute inset-0 h-12 w-12 border-4 border-purple-400/20 rounded-full animate-pulse"></div>
            </div>
            <p className="text-slate-300 text-lg">Creating amazing content for you...</p>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : content ? (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <pre className="whitespace-pre-wrap text-slate-100 font-medium leading-relaxed">
                {content}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-400 text-lg">Your generated content will appear here</p>
            <p className="text-slate-500 text-sm">Fill out the form and click generate to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneratedContent;
