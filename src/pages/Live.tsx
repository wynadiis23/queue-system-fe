
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import api from "../lib/api";

export default function Live() {
    const [services, setServices] = useState<{ name: string; queue: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        // const mockServices = [
        //     {
        //         name: "Service 1",
        //         queue: 5
        //     },
        //     {
        //         name: "Service 2",
        //         queue: 3
        //     },
        //     {
        //         name: "Service 3",
        //         queue: 8
        //     }
        // ]
        setLoading(true);
        // setLoading(false);
        api.get("/queue")
            .then((res) => {
                setServices(res.data);
                setError(null);
            })
            .catch((err) => {
                setError("Failed to fetch queue data");
                setServices([]);
                console.log(err);
            })
            .finally(() => setLoading(false));
        // setServices(mockServices);
    }, []);

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Live Queue" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2 items-center">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="flex flex-wrap gap-6 px-4 lg:px-6">
                                {loading && <div>Loading...</div>}
                                {error && <div className="text-red-500">{error}</div>}
                                {!loading && !error && services.length === 0 && (
                                    <div>No queue data available.</div>
                                )}
                                {!loading && !error && services.map((service) => (
                                    <Card
                                        key={service.name}
                                        className="flex-1 basis-1/3 min-w-[280px] max-w-[400px] text-center"
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-xl font-semibold m-0">{service.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-6xl font-bold my-6">{service.queue}</div>
                                            <div className="text-gray-500">Current Queue</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
