import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Code2,
  Minus
} from 'lucide-react';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write your content here...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-sky-400 underline',
        },
      }),
    ],
    content: value || '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content when value prop changes (but only if it's different)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>');
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[400px] bg-slate-900/50 border border-slate-600 rounded-lg animate-pulse" />
    );
  }

  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false,
    children,
    title 
  }: { 
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-slate-700 transition-colors ${
        isActive ? 'bg-slate-700 text-sky-400' : 'text-slate-400 hover:text-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-6 bg-slate-700 mx-1" />
  );

  return (
    <div className="rich-text-editor-tiptap">
      <style>{`
        .rich-text-editor-tiptap {
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0.5rem;
          background: rgba(15, 23, 42, 0.5);
          overflow: hidden;
        }

        .rich-text-editor-tiptap .toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          padding: 0.5rem;
          background: rgba(30, 41, 59, 0.5);
          border-bottom: 1px solid rgb(71, 85, 105);
        }

        .rich-text-editor-tiptap .ProseMirror {
          min-height: 400px;
          color: #e2e8f0;
          padding: 1rem;
        }

        .rich-text-editor-tiptap .ProseMirror:focus {
          outline: none;
        }

        .rich-text-editor-tiptap .ProseMirror p {
          margin: 0.5rem 0;
          color: #e2e8f0;
        }

        .rich-text-editor-tiptap .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1rem 0;
          color: #f1f5f9;
        }

        .rich-text-editor-tiptap .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.875rem 0;
          color: #f1f5f9;
        }

        .rich-text-editor-tiptap .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.75rem 0;
          color: #f1f5f9;
        }

        .rich-text-editor-tiptap .ProseMirror strong {
          font-weight: bold;
          color: #f1f5f9;
        }

        .rich-text-editor-tiptap .ProseMirror em {
          font-style: italic;
        }

        .rich-text-editor-tiptap .ProseMirror s {
          text-decoration: line-through;
        }

        .rich-text-editor-tiptap .ProseMirror code {
          background-color: rgba(14, 165, 233, 0.1);
          color: rgb(56, 189, 248);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Fira Code', 'Courier New', monospace;
        }

        .rich-text-editor-tiptap .ProseMirror pre {
          background: rgb(30, 41, 59);
          border: 1px solid rgb(71, 85, 105);
          border-radius: 0.5rem;
          color: rgb(226, 232, 240);
          font-family: 'Fira Code', 'Courier New', monospace;
          padding: 1rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .rich-text-editor-tiptap .ProseMirror pre code {
          background: none;
          color: inherit;
          padding: 0;
          border-radius: 0;
        }

        .rich-text-editor-tiptap .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
          color: #e2e8f0;
        }

        .rich-text-editor-tiptap .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
          color: #e2e8f0;
        }

        .rich-text-editor-tiptap .ProseMirror li {
          margin: 0.25rem 0;
          color: #e2e8f0;
        }

        .rich-text-editor-tiptap .ProseMirror blockquote {
          border-left: 3px solid rgb(71, 85, 105);
          padding-left: 1rem;
          margin: 1rem 0;
          color: rgb(148, 163, 184);
        }

        .rich-text-editor-tiptap .ProseMirror hr {
          border: none;
          border-top: 1px solid rgb(71, 85, 105);
          margin: 1.5rem 0;
        }

        .rich-text-editor-tiptap .ProseMirror a {
          color: rgb(56, 189, 248);
          text-decoration: underline;
          cursor: pointer;
        }

        .rich-text-editor-tiptap .ProseMirror a:hover {
          color: rgb(125, 211, 252);
        }

        .rich-text-editor-tiptap .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgb(100, 116, 139);
          pointer-events: none;
          float: left;
          height: 0;
        }

        /* Ensure all text is visible */
        .rich-text-editor-tiptap .ProseMirror * {
          color: inherit;
        }
      `}</style>

      {/* Toolbar */}
      <div className="toolbar">
        {/* Text Style */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Inline Code"
        >
          <Code size={18} />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Block Elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus size={18} />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Link */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* History */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor}
        placeholder={placeholder}
      />
    </div>
  );
}