import React from 'react';
import DOMPurify from 'dompurify';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { JSONContent } from '@tiptap/core';  

interface RenderHTMLProps {
    content: string | JSONContent | undefined;  
}

const RenderHTML = ({ content }: RenderHTMLProps) => {
    let htmlContent = '';

    if (typeof content === 'string') {
        htmlContent = content;
    }
    else if (content && typeof content === 'object') {
        htmlContent = generateHTML(content as JSONContent, [StarterKit]);
    }

    const cleanHTML = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: ['h1', 'h6', 'strong', 'br'],  
        ALLOWED_ATTR: []  
    });

    return (
        <div
            className=""
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );
};

export default RenderHTML;
