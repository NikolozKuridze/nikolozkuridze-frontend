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
import csharp from 'highlight.js/lib/languages/csharp';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';

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
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('java', java);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('sql', sql);

// Extend Window interface for hljs
declare global {
  interface Window {
    hljs: typeof hljs;
  }
}

// Make hljs available globally for Quill
if (typeof window !== 'undefined') {
  window.hljs = hljs;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Copy to clipboard helper
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    // Could add toast notification here
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current) return;

    // Cleanup function to prevent memory leaks
    if (quillInstanceRef.current) {
      return;
    }

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

      // Set initial value (even if empty, to ensure proper initialization)
      const initialValue = value || '';
      quill.root.innerHTML = initialValue;
      console.log('✅ Quill initialized with content length:', initialValue.length);

      // Handle text changes - CRITICAL FIX: Call onChange immediately
      quill.on('text-change', () => {
        if (isUpdatingRef.current) {
          // Skip if we're updating from external value change
          return;
        }

        const html = quill.root.innerHTML;
        console.log('🔄 Quill text-change event, calling onChange with length:', html.length, 'content:', html.substring(0, 100));
        onChange(html);
      });

      console.log('✅ Quill editor initialized successfully');

    } catch (error) {
      console.error('❌ Error initializing Quill editor:', error);
    }

    return () => {
      if (quillInstanceRef.current) {
        console.log('🧹 Cleaning up Quill instance');
        quillInstanceRef.current = null;
      }
    };
  }, [value, onChange]);

  useEffect(() => {
    if (!quillInstanceRef.current) return;

    const quill = quillInstanceRef.current;
    const currentContent = quill.root.innerHTML;

    // Normalize both strings for comparison to avoid unnecessary updates
    const normalizeHtml = (html: string) => html.replace(/\s+/g, ' ').trim();
    const normalizedValue = normalizeHtml(value || '');
    const normalizedCurrent = normalizeHtml(currentContent);

    // Only update if content is actually different
    if (normalizedValue !== normalizedCurrent) {
      console.log('📥 External value changed, updating editor.');
      console.log('  Old:', normalizedCurrent.substring(0, 100));
      console.log('  New:', normalizedValue.substring(0, 100));

      isUpdatingRef.current = true;
      const selection = quill.getSelection();
      quill.root.innerHTML = value || '';
      if (selection) {
        setTimeout(() => {
          quill.setSelection(selection);
        }, 0);
      }
      isUpdatingRef.current = false;
    }
  }, [value]);

  // Enhance code blocks with copy button and language label
  useEffect(() => {
    if (!editorRef.current) return;

    const enhanceCodeBlocks = () => {
      const codeBlocks = editorRef.current?.querySelectorAll('pre.ql-syntax');

      codeBlocks?.forEach((pre) => {
        // Skip if already enhanced
        if (pre.parentElement?.classList.contains('enhanced-code-block')) return;

        // Detect language from highlighted code
        const codeElement = pre.querySelector('code');
        let language = 'code';

        if (codeElement) {
          const classes = codeElement.className.match(/language-(\w+)/);
          if (classes && classes[1]) {
            language = classes[1];
          }
        }

        // Get code text
        const codeText = pre.textContent || '';

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'enhanced-code-block group relative mt-4';

        // Create header
        const header = document.createElement('div');
        header.className = 'w-full h-10 bg-slate-700 -mb-4 rounded-t-lg flex items-center justify-between px-3';

        // Language label
        const langLabel = document.createElement('div');
        langLabel.className = 'text-white text-sm font-mono';
        langLabel.textContent = language;

        // Copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button p-1 bg-transparent text-white hover:text-emerald-400 transition-colors';
        copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        copyBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          copyToClipboard(codeText);
          copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
          setTimeout(() => {
            copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
          }, 2000);
        };

        header.appendChild(langLabel);
        header.appendChild(copyBtn);

        // Wrap the pre element
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
      });
    };

    // Run on mount and when content changes
    enhanceCodeBlocks();

    // Use MutationObserver to watch for new code blocks
    const observer = new MutationObserver(enhanceCodeBlocks);
    if (editorRef.current) {
      observer.observe(editorRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
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
        .rich-text-editor .ql-editor code {
          background: rgba(14, 165, 233, 0.1);
          color: rgb(56, 189, 248);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
        }

        /* Enhanced code block styles */
        .rich-text-editor .enhanced-code-block {
          margin: 1rem 0;
        }
        .rich-text-editor .enhanced-code-block pre.ql-syntax {
          background: rgb(40, 44, 52) !important;
          color: rgb(171, 178, 191) !important;
          border: none !important;
          border-radius: 0 0 0.5rem 0.5rem !important;
          padding: 1em !important;
          margin: 0 !important;
          overflow-x: auto !important;
          font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          text-shadow: rgba(0, 0, 0, 0.3) 0px 1px !important;
        }
        .rich-text-editor .ql-editor pre.ql-syntax {
          background: rgb(40, 44, 52);
          color: rgb(171, 178, 191);
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
        }
        .rich-text-editor .copy-button {
          opacity: 0.7;
          transition: opacity 0.2s, color 0.2s;
        }
        .rich-text-editor .copy-button:hover {
          opacity: 1;
        }
      `}</style>
      <div ref={editorRef} />
    </div>
  );
}