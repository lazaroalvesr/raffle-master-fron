import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TruncatedTextProps } from '@/lib/interface';

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, className = "" }) => {
    const textRef = React.useRef<HTMLSpanElement>(null);
    const [isTextTruncated, setIsTextTruncated] = React.useState(false);

    React.useEffect(() => {
        const checkTruncated = () => {
            if (textRef.current) {
                const { offsetWidth, scrollWidth } = textRef.current;
                setIsTextTruncated(scrollWidth > offsetWidth);
            }
        };

        checkTruncated();
        window.addEventListener('resize', checkTruncated);
        return () => window.removeEventListener('resize', checkTruncated);
    }, [text]);

    if (!isTextTruncated) {
        return (
            <span
                ref={textRef}
                className={`truncate ${className}`}
            >
                {text}
            </span>
        );
    }

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        ref={textRef}
                        className={`truncate cursor-help ${className}`}
                    >
                        {text}
                    </span>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="max-w-[300px] break-words bg-black text-white text-sm px-3 py-1.5 rounded"
                >
                    {text}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TruncatedText;