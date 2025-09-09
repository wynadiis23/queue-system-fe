import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type RequiredDocument = {
    id: string;
    name: string;
    description: string;
};

type UploadedDocuments = {
    id: string;
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
    createdAt: string;
}

export type DetailItem = {
    id: string;
    type: "component" | "subComponent" | "criteria";
    name: string;
    description?: string;
    uploadedDocuments?: UploadedDocuments[];
    requiredDocuments?: RequiredDocument[];
};

type DetailSheetProps = {
    detailItem: DetailItem | null;
    setDetailItem: (item: DetailItem | null) => void;
    uploadedFiles: { [key: string]: File[] };
    handleFileUpload: (criteriaId: string, files: FileList | null) => void;
};

export function DetailSheet({
    detailItem,
    setDetailItem,
    uploadedFiles,
    handleFileUpload,
}: DetailSheetProps) {
    return (
        <Sheet open={!!detailItem} onOpenChange={(open) => !open && setDetailItem(null)}>
            <SheetContent style={{ width: "40vw", maxWidth: "100vw" }}>
                <SheetHeader>
                    <SheetTitle>{detailItem?.name}</SheetTitle>
                    {detailItem?.description && (
                        <SheetDescription>{detailItem.description}</SheetDescription>
                    )}
                </SheetHeader>

                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {/* Required Documents */}
                    {detailItem?.requiredDocuments && detailItem.requiredDocuments.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Required Documents</label>
                            <ul className="list-disc pl-5 text-sm">
                                {detailItem.requiredDocuments.map((doc) => (
                                    <li key={doc.id}>
                                        <span className="font-semibold">{doc.name}</span>
                                        {doc.description && (
                                            <span className="ml-2 text-muted-foreground">- {doc.description}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <label className="block text-sm font-medium mb-2">Upload File</label>
                            <input
                                type="file"
                                multiple
                                className="block w-full text-sm"
                                onChange={(e) =>
                                    detailItem && handleFileUpload(detailItem.id, e.target.files)
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Uploaded Files</label>
                            <ul className="list-disc pl-5 text-sm">
                                {(uploadedFiles[detailItem?.id ?? ""] || []).map((file, idx) => (
                                    <li key={`uploaded-${idx}`}>{file.name}</li>
                                ))}
                                {(detailItem?.uploadedDocuments || []).map((doc, idx) => (
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

                <SheetFooter>
                    <Button type="submit">Submit</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Done</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
