import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import HardBreak from '@tiptap/extension-hard-break'
import { Button } from "@/components/ui/button"
import { Heading1, Bold as BoldIcon, CornerDownLeft, Pilcrow } from 'lucide-react'

interface TiptapEditorProps {
    value?: string
    onChange: (value: string) => void
    disabled?: boolean
    placeholder?: string
}

const TiptapEditor = ({ value, onChange, disabled = false }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            HardBreak.configure({
                keepMarks: false,
            }),
            Heading.configure({
                levels: [1, 6],
            }),
        ],
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'min-h-[100px] w-full rounded-md border border-input bg-background lg:h-36 h-12 overflow-auto px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
    })

    if (!editor) {
        return null
    }

    const handleButtonClick = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => {
                        handleButtonClick(event)
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }}
                    disabled={disabled}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
                    title="Título H1"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => {
                        handleButtonClick(event)
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }}
                    disabled={disabled}
                    className={editor.isActive('heading', { level: 6 }) ? 'bg-accent' : ''}
                    title="Título H6"
                >
                    <Pilcrow className="w-4 h-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => {
                        handleButtonClick(event)
                        editor.chain().focus().toggleBold().run()
                    }}
                    disabled={disabled}
                    className={editor.isActive('bold') ? 'bg-accent' : ''}
                    title="Negrito"
                >
                    <BoldIcon className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(event) => {
                        handleButtonClick(event)
                        editor.chain().focus().setHardBreak().run()
                    }}
                    disabled={disabled}
                    title="Quebra de linha"
                >
                    <CornerDownLeft className="w-4 h-4" />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor
