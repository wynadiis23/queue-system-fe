import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type Document = {
    id: string;
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
    createdAt: string;
}

type Criteria = {
    id: string;
    name: string;
    description?: string;
    documents?: Document[];
};
type SubComponent = {
    id: string;
    name: string;
    description?: string;
    criterias: Criteria[];
};
type Component = {
    id: string;
    name: string;
    description?: string;
    subComponents: SubComponent[];
};
type Evaluation = {
    id: string;
    name: string;
    year: number;
    description: string;
    components: Component[];
};

function NestedTable({ evaluation }: { evaluation: Evaluation }) {
    const [expandedComponents, setExpandedComponents] = useState<string[]>([]);
    const [expandedSubComponents, setExpandedSubComponents] = useState<string[]>([]);
    const [drawerCriteria, setDrawerCriteria] = useState<Criteria | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});

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
                                <td className="px-4 py-2">
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
                                                <button
                                                    className="flex items-center gap-2 text-left w-full"
                                                    onClick={() => toggleSubComponent(sub.id)}
                                                >
                                                    {expandedSubComponents.includes(sub.id) ? (
                                                        <ChevronDown size={16} />
                                                    ) : (
                                                        <ChevronRight size={16} />
                                                    )}
                                                    <span>{sub.name}</span>
                                                </button>
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
                                                    <td className="px-4 py-2">
                                                        <Drawer direction="right" open={drawerCriteria?.id === criteria.id} onOpenChange={(open) => setDrawerCriteria(open ? criteria : null)}>
                                                            <DrawerTrigger asChild>
                                                                <Button variant="ghost" className="w-full text-left px-0 py-0 h-auto">
                                                                    <span>{criteria.name}</span>
                                                                    {criteria.description && (
                                                                        <div className="text-xs text-muted-foreground whitespace-pre-line mt-1 break-words">
                                                                            {criteria.description}
                                                                        </div>
                                                                    )}
                                                                </Button>
                                                            </DrawerTrigger>
                                                            <DrawerContent>
                                                                <DrawerHeader className="gap-1">
                                                                    <DrawerTitle>{criteria.name}</DrawerTitle>
                                                                    {criteria.description && (
                                                                        <DrawerDescription>{criteria.description}</DrawerDescription>
                                                                    )}
                                                                </DrawerHeader>
                                                                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                                                                    <form className="flex flex-col gap-4">
                                                                        <div className="flex flex-col gap-3">
                                                                            <label className="block text-sm font-medium mb-2">Upload File</label>
                                                                            <input type="file" multiple className="block w-full text-sm" onChange={e => handleFileUpload(criteria.id, e.target.files)} />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium mb-2">Uploaded Files</label>
                                                                            <ul className="list-disc pl-5 text-sm">
                                                                                {/* Show files uploaded in this session */}
                                                                                {(uploadedFiles[criteria.id] || []).map((file, idx) => (
                                                                                    <li key={`uploaded-${idx}`}>{file.name}</li>
                                                                                ))}
                                                                                {/* Show documents from backend */}
                                                                                {(criteria.documents || []).map((doc, idx) => (
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
                                                                <DrawerFooter>
                                                                    <DrawerClose asChild>
                                                                        <Button variant="outline">Done</Button>
                                                                    </DrawerClose>
                                                                </DrawerFooter>
                                                            </DrawerContent>
                                                        </Drawer>
                                                    </td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
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
                            {/* <SectionCards /> */}
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
