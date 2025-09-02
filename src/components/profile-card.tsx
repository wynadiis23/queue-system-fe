import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";


export function ProfileCard() {
    return (
        <Card>
            <CardContent className="flex flex-col items-center">
                <Avatar className="size-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="user avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-semibold mt-4">Adi Saputra</h1>
                <p className="text-sm text-muted-foreground">Backend Engineer</p>
                <div className="flex items-center mt-4 gap-2">
                    <Button size="sm">Follow</Button>
                    <Button variant="outline" size="sm">Profile</Button>
                </div>
            </CardContent>
        </Card>
    )
}