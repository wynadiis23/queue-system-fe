import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { RequiredDocument } from "../pages/admin/report/Report";

export interface ReportSectionCardsProps {
    evaluation: {
        components: Array<{
            id: string;
            name: string;
            requiredDocuments?: RequiredDocument[];
            subComponents: Array<{
                id: string;
                name: string;
                requiredDocuments?: RequiredDocument[];
                criterias: Array<{
                    id: string;
                    name: string;
                    requiredDocuments?: RequiredDocument[];
                }>;
            }>;
        }>;
    };
}

export function ReportSectionCards({ evaluation }: ReportSectionCardsProps) {
    // Calculate totals
    const componentCount = evaluation.components.length;
    const subComponentCount = evaluation.components.reduce(
        (acc, comp) => acc + comp.subComponents.length,
        0
    );
    const criteriaCount = evaluation.components.reduce(
        (acc, comp) =>
            acc + comp.subComponents.reduce((a, sub) => a + sub.criterias.length, 0),
        0
    );

    // Count required documents
    const componentDocs = evaluation.components.reduce(
        (acc, comp) => acc + (comp.requiredDocuments?.length || 0),
        0
    );
    const subComponentDocs = evaluation.components.reduce(
        (acc, comp) =>
            acc + comp.subComponents.reduce((a, sub) => a + (sub.requiredDocuments?.length || 0), 0),
        0
    );
    const criteriaDocs = evaluation.components.reduce(
        (acc, comp) =>
            acc + comp.subComponents.reduce(
                (a, sub) =>
                    a + sub.criterias.reduce((b, crit) => b + (crit.requiredDocuments?.length || 0), 0),
                0
            ),
        0
    );

    return (
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-center">Components</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">{componentCount}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                        Required Documents: {componentDocs}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-center">Sub Components</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">{subComponentCount}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                        Required Documents: {subComponentDocs}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-center">Criterias</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">{criteriaCount}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                        Required Documents: {criteriaDocs}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
