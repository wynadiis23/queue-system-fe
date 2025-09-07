import { Sheet } from "lucide-react";
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";

type Document = {
    id: string;
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
    createdAt: string;
};

type Criteria = {
    id: string;
    name: string;
    description?: string;
    documents?: Document[];
};

type DetailItem = {
    type: "component" | "subComponent" | "criteria";
    name: string;
    description?: string;
    documents?: Document[];
    criteriaId?: string; // needed for file upload
};

export function DetailSheet({
    open,
    onOpenChange,
    item,
    uploadedFiles,
    onFileUpload,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: DetailItem | null;
    uploadedFiles: { [key: string]: File[] };
    onFileUpload: (criteriaId: string, files: FileList | null) => void;
}) {
    if (!item) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent style={{ width: "50vw", maxWidth: "100vw" }}>
                <SheetHeader>
                    <SheetTitle>{item.name}</SheetTitle>
                    {item.description && <SheetDescription>{item.description}</SheetDescription>}
                </SheetHeader>

                {/* If it's a criteria, show upload + docs */}
                {item.type === "criteria" && item.criteriaId && (
                    <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm mt-4">
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3">
                                <label className="block text-sm font-medium mb-2">Upload File</label>
                                <input
                                    type="file"
                                    multiple
                                    className="block w-full text-sm"
                                    onChange={(e) => onFileUpload(item.criteriaId!, e.target.files)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Uploaded Files</label>
                                <ul className="list-disc pl-5 text-sm">
                                    {(uploadedFiles[item.criteriaId] || []).map((file, idx) => (
                                        <li key={`uploaded-${idx}`}>{file.name}</li>
                                    ))}
                                    {(item.documents || []).map((doc, idx) => (
                                        <li key={`doc-${idx}`}>
                                            <a
                                                href={doc.filepath}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {doc.filename}
                                            </a>
                                            <span className="ml-2 text-xs text-muted-foreground">
                                                ({(doc.size / 1024).toFixed(1)} KB)
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </form>
                    </div>
                )}

                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
