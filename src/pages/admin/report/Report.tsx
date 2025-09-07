import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "../../../components/section-cards";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";

type RequiredDocument = {
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
    requiredDocuments?: RequiredDocument[];
};
type SubComponent = {
    id: string;
    name: string;
    description?: string;
    requiredDocuments?: RequiredDocument[];
    criterias: Criteria[];

};
type Component = {
    id: string;
    name: string;
    description?: string;
    requiredDocuments?: RequiredDocument[];
    subComponents: SubComponent[];
};
type Evaluation = {
    id: string;
    name: string;
    year: number;
    description: string;
    requiredDocuments?: RequiredDocument[];
    components: Component[];
};

type DetailItem = {
    id: string;
    type: "component" | "subComponent" | "criteria";
    name: string;
    description?: string;
    documents?: RequiredDocument[];
};

function NestedTable({ evaluation }: { evaluation: Evaluation }) {
    const [expandedComponents, setExpandedComponents] = React.useState<string[]>([]);
    const [expandedSubComponents, setExpandedSubComponents] = React.useState<string[]>([]);
    const [drawerCriteria, setDrawerCriteria] = React.useState<Criteria | null>(null);
    const [uploadedFiles, setUploadedFiles] = React.useState<{ [key: string]: File[] }>({});
    const [detailItem, setDetailItem] = React.useState<DetailItem | null>(null);

    const toggleComponent = (id: string) => {
        setExpandedComponents((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };
    const toggleSubComponent = (id: string) => {
        setExpandedSubComponents((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };
    const handleFileUpload = (criteriaId: string, files: FileList | null) => {
        if (!files) return;
        setUploadedFiles((prev) => ({
            ...prev,
            [criteriaId]: [...(prev[criteriaId] || []), ...Array.from(files)],
        }));
    };

    const openDetail = (item: DetailItem) => setDetailItem(item);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-muted">
                        <th className="px-4 py-2 text-left">Evaluation</th>
                        <th className="px-4 py-2 text-left">Component</th>
                        <th className="px-4 py-2 text-left">SubComponent</th>
                        <th className="px-4 py-2 text-left">Criteria</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="px-4 py-2 font-bold" colSpan={4}>
                            {evaluation.name} ({evaluation.year})<br />
                            <span className="text-xs text-muted-foreground">{evaluation.description}</span>
                        </td>
                    </tr>
                    {evaluation.components.map((component) => (
                        <React.Fragment key={component.id}>
                            <tr className="border-b">
                                <td></td>
                                {/* <td className="px-4 py-2">
                                    <button
                                        className="flex items-center gap-2 text-left w-full"
                                        onClick={() => toggleComponent(component.id)}
                                    >
                                        {expandedComponents.includes(component.id) ? (
                                            <ChevronDown size={16} />
                                        ) : (
                                            <ChevronRight size={16} />
                                        )}
                                        <span className="font-semibold">{component.name}</span>
                                    </button>
                                    {expandedComponents.includes(component.id) && component.description && (
                                        <div className="text-xs text-muted-foreground whitespace-pre-line mt-1 break-words">
                                            {component.description}
                                        </div>
                                    )}


                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            openDetail({
                                                id: component.id,
                                                type: "component",
                                                name: component.name,
                                                description: component.description,
                                                documents: component.requiredDocuments,
                                            })
                                        }
                                    >
                                        <Info size={16} />
                                    </Button>
                                </td> */}
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="flex items-center gap-2 text-left"
                                            onClick={() => toggleComponent(component.id)}
                                        >
                                            {expandedComponents.includes(component.id) ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}
                                            <span className="font-semibold">{component.name}</span>
                                        </button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="ml-1"
                                            onClick={() =>
                                                openDetail({
                                                    id: component.id,
                                                    type: "component",
                                                    name: component.name,
                                                    description: component.description,
                                                    documents: component.requiredDocuments,
                                                })
                                            }
                                        >
                                            <Info size={16} />
                                        </Button>
                                    </div>
                                    {expandedComponents.includes(component.id) && component.description && (
                                        <div className="text-xs text-muted-foreground whitespace-pre-line mt-1 break-words">
                                            {component.description}
                                        </div>
                                    )}
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                            {expandedComponents.includes(component.id) &&
                                component.subComponents.map((sub) => (
                                    <React.Fragment key={sub.id}>
                                        <tr className="border-b">
                                            <td></td>
                                            <td></td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="flex items-center gap-2 text-left"
                                                        onClick={() => toggleSubComponent(sub.id)}
                                                    >
                                                        {expandedSubComponents.includes(sub.id) ? (
                                                            <ChevronDown size={16} />
                                                        ) : (
                                                            <ChevronRight size={16} />
                                                        )}
                                                        <span className="font-semibold">{sub.name}</span>
                                                    </button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="ml-1"
                                                        onClick={() =>
                                                            openDetail({
                                                                id: sub.id,
                                                                type: "subComponent",
                                                                name: sub.name,
                                                                description: sub.description,
                                                                documents: sub.requiredDocuments,
                                                            })
                                                        }
                                                    >
                                                        <Info size={16} />
                                                    </Button>
                                                </div>
                                                {expandedSubComponents.includes(sub.id) && sub.description && (
                                                    <div className="text-xs text-muted-foreground whitespace-pre-line mt-1 break-words">
                                                        {sub.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                        {expandedSubComponents.includes(sub.id) &&
                                            sub.criterias.map((criteria) => (
                                                <tr key={criteria.id} className="border-b">
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="px-4 py-2 flex items-center gap-2">
                                                        <Sheet
                                                            open={drawerCriteria?.id === criteria.id}
                                                            onOpenChange={(open) =>
                                                                setDrawerCriteria(open ? criteria : null)
                                                            }
                                                        >
                                                            <SheetTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="flex-1 text-left px-0 py-0 h-auto flex flex-col items-start"
                                                                >
                                                                    <span className="text-wrap">{criteria.name}</span>
                                                                </Button>
                                                            </SheetTrigger>
                                                            <SheetContent style={{ width: "40vw", maxWidth: "100vw" }}>
                                                                <SheetHeader>
                                                                    <SheetTitle>{criteria.name}</SheetTitle>
                                                                    {criteria.description && (
                                                                        <SheetDescription>
                                                                            {criteria.description}
                                                                        </SheetDescription>
                                                                    )}
                                                                </SheetHeader>
                                                                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                                                                    <form className="flex flex-col gap-4">
                                                                        <div className="flex flex-col gap-3">
                                                                            <label className="block text-sm font-medium mb-2">Upload File</label>
                                                                            <input
                                                                                type="file"
                                                                                multiple
                                                                                className="block w-full text-sm"
                                                                                onChange={e =>
                                                                                    handleFileUpload(criteria.id, e.target.files)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium mb-2">Uploaded Files</label>
                                                                            <ul className="list-disc pl-5 text-sm">
                                                                                {(uploadedFiles[criteria.id] || []).map((file, idx) => (
                                                                                    <li key={`uploaded-${idx}`}>{file.name}</li>
                                                                                ))}
                                                                                {(criteria.requiredDocuments || []).map((doc, idx) => (
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

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                openDetail({
                                                                    id: criteria.id,
                                                                    type: "criteria",
                                                                    name: criteria.name,
                                                                    description: criteria.description,
                                                                    documents: criteria.requiredDocuments,
                                                                })
                                                            }
                                                        >
                                                            <Info size={16} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {/* Universal Detail Sheet */}
            <Sheet open={!!detailItem} onOpenChange={(open) => !open && setDetailItem(null)}>
                <SheetContent style={{ width: "40vw", maxWidth: "100vw" }}>
                    <SheetHeader>
                        <SheetTitle>{detailItem?.name}</SheetTitle>
                        {detailItem?.description && (
                            <SheetDescription>
                                {detailItem.description}
                            </SheetDescription>
                        )}
                    </SheetHeader>
                    <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3">
                                <label className="block text-sm font-medium mb-2">Upload File</label>
                                <input
                                    type="file"
                                    multiple
                                    className="block w-full text-sm"
                                    onChange={e =>
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
                                    {(detailItem?.documents || []).map((doc, idx) => (
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
        </div>
    );
}

export default function Report() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Report" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <h2 className="text-lg font-semibold mb-4">Evaluation Report</h2>
                                <NestedTable evaluation={data as Evaluation} />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
