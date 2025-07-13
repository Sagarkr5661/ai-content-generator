
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Clock, FileText, Trash2 } from "lucide-react";
import { GeneratedItem } from "@/pages/Index";
import { useState } from "react";

interface HistoryPanelProps {
  history: GeneratedItem[];
  onSelect: (item: GeneratedItem) => void;
}

const HistoryPanel = ({ history, onSelect }: HistoryPanelProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatContentType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const handleSelect = (item: GeneratedItem) => {
    setSelectedId(item.id);
    onSelect(item);
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <History className="h-5 w-5 text-green-400" />
          Session History
          <span className="text-sm font-normal text-slate-400">({history.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 pr-4">
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                  selectedId === item.id
                    ? 'bg-purple-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/30 hover:border-slate-600/50'
                }`}
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-300">
                      {formatContentType(item.contentType)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-400 gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(item.timestamp)}
                  </div>
                </div>
                
                <h4 className="font-medium text-white mb-2 line-clamp-1">
                  {item.topic}
                </h4>
                
                <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                  {truncateContent(item.content)}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      {item.tone}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      {item.length}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                    className="text-xs text-slate-400 hover:text-white hover:bg-white/10 p-2 h-auto"
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HistoryPanel;
