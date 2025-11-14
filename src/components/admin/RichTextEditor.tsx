import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';

// Import languages for syntax highlighting
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // Highlight code blocks
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const codeBlocks = editor.container.querySelectorAll('pre');
      codeBlocks.forEach((block) => {
        Prism.highlightElement(block);
      });
    }
  }, [value]);

  const modules = {
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
      highlight: (text: string) => Prism.highlight(text, Prism.languages.javascript, 'javascript')
    }
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'video'
  ];

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
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content here..."
      />
    </div>
  );
}
