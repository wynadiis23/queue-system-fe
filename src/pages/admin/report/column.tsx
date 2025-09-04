import type { ColumnDef } from "@tanstack/react-table";

export type Criteria = {
    id: string;
    name: string;
};

export type SubComponent = {
    id: string;
    name: string;
    criterias: Criteria[];
};

export type Component = {
    id: string;
    name: string;
    subComponents: SubComponent[];
};

export type Evaluation = {
    id: string;
    name: string;
    year: number;
    description: string;
    components: Component[];
};

export const columns: ColumnDef<Criteria>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Criteria Name",
    },
];
