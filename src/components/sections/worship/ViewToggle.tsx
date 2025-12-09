import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
    view: 'card' | 'list'
    onViewChange: (view: 'card' | 'list') => void
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('card')}
                className={cn(
                    "h-8 px-2 lg:px-3 rounded-md transition-all duration-200",
                    view === 'card'
                        ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
            >
                <LayoutGrid className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-medium">카드</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('list')}
                className={cn(
                    "h-8 px-2 lg:px-3 rounded-md transition-all duration-200",
                    view === 'list'
                        ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
            >
                <List className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-medium">리스트</span>
            </Button>
        </div>
    )
}
