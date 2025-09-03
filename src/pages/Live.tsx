import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Live() {
    const services = [
        { name: "Service A", queue: 12 },
        { name: "Service B", queue: 7 },
        { name: "Service C", queue: 3 },
        // { name: "Service A", queue: 12 },
        // { name: "Service B", queue: 7 },
        // { name: "Service C", queue: 3 },
    ];

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
                                {services.map((service) => (
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
