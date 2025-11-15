import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Import highlight.js and configure it
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Register commonly used languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import xml from 'highlight.js/lib/languages/xml';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);

// Make hljs available globally for Quill
if (typeof window !== 'undefined') {
  (window as any).hljs = hljs;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillInstanceRef.current) return;

    try {
      // Initialize Quill with proper configuration
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['clean']
          ],
          syntax: {
            highlight: (text: string) => {
              try {
                return hljs.highlightAuto(text).value;
              } catch (e) {
                console.error('Syntax highlighting error:', e);
                return text;
              }
            }
          }
        }
      });

      quillInstanceRef.current = quill;

      // Set initial value
      if (value) {
        quill.root.innerHTML = value;
      }

      // Handle text changes
      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        onChange(html);
      });

    } catch (error) {
      console.error('Error initializing Quill editor:', error);
    }

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update content when value changes externally
    if (quillInstanceRef.current && value !== quillInstanceRef.current.root.innerHTML) {
      const selection = quillInstanceRef.current.getSelection();
      quillInstanceRef.current.root.innerHTML = value;
      if (selection) {
        quillInstanceRef.current.setSelection(selection);
      }
    }
  }, [value]);

  return (
    <div className="rich-text-editor">
      <style>{`
        .rich-text-editor .ql-container {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0 0 0.5rem 0.5rem;
          color: white;
          min-height: 400px;
          font-size: 16px;
        }
        .rich-text-editor .ql-toolbar {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .rich-text-editor .ql-toolbar button {
          color: rgb(148, 163, 184);
        }
        .rich-text-editor .ql-toolbar button:hover {
          color: white;
        }
        .rich-text-editor .ql-toolbar button.ql-active {
          color: rgb(14, 165, 233);
        }
        .rich-text-editor .ql-stroke {
          stroke: rgb(148, 163, 184);
        }
        .rich-text-editor .ql-fill {
          fill: rgb(148, 163, 184);
        }
        .rich-text-editor .ql-picker-label {
          color: rgb(148, 163, 184);
        }
        .rich-text-editor .ql-picker-options {
          background: rgb(30, 41, 59);
          border: 1px solid rgb(71, 85, 105);
        }
        .rich-text-editor .ql-picker-item:hover {
          color: rgb(14, 165, 233);
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgb(100, 116, 139);
          font-style: normal;
        }
        .rich-text-editor .ql-editor pre {
          background: rgb(15, 23, 42);
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }
        .rich-text-editor .ql-editor pre.ql-syntax {
          background: rgb(15, 23, 42);
          color: rgb(226, 232, 240);
        }
        .rich-text-editor .ql-editor code {
          background: rgba(14, 165, 233, 0.1);
          color: rgb(56, 189, 248);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
        }
        .rich-text-editor .ql-syntax {
          background-color: #1e1e1e !important;
          color: #d4d4d4 !important;
          overflow: visible !important;
        }
      `}</style>
      <div ref={editorRef} />
    </div>
  );
}