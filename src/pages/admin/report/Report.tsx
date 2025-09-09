import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "../../../components/section-cards";
import { DetailSheet, type DetailItem } from "./DetailSheet";

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
};

type Criteria = {
    id: string;
    name: string;
    description?: string;
    uploadedDocuments?: UploadedDocuments[];
    requiredDocuments?: RequiredDocument[];
};
type SubComponent = {
    id: string;
    name: string;
    description?: string;
    uploadedDocuments?: UploadedDocuments[];
    requiredDocuments?: RequiredDocument[];
    criterias: Criteria[];
};
type Component = {
    id: string;
    name: string;
    description?: string;
    uploadedDocuments?: UploadedDocuments[];
    requiredDocuments?: RequiredDocument[];
    subComponents: SubComponent[];
};
type Evaluation = {
    id: string;
    name: string;
    year: number;
    description: string;
    uploadedDocuments?: UploadedDocuments[];
    requiredDocuments?: RequiredDocument[];
    components: Component[];
};

function NestedTable({ evaluation }: { evaluation: Evaluation }) {
    const [expandedComponents, setExpandedComponents] = useState<string[]>([]);
    const [expandedSubComponents, setExpandedSubComponents] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});
    const [detailItem, setDetailItem] = useState<DetailItem | null>(null);

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
                            <span className="text-xs text-muted-foreground">
                                {evaluation.description}
                            </span>
                        </td>
                    </tr>
                    {evaluation.components.map((component) => (
                        <React.Fragment key={component.id}>
                            <tr className="border-b">
                                <td></td>
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
                                                    uploadedDocuments: component.uploadedDocuments,
                                                    requiredDocuments: component.requiredDocuments,
                                                })
                                            }
                                        >
                                            <Info size={16} />
                                        </Button>
                                    </div>
                                    {expandedComponents.includes(component.id) &&
                                        component.description && (
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
                                                                uploadedDocuments: sub.uploadedDocuments,
                                                                requiredDocuments: sub.requiredDocuments,
                                                            })
                                                        }
                                                    >
                                                        <Info size={16} />
                                                    </Button>
                                                </div>
                                                {expandedSubComponents.includes(sub.id) &&
                                                    sub.description && (
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
                                                        <span className="flex-1 text-wrap">
                                                            {criteria.name}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="ml-1"
                                                            onClick={() =>
                                                                openDetail({
                                                                    id: criteria.id,
                                                                    type: "criteria",
                                                                    name: criteria.name,
                                                                    description: criteria.description,
                                                                    uploadedDocuments: criteria.uploadedDocuments,
                                                                    requiredDocuments: criteria.requiredDocuments,
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

            {/* Reusable Detail Sheet */}
            <DetailSheet
                detailItem={detailItem}
                setDetailItem={setDetailItem}
                uploadedFiles={uploadedFiles}
                handleFileUpload={handleFileUpload}
            />
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
